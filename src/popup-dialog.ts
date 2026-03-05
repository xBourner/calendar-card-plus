import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from './ha/types';
import { CalendarCardPlusConfig, CalendarEvent } from './types';
import { saveNewEvent, AddEventPopupState as AddEventState } from './events';
import { renderAddEventForm } from './events';

import { _resolveColor, _renderDynamicIcon } from './calendar';

@customElement('calendar-card-plus-popup')
export class CalendarCardPlusPopup extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;
    @property({ attribute: false }) public config!: CalendarCardPlusConfig;
    @property({ type: Boolean }) public open = false;
    @property({ type: String }) public mode: 'detail' | 'add-event' = 'detail';
    
    @property({ type: String }) public detailTitle = '';
    @property({ type: Array }) public detailEvents: CalendarEvent[] = [];
    
    @state() private _addEventState: AddEventState = { open: false };

    public async showDialog(params: {
        hass: HomeAssistant;
        config: CalendarCardPlusConfig;
        mode: 'detail' | 'add-event';
        title?: string;
        events?: CalendarEvent[];
        addEventState?: AddEventState;
    }) {
        console.log('[Calendar Popup] showDialog called', { mode: params.mode });
        this.hass = params.hass;
        this.config = params.config;
        this.mode = params.mode;
        if (params.title) this.detailTitle = params.title;
        if (params.events) this.detailEvents = params.events;
        if (params.addEventState) this._addEventState = params.addEventState;
        
        this.open = true;
        this.requestUpdate();
        await this.updateComplete;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('popstate', this._onPopState);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('popstate', this._onPopState);
    }

    private _onPopState = () => {
        if (this.open) {
            this._close();
        }
    };

    private _close = (ev?: Event) => {
        if (ev) {
            ev.stopPropagation();
        }
        console.log('[Calendar Popup] _close called', { open: this.open, event: ev?.type });
        if (!this.open) return;
        
        this.open = false;
        
        const detail = { dialog: this };
        this.dispatchEvent(new CustomEvent('closed', { bubbles: true, composed: true, detail }));
        this.dispatchEvent(new CustomEvent('dialog-closed', { bubbles: true, composed: true, detail }));
        this.dispatchEvent(new CustomEvent('popup-closed', { bubbles: true, composed: true, detail }));
        
        this.requestUpdate();
        console.log('[Calendar Popup] _close finished');
    };

    private _updateAddEventState(newState: Partial<AddEventState>) {
        this._addEventState = { ...this._addEventState, ...newState };
    }

    private async _handleSave() {
        await saveNewEvent(
            this.hass,
            this._addEventState,
            () => {
                this.dispatchEvent(new CustomEvent('event-saved', { bubbles: true, composed: true }));
                this._close();
            },
            (err) => {
                alert('Error saving event: ' + err.message);
            }
        );
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this.open) return nothing;

        const title = this.mode === 'detail' 
            ? this.detailTitle 
            : (this.hass?.localize('ui.components.calendar.event.add') || 'Add Event');

        return html`
            <ha-adaptive-dialog
                .hass=${this.hass}
                open
                @closed=${this._close}
                @ha-dialog-closed=${this._close}
                @wa-dialog-closed=${this._close}
                @wa-after-hide=${this._close}
                flexcontent
                .headerTitle=${title}
            >
                <div class="dialog-content">
                    ${this.mode === 'detail' 
                        ? this._renderDetailContent() 
                        : renderAddEventForm(
                            this.hass, 
                            this.config, 
                            this._addEventState, 
                            this._updateAddEventState.bind(this),
                            this._close.bind(this),
                            this._handleSave.bind(this)
                          )
                    }
                </div>
            </ha-adaptive-dialog>
        `;
    }

    private _renderDetailContent(): TemplateResult[] {
        return this.detailEvents.map((event, index) => {
            const title = event.summary;
            let timeText = '';
            
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
                const lang = this.hass.locale?.language || this.hass.language || navigator.language;
                const dateStr = start.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' });
                if (isAllDay) {
                    timeText = dateStr;
                } else {
                    const timeStr = start.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
                    timeText = `${dateStr}, ${timeStr}${lang.startsWith('de') ? ' Uhr' : ''}`;
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
            
            if (this.config.show_weekday) {
                const lang = this.hass.locale?.language || this.hass.language || navigator.language;
                const weekday = start.toLocaleDateString(lang, { weekday: 'short' });
                timeText += ` • ${weekday}`;
            }

            if (this.config.show_calendar_name && event.calendar_name) {
                timeText += ` • ${event.calendar_name}`;
            }

            const isActive = start <= now && end >= now;
            const iconDate = isActive ? now : start;
            const iconColor = _resolveColor(event.entity_id, this.config);
            const dynamicIcon = _renderDynamicIcon(this.hass, iconDate, iconColor, this.config.dark_mode ?? false);

            const showDivider = this.config.show_divider && index > 0;

            return html`
                ${showDivider ? html`<div class="calendar-divider"></div>` : ''}
                <div class="calendar-item detail" @click=${() => this._handleMoreInfo(event.entity_id)}>
                    <div class="calendar-icon dynamic">
                        ${dynamicIcon}
                    </div>
                    <div class="calendar-content">
                        <div class="event-title">${title}</div>
                        <div class="event-time">${timeText}</div>
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

    static styles = css`
        :host {
            display: block;
            z-index: 100;
            --ha-bottom-sheet-height: calc(
                100vh - max(var(--safe-area-inset-top), 48px)
            );
            --ha-bottom-sheet-height: calc(
                100dvh - max(var(--safe-area-inset-top), 48px)
            );
            --ha-bottom-sheet-max-height: var(--ha-bottom-sheet-height);
        }

        ha-adaptive-dialog {
            --mdc-dialog-min-width: 500px;
            --mdc-dialog-max-width: 500px;
            --dialog-content-padding: 0;
            --mdc-dialog-heading-ink-color: var(--primary-text-color);
            --mdc-dialog-content-ink-color: var(--primary-text-color);
            --justify-action-buttons: space-between;
        }

        .dialog-content {
            padding: 0 24px 24px 24px;
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
            background-color: var(--ha-card-background, var(--card-background-color, white));
            border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
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
            font-size: 0.9em;
            color: var(--secondary-text-color);
        }

        @media (max-width: 450px), all and (max-height: 500px) {
            ha-adaptive-dialog {
                --mdc-dialog-min-width: 100vw;
                --mdc-dialog-max-width: 100vw;
            }
        }

        .add-event-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .row-flex {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .date-row {
            display: flex;
            gap: 8px;
            align-items: flex-start;
        }
        
        .date-selector {
            flex: 2;
        }
        
        .time-inputs-wrap {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .row-label {
            font-weight: 500;
            margin-bottom: -8px;
        }

        .dialog-actions {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            margin-top: 16px;
        }
    `;
}
