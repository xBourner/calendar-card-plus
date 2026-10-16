import { html, nothing, TemplateResult } from "lit";
import { HomeAssistant } from "./ha/types";
import { CalendarCardPlusConfig, CalendarEvent } from "./types";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  eventEnd,
  eventStart,
  getCalendars,
  supportsFeature,
} from "./calendar";
import {
  endAfterStart,
  localDayKey,
  localTimeKey,
  parseEventDate,
} from "./format";

export interface EventFormState {
  calendar_id?: string;
  name?: string;
  start_date?: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
  /** all-day end date is inclusive here, HA expects it exclusive */
  all_day?: boolean;
  location?: string;
  description?: string;
  recurrence?: string;
  // set when editing an existing event
  uid?: string;
  recurrence_id?: string;
  rrule?: string;
}

const FREQUENCIES = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];

export const creatableCalendars = (
  hass: HomeAssistant,
  config: CalendarCardPlusConfig,
) =>
  getCalendars(hass, config).filter((c) =>
    supportsFeature(hass, config, c, CREATE_EVENT),
  );

const isRecurring = (s: EventFormState) => !!(s.rrule || s.recurrence_id);

export function newEventState(
  hass: HomeAssistant,
  config: CalendarCardPlusConfig,
): EventFormState {
  const start = new Date();
  start.setHours(start.getHours() + 1, 0, 0, 0);
  const end = new Date(start);
  end.setHours(end.getHours() + 1, 0, 0, 0);

  return {
    calendar_id: creatableCalendars(hass, config)[0],
    name: "",
    start_date: localDayKey(start),
    start_time: localTimeKey(start),
    end_date: localDayKey(end),
    end_time: localTimeKey(end),
    location: "",
    description: "",
    recurrence: "none",
    all_day: false,
  };
}

export function editEventState(event: CalendarEvent): EventFormState {
  const start = eventStart(event);
  const end = eventEnd(event);
  const allDay = !event.start.dateTime;
  if (allDay) end.setDate(end.getDate() - 1);

  return {
    calendar_id: event.entity_id,
    name: event.summary,
    start_date: localDayKey(start),
    start_time: localTimeKey(start),
    end_date: localDayKey(end < start ? start : end),
    end_time: localTimeKey(end),
    all_day: allDay,
    location: event.location ?? "",
    description: event.description ?? "",
    recurrence: "none",
    uid: event.uid,
    recurrence_id: event.recurrence_id,
    rrule: event.rrule,
  };
}

/** Creates or updates the event. Throws on failure. */
export async function saveEvent(
  hass: HomeAssistant,
  s: EventFormState,
): Promise<void> {
  if (!s.calendar_id || !s.name || !s.start_date || !s.end_date) {
    throw new Error("Title, calendar, start and end date are required");
  }
  if (!endAfterStart(!!s.all_day, s.start_date, s.end_date, s.start_time, s.end_time)) {
    throw new Error("End must be after start");
  }

  const data: Record<string, string> = { summary: s.name };
  if (s.location) data.location = s.location;
  if (s.description) data.description = s.description;

  let start: string;
  let end: string;
  if (s.all_day) {
    const endDay = parseEventDate(s.end_date);
    endDay.setDate(endDay.getDate() + 1);
    start = s.start_date;
    end = localDayKey(endDay);
  } else {
    // send with offset: the card shows browser-local times, HA would read a naive time in its own zone
    start = new Date(`${s.start_date}T${s.start_time || "09:00"}`).toISOString();
    end = new Date(`${s.end_date}T${s.end_time || "10:00"}`).toISOString();
  }

  const rrule =
    !isRecurring(s) && FREQUENCIES.includes(s.recurrence ?? "")
      ? `FREQ=${s.recurrence}`
      : undefined;

  if (s.uid) {
    await hass.callWS({
      type: "calendar/event/update",
      entity_id: s.calendar_id,
      uid: s.uid,
      ...(s.recurrence_id ? { recurrence_id: s.recurrence_id } : {}),
      event: {
        ...data,
        dtstart: start,
        dtend: end,
        ...(rrule ? { rrule } : {}),
      },
    });
    return;
  }

  await hass.callService("calendar", "create_event", {
    entity_id: s.calendar_id,
    ...data,
    ...(s.all_day
      ? { start_date: start, end_date: end }
      : { start_date_time: start, end_date_time: end }),
    ...(rrule ? { rrule } : {}),
  });
}

/** Deletes the event; for recurring events either this occurrence or this and all future ones. Throws on failure. */
export function deleteEvent(
  hass: HomeAssistant,
  s: EventFormState,
  future = false,
): Promise<void> {
  return hass.callWS({
    type: "calendar/event/delete",
    entity_id: s.calendar_id,
    uid: s.uid,
    ...(s.recurrence_id ? { recurrence_id: s.recurrence_id } : {}),
    ...(future ? { recurrence_range: "THISANDFUTURE" } : {}),
  });
}

export function renderEventForm(
  hass: HomeAssistant,
  config: CalendarCardPlusConfig,
  s: EventFormState,
  updateState: (newState: Partial<EventFormState>) => void,
  onClose: () => void,
  onSave: () => void,
  onDelete: (future: boolean) => void,
): TemplateResult {
  const isEdit = !!s.uid;
  const calendars = isEdit
    ? [s.calendar_id!]
    : creatableCalendars(hass, config);
  const canUpdate =
    !isEdit || supportsFeature(hass, config, s.calendar_id!, UPDATE_EVENT);
  const canDelete =
    isEdit && supportsFeature(hass, config, s.calendar_id!, DELETE_EVENT);
  const isAllDay = s.all_day || false;
  const t = (key: string, fallback: string) =>
    hass.localize(`ui.components.calendar.event.${key}`) || fallback;

  return html`
    <div class="add-event-form">
      <div class="field">
        <label class="field-label">${t("summary", "Title")}</label>
        <input
          type="text"
          class="field-input"
          .value=${s.name || ""}
          @input=${(e: Event) =>
            updateState({ name: (e.target as HTMLInputElement).value })}
        />
      </div>

      <div class="field">
        <label class="field-label">${t("location", "Location")}</label>
        <input
          type="text"
          class="field-input"
          .value=${s.location || ""}
          @input=${(e: Event) =>
            updateState({ location: (e.target as HTMLInputElement).value })}
        />
      </div>

      <div class="field">
        <label class="field-label">${t("description", "Description")}</label>
        <input
          type="text"
          class="field-input"
          .value=${s.description || ""}
          @input=${(e: Event) =>
            updateState({ description: (e.target as HTMLInputElement).value })}
        />
      </div>

      <div class="field">
        <label class="field-label"
          >${hass.localize("ui.components.calendar.my_calendars") ||
          "Calendar"}</label
        >
        <select
          class="field-input"
          ?disabled=${isEdit}
          .value=${s.calendar_id || ""}
          @change=${(e: Event) =>
            updateState({ calendar_id: (e.target as HTMLSelectElement).value })}
        >
          ${calendars.length === 0
            ? html`<option value="">
                -- ${hass.localize("ui.common.none") || "no calendars"} --
              </option>`
            : calendars.map(
                (c) => html`
                  <option value=${c} ?selected=${c === s.calendar_id}>
                    ${hass.states[c]?.attributes?.friendly_name || c}
                  </option>
                `,
              )}
        </select>
      </div>

      <div class="row-flex">
        <ha-formfield .label=${t("all_day", "All Day")}>
          <ha-switch
            .checked=${isAllDay}
            @change=${(e: any) => updateState({ all_day: e.target.checked })}
          ></ha-switch>
        </ha-formfield>
      </div>

      ${(["start", "end"] as const).map(
        (which) => html`
          <div class="field">
            <label class="field-label"
              >${t(which, which === "start" ? "Start" : "End")}</label
            >
            <div class="date-row">
              <input
                type="date"
                class="field-input"
                .value=${s[`${which}_date`] || ""}
                @change=${(e: Event) =>
                  updateState({
                    [`${which}_date`]: (e.target as HTMLInputElement).value,
                  })}
              />
              ${!isAllDay
                ? html`
                    <input
                      type="time"
                      class="field-input"
                      .value=${s[`${which}_time`] ||
                      (which === "start" ? "09:00" : "10:00")}
                      @change=${(e: Event) =>
                        updateState({
                          [`${which}_time`]: (e.target as HTMLInputElement)
                            .value,
                        })}
                    />
                  `
                : nothing}
            </div>
          </div>
        `,
      )}
      ${isRecurring(s)
        ? nothing
        : html`
            <div class="field">
              <label class="field-label"
                >${t("repeat.label", "Repeat")}</label
              >
              <select
                class="field-input"
                .value=${s.recurrence || "none"}
                @change=${(e: Event) =>
                  updateState({
                    recurrence: (e.target as HTMLSelectElement).value,
                  })}
              >
                ${["none", ...FREQUENCIES].map(
                  (f) => html`
                    <option value=${f} ?selected=${f === (s.recurrence || "none")}>
                      ${t(
                        `repeat.freq.${f.toLowerCase()}`,
                        f.charAt(0) + f.slice(1).toLowerCase(),
                      )}
                    </option>
                  `,
                )}
              </select>
            </div>
          `}

      <div class="dialog-actions">
        ${canDelete
          ? isRecurring(s)
            ? html`
                <ha-button class="delete" @click=${() => onDelete(false)}>
                  ${t("confirm_delete.delete_this", "Delete only this event")}
                </ha-button>
                <ha-button class="delete" @click=${() => onDelete(true)}>
                  ${t("confirm_delete.delete_future", "Delete all future events")}
                </ha-button>
              `
            : html`
                <ha-button class="delete" @click=${() => onDelete(false)}>
                  ${hass.localize("ui.common.delete") || "Delete"}
                </ha-button>
              `
          : nothing}
        <span class="spacer"></span>
        <ha-button @click=${onClose}>
          ${hass.localize("ui.common.cancel") || "Cancel"}
        </ha-button>
        ${canUpdate
          ? html`
              <ha-button
                unelevated
                @click=${onSave}
                ?disabled=${!s.name ||
                !s.calendar_id ||
                !endAfterStart(
                  !!s.all_day,
                  s.start_date,
                  s.end_date,
                  s.start_time,
                  s.end_time,
                )}
              >
                ${hass.localize("ui.common.save") || "Save"}
              </ha-button>
            `
          : nothing}
      </div>
    </div>
  `;
}
