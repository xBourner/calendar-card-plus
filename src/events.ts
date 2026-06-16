import { html, TemplateResult } from 'lit';
import { HomeAssistant } from './ha/types';
import { CalendarCardPlusConfig } from './types';

export interface AddEventPopupState {
    open: boolean;
    calendar_id?: string;
    name?: string;
    start_date?: string;
    start_time?: string;
    end_date?: string;
    end_time?: string;
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
    const fmtDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
    const fmtTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

    return {
        open: true,
        calendar_id: defaultCalendar,
        name: '',
        start_date: fmtDate(start),
        start_time: fmtTime(start),
        end_date: fmtDate(end),
        end_time: fmtTime(end),
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
    if (!popupState.calendar_id || !popupState.name || !popupState.start_date || !popupState.end_date) {
        return;
    }

    try {
        const svcData: any = {
            entity_id: popupState.calendar_id,
            summary: popupState.name
        };

        if (popupState.all_day) {
            let endStr = popupState.end_date;
            if (popupState.start_date === endStr) {
                const parts = endStr.split('-');
                const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                d.setDate(d.getDate() + 1);
                const pad = (n: number) => n.toString().padStart(2, '0');
                endStr = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
            }
            svcData.start_date = popupState.start_date;
            svcData.end_date = endStr;
        } else {
            const startTime = popupState.start_time || '09:00';
            const endTime = popupState.end_time || '10:00';
            svcData.start_date_time = `${popupState.start_date} ${startTime}:00`;
            svcData.end_date_time = `${popupState.end_date} ${endTime}:00`;
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
                svcData.rrule = freqMap[popupState.recurrence];
            }
        }

        await hass.callService('calendar', 'create_event', svcData);
        onSuccess();
    } catch (err: any) {
        onError(err);
    }
}

export function renderAddEventForm(
    hass: HomeAssistant,
    config: CalendarCardPlusConfig,
    popupState: AddEventPopupState,
    updateState: (newState: Partial<AddEventPopupState>) => void,
    onClose: () => void,
    onSave: () => void,
): TemplateResult {
    const calendars = Object.keys(hass.states)
        .filter(eid => eid.startsWith('calendar.'))
        .filter(eid => !config.exclude_entities?.includes(eid));

    const isAllDay = popupState.all_day || false;

    return html`
        <div class="add-event-form">
            <div class="field">
                <label class="field-label">${hass.localize('ui.components.calendar.event.summary') || 'Title'}</label>
                <input
                    type="text"
                    class="field-input"
                    .value=${popupState.name || ''}
                    @input=${(e: Event) => updateState({ name: (e.target as HTMLInputElement).value })}
                />
            </div>

            <div class="field">
                <label class="field-label">${hass.localize('ui.components.calendar.event.location') || 'Location'}</label>
                <input
                    type="text"
                    class="field-input"
                    .value=${popupState.location || ''}
                    @input=${(e: Event) => updateState({ location: (e.target as HTMLInputElement).value })}
                />
            </div>

            <div class="field">
                <label class="field-label">${hass.localize('ui.components.calendar.event.description') || 'Description'}</label>
                <input
                    type="text"
                    class="field-input"
                    .value=${popupState.description || ''}
                    @input=${(e: Event) => updateState({ description: (e.target as HTMLInputElement).value })}
                />
            </div>

            <div class="field">
                <label class="field-label">${hass.localize('ui.components.calendar.my_calendars') || 'Calendar'}</label>
                <select
                    class="field-input"
                    .value=${popupState.calendar_id || ''}
                    @change=${(e: Event) => updateState({ calendar_id: (e.target as HTMLSelectElement).value })}
                >
                    ${calendars.length === 0
                        ? html`<option value="">-- ${hass.localize('ui.common.none') || 'no calendars'} --</option>`
                        : calendars.map(c => html`
                            <option value=${c} ?selected=${c === popupState.calendar_id}>
                                ${hass.states[c]?.attributes?.friendly_name || c}
                            </option>
                        `)}
                </select>
            </div>

            <div class="row-flex">
                <ha-formfield .label=${hass.localize('ui.components.calendar.event.all_day') || 'All Day'}>
                    <ha-switch
                        .checked=${isAllDay}
                        @change=${(e: any) => updateState({ all_day: e.target.checked })}
                    ></ha-switch>
                </ha-formfield>
            </div>

            <div class="field">
                <label class="field-label">${hass.localize('ui.components.calendar.event.start') || 'Start'}</label>
                <div class="date-row">
                    <input
                        type="date"
                        class="field-input"
                        .value=${popupState.start_date || ''}
                        @change=${(e: Event) => updateState({ start_date: (e.target as HTMLInputElement).value })}
                    />
                    ${!isAllDay ? html`
                        <input
                            type="time"
                            class="field-input"
                            .value=${popupState.start_time || '09:00'}
                            @change=${(e: Event) => updateState({ start_time: (e.target as HTMLInputElement).value })}
                        />
                    ` : ''}
                </div>
            </div>

            <div class="field">
                <label class="field-label">${hass.localize('ui.components.calendar.event.end') || 'End'}</label>
                <div class="date-row">
                    <input
                        type="date"
                        class="field-input"
                        .value=${popupState.end_date || ''}
                        @change=${(e: Event) => updateState({ end_date: (e.target as HTMLInputElement).value })}
                    />
                    ${!isAllDay ? html`
                        <input
                            type="time"
                            class="field-input"
                            .value=${popupState.end_time || '10:00'}
                            @change=${(e: Event) => updateState({ end_time: (e.target as HTMLInputElement).value })}
                        />
                    ` : ''}
                </div>
            </div>

            <div class="field">
                <label class="field-label">${hass.localize('ui.components.calendar.event.repeat.label') || 'Repeat'}</label>
                <select
                    class="field-input"
                    .value=${popupState.recurrence || 'none'}
                    @change=${(e: Event) => updateState({ recurrence: (e.target as HTMLSelectElement).value })}
                >
                    <option value="none">${hass.localize('ui.components.calendar.event.repeat.freq.none') || 'None'}</option>
                    <option value="DAILY">${hass.localize('ui.components.calendar.event.repeat.freq.daily') || 'Daily'}</option>
                    <option value="WEEKLY">${hass.localize('ui.components.calendar.event.repeat.freq.weekly') || 'Weekly'}</option>
                    <option value="MONTHLY">${hass.localize('ui.components.calendar.event.repeat.freq.monthly') || 'Monthly'}</option>
                    <option value="YEARLY">${hass.localize('ui.components.calendar.event.repeat.freq.yearly') || 'Yearly'}</option>
                </select>
            </div>

            <div class="dialog-actions">
                <ha-button @click=${onClose}>
                    ${hass.localize('ui.common.cancel') || 'Cancel'}
                </ha-button>
                <ha-button
                    unelevated
                    @click=${onSave}
                    ?disabled=${!popupState.name || !popupState.calendar_id}
                >
                    ${hass.localize('ui.common.save') || 'Save'}
                </ha-button>
            </div>
        </div>
    `;
}
