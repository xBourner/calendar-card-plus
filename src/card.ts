import { mdiPlus } from "@mdi/js";
import { fetchCalendarEvents } from "./ha/data/calendar";
import { LitElement, html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "./ha/types";
import { fireEvent } from "./ha/fire_event";
import { CalendarCardPlusConfig, CalendarEvent } from "./types";
import {
  canEditEvent,
  eventDay,
  eventStart,
  eventStyles,
  getCalendars,
  renderCalendar,
} from "./calendar";
import { localize } from "./localize";
import { localDayKey } from "./format";
import { creatableCalendars, editEventState, newEventState } from "./events";
import "./popup-dialog";

const REFRESH_INTERVAL = 5 * 60000;

@customElement("calendar-card-plus")
export class CalendarCardPlus extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: CalendarCardPlusConfig;
  @state() private _events: CalendarEvent[] | undefined = undefined;
  private _lastFetch = 0;
  @state() private _hidden = false;
  @property({ type: Boolean }) public preview = false;

  protected updated(changedProps: Map<string, any>) {
    super.updated(changedProps);
    // HA sets preview in the card editor and dashboard edit mode; keep the card visible there
    const hidden = this._hidden && !this.preview;
    if (hidden !== this.hidden) {
      this.hidden = hidden;
      // hui-card only re-reads our hidden flag on this event
      fireEvent(this, "card-visibility-changed" as any, { value: !hidden });
    }
  }

  protected willUpdate(changedProps: Map<string, any>) {
    super.willUpdate(changedProps);

    if (
      this.hass &&
      this.config &&
      (changedProps.has("config") ||
        Date.now() - this._lastFetch > REFRESH_INTERVAL)
    ) {
      this._fetchEvents();
    }
  }

  public setConfig(config: CalendarCardPlusConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this.config = config;
  }

  private async _fetchEvents() {
    this._lastFetch = Date.now();
    const now = new Date();
    let end: Date;

    if (this.config.upcoming_events) {
      let minutes = 1440;
      if (
        this.config.days !== undefined ||
        this.config.hours !== undefined ||
        this.config.minutes !== undefined
      ) {
        minutes =
          (this.config.days || 0) * 1440 +
          (this.config.hours || 0) * 60 +
          (this.config.minutes || 0);
      } else if (this.config.max_minutes_until_start !== undefined) {
        minutes = this.config.max_minutes_until_start;
      }
      end = new Date(now.getTime() + minutes * 60000);
    } else {
      end = new Date(now);
      end.setHours(23, 59, 59, 999);
    }

    const c = this.config;
    let hideEnd: Date | undefined;
    if (c.hide_if_no_events) {
      if (c.hide_days || c.hide_hours || c.hide_minutes) {
        hideEnd = new Date(
          now.getTime() +
            ((c.hide_days || 0) * 1440 + (c.hide_hours || 0) * 60 + (c.hide_minutes || 0)) * 60000,
        );
      } else {
        hideEnd = new Date(now);
        hideEnd.setHours(23, 59, 59, 999);
      }
    }

    const calendars = getCalendars(this.hass, this.config);
    if (calendars.length === 0) {
      this._events = [];
      this._hidden = !!hideEnd;
      return;
    }

    const fetchEnd = hideEnd && hideEnd > end ? hideEnd : end;
    let events = await fetchCalendarEvents(this.hass, now, fetchEnd, calendars);
    this._hidden = !!hideEnd && !events.some((e) => eventStart(e) <= hideEnd!);
    events = events.filter((e) => eventStart(e) <= end);
    if (this.config.show_empty_days) {
      events = events.concat(this._emptyDays(events, now, end));
    }
    this._events = events.sort(
      (a, b) => eventStart(a).getTime() - eventStart(b).getTime(),
    );
  }

  private _emptyDays(
    events: CalendarEvent[],
    start: Date,
    end: Date,
  ): CalendarEvent[] {
    const days = new Set(events.map((e) => localDayKey(eventDay(e))));
    const result: CalendarEvent[] = [];

    const current = new Date(start);
    current.setHours(0, 0, 0, 0);
    while (current <= end) {
      const key = localDayKey(current);
      if (!days.has(key)) {
        result.push({
          start: { date: key },
          end: { date: key },
          summary: "empty",
          is_empty: true,
          entity_id: "empty",
          calendar_name: "",
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return result;
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const showAdd =
      this.config.show_add_event &&
      creatableCalendars(this.hass, this.config).length > 0;

    return html`
      <ha-card
        class=${!this.config.unfold_events || this.config.show_divider
          ? "plain"
          : ""}
      >
        ${showAdd
          ? html`
              <div class="add-event-btn" @click=${this._openAddEventPopup}>
                <ha-icon-button .path=${mdiPlus}></ha-icon-button>
              </div>
            `
          : ""}
        ${renderCalendar(
          this.hass,
          this._events,
          this.config,
          this._openEvent,
          this._showAll,
        )}
      </ha-card>
    `;
  }

  private _showAll = () => {
    this._showPopup({
      mode: "detail",
      title: localize(this.hass, "popup_upcoming_events"),
      events: this._events,
    });
  };

  private _openEvent = (event: CalendarEvent) => {
    if (canEditEvent(this.hass, this.config, event)) {
      this._showPopup({ mode: "edit-event", formState: editEventState(event) });
    } else {
      fireEvent(this, "hass-more-info", { entityId: event.entity_id });
    }
  };

  private _openAddEventPopup = () => {
    this._showPopup({
      mode: "add-event",
      formState: newEventState(this.hass, this.config),
    });
  };

  private _showPopup(dialogParams: Record<string, any>): void {
    fireEvent(this, "show-dialog", {
      dialogTag: "calendar-card-plus-popup",
      dialogImport: () => import("./popup-dialog"),
      dialogParams: {
        ...dialogParams,
        hass: this.hass,
        config: this.config,
        opener: this,
        onEventSaved: this._onEventSaved,
      },
    });
  }

  private _onEventSaved = () => {
    this._events = undefined;
    this._fetchEvents();
  };

  static get styles(): CSSResultGroup {
    return [eventStyles, css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      ha-card {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .calendar-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
        padding: 8px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
      }
      /* each event is a thin-bordered tile; radius follows the card's minus its padding */
      .calendar-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: calc(var(--ha-card-border-radius, 12px) - 6px);
        cursor: pointer;
      }
      /* compact view or "show divider": plain rows instead of tiles */
      ha-card.plain .calendar-container {
        gap: 0;
      }
      ha-card.plain .calendar-item {
        border-color: transparent;
      }
      .calendar-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color, #03a9f4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
      }
      .calendar-icon ha-icon {
        --mdc-icon-size: 20px;
      }
      .calendar-content {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        flex: 1;
      }
      .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .title-row .event-title {
        flex: 1;
      }
      .more-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--secondary-text-color);
        font-size: 0.85em;
        font-style: italic;
        flex-shrink: 0;
        --mdc-icon-size: 16px;
      }
      .event-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .event-time {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .progress-bar {
        margin-top: 4px;
        height: 4px;
        background-color: var(--secondary-background-color, #444);
        border-radius: 2px;
        overflow: hidden;
        width: 100%;
      }
      .progress-fill {
        height: 100%;
        background-color: var(--primary-text-color, #fff);
        border-radius: 2px;
        opacity: 0.7;
      }

      .add-event-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        z-index: 2;
        color: var(--secondary-text-color);
      }
      .add-event-btn:hover {
        color: var(--primary-text-color);
      }
    `];
  }

  public getCardSize(): number {
    return 1;
  }

  public static async getConfigElement() {
    await import("./editor");
    return document.createElement("calendar-card-plus-editor");
  }

  public static getStubConfig(_hass: HomeAssistant): CalendarCardPlusConfig {
    return {
      type: "custom:calendar-card-plus",
      exclude_entities: [],
      unfold_events: false,
    };
  }
}
