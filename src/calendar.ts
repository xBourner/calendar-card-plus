import { html, TemplateResult } from "lit";
import { CalendarEvent, CalendarCardPlusConfig } from "./types";
import { HomeAssistant } from "./ha/types";
import { localize } from "./localize";

export function renderCalendar(hass: HomeAssistant, events: CalendarEvent[] | undefined, config?: CalendarCardPlusConfig): TemplateResult {
    const unfoldEvents = config?.unfold_events || false;

    if (events === undefined) {
        return html`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--primary-color, #03a9f4);">
                    <ha-icon icon="mdi:calendar-clock"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">${localize(hass, 'loading')}</div>
                </div>
            </div>
        </div>
        `;
    }

    if (events.length === 0) {
        return html`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--disabled-text-color, #bdbdbb);">
                    <ha-icon icon="mdi:calendar-remove"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">${localize(hass, 'no_events')}</div>
                </div>
            </div>
        </div>
        `;
    }

    if (!unfoldEvents) {
        const event = events[0];
        const moreCount = events.length - 1;
        const title = event.summary;
        let start: Date;
        let end: Date;
        
        try {
            start = new Date(event.start.dateTime || event.start.date!);
            end = new Date(event.end.dateTime || event.end.date!);
            if (isNaN(start.getTime()) || isNaN(end.getTime())) throw new Error('Invalid Date');
        } catch (e) {
            return html`<div class="error">Date Error</div>`;
        }

        const now = new Date();
        const isAllDay = !event.start.dateTime; 
        
        const duration = _formatDuration(hass, start, end, isAllDay);
        const lang = hass.locale?.language || hass.language || navigator.language;
        const formatTime = (d: Date) => d.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
        const timeRange = `${formatTime(start)} - ${formatTime(end)}`;

        const showDate = config?.show_date ?? false;
        const showTime = config?.show_time ?? false;

        let timeText = '';
        const allDayText = hass.localize('component.calendar.entity_component._.state_attributes.all_day.name') || 'All day';

        if (showDate || showTime) {
            if (isAllDay) {
                const datePart = showDate ? start.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
                if (showDate && showTime) {
                    timeText = `${datePart}, ${allDayText}`;
                } else {
                    timeText = datePart || allDayText;
                }
            } else {
                const parts: string[] = [];
                if (showDate) {
                    parts.push(start.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' }));
                }
                if (showTime) {
                    parts.push(timeRange);
                }
                timeText = parts.join(', ');
            }
        } else if (start > now) {
            const diffMs = start.getTime() - now.getTime();
            const diffMins = Math.ceil(diffMs / 60000);
            timeText = _formatLocalizedDuration(hass, diffMins);
        } else {
            timeText = isAllDay ? allDayText : formatTime(start);
        }

        if (config?.show_duration) {
            if (timeText) {
                if (timeText.endsWith(duration)) {
                } else {
                    timeText += ` • ${duration}`;
                }
            } else {
                timeText = duration;
            }
        }

        if (moreCount > 0) {
            timeText += ` ${localize(hass, 'more_events', '{x}', moreCount.toString())}`;
        }
        
        if (config?.show_weekday) {
            const lang = hass.locale?.language || hass.language || navigator.language;
            const appendedText = config?.icon_show_weekday 
                ? start.toLocaleDateString(lang, { month: config.show_weekday_long ? 'long' : 'short' })
                : start.toLocaleDateString(lang, { weekday: config.show_weekday_long ? 'long' : 'short' });
            timeText += ` • ${appendedText}`;
        }

        const isActive = start <= now && end >= now;
        const iconDate = isActive ? now : start;
        const iconColor = _resolveColor(event.entity_id, config);
        const dynamicIcon = _renderDynamicIcon(hass, iconDate, iconColor, config?.dark_mode ?? false, config?.icon_show_weekday ?? false);

        const bgColor = _resolveBackgroundColor(event.entity_id, config);
        const itemStyle = bgColor ? `background-color: ${bgColor}; border: none;` : '';

        return html`
            <div class="calendar-container">
                <div class="calendar-item"  
                     style="${itemStyle}"
                     title="${title}"
                     @click=${(e: Event) => _handleCompactClick(e, hass, events)}>
                     <div class="calendar-icon dynamic">
                        ${dynamicIcon}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${title}</div>
                        <div class="event-time">
                            ${(showDate || showTime) ? html`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : ''}
                            ${timeText}
                        </div>
                        ${config?.show_location && event.location
                            ? html`
                                <div class="event-location">
                                    <ha-icon icon="mdi:map-marker"></ha-icon>
                                    ${event.location}
                                </div>
                            `
                            : ''}
                        ${config?.show_calendar_name && event.calendar_name
                            ? html`
                                <div class="event-calendar">
                                    <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
                                    ${event.calendar_name}
                                </div>
                            `
                            : ''}
                    </div>
                </div>
            </div>
        `;
    }

    if (config?.group_by_date && unfoldEvents) {
        const groups = _groupEventsByDate(events);
        return html`
            <div class="calendar-container">
                ${groups.map((group) => {
                    const iconDate = group.date;
                    const iconColor = _toCssColor(config.calendar_icon_color || '#fa3e3e');
                    const dynamicIcon = _renderDynamicIcon(hass, iconDate, iconColor, config?.dark_mode ?? false, config?.icon_show_weekday ?? false);
                    
                    return html`
                        <div class="calendar-item grouped" style="align-items: center;">
                            <div class="calendar-icon dynamic">
                                ${dynamicIcon}
                            </div>
                            <div class="calendar-content">
                                ${group.events.map((event) => {
                                    const title = event.summary;
                                    const start = new Date(event.start.dateTime || event.start.date!);
                                    const end = new Date(event.end.dateTime || event.end.date!);
                                    const isAllDay = !event.start.dateTime;
                                    const duration = _formatDuration(hass, start, end, isAllDay);
                                    const lang = hass.locale?.language || hass.language || navigator.language;
                                    const formatTime = (d: Date) => d.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
                                    const timeRange = `${formatTime(start)} - ${formatTime(end)}`;
                                    
                                    const showDate = config?.show_date ?? false;
                                    const showTime = config?.show_time ?? false;
                                    const allDayText = hass.localize('component.calendar.entity_component._.state_attributes.all_day.name') || 'All day';

                                    let timeText = '';
                                    if (showDate || showTime) {
                                        if (isAllDay) {
                                            const datePart = showDate ? start.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
                                            if (showDate && showTime) {
                                                timeText = `${datePart}, ${allDayText}`;
                                            } else {
                                                timeText = datePart || allDayText;
                                            }
                                        } else {
                                            const parts: string[] = [];
                                            if (showDate) {
                                                parts.push(start.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' }));
                                            }
                                            if (showTime) {
                                                parts.push(timeRange);
                                            }
                                            timeText = parts.join(', ');
                                        }
                                    } else {
                                        timeText = isAllDay ? allDayText : formatTime(start);
                                    }

                                    if (config?.show_duration) {
                                        if (!timeText.endsWith(duration)) {
                                            timeText += ` • ${duration}`;
                                        }
                                    }
                                    
                                    if (config?.show_weekday) {
                                        const appendedText = config?.icon_show_weekday
                                            ? start.toLocaleDateString(lang, { month: config.show_weekday_long ? 'long' : 'short' })
                                            : start.toLocaleDateString(lang, { weekday: config.show_weekday_long ? 'long' : 'short' });
                                        if (!timeText.includes(appendedText)) {
                                            timeText += ` • ${appendedText}`;
                                        }
                                    }

                                    return html`
                                        <div class="event-entry" @click=${(e: Event) => _handleCalendarClick(e, event.entity_id)} style="margin-bottom: 4px;">
                                            <div class="event-title">${title}</div>
                                            <div class="event-time" style="display: flex; align-items: center; gap: 4px;">
                                                ${(showDate || showTime) ? html`<ha-icon icon="mdi:clock-time-four-outline" style="--mdc-icon-size: 14px;"></ha-icon>` : ''}
                                                ${timeText}
                                            </div>
                                            ${config?.show_location && event.location
                                                ? html`
                                                    <div class="event-location" style="display: flex; align-items: center; gap: 4px; font-size: 0.9em; color: var(--secondary-text-color);">
                                                        <ha-icon icon="mdi:map-marker" style="--mdc-icon-size: 14px;"></ha-icon>
                                                        ${event.location}
                                                    </div>
                                                `
                                                : ''}
                                            ${config?.show_calendar_name && event.calendar_name
                                                ? html`
                                                    <div class="event-calendar" style="display: flex; align-items: center; gap: 4px; font-size: 0.9em; color: var(--secondary-text-color);">
                                                        <ha-icon icon="mdi:calendar-blank-multiple" style="--mdc-icon-size: 14px;"></ha-icon>
                                                        ${event.calendar_name}
                                                    </div>
                                                `
                                                : ''}
                                        </div>
                                    `;
                                })}
                            </div>
                        </div>
                        ${config?.show_divider ? html`<div class="calendar-divider"></div>` : ''}
                    `;
                })}
            </div>
        `;
    }

    const maxLines = config?.max_lines || 0;
    const displayEvents = maxLines > 0 ? events.slice(0, maxLines) : events;
    const remainingCount = events.length - displayEvents.length;

    return html`
        <div class="calendar-container">
            ${displayEvents.map((event, index) => {
                const title = event.summary;
                let start: Date;
                let end: Date;
                
                try {
                    start = new Date(event.start.dateTime || event.start.date!);
                    end = new Date(event.end.dateTime || event.end.date!);
                    
                    if (isNaN(start.getTime())) throw new Error('Invalid start date');
                    if (isNaN(end.getTime())) throw new Error('Invalid end date');
                } catch (e) {
                    return html`<div class="error">Date Error for ${title}</div>`;
                }

                const now = new Date();
                const isAllDay = !event.start.dateTime; 
                
                let progress = -1;

                const duration = _formatDuration(hass, start, end, isAllDay);
                const lang = hass.locale?.language || hass.language || navigator.language;
                const formatTime = (d: Date) => d.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
                const timeRange = `${formatTime(start)} - ${formatTime(end)}`;

                const showDate = config?.show_date ?? false;
                const showTime = config?.show_time ?? false;

                let timeText = '';
                const allDayText = hass.localize('component.calendar.entity_component._.state_attributes.all_day.name') || 'All day';

                if (showDate || showTime) {
                    if (isAllDay) {
                        const datePart = showDate ? start.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
                        if (showDate && showTime) {
                            timeText = `${datePart}, ${allDayText}`;
                        } else {
                            timeText = datePart || allDayText;
                        }
                    } else {
                        const parts: string[] = [];
                        if (showDate) {
                            parts.push(start.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' }));
                        }
                        if (showTime) {
                            parts.push(timeRange);
                        }
                        timeText = parts.join(', ');
                    }
                } else if (start > now) {
                    const diffMs = start.getTime() - now.getTime();
                    const diffMins = Math.ceil(diffMs / 60000);
                    timeText = _formatLocalizedDuration(hass, diffMins);
                } else {
                    timeText = isAllDay ? allDayText : formatTime(start);
                }

                if (config?.show_duration) {
                    if (timeText) {
                        if (timeText.endsWith(duration)) {
                        } else {
                            timeText += ` • ${duration}`;
                        }
                    } else {
                        timeText = duration;
                    }
                }
                
                if (!isAllDay && start <= now && end >= now) {
                    const totalDuration = end.getTime() - start.getTime();
                    const elapsed = now.getTime() - start.getTime();
                    if (totalDuration > 0) {
                        progress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
                    }
                }
                
                if (config?.show_weekday) {
                    const lang = hass.locale?.language || hass.language || navigator.language;
                    const appendedText = config?.icon_show_weekday
                        ? start.toLocaleDateString(lang, { month: config.show_weekday_long ? 'long' : 'short' })
                        : start.toLocaleDateString(lang, { weekday: config.show_weekday_long ? 'long' : 'short' });
                    timeText += ` • ${appendedText}`;
                }

                const isActive = start <= now && end >= now;
                const iconDate = isActive ? now : start;
                const iconColor = _resolveColor(event.entity_id, config);
                const dynamicIcon = _renderDynamicIcon(hass, iconDate, iconColor, config?.dark_mode ?? false, config?.icon_show_weekday ?? false);

                const bgColor = _resolveBackgroundColor(event.entity_id, config);
                const itemStyle = bgColor ? `background-color: ${bgColor}; border: none;` : '';

                const showDivider = config?.show_divider && index > 0;
                const isLastLimited = maxLines > 0 && index === maxLines - 1 && remainingCount > 0;

                return html`
                ${showDivider ? html`<div class="calendar-divider"></div>` : ''}
                <div class="calendar-item"  
                     style="${itemStyle}"
                     title="${isLastLimited ? localize(hass, 'popup_upcoming_events') : title}"
                     @click=${(e: Event) => isLastLimited ? _handleCompactClick(e, hass, events) : _handleCalendarClick(e, event.entity_id)}>
                     <div class="calendar-icon dynamic">
                        ${dynamicIcon}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title" style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;">${title}</span>
                            ${isLastLimited ? html`
                                <span class="more-indicator" style="display: flex; align-items: center; gap: 4px; color: var(--secondary-text-color); font-size: 0.85em; font-style: italic; flex-shrink: 0;">
                                    <ha-icon icon="mdi:dots-horizontal" style="--mdc-icon-size: 16px; color: var(--secondary-text-color);"></ha-icon>
                                    (${remainingCount})
                                </span>
                            ` : ''}
                        </div>
                        <div class="event-time">
                            ${(showDate || showTime) ? html`<ha-icon icon="mdi:clock-time-four-outline"></ha-icon>` : ''}
                            ${timeText}
                        </div>
                        ${config?.show_location && event.location
                            ? html`
                                <div class="event-location">
                                    <ha-icon icon="mdi:map-marker"></ha-icon>
                                    ${event.location}
                                </div>
                            `
                            : ''}
                        ${config?.show_calendar_name && event.calendar_name
                            ? html`
                                <div class="event-calendar">
                                    <ha-icon icon="mdi:calendar-blank-multiple"></ha-icon>
                                    ${event.calendar_name}
                                </div>
                            `
                            : ''}
                        ${progress >= 0 ? html`
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                        ` : ''}
                    </div>
                </div>
                `;
            })}
        </div>
    `;
}

export function _resolveColor(entityId: string, config?: CalendarCardPlusConfig): string {
    const color = config?.calendar_colors?.[entityId] || config?.calendar_icon_color || '#fa3e3e';
    return _toCssColor(color);
}

export function _resolveBackgroundColor(entityId: string, config?: CalendarCardPlusConfig): string {
    const color = config?.calendar_background_colors?.[entityId] || config?.background_color || '';
    return color ? _toCssColor(color) : '';
}

export function _toCssColor(color: string): string {
    if (
        color.startsWith('#') ||
        color.startsWith('rgb') ||
        color.startsWith('hsl') ||
        color.startsWith('var')
    ) {
        return color;
    }
    return `var(--${color}-color)`;
}

function _handleCompactClick(e: Event, hass: HomeAssistant, events: CalendarEvent[]) {
    const event = new CustomEvent('calendar-card-show-detail', {
        bubbles: true,
        composed: true,
        detail: { 
            title: localize(hass, 'popup_upcoming_events'),
            entities: events
        }
    });
    const target = e.target as HTMLElement;
    target.dispatchEvent(event);
}

function _handleCalendarClick(e: Event, entityId: string) {
    const event = new CustomEvent('hass-more-info', {
        bubbles: true,
        composed: true,
        detail: { entityId }
    });
    const target = e.target as HTMLElement;
    target.dispatchEvent(event);
}

export function _groupEventsByDate(events: CalendarEvent[]): { date: Date, events: CalendarEvent[] }[] {
    const groups: { [key: string]: { date: Date, events: CalendarEvent[] } } = {};
    
    events.forEach(event => {
        const startDate = new Date(event.start.dateTime || event.start.date!);
        const dateKey = startDate.toISOString().split('T')[0];
        
        if (!groups[dateKey]) {
            groups[dateKey] = {
                date: startDate,
                events: []
            };
        }
        groups[dateKey].events.push(event);
    });
    
    return Object.values(groups).sort((a, b) => a.date.getTime() - b.date.getTime());
}


export function _renderDynamicIcon(hass: HomeAssistant, date: Date, color: string, darkMode: boolean = false, iconShowWeekday: boolean = false): TemplateResult {
    const lang = hass.locale?.language || hass.language || navigator.language;
    let topText: string;
    if (iconShowWeekday) {
        topText = date.toLocaleDateString(lang, { weekday: 'short' }).toUpperCase();
    } else {
        topText = date.toLocaleDateString(lang, { month: 'short' }).toUpperCase();
    }
    const day = date.getDate();

    const bgColor = darkMode ? '#222222' : 'white';
    const dayColor = darkMode ? 'white' : '#333';
    const monthColor = darkMode ? '#222222' : 'white';

    return html`
        <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
            <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="${bgColor}"></rect>
            <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="${color}"></path>
            <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="${monthColor}" text-anchor="middle">${topText}</text>
            <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="${dayColor}" text-anchor="middle">${day}</text>
        </svg>
    `;
}

export function _formatDuration(hass: HomeAssistant, start: Date, end: Date, isAllDay: boolean): string {
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (isAllDay && diffMins === 1440) {
        return hass.localize('component.calendar.entity_component._.state_attributes.all_day.name') || 'All day';
    }

    if (diffMins < 60) {
        return `${diffMins} ${localize(hass, 'duration_min')}`;
    }
    
    const days = Math.floor(diffMins / 1440);
    const remainingAfterDays = diffMins % 1440;
    const hours = Math.floor(remainingAfterDays / 60);
    const mins = remainingAfterDays % 60;

    const parts: string[] = [];

    if (days >= 1) {
        parts.push(`${days} ${localize(hass, days === 1 ? 'duration_day' : 'duration_days')}`);
    }
    if (hours > 0) {
        parts.push(`${hours} ${localize(hass, 'duration_hour')}`);
    }
    if (mins > 0) {
        parts.push(`${mins} ${localize(hass, 'duration_min')}`);
    }

    return parts.join(' ');
}

export function _formatLocalizedDuration(hass: HomeAssistant, minutes: number): string {
    if (minutes < 60) {
        if (minutes === 1) return localize(hass, 'starts_in_min', '{x}', minutes.toString());
        return localize(hass, 'starts_in_mins', '{x}', minutes.toString());
    }
    if (minutes < 1440) {
        const hours = Math.round(minutes / 60);
        if (hours === 1) return localize(hass, 'starts_in_hour', '{x}', hours.toString());
        return localize(hass, 'starts_in_hours', '{x}', hours.toString());
    }
    if (minutes < 43200) {
        const days = Math.round(minutes / 1440);
        if (days === 1) return localize(hass, 'starts_in_day', '{x}', days.toString());
        return localize(hass, 'starts_in_days', '{x}', days.toString());
    }
    const weeks = Math.round(minutes / 10080);
    if (weeks === 1) return localize(hass, 'starts_in_week', '{x}', weeks.toString());
    return localize(hass, 'starts_in_weeks', '{x}', weeks.toString());
}
