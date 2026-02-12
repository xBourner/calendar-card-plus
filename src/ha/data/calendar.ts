import { HomeAssistant } from "../types";
import { CalendarEvent } from "../../types";

export async function fetchCalendarEvents(
    hass: HomeAssistant,
    start: Date,
    end: Date,
    calendarEntityIds: string[]
): Promise<CalendarEvent[]> {
    const params = encodeURI(`?start=${start.toISOString()}&end=${end.toISOString()}`);
    // results array was unused, removed it.

    const promises = calendarEntityIds.map(async (entityId) => {
        try {
            // Explicitly cast to unknown first to avoid type issues, then check if it's array
            const response = await hass.callApi('GET', `calendars/${entityId}${params}`) as unknown;

            if (!Array.isArray(response)) {
                throw new Error('Response is not an array');
            }

            const events = response.map((ev: any) => {
                // Official HA normalization logic simplified
                const startRaw = ev.start?.dateTime || ev.start?.date || ev.start;
                const endRaw = ev.end?.dateTime || ev.end?.date || ev.end;

                return {
                    ...ev,
                    start: { dateTime: startRaw.includes('T') ? startRaw : undefined, date: startRaw.includes('T') ? undefined : startRaw },
                    end: { dateTime: endRaw.includes('T') ? endRaw : undefined, date: endRaw.includes('T') ? undefined : endRaw },
                    summary: ev.summary || ev.title || 'Unknown Event',
                    entity_id: entityId,
                    calendar_name: hass.states[entityId]?.attributes?.friendly_name || entityId
                } as CalendarEvent;
            });

            return events;

        } catch (err) {
            // FALLBACK: Use state attributes if API fails
            const stateObj = hass.states[entityId];
            if (stateObj && stateObj.attributes.start_time && stateObj.attributes.end_time) {
                return [{
                    start: { dateTime: stateObj.attributes.start_time.replace(' ', 'T') },
                    end: { dateTime: stateObj.attributes.end_time.replace(' ', 'T') },
                    summary: stateObj.attributes.message || stateObj.attributes.friendly_name,
                    location: stateObj.attributes.location,
                    description: stateObj.attributes.description,
                    entity_id: entityId,
                    calendar_name: stateObj.attributes.friendly_name || entityId
                }] as CalendarEvent[];
            }
            
            return [];
        }
    });

    const eventLists = await Promise.all(promises);
    return eventLists.flat();
}
