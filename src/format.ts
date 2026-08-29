import { HomeAssistant } from "./ha/types";

const WEEKDAYS_LONG = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function getLang(hass: HomeAssistant): string {
  return (
    hass.locale?.language || hass.language || navigator.language || "en"
  );
}

export function useAmPm(hass: HomeAssistant): boolean {
  const tf = hass.locale?.time_format;
  if (!tf || tf === "language" || tf === "system") {
    const testLocale =
      tf === "language" ? hass.locale?.language || hass.language : undefined;
    const test = new Date("January 1, 2023 22:00:00").toLocaleString(
      testLocale,
    );
    return test.includes("10");
  }
  return tf === "12";
}

export function firstWeekdayIndex(hass: HomeAssistant): WeekdayIndex {
  const fw = hass.locale?.first_weekday;
  if (!fw || fw === "language") {
    try {
      const lang = hass.locale?.language || hass.language || "en";
      // @ts-ignore
      if ("weekInfo" in Intl.Locale.prototype) {
        // @ts-ignore
        return (new Intl.Locale(lang).weekInfo.firstDay % 7) as WeekdayIndex;
      }
    } catch {
      // fallback below
    }
    return 1; // monday
  }
  const idx = WEEKDAYS_LONG.indexOf(fw as (typeof WEEKDAYS_LONG)[number]);
  return (idx >= 0 ? idx : 1) as WeekdayIndex;
}

export function formatTime(hass: HomeAssistant, date: Date): string {
  const lang = getLang(hass);
  const ampm = useAmPm(hass);
  const tf = hass.locale?.time_format;
  const useSystemLocale = tf === "system";

  return new Intl.DateTimeFormat(useSystemLocale ? undefined : lang, {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: ampm ? "h12" : "h23",
  }).format(date);
}

export function formatDateNumeric(hass: HomeAssistant, date: Date): string {
  const lang = getLang(hass);
  const df = hass.locale?.date_format;
  const useSystemLocale = df === "system";

  const formatter = new Intl.DateTimeFormat(
    useSystemLocale ? undefined : lang,
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    },
  );

  if (!df || df === "language" || df === "system") {
    return formatter.format(date);
  }

  const parts = formatter.formatToParts(date);
  const literal = parts.find((p) => p.type === "literal")?.value ?? "/";
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";

  const lastPart = parts[parts.length - 1];
  const lastLiteral =
    lastPart?.type === "literal" ? lastPart?.value : "";

  const formats: Record<string, string> = {
    DMY: `${day}${literal}${month}${literal}${year}${lastLiteral}`,
    MDY: `${month}${literal}${day}${literal}${year}${lastLiteral}`,
    YMD: `${year}${literal}${month}${literal}${day}${lastLiteral}`,
  };

  return formats[df] ?? formatter.format(date);
}
