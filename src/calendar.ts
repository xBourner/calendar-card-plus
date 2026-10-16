import { css, html, nothing, TemplateResult } from "lit";
import { CalendarEvent, CalendarCardPlusConfig } from "./types";
import { HomeAssistant } from "./ha/types";
import { localize } from "./localize";
import {
  formatTime,
  formatDateNumeric,
  dayOrToday,
  getLang,
  localDayKey,
  parseEventDate,
} from "./format";

// Home Assistant CalendarEntityFeature flags
export const CREATE_EVENT = 1;
export const DELETE_EVENT = 2;
export const UPDATE_EVENT = 4;

type EventClick = (event: CalendarEvent) => void;

export const eventStart = (e: CalendarEvent) =>
  parseEventDate(e.start.dateTime || e.start.date!);
export const eventEnd = (e: CalendarEvent) =>
  parseEventDate(e.end.dateTime || e.end.date!);
export const eventDay = (e: CalendarEvent) => dayOrToday(eventStart(e));

/** Styles shared by the card and the popup list. */
export const eventStyles = css`
  .empty {
    opacity: 0.7;
  }
  .static {
    cursor: default;
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
  .calendar-item.grouped .calendar-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .calendar-item.grouped .event-entry {
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
  }
  .calendar-item.grouped .calendar-icon {
    align-self: center;
  }
`;

export function getCalendars(
  hass: HomeAssistant,
  config: CalendarCardPlusConfig,
): string[] {
  return Object.keys(hass.states).filter(
    (eid) =>
      eid.startsWith("calendar.") && !config.exclude_entities?.includes(eid),
  );
}

export function supportsFeature(
  hass: HomeAssistant,
  config: CalendarCardPlusConfig,
  entityId: string,
  feature: number,
): boolean {
  if (config.read_only_calendars?.includes(entityId)) return false;
  return (
    ((hass.states[entityId]?.attributes?.supported_features ?? 0) & feature) !==
    0
  );
}

export const canEditEvent = (
  hass: HomeAssistant,
  config: CalendarCardPlusConfig,
  event: CalendarEvent,
) =>
  !!event.uid &&
  supportsFeature(hass, config, event.entity_id, UPDATE_EVENT | DELETE_EVENT);

export function renderCalendar(
  hass: HomeAssistant,
  events: CalendarEvent[] | undefined,
  config: CalendarCardPlusConfig,
  onEventClick: EventClick,
  onShowAll: () => void,
): TemplateResult {
  if (events === undefined) {
    return _renderStatus(
      localize(hass, "loading"),
      "mdi:calendar-clock",
      "var(--primary-color, #03a9f4)",
    );
  }
  if (events.length === 0) {
    return _renderStatus(
      localize(hass, "no_events"),
      "mdi:calendar-remove",
      "var(--disabled-text-color, #bdbdbb)",
    );
  }

  if (!config.unfold_events) {
    const moreCount = events.slice(1).filter((e) => !e.is_empty).length;
    // an empty first day still opens the list when real events follow
    const onClick = events.some((e) => !e.is_empty) ? onShowAll : undefined;
    return html`
      <div class="calendar-container">
        ${_renderItem(hass, events[0], config, onClick, {
          moreText:
            moreCount > 0
              ? ` ${localize(hass, "more_events", "{x}", moreCount.toString())}`
              : "",
        })}
      </div>
    `;
  }

  return html`
    <div class="calendar-container">
      ${renderEventList(hass, events, config, onEventClick, onShowAll)}
    </div>
  `;
}

/** Unfolded event list. With onShowAll it is the card view (max_lines, progress), without it the popup view. */
export function renderEventList(
  hass: HomeAssistant,
  events: CalendarEvent[],
  config: CalendarCardPlusConfig,
  onEventClick: EventClick,
  onShowAll?: () => void,
): TemplateResult[] {
  const cls = onShowAll ? "" : "detail";
  const divider = (i: number) =>
    config.show_divider && i > 0
      ? html`<div class="calendar-divider"></div>`
      : nothing;

  if (config.group_by_date_and_calendar || config.group_by_date) {
    return _groupEvents(events, !!config.group_by_date_and_calendar).map(
      (group, i) => {
        const first = group.events[0];
        return html`
          ${divider(i)}
          <div
            class="calendar-item grouped ${cls}"
            style=${_bgStyle(first.entity_id, config)}
          >
            <div class="calendar-icon dynamic">
              ${_renderDynamicIcon(
                hass,
                group.date,
                _resolveColor(first.entity_id, config),
                config.dark_mode,
                config.icon_show_weekday,
              )}
            </div>
            <div class="calendar-content">
              ${group.events.map(
                (event) => html`
                  <div
                    class="event-entry ${event.is_empty ? "empty static" : ""}"
                    @click=${event.is_empty
                      ? null
                      : () => onEventClick(event)}
                  >
                    ${_renderBody(hass, event, config, false)}
                  </div>
                `,
              )}
            </div>
          </div>
        `;
      },
    );
  }

  const maxLines = onShowAll ? config.max_lines || 0 : 0;
  const shown = maxLines > 0 ? events.slice(0, maxLines) : events;
  const remaining = events
    .slice(shown.length)
    .filter((e) => !e.is_empty).length;

  return shown.map((event, i) => {
    const isLastLimited = remaining > 0 && i === shown.length - 1;
    return html`
      ${divider(i)}
      ${_renderItem(
        hass,
        event,
        config,
        isLastLimited
          ? onShowAll
          : event.is_empty
            ? undefined
            : () => onEventClick(event),
        {
          cls,
          progress: !!onShowAll,
          badge: isLastLimited ? remaining : 0,
        },
      )}
    `;
  });
}

function _renderStatus(
  text: string,
  icon: string,
  color: string,
): TemplateResult {
  return html`
    <div class="calendar-container">
      <div class="calendar-item" style="cursor: default;">
        <div class="calendar-icon" style="background-color: ${color};">
          <ha-icon icon=${icon}></ha-icon>
        </div>
        <div class="calendar-content">
          <div class="event-title">${text}</div>
        </div>
      </div>
    </div>
  `;
}

function _renderItem(
  hass: HomeAssistant,
  event: CalendarEvent,
  config: CalendarCardPlusConfig,
  onClick: (() => void) | undefined,
  opts: { cls?: string; progress?: boolean; moreText?: string; badge?: number },
): TemplateResult {
  const start = eventStart(event);
  const end = eventEnd(event);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return html`<div class="error">Date Error for ${event.summary}</div>`;
  }

  const now = new Date();
  const isActive = start <= now && end >= now;

  let progress = -1;
  if (opts.progress && !event.is_empty && event.start.dateTime && isActive) {
    const total = end.getTime() - start.getTime();
    if (total > 0) {
      progress = Math.min(100, ((now.getTime() - start.getTime()) / total) * 100);
    }
  }

  return html`
    <div
      class="calendar-item ${opts.cls ?? ""} ${event.is_empty
        ? "empty"
        : ""} ${onClick ? "" : "static"}"
      style=${_bgStyle(event.entity_id, config)}
      title=${opts.badge
        ? localize(hass, "popup_upcoming_events")
        : _title(hass, event, config)}
      @click=${onClick}
    >
      <div class="calendar-icon dynamic">
        ${_renderDynamicIcon(
          hass,
          isActive ? now : start,
          _resolveColor(event.entity_id, config),
          config.dark_mode,
          config.icon_show_weekday,
        )}
      </div>
      <div class="calendar-content">
        ${_renderBody(hass, event, config, true, opts.moreText, opts.badge)}
        ${progress >= 0
          ? html`
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
              </div>
            `
          : nothing}
      </div>
    </div>
  `;
}

function _renderBody(
  hass: HomeAssistant,
  event: CalendarEvent,
  config: CalendarCardPlusConfig,
  relative: boolean,
  moreText = "",
  badge = 0,
): TemplateResult {
  const title = html`<div class="event-title">
    ${_title(hass, event, config)}
  </div>`;
  return html`
    ${badge
      ? html`<div class="title-row">
          ${title}
          <span class="more-indicator">
            <ha-icon icon="mdi:dots-horizontal"></ha-icon>(${badge})
          </span>
        </div>`
      : title}
    <div class="event-time">
      ${!event.is_empty && (config.show_date || config.show_time)
        ? html`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>`
        : nothing}
      ${_timeText(hass, event, config, relative)}${moreText}
    </div>
    ${!event.is_empty && config.show_location && event.location
      ? html`
          <div class="event-location">
            <ha-icon icon="mdi:map-marker"></ha-icon>
            ${event.location}
          </div>
        `
      : nothing}
    ${config.show_calendar_name && event.calendar_name
      ? html`
          <div class="event-calendar">
            <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
            ${event.calendar_name}
          </div>
        `
      : nothing}
  `;
}

const _title = (
  hass: HomeAssistant,
  event: CalendarEvent,
  config: CalendarCardPlusConfig,
) =>
  event.is_empty
    ? config.empty_text || localize(hass, "empty")
    : event.summary;

const _allDayText = (hass: HomeAssistant) =>
  hass.localize(
    "component.calendar.entity_component._.state_attributes.all_day.name",
  ) || "All day";

function _timeText(
  hass: HomeAssistant,
  event: CalendarEvent,
  config: CalendarCardPlusConfig,
  relative: boolean,
): string {
  if (event.is_empty) return "";

  const start = eventStart(event);
  const end = eventEnd(event);
  const isAllDay = !event.start.dateTime;
  const now = new Date();
  let text: string;

  if (config.show_date || config.show_time) {
    const parts: string[] = [];
    if (config.show_date) parts.push(formatDateNumeric(hass, start));
    if (config.show_time) {
      parts.push(
        isAllDay
          ? _allDayText(hass)
          : `${formatTime(hass, start)} - ${formatTime(hass, end)}`,
      );
    }
    text = parts.join(", ");
  } else if (relative && start > now) {
    text = _formatLocalizedDuration(
      hass,
      Math.ceil((start.getTime() - now.getTime()) / 60000),
    );
  } else {
    text = isAllDay ? _allDayText(hass) : formatTime(hass, start);
  }

  if (config.show_duration) {
    const duration = _formatDuration(hass, start, end, isAllDay);
    if (!text.endsWith(duration)) text += ` • ${duration}`;
  }

  if (config.show_weekday) {
    const style = config.show_weekday_long ? "long" : "short";
    const extra = start.toLocaleDateString(
      getLang(hass),
      config.icon_show_weekday ? { month: style } : { weekday: style },
    );
    if (!text.includes(extra)) text += ` • ${extra}`;
  }

  return text;
}

const _bgStyle = (entityId: string, config: CalendarCardPlusConfig) => {
  const bg = _resolveBackgroundColor(entityId, config);
  return bg ? `background-color: ${bg}; border-color: transparent;` : "";
};

export function _resolveColor(
  entityId: string,
  config?: CalendarCardPlusConfig,
): string {
  const color =
    config?.calendar_colors?.[entityId] ||
    config?.calendar_icon_color ||
    "#fa3e3e";
  return _toCssColor(color);
}

export function _resolveBackgroundColor(
  entityId: string,
  config?: CalendarCardPlusConfig,
): string {
  const color =
    config?.calendar_background_colors?.[entityId] ||
    config?.background_color ||
    "";
  return color ? _toCssColor(color) : "";
}

export function _toCssColor(color: string): string {
  if (
    color.startsWith("#") ||
    color.startsWith("rgb") ||
    color.startsWith("hsl") ||
    color.startsWith("var")
  ) {
    return color;
  }
  return `var(--${color}-color)`;
}

function _groupEvents(
  events: CalendarEvent[],
  byCalendar: boolean,
): { date: Date; calendar: string; events: CalendarEvent[] }[] {
  const groups = new Map<
    string,
    { date: Date; calendar: string; events: CalendarEvent[] }
  >();

  for (const event of events) {
    const date = eventDay(event);
    const calendar = byCalendar ? event.calendar_name || event.entity_id : "";
    const key = `${localDayKey(date)}|${calendar}`;
    if (!groups.has(key)) groups.set(key, { date, calendar, events: [] });
    groups.get(key)!.events.push(event);
  }

  return [...groups.values()].sort(
    (a, b) =>
      a.date.getTime() - b.date.getTime() ||
      a.calendar.localeCompare(b.calendar),
  );
}

export function _renderDynamicIcon(
  hass: HomeAssistant,
  date: Date,
  color: string,
  darkMode: boolean = false,
  iconShowWeekday: boolean = false,
): TemplateResult {
  const topText = date
    .toLocaleDateString(
      getLang(hass),
      iconShowWeekday ? { weekday: "short" } : { month: "short" },
    )
    .toUpperCase();
  const day = date.getDate();

  const bgColor = darkMode ? "#222222" : "white";
  const dayColor = darkMode ? "white" : "#333";
  const monthColor = darkMode ? "#222222" : "white";

  return html`
    <svg
      viewBox="0 0 100 100"
      class="dynamic-calendar-icon"
      style="width: 100%; height: 100%; display: block;"
    >
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        rx="20"
        ry="20"
        fill="${bgColor}"
      ></rect>
      <path
        d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z"
        fill="${color}"
      ></path>
      <text
        x="50"
        y="23"
        font-family="sans-serif"
        font-size="22"
        font-weight="bold"
        fill="${monthColor}"
        text-anchor="middle"
      >
        ${topText}
      </text>
      <text
        x="50"
        y="82"
        font-family="sans-serif"
        font-size="52"
        font-weight="bold"
        fill="${dayColor}"
        text-anchor="middle"
      >
        ${day}
      </text>
    </svg>
  `;
}

export function _formatDuration(
  hass: HomeAssistant,
  start: Date,
  end: Date,
  isAllDay: boolean,
): string {
  let diffMins = Math.round((end.getTime() - start.getTime()) / 60000);
  // local days across a DST switch are 23h/25h long
  if (isAllDay) diffMins = Math.round(diffMins / 1440) * 1440;

  if (isAllDay && diffMins === 1440) {
    return _allDayText(hass);
  }

  if (diffMins < 60) {
    return `${diffMins} ${localize(hass, "duration_min")}`;
  }

  const days = Math.floor(diffMins / 1440);
  const hours = Math.floor((diffMins % 1440) / 60);
  const mins = diffMins % 60;

  const parts: string[] = [];
  if (days >= 1) {
    parts.push(
      `${days} ${localize(hass, days === 1 ? "duration_day" : "duration_days")}`,
    );
  }
  if (hours > 0) parts.push(`${hours} ${localize(hass, "duration_hour")}`);
  if (mins > 0) parts.push(`${mins} ${localize(hass, "duration_min")}`);

  return parts.join(" ");
}

export function _formatLocalizedDuration(
  hass: HomeAssistant,
  minutes: number,
): string {
  const fmt = (key: string, n: number) =>
    localize(hass, n === 1 ? key : `${key}s`, "{x}", n.toString());

  if (minutes < 60) return fmt("starts_in_min", minutes);
  if (minutes < 1440) return fmt("starts_in_hour", Math.round(minutes / 60));
  if (minutes < 43200) return fmt("starts_in_day", Math.round(minutes / 1440));
  return fmt("starts_in_week", Math.round(minutes / 10080));
}
