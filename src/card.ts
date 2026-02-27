import { mdiClose, mdiPlus } from '@mdi/js';
import { fetchCalendarEvents } from './ha/data/calendar';
import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from './ha/types';
import { CalendarCardPlusConfig } from './types';
import { renderCalendar, _resolveColor, _renderDynamicIcon, _formatLocalizedDuration } from './calendar';



interface DetailPopupState {
    open: boolean;
    title: string;
    events: CalendarEvent[];
}

import { AddEventPopupState, openAddEventPopup, saveNewEvent, renderAddEventDialog } from './events';

import { CalendarEvent } from './types';

@customElement('calendar-card-plus')
export class CalendarCardPlus extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() private config!: CalendarCardPlusConfig;
    @state() private _detailPopup: DetailPopupState = { open: false, title: '', events: [] };
    @state() private _addEventPopup: AddEventPopupState = { open: false };
    @state() private _events: CalendarEvent[] | undefined = undefined;

    public connectedCallback() {
        super.connectedCallback();
        this.addEventListener('calendar-card-show-detail', this._handleShowDetail as EventListener);
    }

    public disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('calendar-card-show-detail', this._handleShowDetail as EventListener);
    }

    protected willUpdate(changedProps: Map<string, any>) {
        super.willUpdate(changedProps);
        
        // Fetch if we have both hass and config, and events haven't been loaded yet
        // OR if config changed (need to refetch)
        if (this.hass && this.config) {
            if (this._events === undefined || changedProps.has('config')) {
                this._fetchEvents();
            }
        }
    }

    public setConfig(config: CalendarCardPlusConfig): void {
        if (!config) {
            throw new Error('Invalid configuration');
        }
        this.config = config;
    }

    private async _fetchEvents() {
        if (!this.hass || !this.config) return;

        const now = new Date();
        let end: Date;

        if (this.config.upcoming_events) {
            // Support new split config, or fallback to legacy max_minutes_until_start, or default to 24h
            let minutes = 1440; 
            if (this.config.days !== undefined || this.config.hours !== undefined || this.config.minutes !== undefined) {
                minutes = (this.config.days || 0) * 1440 + 
                          (this.config.hours || 0) * 60 + 
                          (this.config.minutes || 0);
            } else if (this.config.max_minutes_until_start !== undefined) {
                 minutes = this.config.max_minutes_until_start;
            }
            end = new Date(now.getTime() + minutes * 60000);
        } else {
            // End of current day
            end = new Date(now);
            end.setHours(23, 59, 59, 999);
        }

        // Get relevant calendar entities
        const calendars = Object.keys(this.hass.states)
            .filter(eid => eid.startsWith('calendar.'))
            .filter(eid => !this.config.exclude_entities?.includes(eid));

        if (calendars.length === 0) {
            this._events = [];
            return;
        }

        const allEvents = await fetchCalendarEvents(this.hass, now, end, calendars);

        // Sort: Earliest start time first
        allEvents.sort((a: CalendarEvent, b: CalendarEvent) => {
            const dateA = new Date(a.start.dateTime || a.start.date!).getTime();
            const dateB = new Date(b.start.dateTime || b.start.date!).getTime();
            return dateA - dateB;
        });

        this._events = allEvents;
        this.requestUpdate();
    }

    private _handleShowDetail = (e: CustomEvent) => {
        this._detailPopup = {
            open: true,
            title: e.detail.title,
            events: e.detail.entities
        };
        this.requestUpdate();
    }

    private _closeDetailPopup() {
        this._detailPopup = { ...this._detailPopup, open: false };
        this.requestUpdate();
    }

    protected render(): TemplateResult {
        if (!this.config || !this.hass) {
            return html``;
        }

        const content = renderCalendar(this.hass, this._events, this.config);

        return html`
            <ha-card>
                <div class="add-event-btn" @click=${this._openAddEventPopup} style=${this.config.show_add_event ? '' : 'display: none;'}>
                    <ha-icon-button .path=${mdiPlus}></ha-icon-button>
                </div>
                ${content}

                ${this._detailPopup.open ? html`
                    <ha-dialog
                        open
                        hideActions
                        @closed=${this._closeDetailPopup}
                        class="detail-dialog"
                    >
                        <div class="dialog-header">
                            <ha-icon-button .path=${mdiClose} @click=${this._closeDetailPopup}></ha-icon-button>
                            <h2 class="mdc-dialog__title">${this._detailPopup.title}</h2>
                        </div>
                        <div class="dialog-content">
                            ${this._renderGroupedEntities(this._detailPopup.events)}
                        </div>
                    </ha-dialog>
                ` : ''}

                ${this._addEventPopup.open ? this._renderAddEventDialog() : ''}
            </ha-card>
        `;
    }

    private _renderGroupedEntities(events: CalendarEvent[]): TemplateResult[] {
        return events.map((event, index) => {
            const name = event.summary;
            let timeText = '';
            
            // Parse Dates
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

            if (start > now) {
                if (this.config?.show_date) {
                    const lang = this.hass.locale?.language || this.hass.language || navigator.language;
                    const dateStr = start.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' });
                    if (isAllDay) {
                        timeText = dateStr;
                    } else {
                        const timeStr = start.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
                        timeText = `${dateStr}, ${timeStr}${lang.startsWith('de') ? ' Uhr' : ''}`;
                    }
                } else {
                    const diffMs = start.getTime() - now.getTime();
                    const diffMins = Math.ceil(diffMs / 60000);
                    timeText = _formatLocalizedDuration(this.hass, diffMins);
                }
            } else {
                 if (isAllDay) {
                    timeText = this.hass.localize('component.calendar.entity_component._.state_attributes.all_day.name') || 'All day';
                 } else {
                    const lang = this.hass.locale?.language || this.hass.language || navigator.language;
                    const formatTime = (d: Date) => d.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
                    timeText = `${formatTime(start)} - ${formatTime(end)}`;
                 }
            }

            if (this.config?.show_weekday) {
                const lang = this.hass.locale?.language || this.hass.language || navigator.language;
                const weekday = start.toLocaleDateString(lang, { weekday: this.config.show_weekday_long ? 'long' : 'short' });
                timeText += ` • ${weekday}`;
            }

            if (this.config?.show_calendar_name && event.calendar_name) {
                timeText += ` • ${event.calendar_name}`;
            }

            const isActive = start <= now && end >= now;
            const iconDate = isActive ? now : start;
            const iconColor = _resolveColor(event.entity_id, this.config);
            const dynamicIcon = _renderDynamicIcon(this.hass, iconDate, iconColor, this.config?.dark_mode ?? false);

            // Simple event display (not trying to mimic tile card)
            const showDivider = this.config?.show_divider && index > 0 && events[index - 1].entity_id !== event.entity_id;

            return html`
            ${showDivider ? html`<div class="calendar-divider" style="margin: 0;"></div>` : ''}
            <div class="event-item" @click=${() => this._handleMoreInfo(event.entity_id)}>
                <div class="event-icon dynamic" style="background: transparent;">
                     ${dynamicIcon}
                </div>
                <div class="event-info">
                    <div class="event-name">${name}</div>
                    <div class="event-state">${timeText}</div>
                </div>
            </div>
            `;
        });
    }



    private _handleMoreInfo(entityId: string) {
        const event = new CustomEvent('hass-more-info', {
            bubbles: true,
            composed: true,
            detail: { entityId }
        });
        this.dispatchEvent(event);
    }

    private _openAddEventPopup() {
        this._addEventPopup = openAddEventPopup(this.hass, this.config);
        this.requestUpdate();
    }

    private _closeAddEventPopup() {
        this._addEventPopup = { open: false };
        this.requestUpdate();
    }

    private _renderAddEventDialog(): TemplateResult {
        return renderAddEventDialog(
            this.hass,
            this.config,
            this._addEventPopup,
            (newState) => {
                this._addEventPopup = { ...this._addEventPopup, ...newState };
                this.requestUpdate();
            },
            () => this._closeAddEventPopup(),
            () => this._saveNewEvent()
        );
    }

    private async _saveNewEvent() {
        await saveNewEvent(
            this.hass, 
            this._addEventPopup, 
            () => {
                this._closeAddEventPopup();
                this._events = undefined;
                this.requestUpdate();
                this._fetchEvents();
            },
            (err) => {
                console.error('Failed to create event', err);
                alert(`Failed to create event: ${err.message || 'Unknown error'}`);
            }
        );
    }

    static get styles(): CSSResultGroup {
        return css`
            :host {
                display: block;
            }
            ha-card {
                height: 100%;
                box-sizing: border-box;
                padding: 12px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            
            /* Calendar Styles ported from module */
            .calendar-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
                width: 100%;
            }
            .calendar-item {
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
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
            .event-title {
                font-size: 14px;
                font-weight: 500;
                color: var(--primary-text-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .event-time {
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
            .calendar-divider {
                width: 100%;
                border-top: 1px solid var(--divider-color, #e0e0e0);
                margin: 0 0 4px ;
            }

            /* Dialog Styles */
            ha-dialog {
                --mdc-dialog-min-width: 500px;
                --mdc-dialog-max-width: 700px;
                --dialog-content-padding: 16px;
            }

            @media all and (max-width: 450px), all and (max-height: 500px) {
                ha-dialog {
                    --mdc-dialog-min-width: 100vw;
                    --mdc-dialog-max-width: 100vw;
                    --mdc-shape-medium: 0px;
                }
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

            .dialog-header {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 8px;
                position: sticky;
                top: -16px;
                margin: -16px;
                padding: 16px;
                z-index: 10;
                border-bottom: 1px solid rgba(0, 0, 0, 0.07);
                background: var(--mdc-theme-surface, var(--ha-card-background, #fff));
            }
            h2.mdc-dialog__title {
                margin: 0;
                font-size: 1.25rem;
                font-weight: 500;
            }
            .dialog-content {
                display: flex;
                flex-direction: column;
                gap: 16px;
                padding: 16px;
            }

            .add-event-form {
                gap: 16px;
                padding-top: 8px;
            }
            .add-event-form ha-textfield,
            .add-event-form ha-select,
            .add-event-form ha-selector {
                width: 100%;
                display: block;
            }
            .row-label {
                font-size: 14px;
                font-weight: 500;
                color: var(--primary-text-color);
                margin-bottom: -10px;
                margin-top: 8px;
            }
            .date-row {
                display: flex;
                gap: 16px;
                align-items: flex-end;
                width: 100%;
            }
            .date-row ha-selector.date-selector {
                flex: 1 1 50%;
                min-width: 0;
            }
            .date-row .time-inputs-wrap {
                flex: 1 1 50%;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .date-row ha-selector.time-selector {
                flex: 1;
                min-width: 0;
            }
            /* Hide the clear button (X) inside the time selector */
            .time-selector {
                --mdc-icon-button-size: 0px;
            }
            .dialog-actions {
                display: flex;
                justify-content: flex-end;
                gap: 8px;
                margin-top: 8px;
            }

            /* Simple Event Item Styles */
            .event-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background-color: var(--ha-card-background, var(--card-background-color, #fff));
                border: 1px solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            .event-item:hover {
                background-color: rgba(var(--rgb-primary-text-color), 0.05);
            }
            .event-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--secondary-background-color);
                color: var(--primary-text-color);
                flex-shrink: 0;
            }
            .event-info {
                display: flex;
                flex-direction: column;
                flex: 1;
                overflow: hidden;
            }
            .event-name {
                font-weight: 500;
                font-size: 14px;
                color: var(--primary-text-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .event-state {
                font-size: 12px;
                color: var(--secondary-text-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        `;
    }

    public getCardSize(): number {
        return 1;
    }

    public static async getConfigElement() {
        await import('./editor');
        return document.createElement('calendar-card-plus-editor');
    }

    public static getStubConfig(_hass: HomeAssistant): CalendarCardPlusConfig {
         // Try to find a calendar entity
         // Default to all calendars (empty list) and compact mode
         return {
            type: 'custom:calendar-card-plus',
            exclude_entities: [],
            unfold_events: false
         };
    }
}

// Register custom card
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'calendar-card-plus',
    name: 'Dynamic Calendar Card Plus',
    preview: true,
    description: 'A standalone calendar card with dynamic grid styling',
});
