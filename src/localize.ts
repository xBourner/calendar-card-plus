import { HomeAssistant } from "./ha/types";

const languages: Record<string, Record<string, string>> = {
    en: {
        starts_in_min: "Starts in {x} minute",
        starts_in_mins: "Starts in {x} minutes",
        starts_in_hour: "Starts in {x} hour",
        starts_in_hours: "Starts in {x} hours",
        starts_in_day: "Starts in {x} day",
        starts_in_days: "Starts in {x} days",
        starts_in_week: "Starts in {x} week",
        starts_in_weeks: "Starts in {x} weeks",
        all_day: "All day",
        loading: "Loading events...",
        no_events: "No active events",
        more_events: "+{x} more"
    },
    de: {
        starts_in_min: "Beginnt in {x} Minute",
        starts_in_mins: "Beginnt in {x} Minuten",
        starts_in_hour: "Beginnt in {x} Stunde",
        starts_in_hours: "Beginnt in {x} Stunden",
        starts_in_day: "Beginnt in {x} Tag",
        starts_in_days: "Beginnt in {x} Tagen",
        starts_in_week: "Beginnt in {x} Woche",
        starts_in_weeks: "Beginnt in {x} Wochen",
        all_day: "Ganztägig",
        loading: "Lade Termine...",
        no_events: "Keine aktiven Termine",
        more_events: "+{x} weitere"
    },
    fr: {
        starts_in_min: "Commence dans {x} minute",
        starts_in_mins: "Commence dans {x} minutes",
        starts_in_hour: "Commence dans {x} heure",
        starts_in_hours: "Commence dans {x} heures",
        starts_in_day: "Commence dans {x} jour",
        starts_in_days: "Commence dans {x} jours",
        starts_in_week: "Commence dans {x} semaine",
        starts_in_weeks: "Commence dans {x} semaines",
        all_day: "Toute la journée",
        loading: "Chargement...",
        no_events: "Aucun événement",
        more_events: "+{x} autres"
    },
    it: {
        starts_in_min: "Inizia tra {x} minuto",
        starts_in_mins: "Inizia tra {x} minuti",
        starts_in_hour: "Inizia tra {x} ora",
        starts_in_hours: "Inizia tra {x} ore",
        starts_in_day: "Inizia tra {x} giorno",
        starts_in_days: "Inizia tra {x} giorni",
        starts_in_week: "Inizia tra {x} settimana",
        starts_in_weeks: "Inizia tra {x} settimane",
        all_day: "Tutto il giorno",
        loading: "Caricamento...",
        no_events: "Nessun evento",
        more_events: "+{x} altri"
    },
    es: {
        starts_in_min: "Empieza en {x} minuto",
        starts_in_mins: "Empieza en {x} minutos",
        starts_in_hour: "Empieza en {x} hora",
        starts_in_hours: "Empieza en {x} horas",
        starts_in_day: "Empieza en {x} día",
        starts_in_days: "Empieza en {x} días",
        starts_in_week: "Empieza en {x} semana",
        starts_in_weeks: "Empieza en {x} semanas",
        all_day: "Todo el día",
        loading: "Cargando...",
        no_events: "No hay eventos",
        more_events: "+{x} más"
    },
    nl: {
        starts_in_min: "Begint over {x} minuut",
        starts_in_mins: "Begint over {x} minuten",
        starts_in_hour: "Begint over {x} uur",
        starts_in_hours: "Begint over {x} uur",
        starts_in_day: "Begint over {x} dag",
        starts_in_days: "Begint over {x} dagen",
        starts_in_week: "Begint over {x} week",
        starts_in_weeks: "Begint over {x} weken",
        all_day: "Hele dag",
        loading: "Laden...",
        no_events: "Geen evenementen",
        more_events: "+{x} meer"
    },
    pt: {
        starts_in_min: "Começa em {x} minuto",
        starts_in_mins: "Começa em {x} minutos",
        starts_in_hour: "Começa em {x} hora",
        starts_in_hours: "Começa em {x} horas",
        starts_in_day: "Começa em {x} dia",
        starts_in_days: "Começa em {x} dias",
        starts_in_week: "Começa em {x} semana",
        starts_in_weeks: "Começa em {x} semanas",
        all_day: "Todo o dia",
        loading: "A carregar...",
        no_events: "Sem eventos",
        more_events: "+{x} mais"
    },
    ru: {
        starts_in_min: "Начнется через {x} минуту",
        starts_in_mins: "Начнется через {x} мин.",
        starts_in_hour: "Начнется через {x} час",
        starts_in_hours: "Начнется через {x} ч.",
        starts_in_day: "Начнется через {x} день",
        starts_in_days: "Начнется через {x} дн.",
        starts_in_week: "Начнется через {x} неделю",
        starts_in_weeks: "Начнется через {x} нед.",
        all_day: "Весь день",
        loading: "Загрузка...",
        no_events: "Нет событий",
        more_events: "ещё +{x}"
    },
    pl: {
        starts_in_min: "Rozpoczyna się za {x} minutę",
        starts_in_mins: "Rozpoczyna się za {x} min.",
        starts_in_hour: "Rozpoczyna się za {x} godzinę",
        starts_in_hours: "Rozpoczyna się za {x} godz.",
        starts_in_day: "Rozpoczyna się za {x} dzień",
        starts_in_days: "Rozpoczyna się za {x} dni",
        starts_in_week: "Rozpoczyna się za {x} tydzień",
        starts_in_weeks: "Rozpoczyna się za {x} tyg.",
        all_day: "Cały dzień",
        loading: "Ładowanie...",
        no_events: "Brak wydarzeń",
        more_events: "+{x} więcej"
    },
    sv: {
        starts_in_min: "Börjar om {x} minut",
        starts_in_mins: "Börjar om {x} minuter",
        starts_in_hour: "Börjar om {x} timme",
        starts_in_hours: "Börjar om {x} timmar",
        starts_in_day: "Börjar om {x} dag",
        starts_in_days: "Börjar om {x} dagar",
        starts_in_week: "Börjar om {x} vecka",
        starts_in_weeks: "Börjar om {x} veckor",
        all_day: "Hela dagen",
        loading: "Laddar...",
        no_events: "Inga händelser",
        more_events: "+{x} till"
    },
    da: {
        starts_in_min: "Starter om {x} minut",
        starts_in_mins: "Starter om {x} minutter",
        starts_in_hour: "Starter om {x} time",
        starts_in_hours: "Starter om {x} timer",
        starts_in_day: "Starter om {x} dag",
        starts_in_days: "Starter om {x} dage",
        starts_in_week: "Starter om {x} uge",
        starts_in_weeks: "Starter om {x} uger",
        all_day: "Hele dagen",
        loading: "Indlæser...",
        no_events: "Ingen begivenheder",
        more_events: "+{x} mere"
    },
    no: {
        starts_in_min: "Starter om {x} minutt",
        starts_in_mins: "Starter om {x} minutter",
        starts_in_hour: "Starter om {x} time",
        starts_in_hours: "Starter om {x} timer",
        starts_in_day: "Starter om {x} dag",
        starts_in_days: "Starter om {x} dager",
        starts_in_week: "Starter om {x} uke",
        starts_in_weeks: "Starter om {x} uker",
        all_day: "Hele dagen",
        loading: "Laster...",
        no_events: "Ingen hendelser",
        more_events: "+{x} til"
    },
    fi: {
        starts_in_min: "Alkaa {x} minuutin kuluttua",
        starts_in_mins: "Alkaa {x} minuutin kuluttua",
        starts_in_hour: "Alkaa {x} tunnin kuluttua",
        starts_in_hours: "Alkaa {x} tunnin kuluttua",
        starts_in_day: "Alkaa {x} päivän kuluttua",
        starts_in_days: "Alkaa {x} päivän kuluttua",
        starts_in_week: "Alkaa {x} viikon kuluttua",
        starts_in_weeks: "Alkaa {x} viikon kuluttua",
        all_day: "Koko päivä",
        loading: "Ladataan...",
        no_events: "Ei tapahtumia",
        more_events: "+{x} lisää"
    },
    cs: {
        starts_in_min: "Začíná za {x} minutu",
        starts_in_mins: "Začíná za {x} minut",
        starts_in_hour: "Začíná za {x} hodinu",
        starts_in_hours: "Začíná za {x} hodin",
        starts_in_day: "Začíná za {x} den",
        starts_in_days: "Začíná za {x} dní",
        starts_in_week: "Začíná za {x} týden",
        starts_in_weeks: "Začíná za {x} týdnů",
        all_day: "Celý den",
        loading: "Načítání...",
        no_events: "Žádné události",
        more_events: "+{x} další"
    },
    hu: {
        starts_in_min: "Kezdés {x} perc múlva",
        starts_in_mins: "Kezdés {x} perc múlva",
        starts_in_hour: "Kezdés {x} óra múlva",
        starts_in_hours: "Kezdés {x} óra múlva",
        starts_in_day: "Kezdés {x} nap múlva",
        starts_in_days: "Kezdés {x} nap múlva",
        starts_in_week: "Kezdés {x} hét múlva",
        starts_in_weeks: "Kezdés {x} hét múlva",
        all_day: "Egész nap",
        loading: "Betöltés...",
        no_events: "Nincs esemény",
        more_events: "+{x} további"
    }
};

export function localize(hass: HomeAssistant, key: string, search?: string, replace?: string): string {
    const lang = hass.locale?.language || hass.language || 'en';
    let translated: string;

    if (languages[lang] && languages[lang][key]) {
        translated = languages[lang][key];
    } else if (languages['en'] && languages['en'][key]) {
        translated = languages['en'][key];
    } else {
        return key;
    }

    if (search && replace) {
        translated = translated.replace(search, replace);
    }
    return translated;
}
