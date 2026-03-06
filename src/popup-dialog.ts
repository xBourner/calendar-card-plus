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
    private _opener: HTMLElement | null = null;

    public async showDialog(params: {
        hass: HomeAssistant;
        config: CalendarCardPlusConfig;
        opener: HTMLElement;
        mode: 'detail' | 'add-event';
        title?: string;
        events?: CalendarEvent[];
        addEventState?: AddEventState;
    }) {
        this.hass = params.hass;
        this.config = params.config;
        this._opener = params.opener;
        this.mode = params.mode;
        if (params.title) this.detailTitle = params.title;
        if (params.events) this.detailEvents = params.events;
        if (params.addEventState) this._addEventState = params.addEventState;
        
        this.open = true;
        window.history.pushState({ calendarCardPlusPopup: true }, "");
        this.requestUpdate();
        await this.updateComplete;
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
        this.dispatchEvent(new CustomEvent('closed', { bubbles: true, composed: true, detail }));
        this.dispatchEvent(new CustomEvent('dialog-closed', { bubbles: true, composed: true, detail }));
        this.dispatchEvent(new CustomEvent('popup-closed', { bubbles: true, composed: true, detail }));
    };

    // Guard: only close if event originates from ha-adaptive-dialog itself, not from child elements
    private _onDialogClosed = (ev?: Event) => {
        if (ev && ev.type !== 'click') {
            const target = ev.target as HTMLElement | null;
            if (target && (target.tagName !== 'HA-ADAPTIVE-DIALOG' && target.tagName !== 'HA-DIALOG')) {
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
                this.dispatchEvent(new CustomEvent('event-saved', { bubbles: true, composed: true }));
                this._closeDialog();
            },
            (err) => {
                alert('Error saving event: ' + err.message);
            }
        );
    }

    protected render(): TemplateResult | typeof nothing {
        const isAddMode = this.mode === 'add-event';
        const title = isAddMode
            ? (this.hass?.localize('ui.components.calendar.event.add') || 'Add Event')
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
                        : this._renderDetailContent()
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
            --ha-bottom-sheet-height: calc(100dvh - max(var(--safe-area-inset-top), 48px));
            --ha-bottom-sheet-max-height: var(--ha-bottom-sheet-height);
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

        .dialog-actions {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            margin-top: 8px;
        }

        .row-label {
            font-weight: 500;
            margin-bottom: -8px;
        }
    `;
}