import { html, TemplateResult } from 'lit';
import { mdiClose } from '@mdi/js';
import { HomeAssistant } from './ha/types';
import { CalendarCardPlusConfig } from './types';

export interface AddEventPopupState {
    open: boolean;
    calendar_id?: string;
    name?: string;
    start?: string;
    end?: string;
    all_day?: boolean;
    location?: string;
    description?: string;
    recurrence?: string;
}

export function openAddEventPopup(hass: HomeAssistant, config: CalendarCardPlusConfig): AddEventPopupState {
    const calendars = Object.keys(hass.states)
        .filter(eid => eid.startsWith('calendar.'))
        .filter(eid => !config.exclude_entities?.includes(eid));
        
    const defaultCalendar = calendars.length > 0 ? calendars[0] : undefined;

    const now = new Date();
    const start = new Date(now);
    start.setHours(start.getHours() + 1, 0, 0, 0);
    const end = new Date(start);
    end.setHours(end.getHours() + 1, 0, 0, 0);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const formatDt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;

    return {
        open: true,
        calendar_id: defaultCalendar,
        name: '',
        start: formatDt(start),
        end: formatDt(end),
        location: '',
        description: '',
        recurrence: 'none',
        all_day: false
    };
}

export async function saveNewEvent(
    hass: HomeAssistant, 
    popupState: AddEventPopupState, 
    onSuccess: () => void, 
    onError: (err: any) => void
) {
    if (!popupState.calendar_id || !popupState.name || !popupState.start || !popupState.end) {
        return;
    }

    try {
        const svcData: any = {
            entity_id: popupState.calendar_id,
            summary: popupState.name
        };

        if (popupState.all_day) {
            const startStr = popupState.start.split(' ')[0];
            let endStr = popupState.end.split(' ')[0];
            
            if (startStr === endStr) {
                const parts = endStr.split('-');
                const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                d.setDate(d.getDate() + 1);
                const pad = (n: number) => n.toString().padStart(2, '0');
                endStr = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
            }

            svcData.start_date = startStr;
            svcData.end_date = endStr;
        } else {
            svcData.start_date_time = popupState.start;
            svcData.end_date_time = popupState.end;
            if (popupState.location) svcData.location = popupState.location;
            if (popupState.description) svcData.description = popupState.description;
        }

        if (popupState.recurrence && popupState.recurrence !== 'none') {
            const freqMap: Record<string, string> = {
                'DAILY': 'FREQ=DAILY',
                'WEEKLY': 'FREQ=WEEKLY',
                'MONTHLY': 'FREQ=MONTHLY',
                'YEARLY': 'FREQ=YEARLY'
            };
            if (freqMap[popupState.recurrence]) {
                // Correctly place rrule on the top level of the service call
                svcData.rrule = freqMap[popupState.recurrence];
            }
        }

        await hass.callService('calendar', 'create_event', svcData);
        onSuccess();
    } catch (err: any) {
        onError(err);
    }
}

export function renderAddEventDialog(
    hass: HomeAssistant, 
    config: CalendarCardPlusConfig,
    popupState: AddEventPopupState,
    updateState: (newState: Partial<AddEventPopupState>) => void,
    onClose: () => void,
    onSave: () => void
): TemplateResult {
    const calendars = Object.keys(hass.states)
        .filter(eid => eid.startsWith('calendar.'))
        .filter(eid => !config.exclude_entities?.includes(eid));

    const hideClearButtons = (e: any) => {
        // Deep shadow DOM dive to hide the clear button
        const dialog = e.target;
        if (!dialog) return;

        setTimeout(() => {
            const timeSelectors = dialog.querySelectorAll('.time-selector');
            timeSelectors.forEach((selector: any) => {
                try {
                    const selectorTime = selector.shadowRoot?.querySelector('ha-selector-time');
                    const timeInput = selectorTime?.shadowRoot?.querySelector('ha-time-input');
                    const baseTimeInput = timeInput?.shadowRoot?.querySelector('ha-base-time-input');
                    const clearBtn = baseTimeInput?.shadowRoot?.querySelector('ha-icon-button[label="clear"], ha-icon-button[title="clear"]');
                    if (clearBtn) {
                        (clearBtn as HTMLElement).style.display = 'none';
                    }
                } catch (err) {
                    console.warn("Could not hide clear button", err);
                }
            });
        }, 100);
    };

    return html`
        <ha-dialog
            open
            hideActions
            @opened=${hideClearButtons}
            @closed=${onClose}
            class="add-event-dialog"
        >
            <div class="dialog-header">
                <ha-icon-button .path=${mdiClose} @click=${onClose}></ha-icon-button>
                <h2 class="mdc-dialog__title">${hass.localize('ui.components.calendar.event.add') || 'Add Event'}</h2>
            </div>
            <div class="dialog-content add-event-form">
                <ha-textfield
                    label=${hass.localize('ui.components.calendar.event.summary') || 'Title'}
                    .value=${popupState.name || ''}
                    @input=${(e: any) => updateState({ name: e.target.value })}
                    dialogInitialFocus
                ></ha-textfield>

                <ha-textfield
                    label=${hass.localize('ui.components.calendar.event.location') || 'Location'}
                    .value=${popupState.location || ''}
                    @input=${(e: any) => updateState({ location: e.target.value })}
                ></ha-textfield>

                <ha-textfield
                    label=${hass.localize('ui.components.calendar.event.description') || 'Description'}
                    .value=${popupState.description || ''}
                    @input=${(e: any) => updateState({ description: e.target.value })}
                ></ha-textfield>

                <ha-select
                    label=${hass.localize('ui.components.calendar.my_calendars') || 'Calendar'}
                    .value=${popupState.calendar_id || ''}
                    @change=${(e: any) => updateState({ calendar_id: e.target.value })}
                    @closed=${(e: Event) => e.stopPropagation()}
                >
                    ${calendars.map(c => html`
                        <mwc-list-item value=${c}>
                            ${hass.states[c]?.attributes?.friendly_name || c}
                        </mwc-list-item>
                    `)}
                </ha-select>

                <div class="row-flex">
                    <ha-formfield .label=${hass.localize('ui.components.calendar.event.all_day') || 'All Day'}>
                        <ha-switch
                            .checked=${popupState.all_day || false}
                            @change=${(e: any) => updateState({ all_day: e.target.checked })}
                        ></ha-switch>
                    </ha-formfield>
                </div>

                <div class="row-label">${hass.localize('ui.components.calendar.event.start') || 'Start'}:</div>
                <div class="date-row">
                    <ha-selector
                        class="date-selector"
                        .hass=${hass}
                        .selector=${{ date: {} }}
                        .required=${false}
                        .value=${popupState.start?.split(' ')[0] || ''}
                        @value-changed=${(e: any) => { 
                            const timePart = popupState.start?.split(' ')[1] || '00:00:00';
                            updateState({ start: `${e.detail.value} ${timePart}` });
                        }}
                    ></ha-selector>
                    <div class="time-inputs-wrap">
                        <ha-textfield
                            type="number"
                            min="0"
                            max="23"
                            .disabled=${popupState.all_day}
                            .value=${popupState.start?.split(' ')[1]?.substring(0, 2) || '00'}
                            @change=${(e: any) => { 
                                const datePart = popupState.start?.split(' ')[0] || '';
                                const minPart = popupState.start?.split(' ')[1]?.substring(3, 5) || '00';
                                updateState({ start: `${datePart} ${e.target.value.padStart(2, '0')}:${minPart}:00` });
                            }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                        <span>:</span>
                        <ha-textfield
                            type="number"
                            min="0"
                            max="59"
                            .disabled=${popupState.all_day}
                            .value=${popupState.start?.split(' ')[1]?.substring(3, 5) || '00'}
                            @change=${(e: any) => { 
                                const datePart = popupState.start?.split(' ')[0] || '';
                                const hrPart = popupState.start?.split(' ')[1]?.substring(0, 2) || '00';
                                updateState({ start: `${datePart} ${hrPart}:${e.target.value.padStart(2, '0')}:00` });
                            }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                    </div>
                </div>
                
                <div class="row-label">${hass.localize('ui.components.calendar.event.end') || 'End'}:</div>
                <div class="date-row">
                    <ha-selector
                        class="date-selector"
                        .hass=${hass}
                        .selector=${{ date: {} }}
                        .required=${false}
                        .value=${popupState.end?.split(' ')[0] || ''}
                        @value-changed=${(e: any) => { 
                            const timePart = popupState.end?.split(' ')[1] || '00:00:00';
                            updateState({ end: `${e.detail.value} ${timePart}` });
                        }}
                    ></ha-selector>
                    <div class="time-inputs-wrap">
                        <ha-textfield
                            type="number"
                            min="0"
                            max="23"
                            .disabled=${popupState.all_day}
                            .value=${popupState.end?.split(' ')[1]?.substring(0, 2) || '00'}
                            @change=${(e: any) => { 
                                const datePart = popupState.end?.split(' ')[0] || '';
                                const minPart = popupState.end?.split(' ')[1]?.substring(3, 5) || '00';
                                updateState({ end: `${datePart} ${e.target.value.padStart(2, '0')}:${minPart}:00` });
                            }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                        <span>:</span>
                        <ha-textfield
                            type="number"
                            min="0"
                            max="59"
                            .disabled=${popupState.all_day}
                            .value=${popupState.end?.split(' ')[1]?.substring(3, 5) || '00'}
                            @change=${(e: any) => { 
                                const datePart = popupState.end?.split(' ')[0] || '';
                                const hrPart = popupState.end?.split(' ')[1]?.substring(0, 2) || '00';
                                updateState({ end: `${datePart} ${hrPart}:${e.target.value.padStart(2, '0')}:00` });
                            }}
                            style="flex: 1; min-width: 0;"
                        ></ha-textfield>
                    </div>
                </div>

                <ha-select
                    label=${hass.localize('ui.components.calendar.event.repeat.label') || 'Repeat'}
                    .value=${popupState.recurrence || 'none'}
                    @change=${(e: any) => updateState({ recurrence: e.target.value })}
                    @closed=${(e: Event) => e.stopPropagation()}
                >
                    <mwc-list-item value="none">${hass.localize('ui.components.calendar.event.repeat.freq.none') || 'None'}</mwc-list-item>
                    <mwc-list-item value="DAILY">${hass.localize('ui.components.calendar.event.repeat.freq.daily') || 'Daily'}</mwc-list-item>
                    <mwc-list-item value="WEEKLY">${hass.localize('ui.components.calendar.event.repeat.freq.weekly') || 'Weekly'}</mwc-list-item>
                    <mwc-list-item value="MONTHLY">${hass.localize('ui.components.calendar.event.repeat.freq.monthly') || 'Monthly'}</mwc-list-item>
                    <mwc-list-item value="YEARLY">${hass.localize('ui.components.calendar.event.repeat.freq.yearly') || 'Yearly'}</mwc-list-item>
                </ha-select>

                <div class="dialog-actions">
                    <ha-button @click=${onClose}>
                        ${hass.localize('ui.common.cancel') || 'Cancel'}
                    </ha-button>
                    <ha-button elevated @click=${onSave} ?disabled=${!popupState.name || !popupState.calendar_id}>
                        ${hass.localize('ui.common.save') || 'Save'}
                    </ha-button>
                </div>
            </div>
        </ha-dialog>
    `;
}
