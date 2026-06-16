import { LitElement, html, css, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "./ha/types";
import { CalendarCardPlusConfig, CalendarEvent } from "./types";
import { saveNewEvent, AddEventPopupState as AddEventState } from "./events";
import { renderAddEventForm } from "./events";
import { localize } from "./localize";

import {
  _resolveColor,
  _renderDynamicIcon,
  _resolveBackgroundColor,
  _formatDuration,
  _formatLocalizedDuration,
  _groupEventsByDate,
  _groupEventsByDateAndCalendar,
} from "./calendar";

@customElement("calendar-card-plus-popup")
export class CalendarCardPlusPopup extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CalendarCardPlusConfig;
  @property({ type: Boolean }) public open = false;
  @property({ type: String }) public mode: "detail" | "add-event" = "detail";

  @property({ type: String }) public detailTitle = "";
  @property({ type: Array }) public detailEvents: CalendarEvent[] = [];

  @state() private _addEventState: AddEventState = { open: false };
  private _opener: HTMLElement | null = null;
  private _onEventSaved: (() => void) | null = null;

  public async showDialog(params: {
    hass: HomeAssistant;
    config: CalendarCardPlusConfig;
    opener: HTMLElement;
    mode: "detail" | "add-event";
    title?: string;
    events?: CalendarEvent[];
    addEventState?: AddEventState;
    onEventSaved?: () => void;
  }) {
    this.hass = params.hass;
    this.config = params.config;
    this._opener = params.opener;
    this.mode = params.mode;
    if (params.title) this.detailTitle = params.title;
    if (params.events) this.detailEvents = params.events;
    if (params.addEventState) this._addEventState = params.addEventState;
    if (params.onEventSaved) this._onEventSaved = params.onEventSaved;

    this.open = true;
    window.history.pushState({ calendarCardPlusPopup: true }, "");
    this.requestUpdate();
    await this.updateComplete;

    const ad = this.renderRoot.querySelector("ha-adaptive-dialog");
    if (ad && ad.shadowRoot) {
      const bs = ad.shadowRoot.querySelector("ha-bottom-sheet") as HTMLElement;
      if (bs) {
        bs.style.removeProperty("--dialog-transform");
        bs.style.removeProperty("--dialog-transition");
      }
    }
  }

  private _onPopState = (_ev: PopStateEvent) => {
    if (this.open && !window.history.state?.calendarCardPlusPopup) {
      this._close();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("popstate", this._onPopState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("popstate", this._onPopState);
  }

  private _close = () => {
    if (!this.open) return;
    this.open = false;
    this.requestUpdate();

    const detail = { dialog: this };
    this.dispatchEvent(
      new CustomEvent("closed", { bubbles: true, composed: true, detail }),
    );
    this.dispatchEvent(
      new CustomEvent("dialog-closed", {
        bubbles: true,
        composed: true,
        detail,
      }),
    );
    this.dispatchEvent(
      new CustomEvent("popup-closed", {
        bubbles: true,
        composed: true,
        detail,
      }),
    );
  };

  private _onDialogClosed = (ev?: Event) => {
    if (ev && ev.type !== "click") {
      const target = ev.target as HTMLElement | null;
      if (
        target &&
        target.tagName !== "HA-ADAPTIVE-DIALOG" &&
        target.tagName !== "HA-DIALOG"
      ) {
        return;
      }
    }

    this._close();
    if (window.history.state?.calendarCardPlusPopup) {
      window.history.back();
    }
  };

  private _closeDialog = () => {
    if (!this.open) return;
    this._close();
    if (window.history.state?.calendarCardPlusPopup) {
      window.history.back();
    }
  };

  private _updateAddEventState(newState: Partial<AddEventState>) {
    this._addEventState = { ...this._addEventState, ...newState };
    this.requestUpdate();
  }

  private async _handleSave() {
    await saveNewEvent(
      this.hass,
      this._addEventState,
      () => {
        this.dispatchEvent(
          new CustomEvent("event-saved", { bubbles: true, composed: true }),
        );
        if (this._onEventSaved) this._onEventSaved();
        this._closeDialog();
      },
      (err) => {
        this.hass.callService("persistent_notification", "create", {
          title: "Calendar Card Plus",
          message: "Error saving event: " + err.message,
        });
      },
    );
  }

  protected render(): TemplateResult | typeof nothing {
    const isAddMode = this.mode === "add-event";
    const title = isAddMode
      ? this.hass?.localize("ui.components.calendar.event.add") || "Add Event"
      : this.detailTitle;

    return html`
      <ha-adaptive-dialog
        .hass=${this.hass}
        .open=${this.open}
        .headerTitle=${title}
        @closed=${this._onDialogClosed}
        @ha-dialog-closed=${this._onDialogClosed}
        flexcontent
      >
        <div class="dialog-content scrollable ha-scrollbar">
          ${isAddMode
            ? renderAddEventForm(
                this.hass,
                this.config,
                this._addEventState,
                this._updateAddEventState.bind(this),
                this._closeDialog.bind(this),
                this._handleSave.bind(this),
              )
            : this._renderDetailContent()}
        </div>
      </ha-adaptive-dialog>
    `;
  }

  private _renderDetailContent(): TemplateResult[] {
    if (this.config.group_by_date_and_calendar) {
      const groups = _groupEventsByDateAndCalendar(this.detailEvents);
      return groups.map((group) => {
        const iconDate = group.date;
        const iconColor = _resolveColor(group.events[0].entity_id, this.config);
        const dynamicIcon = _renderDynamicIcon(
          this.hass,
          iconDate,
          iconColor,
          this.config.dark_mode ?? false,
        );

        const bgColor = _resolveBackgroundColor(
          group.events[0].entity_id,
          this.config,
        );
        const groupStyle = bgColor
          ? `background-color: ${bgColor}; border: none;`
          : "";

        return html`
          <div
            class="calendar-item grouped detail"
            style="align-items: center; ${groupStyle}"
          >
            <div class="calendar-icon dynamic">${dynamicIcon}</div>
            <div class="calendar-content">
              ${group.events.map((event) => {
                const title = event.is_empty
                  ? localize(this.hass, "empty")
                  : event.summary;
                const start = new Date(
                  event.start.dateTime || event.start.date!,
                );
                const end = new Date(event.end.dateTime || event.end.date!);
                const isAllDay = !event.start.dateTime;
                const duration = _formatDuration(
                  this.hass,
                  start,
                  end,
                  isAllDay,
                );
                const lang =
                  this.hass.locale?.language ||
                  this.hass.language ||
                  navigator.language;
                const formatTime = (d: Date) =>
                  d.toLocaleTimeString(lang, {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                const timeRange = `${formatTime(start)} - ${formatTime(end)}`;

                const showDate = this.config.show_date ?? false;
                const showTime = this.config.show_time ?? false;
                const allDayText =
                  this.hass.localize(
                    "component.calendar.entity_component._.state_attributes.all_day.name",
                  ) || "All day";

                let timeText = "";
                if (event.is_empty) {
                  timeText = "";
                } else if (showDate || showTime) {
                  if (isAllDay) {
                    const datePart = showDate
                      ? start.toLocaleDateString(lang, {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "";
                    if (showDate && showTime) {
                      timeText = `${datePart}, ${allDayText}`;
                    } else {
                      timeText = datePart || allDayText;
                    }
                  } else {
                    const parts: string[] = [];
                    if (showDate) {
                      parts.push(
                        start.toLocaleDateString(lang, {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }),
                      );
                    }
                    if (showTime) {
                      parts.push(timeRange);
                    }
                    timeText = parts.join(", ");
                  }
                } else {
                  timeText = isAllDay ? allDayText : formatTime(start);
                }

                if (!event.is_empty && this.config.show_duration) {
                  if (!timeText.endsWith(duration)) {
                    timeText += ` • ${duration}`;
                  }
                }

                if (!event.is_empty && this.config.show_weekday) {
                  const weekday = start.toLocaleDateString(lang, {
                    weekday: this.config.show_weekday_long ? "long" : "short",
                  });
                  if (!timeText.includes(weekday)) {
                    timeText += ` • ${weekday}`;
                  }
                }

                return html`
                  <div
                    class="event-entry"
                    @click=${() =>
                      event.is_empty
                        ? null
                        : this._handleMoreInfo(event.entity_id)}
                    style="margin-bottom: 4px; ${event.is_empty
                      ? "opacity: 0.7; cursor: default;"
                      : ""}"
                  >
                    <div class="event-title">${title}</div>
                    <div
                      class="event-time"
                      style="display: flex; align-items: center; gap: 4px;"
                    >
                      ${!event.is_empty && (showDate || showTime)
                        ? html`<ha-icon
                            icon="mdi:clock-time-four-outline"
                            style="--mdc-icon-size: 14px;"
                          ></ha-icon>`
                        : ""}
                      ${timeText}
                    </div>
                    ${!event.is_empty &&
                    this.config.show_location &&
                    event.location
                      ? html`
                          <div class="event-location">
                            <ha-icon
                              icon="mdi:map-marker"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${event.location}
                          </div>
                        `
                      : ""}
                    ${this.config.show_calendar_name && event.calendar_name
                      ? html`
                          <div class="event-calendar">
                            <ha-icon
                              icon="mdi:calendar-blank-multiple"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${event.calendar_name}
                          </div>
                        `
                      : ""}
                  </div>
                `;
              })}
            </div>
          </div>
          ${this.config.show_divider
            ? html`<div class="calendar-divider"></div>`
            : ""}
        `;
      });
    }

    if (this.config.group_by_date) {
      const groups = _groupEventsByDate(this.detailEvents);
      return groups.map((group) => {
        const iconDate = group.date;
        const iconColor = _resolveColor(group.events[0].entity_id, this.config);
        const dynamicIcon = _renderDynamicIcon(
          this.hass,
          iconDate,
          iconColor,
          this.config.dark_mode ?? false,
        );

        const bgColor = _resolveBackgroundColor(
          group.events[0].entity_id,
          this.config,
        );
        const groupStyle = bgColor
          ? `background-color: ${bgColor}; border: none;`
          : "";

        return html`
          <div
            class="calendar-item grouped detail"
            style="align-items: center; ${groupStyle}"
          >
            <div class="calendar-icon dynamic">${dynamicIcon}</div>
            <div class="calendar-content">
              ${group.events.map((event) => {
                const title = event.is_empty
                  ? localize(this.hass, "empty")
                  : event.summary;
                const start = new Date(
                  event.start.dateTime || event.start.date!,
                );
                const end = new Date(event.end.dateTime || event.end.date!);
                const isAllDay = !event.start.dateTime;
                const duration = _formatDuration(
                  this.hass,
                  start,
                  end,
                  isAllDay,
                );
                const lang =
                  this.hass.locale?.language ||
                  this.hass.language ||
                  navigator.language;
                const formatTime = (d: Date) =>
                  d.toLocaleTimeString(lang, {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                const timeRange = `${formatTime(start)} - ${formatTime(end)}`;

                const showDate = this.config.show_date ?? false;
                const showTime = this.config.show_time ?? false;
                const allDayText =
                  this.hass.localize(
                    "component.calendar.entity_component._.state_attributes.all_day.name",
                  ) || "All day";

                let timeText = "";
                if (event.is_empty) {
                  timeText = "";
                } else if (showDate || showTime) {
                  if (isAllDay) {
                    const datePart = showDate
                      ? start.toLocaleDateString(lang, {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "";
                    if (showDate && showTime) {
                      timeText = `${datePart}, ${allDayText}`;
                    } else {
                      timeText = datePart || allDayText;
                    }
                  } else {
                    const parts: string[] = [];
                    if (showDate) {
                      parts.push(
                        start.toLocaleDateString(lang, {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }),
                      );
                    }
                    if (showTime) {
                      parts.push(timeRange);
                    }
                    timeText = parts.join(", ");
                  }
                } else {
                  timeText = isAllDay ? allDayText : formatTime(start);
                }

                if (!event.is_empty && this.config.show_duration) {
                  if (!timeText.endsWith(duration)) {
                    timeText += ` • ${duration}`;
                  }
                }

                if (!event.is_empty && this.config.show_weekday) {
                  const weekday = start.toLocaleDateString(lang, {
                    weekday: this.config.show_weekday_long ? "long" : "short",
                  });
                  if (!timeText.includes(weekday)) {
                    timeText += ` • ${weekday}`;
                  }
                }

                return html`
                  <div
                    class="event-entry"
                    @click=${() =>
                      event.is_empty
                        ? null
                        : this._handleMoreInfo(event.entity_id)}
                    style="margin-bottom: 4px; ${event.is_empty
                      ? "opacity: 0.7; cursor: default;"
                      : ""}"
                  >
                    <div class="event-title">${title}</div>
                    <div
                      class="event-time"
                      style="display: flex; align-items: center; gap: 4px;"
                    >
                      ${!event.is_empty && (showDate || showTime)
                        ? html`<ha-icon
                            icon="mdi:clock-time-four-outline"
                            style="--mdc-icon-size: 14px;"
                          ></ha-icon>`
                        : ""}
                      ${timeText}
                    </div>
                    ${!event.is_empty &&
                    this.config.show_location &&
                    event.location
                      ? html`
                          <div class="event-location">
                            <ha-icon
                              icon="mdi:map-marker"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${event.location}
                          </div>
                        `
                      : ""}
                    ${this.config.show_calendar_name && event.calendar_name
                      ? html`
                          <div class="event-calendar">
                            <ha-icon
                              icon="mdi:calendar-blank-multiple"
                              style="--mdc-icon-size: 14px;"
                            ></ha-icon>
                            ${event.calendar_name}
                          </div>
                        `
                      : ""}
                  </div>
                `;
              })}
            </div>
          </div>
          ${this.config.show_divider
            ? html`<div class="calendar-divider"></div>`
            : ""}
        `;
      });
    }

    return this.detailEvents.map((event, index) => {
      const title = event.is_empty
        ? localize(this.hass, "empty")
        : event.summary;
      let timeText = "";

      let start: Date;
      let end: Date;
      try {
        start = new Date(event.start.dateTime || event.start.date!);
        end = new Date(event.end.dateTime || event.end.date!);
      } catch (e) {
        return html`<div class="error">Date Error</div>`;
      }

      const now = new Date();
      const isAllDay = !event.start.dateTime;

      const lang =
        this.hass.locale?.language || this.hass.language || navigator.language;
      const formatTime = (d: Date) =>
        d.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" });
      const duration = _formatDuration(this.hass, start, end, isAllDay);
      const timeRange = `${formatTime(start)} - ${formatTime(end)}`;

      const showDate = this.config.show_date ?? false;
      const showTime = this.config.show_time ?? false;
      const allDayText =
        this.hass.localize(
          "component.calendar.entity_component._.state_attributes.all_day.name",
        ) || "All day";

      if (event.is_empty) {
        timeText = "";
      } else if (showDate || showTime) {
        if (isAllDay) {
          const datePart = showDate
            ? start.toLocaleDateString(lang, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "";
          if (showDate && showTime) {
            timeText = `${datePart}, ${allDayText}`;
          } else {
            timeText = datePart || allDayText;
          }
        } else {
          const parts: string[] = [];
          if (showDate) {
            parts.push(
              start.toLocaleDateString(lang, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }),
            );
          }
          if (showTime) {
            parts.push(timeRange);
          }
          timeText = parts.join(", ");
        }
      } else if (start > now) {
        const diffMs = start.getTime() - now.getTime();
        const diffMins = Math.ceil(diffMs / 60000);
        timeText = _formatLocalizedDuration(this.hass, diffMins);
      } else {
        timeText = isAllDay ? allDayText : formatTime(start);
      }

      if (!event.is_empty && this.config.show_duration) {
        if (timeText) {
          if (timeText.endsWith(duration)) {
          } else {
            timeText += ` • ${duration}`;
          }
        } else {
          timeText = duration;
        }
      }

      if (!event.is_empty && this.config.show_weekday) {
        const weekday = start.toLocaleDateString(lang, {
          weekday: this.config.show_weekday_long ? "long" : "short",
        });
        timeText += ` • ${weekday}`;
      }

      const isActive = !event.is_empty && start <= now && end >= now;
      const iconDate = isActive ? now : start;
      const iconColor = event.is_empty
        ? "var(--disabled-text-color, #bdbdbb)"
        : _resolveColor(event.entity_id, this.config);

      const dynamicIcon = _renderDynamicIcon(
        this.hass,
        iconDate,
        iconColor,
        this.config.dark_mode ?? false,
      );

      const showDivider = this.config.show_divider && index > 0;

      const bgColor = _resolveBackgroundColor(event.entity_id, this.config);
      const itemStyle = bgColor
        ? `background-color: ${bgColor}; border: none;`
        : "";

      return html`
        ${showDivider ? html`<div class="calendar-divider"></div>` : ""}
        <div
          class="calendar-item detail"
          style="${itemStyle} ${event.is_empty
            ? "cursor: default; opacity: 0.7;"
            : ""}"
          @click=${() =>
            event.is_empty ? null : this._handleMoreInfo(event.entity_id)}
        >
          <div class="calendar-icon dynamic">${dynamicIcon}</div>
          <div class="calendar-content">
            <div class="event-title">${title}</div>
            <div class="event-time">
              ${!event.is_empty && (showDate || showTime)
                ? html`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>`
                : ""}
              ${timeText}
            </div>
            ${!event.is_empty && this.config.show_location && event.location
              ? html`
                  <div class="event-location">
                    <ha-icon icon="mdi:map-marker"></ha-icon>
                    ${event.location}
                  </div>
                `
              : ""}
            ${this.config.show_calendar_name && event.calendar_name
              ? html`
                  <div class="event-calendar">
                    <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
                    ${event.calendar_name}
                  </div>
                `
              : ""}
          </div>
        </div>
      `;
    });
  }

  private _handleMoreInfo(entityId: string) {
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    if (this._opener) {
      this._opener.dispatchEvent(event);
    } else {
      window.dispatchEvent(event);
    }
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-adaptive-dialog {
      --dialog-content-padding: 0px 12px 12px;
      --ha-dialog-max-width: 96vw !important;
      --ha-bottom-sheet-height: calc(
        100dvh - max(var(--safe-area-inset-top), 48px)
      ) !important;
      --ha-bottom-sheet-max-height: var(--ha-bottom-sheet-height) !important;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dialog-title {
      font-size: 1.1em;
      font-weight: 500;
      flex: 1;
    }

    .dialog-content {
      padding: 0 8px 8px 8px;
      min-width: 320px;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 8px 16px 16px;
    }

    .calendar-item {
      display: flex;
      align-items: center;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .calendar-item.detail {
      background-color: var(
        --ha-card-background,
        var(--card-background-color, white)
      );
      border: var(--ha-card-border-width, 1px) solid
        var(--ha-card-border-color, var(--divider-color, #e0e0e0));
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 12px;
      margin-bottom: 8px;
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .calendar-item.detail:hover {
      background-color: var(--secondary-background-color);
    }

    .calendar-icon {
      width: 40px;
      height: 40px;
      margin-right: 12px;
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
    }

    .calendar-content {
      flex: 1;
      min-width: 0;
    }

    .event-title {
      font-weight: 500;
      font-size: 1.1em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .event-time {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
    .event-time ha-icon {
      --mdc-icon-size: 14px;
      color: var(--secondary-text-color);
    }
    .event-location,
    .event-calendar {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
      margin-top: 1px;
    }
    .event-location ha-icon,
    .event-calendar ha-icon {
      --mdc-icon-size: 14px;
      color: var(--secondary-text-color);
    }

    .calendar-divider {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      margin: 4px 12px;
    }

    .add-event-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .add-event-form .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .add-event-form .field-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }

    .add-event-form .field-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, white);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
    }

    .add-event-form .field-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .add-event-form select.field-input {
      cursor: pointer;
      appearance: auto;
    }

    .row-flex {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .date-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .date-row .field-input {
      flex: 1;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }

    .calendar-item.grouped .calendar-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .calendar-item.grouped .event-entry {
      display: flex;
      flex-direction: column;
    }
    .calendar-item.grouped .calendar-icon {
      align-self: center;
    }
  `;
}
