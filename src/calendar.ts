import { html, TemplateResult } from "lit";
import { CalendarEvent, CalendarCardPlusConfig } from "./types";
import { HomeAssistant } from "./ha/types";
import { localize } from "./localize";

export function renderCalendar(hass: HomeAssistant, events: CalendarEvent[] | undefined, config?: CalendarCardPlusConfig): TemplateResult {
    const multipleEvents = config?.multiple_events || false;

    // Loading state
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

    // No events state
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

    if (!multipleEvents) {
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
        
        // Compact Timer Logic
        let timeText;
        if (start > now) {
            const diffMs = start.getTime() - now.getTime();
            const diffMins = Math.ceil(diffMs / 60000);
            timeText = _formatLocalizedDuration(hass, diffMins);
        } else {
            if (isAllDay) {
                timeText = localize(hass, 'all_day');
            } else {
                const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeText = `${formatTime(start)} - ${formatTime(end)}`;
            }
        }

        if (moreCount > 0) {
            timeText += ` ${localize(hass, 'more_events', '{x}', moreCount.toString())}`;
        }

        const isActive = start <= now && end >= now;
        const iconDate = isActive ? now : start;
        const iconColor = _resolveColor(event.entity_id, config);
        const dynamicIcon = _renderDynamicIcon(iconDate, iconColor);

        return html`
            <div class="calendar-container">
                <div class="calendar-item"  
                     title="${title}"
                     @click=${(e: Event) => _handleCompactClick(e, events)}>
                     <div class="calendar-icon dynamic">
                        ${dynamicIcon}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${title}</div>
                        <div class="event-time">${timeText}</div>
                    </div>
                    <ha-icon-button icon="mdi:chevron-right"></ha-icon-button>
                </div>
            </div>
        `;
    }

    // LIST MODE (Default)
    return html`
        <div class="calendar-container">
            ${events.map((event, index) => {
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
                
                let timeText;
                let progress = -1;

                if (start > now) {
                    const diffMs = start.getTime() - now.getTime();
                    const diffMins = Math.ceil(diffMs / 60000);
                    timeText = _formatLocalizedDuration(hass, diffMins);
                } else {
                    // Event is current
                    if (isAllDay) {
                        timeText = localize(hass, 'all_day');
                    } else {
                        const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        timeText = `${formatTime(start)} - ${formatTime(end)}`;
            
                        const totalDuration = end.getTime() - start.getTime();
                        const elapsed = now.getTime() - start.getTime();
                        if (totalDuration > 0) {
                                progress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
                        }
                    }
                }

                const isActive = start <= now && end >= now;
                const iconDate = isActive ? now : start;
                const iconColor = _resolveColor(event.entity_id, config);
                // Only render dynamic icon if date is valid (checked above)
                const dynamicIcon = _renderDynamicIcon(iconDate, iconColor);

                const showDivider = config?.show_calendar_divider && index > 0 && events[index - 1].entity_id !== event.entity_id;

                return html`
                ${showDivider ? html`<div class="calendar-divider"></div>` : ''}
                <div class="calendar-item"  
                     style="margin-bottom: 6px;"
                     title="${title}"
                     @click=${(e: Event) => _handleCalendarClick(e, event.entity_id)}>
                     <div class="calendar-icon dynamic">
                        ${dynamicIcon}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${title}</div>
                        <div class="event-time">${timeText}</div>
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

function _resolveColor(entityId: string, config?: CalendarCardPlusConfig): string {
    const color = config?.calendar_colors?.[entityId] || config?.calendar_icon_color || '#fa3e3e';
    return _toCssColor(color);
}

function _toCssColor(color: string): string {
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

function _handleCompactClick(e: Event, events: CalendarEvent[]) {
    const event = new CustomEvent('calendar-card-show-detail', {
        bubbles: true,
        composed: true,
        detail: { 
            title: 'Upcoming Events',
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


function _renderDynamicIcon(date: Date, color: string): TemplateResult {
    const month = date.toLocaleDateString([], { month: 'short' }).toUpperCase();
    const day = date.getDate();

    // Apple-style calendar icon SVG
    // Background: White rounded square
    // Header: Colored top area for month
    // Body: Large day number
    return html`
        <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
            <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="white"></rect>
            <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="${color}"></path>
            <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">${month}</text>
            <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="#333" text-anchor="middle">${day}</text>
        </svg>
    `;
}

function _formatLocalizedDuration(hass: HomeAssistant, minutes: number): string {
    if (minutes < 60) {
        if (minutes === 1) return localize(hass, 'starts_in_min', '{x}', minutes.toString());
        return localize(hass, 'starts_in_mins', '{x}', minutes.toString());
    }
    if (minutes < 1440) { // 24 hours
        const hours = Math.round(minutes / 60);
        if (hours === 1) return localize(hass, 'starts_in_hour', '{x}', hours.toString());
        return localize(hass, 'starts_in_hours', '{x}', hours.toString());
    }
    if (minutes < 43200) { // 30 days
        const days = Math.round(minutes / 1440);
        if (days === 1) return localize(hass, 'starts_in_day', '{x}', days.toString());
        return localize(hass, 'starts_in_days', '{x}', days.toString());
    }
    const weeks = Math.round(minutes / 10080);
    if (weeks === 1) return localize(hass, 'starts_in_week', '{x}', weeks.toString());
    return localize(hass, 'starts_in_weeks', '{x}', weeks.toString());
}
