import { LitElement, html, TemplateResult, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from './ha/types';
import { fireEvent } from './ha/fire_event';
import { CalendarCardPlusConfig } from './types';
import { localize } from './localize';

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
        const upcoming_events = this._config.upcoming_events ?? false;
        const unfold_events = this._config.unfold_events ?? false;
        const days = this._config.days ?? 1;
        const hours = this._config.hours ?? 0;
        const minutes = this._config.minutes ?? 0;
        const exclude_entities = this._config.exclude_entities ?? [];

        return html`
            <div class="card-config">


                <div class="settings-row">
                    <span class="label">${localize(this.hass, 'editor_unfold_events')}</span>
                    <ha-switch
                        .checked=${unfold_events}
                        @change=${this._compactModeChanged}
                    ></ha-switch>
                </div>

            ${unfold_events ? html`
                <div class="settings-row">
                    <span class="label">${localize(this.hass, 'editor_show_divider')}</span>
                    <ha-switch
                        .checked=${this._config.show_divider ?? false}
                        @change=${this._calendarDividerChanged}
                    ></ha-switch>
                </div>
            ` : ''}

                <div class="settings-row">
                    <span class="label">${this.hass?.localize('ui.common.show')} ${this.hass?.localize('component.calendar.entity_component._.name')} ${this.hass?.localize('ui.common.name')}</span>
                    <ha-switch
                        .checked=${this._config.show_calendar_name ?? false}
                        @change=${(ev: Event) => this._toggleBooleanConfig(ev, 'show_calendar_name')}
                    ></ha-switch>
                </div>

                <div class="settings-row">
                    <span class="label">${this.hass?.localize('ui.common.show')} ${this.hass?.localize('ui.dialogs.helper_settings.input_datetime.date') || 'Date'}</span>
                    <ha-switch
                        .checked=${this._config.show_date ?? false}
                        @change=${(ev: Event) => this._toggleBooleanConfig(ev, 'show_date')}
                    ></ha-switch>
                </div>

                <div class="settings-row">
                    <span class="label">${localize(this.hass, 'editor_show_upcoming')}</span>
                    <ha-switch
                        .checked=${upcoming_events}
                        @change=${this._calendarShowAllChanged}
                    ></ha-switch>
                </div>                

            ${upcoming_events ? html`
                <div class="settings-row full-width">
                     <span class="label" style="margin-bottom: 8px;">${this.hass?.localize('ui.panel.lovelace.editor.card.statistic.period') || 'Period'}</span>
                     <div class="period-selectors">
                        <ha-selector
                            .hass=${this.hass}
                            .selector=${{ number: { min: 0, max: 365, mode: 'box' } }}
                            .value=${days}
                            .label=${this.hass?.localize('component.input_datetime.entity_component._.state_attributes.day.name') || 'Days'}
                            .configValue=${'days'}
                            @value-changed=${this._valueChanged}
                        ></ha-selector>
                        <ha-selector
                            .hass=${this.hass}
                            .selector=${{ number: { min: 0, max: 23, mode: 'box' } }}
                            .value=${hours}
                            .label=${this.hass?.localize('component.input_datetime.entity_component._.state_attributes.hour.name') || 'Hours'}
                            .configValue=${'hours'}
                            @value-changed=${this._valueChanged}
                        ></ha-selector>
                        <ha-selector
                            .hass=${this.hass}
                            .selector=${{ number: { min: 0, max: 59, mode: 'box' } }}
                            .value=${minutes}
                            .label=${this.hass?.localize('component.input_datetime.entity_component._.state_attributes.minute.name') || 'Minutes'}
                            .configValue=${'minutes'}
                            @value-changed=${this._valueChanged}
                        ></ha-selector>
                     </div>
                </div>
            ` : ''}

                <div class="settings-row full-width">
                    <ha-selector
                        .hass=${this.hass}
                        .selector=${{ ui_color: {} }}
                        .value=${this._config.calendar_icon_color || ''}
                        .label="Global ${this.hass.localize('ui.panel.lovelace.editor.card.tile.color') || 'Color'}"
                        .configValue=${'calendar_icon_color'}
                        @value-changed=${this._valueChanged}
                    ></ha-selector>
                </div>

                <h4>${this.hass?.localize('ui.components.calendar.my_calendars') || 'Calendars'}</h4>
                <div class="entities-list">
                    ${this._getCalendarEntities().map(entity => {
                        const isIncluded = !exclude_entities.includes(entity.entity_id);
                        
                        // Raw config color for the picker
                        const configColor = this._config.calendar_colors?.[entity.entity_id] || '';
                        
                        // Resolved color for the icon rendering
                        const renderColor = this._toCssColor(configColor || this._config.calendar_icon_color || '#fa3e3e');
                        
                        return html`
                            <div class="entity-row ${isIncluded ? '' : 'disabled'}">
                                <div class="entity-row-top">
                                    <div class="entity-icon dynamic" style="background: transparent;">
                                        ${this._renderDynamicIcon(new Date(), renderColor)}
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
                                        ${isIncluded ? (this.hass?.localize('ui.common.hide') || 'Hide') : (this.hass?.localize('ui.common.show') || 'Show')}
                                    </ha-button>
                                </div>
                                <div class="entity-row-bottom">
                                     <ha-selector
                                        .hass=${this.hass}
                                        .selector=${{ ui_color: {} }}
                                        .value=${configColor}
                                        .label=${this.hass?.localize('ui.panel.lovelace.editor.card.tile.color') || 'Color'}
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
            upcoming_events: checked
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }



    private _compactModeChanged(ev: Event) {
        const checked = (ev.target as any).checked;
        this._config = {
            ...this._config,
            unfold_events: checked
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }

    private _calendarDividerChanged(ev: Event) {
        const checked = (ev.target as any).checked;
        this._config = {
            ...this._config,
            show_divider: checked
        };
        fireEvent(this, 'config-changed', { config: this._config });
    }

    private _toggleBooleanConfig(ev: Event, key: string) {
        const checked = (ev.target as any).checked;
        this._config = {
            ...this._config,
            [key]: checked
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
            .period-selectors {
                display: flex;
                flex-direction: row;
                gap: 8px;
                width: 100%;
            }
            .period-selectors ha-selector {
                 flex: 1;
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
                width: 36px;
                height: 36px;
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

    private _toCssColor(color: string): string {
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

    private _renderDynamicIcon(date: Date, color: string): TemplateResult {
        const lang = this.hass?.locale?.language || this.hass?.language || navigator.language || 'en';
        const month = date.toLocaleDateString(lang, { month: 'short' }).toUpperCase();
        const day = date.getDate();

        // Apple-style calendar icon SVG
        return html`
            <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
                <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="white"></rect>
                <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="${color}"></path>
                <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">${month}</text>
                <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="#333" text-anchor="middle">${day}</text>
            </svg>
        `;
    }
}