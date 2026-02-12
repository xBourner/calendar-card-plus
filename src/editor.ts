import { LitElement, html, TemplateResult, css } from 'lit';
import { mdiCalendar } from '@mdi/js';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from './ha/types';
import { fireEvent } from './ha/fire_event';
import { CalendarCardPlusConfig } from './types';

@customElement('calendar-card-plus-editor')
export class CalendarCardPlusEditor extends LitElement implements LovelaceCardEditor {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: CalendarCardPlusConfig;

    public setConfig(config: CalendarCardPlusConfig): void {
        this._config = config;
    }

    protected render(): TemplateResult {
        if (!this.hass) {
            return html``;
        }

        if (!this._config) {
            this._config = {
                type: 'custom:calendar-card-plus',
                exclude_entities: [],
                max_minutes_until_start: 1440,
                display_mode: 'compact' // Default to compact
            };
        }

        return html`
            <div class="card-config">
                
                <div class="settings-row">
                    <span class="label">Show entries even if not running</span>
                    <ha-switch
                        .checked=${this._config.show_all || false}
                        @change=${this._calendarShowAllChanged}
                    ></ha-switch>
                </div>

                <div class="settings-row">
                    <span class="label">List Mode</span>
                    <ha-switch
                        .checked=${(this._config.display_mode || 'compact') === 'list'}
                        @change=${this._compactModeChanged}
                    ></ha-switch>
                </div>

                <div class="settings-row">
                    <ha-textfield
                        label="Lookahead (minutes)"
                        type="number"
                        .value=${this._config.max_minutes_until_start || 1440}
                        @input=${this._calendarLookAheadChanged}
                    ></ha-textfield>
                </div>

                <h4>Include Calendars</h4>
                <div class="entities-list">
                    ${this._getCalendarEntities().map(entity => {
                        const isIncluded = this._isCalendarIncluded(entity.entity_id);
                        return html`
                            <div class="entity-row ${isIncluded ? '' : 'disabled'}">
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

    private _isCalendarIncluded(entityId: string): boolean {
        // Included means NOT in config.exclude_entities
        if (!this._config) return true;
        const exclude = this._config.exclude_entities || [];
        return !exclude.includes(entityId);
    }

    private _calendarToggleEntity(ev: Event, entityId: string) {
        ev.stopPropagation();
        if (!this._config) return;
        
        const exclude = [...(this._config.exclude_entities || [])];
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
        this.requestUpdate();
    }

    private _calendarShowAllChanged(ev: Event) {
        if (!this._config) return;
        const checked = (ev.target as any).checked;
        this._config = {
            ...this._config,
            show_all: checked
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }

    private _calendarLookAheadChanged(ev: Event) {
        if (!this._config) return;
        const value = parseInt((ev.target as HTMLInputElement).value);
        if (isNaN(value)) return;
        
        this._config = {
            ...this._config,
            max_minutes_until_start: value
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }

    private _compactModeChanged(ev: Event) {
        if (!this._config) return;
        const checked = (ev.target as any).checked;
        this._config = {
            ...this._config,
            display_mode: checked ? 'list' : 'compact'
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
            }
            .entities-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding-bottom: 12px;
            }
            .entity-row {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 8px 12px;
                border: 1px solid var(--divider-color, #eee);
                border-radius: 8px;
                transition: opacity 0.2s;
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
