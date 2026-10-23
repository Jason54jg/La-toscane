/**
 * Horaires La Toscane (Europe/Paris) — basés sur le menu papier :
 * - Lun–Sam : 11h00–14h30 et soirée
 * - Dimanche : fermé le midi, ouvert le soir
 * - Lun–Ven soir : 18h00–23h00
 * - Sam–Dim soir : 18h00–00h00
 */

export type OpenStatus = {
  isOpen: boolean;
  /** Prochaine ouverture si fermé, ou fin du créneau si ouvert */
  untilLabel: { fr: string; en: string } | null;
};

function parisParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value]),
  );
  const weekdayMap: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 0,
  };
  return {
    day: weekdayMap[parts.weekday ?? "Mon"] ?? 1,
    minutes:
      Number(parts.hour ?? 0) * 60 + Number(parts.minute ?? 0),
  };
}

type Slot = { start: number; end: number };

function slotsForDay(day: number): Slot[] {
  const lunch: Slot = { start: 11 * 60, end: 14 * 60 + 30 };
  const eveningWeek: Slot = { start: 18 * 60, end: 23 * 60 };
  const eveningWeekend: Slot = { start: 18 * 60, end: 24 * 60 }; // jusqu’à minuit

  if (day === 0) {
    // Dimanche : soir uniquement
    return [eveningWeekend];
  }
  if (day === 6) {
    // Samedi : midi + soir week-end
    return [lunch, eveningWeekend];
  }
  // Lun–Ven
  return [lunch, eveningWeek];
}

function formatHour(totalMinutes: number, locale: "fr" | "en") {
  if (totalMinutes === 24 * 60) return locale === "fr" ? "minuit" : "midnight";
  const m = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (locale === "fr") {
    return min === 0 ? `${h}h` : `${h}h${String(min).padStart(2, "0")}`;
  }
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return min === 0
    ? `${h12} ${suffix}`
    : `${h12}:${String(min).padStart(2, "0")} ${suffix}`;
}

/** Groupes de jours partageant les mêmes créneaux (cf. slotsForDay) */
const DAY_GROUPS = [
  { day: 1, label: { fr: "Lun – Ven", en: "Mon – Fri" } },
  { day: 6, label: { fr: "Samedi", en: "Saturday" } },
  { day: 0, label: { fr: "Dimanche", en: "Sunday" } },
];

/** Horaires affichés, dérivés des mêmes créneaux que le badge Ouvert/Fermé */
export function getWeeklyHours(locale: "fr" | "en") {
  return DAY_GROUPS.map(({ day, label }) => ({
    label: label[locale],
    slots: slotsForDay(day).map(
      (s) => `${formatHour(s.start, locale)} – ${formatHour(s.end, locale)}`,
    ),
  }));
}

export function getOpenStatus(now = new Date()): OpenStatus {
  const { day, minutes } = parisParts(now);
  const slots = slotsForDay(day);
  const current = slots.find((s) => minutes >= s.start && minutes < s.end);

  if (current) {
    return {
      isOpen: true,
      untilLabel: {
        fr: `jusqu’à ${formatHour(current.end, "fr")}`,
        en: `until ${formatHour(current.end, "en")}`,
      },
    };
  }

  // Prochain créneau aujourd’hui
  const laterToday = slots.find((s) => minutes < s.start);
  if (laterToday) {
    return {
      isOpen: false,
      untilLabel: {
        fr: `ouvre à ${formatHour(laterToday.start, "fr")}`,
        en: `opens at ${formatHour(laterToday.start, "en")}`,
      },
    };
  }

  // Demain
  const tomorrow = (day + 1) % 7;
  const next = slotsForDay(tomorrow)[0];
  return {
    isOpen: false,
    untilLabel: next
      ? {
          fr: `ouvre demain ${formatHour(next.start, "fr")}`,
          en: `opens tomorrow ${formatHour(next.start, "en")}`,
        }
      : null,
  };
}
