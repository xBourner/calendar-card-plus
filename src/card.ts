import { mdiPlus } from '@mdi/js';
import { fetchCalendarEvents } from './ha/data/calendar';
import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from './ha/types';
import { CalendarCardPlusConfig } from './types';
import { renderCalendar, _resolveColor, _renderDynamicIcon, _formatLocalizedDuration } from './calendar';



import { openAddEventPopup } from './events';
import './popup-dialog';

import { CalendarEvent } from './types';

@customElement('calendar-card-plus')
export class CalendarCardPlus extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() private config!: CalendarCardPlusConfig;
    @state() private _events: CalendarEvent[] | undefined = undefined;

    public connectedCallback() {
        super.connectedCallback();
        this.addEventListener('calendar-card-show-detail', this._handleShowDetail as unknown as EventListener);
    }

    public disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('calendar-card-show-detail', this._handleShowDetail as unknown as EventListener);
    }

    protected willUpdate(changedProps: Map<string, any>) {
        super.willUpdate(changedProps);
        
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
            end = new Date(now);
            end.setHours(23, 59, 59, 999);
        }

        const calendars = Object.keys(this.hass.states)
            .filter(eid => eid.startsWith('calendar.'))
            .filter(eid => !this.config.exclude_entities?.includes(eid));

        if (calendars.length === 0) {
            this._events = [];
            return;
        }

        const allEvents = await fetchCalendarEvents(this.hass, now, end, calendars);

        allEvents.sort((a: CalendarEvent, b: CalendarEvent) => {
            const dateA = new Date(a.start.dateTime || a.start.date!).getTime();
            const dateB = new Date(b.start.dateTime || b.start.date!).getTime();
            return dateA - dateB;
        });

        this._events = allEvents;
        this.requestUpdate();
    }

    private _handleShowDetail = async (e: CustomEvent) => {
        const popup = this.shadowRoot?.querySelector('calendar-card-plus-popup') as any;
        if (popup) {
            await popup.showDialog({
                hass: this.hass,
                config: this.config,
                mode: 'detail',
                title: e.detail.title,
                events: e.detail.entities
            });
        }
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

                <calendar-card-plus-popup
                    @event-saved=${this._onEventSaved}
                ></calendar-card-plus-popup>
            </ha-card>
        `;
    }

    private _openAddEventPopup = async () => {
        const popup = this.shadowRoot?.querySelector('calendar-card-plus-popup') as any;
        if (popup) {
            const addEventState = openAddEventPopup(this.hass, this.config);
            await popup.showDialog({
                hass: this.hass,
                config: this.config,
                mode: 'add-event',
                addEventState
            });
        }
    }

    private _onEventSaved = () => {
        this._events = undefined;
        this.requestUpdate();
        this._fetchEvents();
    };

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
         return {
            type: 'custom:calendar-card-plus',
            exclude_entities: [],
            unfold_events: false
         };
    }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'calendar-card-plus',
    name: 'Dynamic Calendar Card Plus',
    preview: true,
    description: 'A standalone calendar card with dynamic grid styling',
});
