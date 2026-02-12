import { html, TemplateResult } from "lit";
import { CalendarEvent, CalendarCardPlusConfig } from "./types";

export function renderCalendar(events: CalendarEvent[] | undefined, config?: CalendarCardPlusConfig): TemplateResult {
    const displayMode = config?.display_mode || 'compact';

    // Loading state
    if (events === undefined) {
        return html`
        <div class="calendar-container">
            <div class="calendar-item" style="cursor: default;">
                 <div class="calendar-icon" style="background-color: var(--primary-color, #03a9f4);">
                    <ha-icon icon="mdi:calendar-clock"></ha-icon>
                </div>
                <div class="calendar-content">
                    <div class="event-title">Loading events...</div>
                    <div class="event-time">Please wait</div>
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
                    <div class="event-title">No active events</div>
                    <div class="event-time">No upcoming events found</div>
                </div>
            </div>
        </div>
        `;
    }

    if (displayMode === 'compact') {
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
            timeText = _formatDuration(diffMins);
        } else {
            if (isAllDay) {
                timeText = 'Ganztägig';
            } else {
                const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeText = `${formatTime(start)} - ${formatTime(end)}`;
            }
        }

        if (moreCount > 0) {
            timeText += ` (+${moreCount} weitere)`;
        }

        const isActive = start <= now && end >= now;
        const iconDate = isActive ? now : start;
        const dynamicIcon = _renderDynamicIcon(iconDate);

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
            ${events.map(event => {
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
                    timeText = _formatDuration(diffMins);
                } else {
                    // Event is current
                    if (isAllDay) {
                        timeText = 'Ganztägig';
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
                // Only render dynamic icon if date is valid (checked above)
                const dynamicIcon = _renderDynamicIcon(iconDate);

                return html`
                <div class="calendar-item"  
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


function _renderDynamicIcon(date: Date): TemplateResult {
    const month = date.toLocaleDateString([], { month: 'short' }).toUpperCase();
    const day = date.getDate();

    // Apple-style calendar icon SVG
    // Background: White rounded square
    // Header: Red top area for month
    // Body: Large day number
    return html`
        <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
            <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="white"></rect>
            <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="#fa3e3e"></path>
            <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">${month}</text>
            <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="#333" text-anchor="middle">${day}</text>
        </svg>
    `;
}

function _formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `Startet in ${minutes} min`;
    }
    if (minutes < 1440) { // 24 hours
        const hours = Math.round(minutes / 60);
        return `Startet in ${hours} Std`;
    }
    if (minutes < 43200) { // 30 days
        const days = Math.round(minutes / 1440);
        return `Startet in ${days} ${days === 1 ? 'Tag' : 'Tagen'}`;
    }
    const weeks = Math.round(minutes / 10080);
    return `Startet in ${weeks} Wochen`;
}
