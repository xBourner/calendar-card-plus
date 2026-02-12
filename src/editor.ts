import { LitElement, html, TemplateResult, css } from 'lit';
import { mdiCalendar } from '@mdi/js';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from './ha/types';
import { fireEvent } from './ha/fire_event';
import { CalendarCardPlusConfig } from './types';

@customElement('calendar-card-plus-editor')
export class CalendarCardPlusEditor extends LitElement implements LovelaceCardEditor {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config: CalendarCardPlusConfig = { type: 'custom:calendar-card-plus' };
    public set config(c: CalendarCardPlusConfig) {
        this.setConfig(c);
    }

    public setConfig(config: CalendarCardPlusConfig): void {
        this._config = config;
        this.requestUpdate();
    }

    protected render(): TemplateResult {
        if (!this.hass) {
            return html``;
        }

        // Use defaults for display, but don't mutate strict config unless changed
        const show_all = this._config.show_all ?? false;
        const multiple_events = this._config.multiple_events ?? false;
        const max_minutes = this._config.max_minutes_until_start ?? 1440;
        const exclude_entities = this._config.exclude_entities ?? [];

        return html`
            <div class="card-config">


                <div class="settings-row">
                    <span class="label">Show entries even if not running</span>
                    <ha-switch
                        .checked=${show_all}
                        @change=${this._calendarShowAllChanged}
                    ></ha-switch>
                </div>

                <div class="settings-row">
                    <span class="label">Multiple Events</span>
                    <ha-switch
                        .checked=${multiple_events}
                        @change=${this._compactModeChanged}
                    ></ha-switch>
                </div>

                <div class="settings-row">
                    <ha-textfield
                        label="Lookahead (minutes)"
                        type="number"
                        .value=${max_minutes}
                        @input=${this._calendarLookAheadChanged}
                    ></ha-textfield>
                </div>

                <div class="settings-row">
                    <span class="label">Show Calendar Divider</span>
                    <ha-switch
                        .checked=${this._config.show_calendar_divider ?? false}
                        @change=${this._calendarDividerChanged}
                    ></ha-switch>
                </div>

                <div class="settings-row full-width">
                    <ha-selector
                        .hass=${this.hass}
                        .selector=${{ ui_color: {} }}
                        .value=${this._config.calendar_icon_color || ''}
                        .label=${'Global Icon Color'}
                        .configValue=${'calendar_icon_color'}
                        @value-changed=${this._valueChanged}
                    ></ha-selector>
                </div>

                <h4>Include Calendars</h4>
                <div class="entities-list">
                    ${this._getCalendarEntities().map(entity => {
                        const isIncluded = !exclude_entities.includes(entity.entity_id);
                        const entityColor = this._config.calendar_colors?.[entity.entity_id] || '';
                        
                        return html`
                            <div class="entity-row ${isIncluded ? '' : 'disabled'}">
                                <div class="entity-row-top">
                                    <div class="entity-icon">
                                        <ha-svg-icon .path=${mdiCalendar}></ha-svg-icon>
                                    </div>
                                    <div class="entity-info">
                                        <span class="entity-name">${entity.attributes.friendly_name || entity.entity_id}</span>
                                        <span class="entity-id">${entity.entity_id}</span>
                                    </div>
                                    <ha-button
                                        size="small" 
                                        appearance="filled" 
                                        variant="brand" 
                                        class="${isIncluded ? 'action-hide' : 'action-show'}"
                                        @click=${(e: Event) => this._calendarToggleEntity(e, entity.entity_id)}
                                    >
                                        ${isIncluded ? 'Hide' : 'Show'}
                                    </ha-button>
                                </div>
                                <div class="entity-row-bottom">
                                     <ha-selector
                                        .hass=${this.hass}
                                        .selector=${{ ui_color: {} }}
                                        .value=${entityColor}
                                        .label=${'Color'}
                                        @value-changed=${(e: CustomEvent) => this._calendarColorChanged(e, entity.entity_id)}
                                    ></ha-selector>
                                </div>
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
    }

    private _getCalendarEntities() {
        if (!this.hass) return [];
        return Object.keys(this.hass.states)
            .filter(eid => eid.startsWith('calendar.'))
            .map(eid => this.hass?.states[eid]);
    }

    private _calendarToggleEntity(ev: Event, entityId: string) {
        ev.stopPropagation();
        
        // Ensure array exists
        const exclude = [...(this._config.exclude_entities ?? [])];
        const index = exclude.indexOf(entityId);

        if (index === -1) {
            // Currently visible (not in exclude list) -> Hide: Add to exclude
            exclude.push(entityId);
        } else {
            // Currently hidden (in exclude list) -> Show: Remove from exclude
            exclude.splice(index, 1);
        }

        this._config = {
            ...this._config,
            exclude_entities: exclude
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }

    private _calendarShowAllChanged(ev: Event) {
        const checked = (ev.target as any).checked;
        this._config = {
            ...this._config,
            show_all: checked
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }

    private _calendarLookAheadChanged(ev: Event) {
        const value = parseInt((ev.target as HTMLInputElement).value);
        if (isNaN(value)) return;
        
        this._config = {
            ...this._config,
            max_minutes_until_start: value
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }

    private _compactModeChanged(ev: Event) {
        const checked = (ev.target as any).checked;
        this._config = {
            ...this._config,
            multiple_events: checked
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }

    private _calendarDividerChanged(ev: Event) {
        const checked = (ev.target as any).checked;
        this._config = {
            ...this._config,
            show_calendar_divider: checked
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }

    private _valueChanged(ev: CustomEvent): void {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target as any;
        const value = ev.detail?.value ?? target.value;
        
        if (this._config[target.configValue] === value) {
            return;
        }
        if (target.configValue) {
            this._config = {
                ...this._config,
                [target.configValue]: value,
            };
            fireEvent(this, 'config-changed', { config: this._config });
        }
    }

    private _calendarColorChanged(ev: CustomEvent, entityId: string) {
        const value = ev.detail.value;
        const currentColors = this._config.calendar_colors || {};
        
        this._config = {
            ...this._config,
            calendar_colors: {
                ...currentColors,
                [entityId]: value
            }
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }

    static get styles() {
        return css`
            .card-config {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .ha-select {
                padding: 8px;
                border-radius: 4px;
                border: 1px solid var(--divider-color, #eee);
                background: var(--card-background-color, #fff);
                color: var(--primary-text-color);
                width: 50%;
            }
            .settings-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                width: 100%;
            }
            .settings-row.full-width {
                flex-direction: column;
                align-items: stretch;
            }
            .settings-row.full-width ha-selector {
                width: 100%;
            }
            .entities-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding-bottom: 12px;
            }
            .entity-row {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 12px;
                border: 1px solid var(--divider-color, #eee);
                border-radius: 8px;
                transition: opacity 0.2s;
            }
            .entity-row-top {
                display: flex;
                align-items: center;
                gap: 12px;
                width: 100%;
            }
            .entity-row-bottom {
                width: 100%;
            }
            .entity-row.disabled {
                opacity: 0.6;
            }
            .entity-icon {
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--secondary-text-color);
            }
            .entity-info {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            .entity-name {
                font-weight: 500;
            }
            .entity-id {
                font-size: 0.85em;
                color: var(--secondary-text-color);
            }
            .action-hide {
                --mdc-theme-primary: var(--error-color, #db4437);
            }
            .action-show {
                --mdc-theme-primary: var(--primary-color, #03a9f4);
            }
            h4 {
                margin-bottom: 0px;
                margin-top: 8px;
            }
            ha-textfield {
                width: 100%;
            }
        `;
    }
}