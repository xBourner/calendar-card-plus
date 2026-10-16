import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "./ha/types";
import { fireEvent } from "./ha/fire_event";
import { CalendarCardPlusConfig, CalendarEvent } from "./types";
import {
  EventFormState,
  deleteEvent,
  editEventState,
  renderEventForm,
  saveEvent,
} from "./events";
import { canEditEvent, eventStyles, renderEventList } from "./calendar";

export type PopupMode = "detail" | "add-event" | "edit-event";

@customElement("calendar-card-plus-popup")
export class CalendarCardPlusPopup extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CalendarCardPlusConfig;
  @property({ type: Boolean }) public open = false;
  @property({ type: String }) public mode: PopupMode = "detail";

  @property({ type: String }) public detailTitle = "";
  @property({ type: Array }) public detailEvents: CalendarEvent[] = [];

  @state() private _formState: EventFormState = {};
  private _opener: HTMLElement | null = null;
  private _onEventSaved: (() => void) | null = null;

  public async showDialog(params: {
    hass: HomeAssistant;
    config: CalendarCardPlusConfig;
    opener: HTMLElement;
    mode: PopupMode;
    title?: string;
    events?: CalendarEvent[];
    formState?: EventFormState;
    onEventSaved?: () => void;
  }) {
    this.hass = params.hass;
    this.config = params.config;
    this._opener = params.opener;
    this.mode = params.mode;
    if (params.title) this.detailTitle = params.title;
    if (params.events) this.detailEvents = params.events;
    if (params.formState) this._formState = params.formState;
    if (params.onEventSaved) this._onEventSaved = params.onEventSaved;

    this.open = true;
    window.history.pushState({ calendarCardPlusPopup: true }, "");
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

    const detail = { dialog: this };
    for (const type of ["closed", "dialog-closed", "popup-closed"]) {
      this.dispatchEvent(
        new CustomEvent(type, { bubbles: true, composed: true, detail }),
      );
    }
  };

  private _onDialogClosed = (ev: Event) => {
    const target = ev.target as HTMLElement | null;
    if (
      target &&
      target.tagName !== "HA-ADAPTIVE-DIALOG" &&
      target.tagName !== "HA-DIALOG"
    ) {
      return;
    }
    this._closeDialog();
  };

  private _closeDialog = () => {
    if (!this.open) return;
    this._close();
    if (window.history.state?.calendarCardPlusPopup) {
      window.history.back();
    }
  };

  private _updateFormState = (newState: Partial<EventFormState>) => {
    this._formState = { ...this._formState, ...newState };
  };

  private async _run(action: () => Promise<void>) {
    try {
      await action();
      this.dispatchEvent(
        new CustomEvent("event-saved", { bubbles: true, composed: true }),
      );
      this._onEventSaved?.();
      this._closeDialog();
    } catch (err: any) {
      this.hass.callService("persistent_notification", "create", {
        title: "Calendar Card Plus",
        message: "Error saving event: " + (err?.message ?? err),
      });
    }
  }

  private _handleSave = () =>
    this._run(() => saveEvent(this.hass, this._formState));

  private _handleDelete = (future: boolean) => {
    const prompt =
      this.hass.localize(
        "ui.components.calendar.event.confirm_delete.prompt",
      ) || "Do you want to delete this event?";
    if (!window.confirm(prompt)) return;
    this._run(() => deleteEvent(this.hass, this._formState, future));
  };

  private _openEvent = (event: CalendarEvent) => {
    if (canEditEvent(this.hass, this.config, event)) {
      this._formState = editEventState(event);
      this.mode = "edit-event";
      return;
    }
    fireEvent(this._opener ?? window, "hass-more-info", {
      entityId: event.entity_id,
    });
  };

  protected render(): TemplateResult {
    const isForm = this.mode !== "detail";
    const title =
      this.mode === "add-event"
        ? this.hass?.localize("ui.components.calendar.event.add") ||
          "Add Event"
        : this.mode === "edit-event"
          ? this.hass?.localize("ui.components.calendar.event.edit") ||
            "Edit Event"
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
        <div
          class="dialog-content scrollable ha-scrollbar ${this.config
            ?.show_divider && !isForm
            ? "plain"
            : ""}"
        >
          ${isForm
            ? renderEventForm(
                this.hass,
                this.config,
                this._formState,
                this._updateFormState,
                this._closeDialog,
                this._handleSave,
                this._handleDelete,
              )
            : renderEventList(
                this.hass,
                this.detailEvents,
                this.config,
                this._openEvent,
              )}
        </div>
      </ha-adaptive-dialog>
    `;
  }

  static styles = [eventStyles, css`
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

    .dialog-content {
      padding: 0 8px 8px 8px;
      min-width: 320px;
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

    /* "show divider": plain rows separated by lines, same as in the card */
    .plain .calendar-item.detail {
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
      margin-bottom: 0;
    }
    .plain .calendar-item.detail:hover {
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

    .add-event-form select.field-input:disabled {
      cursor: default;
      opacity: 0.7;
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
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .dialog-actions .spacer {
      flex: 1;
    }

    .dialog-actions .delete {
      --ha-button-theme-color: var(--error-color, #db4437);
      --mdc-theme-primary: var(--error-color, #db4437);
      color: var(--error-color, #db4437);
    }
  `];
}
