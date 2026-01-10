import type { Day, PatientAnswers, TimeOfDay } from "../types";

export const concernOptions = [
  { id: "stress", label: "Stress & Überforderung", tags: ["stress", "burnout"] },
  { id: "schlaf", label: "Schlafprobleme", tags: ["sleep", "regeneration"] },
  { id: "angst", label: "Angst & Panik", tags: ["anxiety", "panic"] },
  { id: "depression", label: "Depressive Verstimmung", tags: ["depression", "mood"] },
  { id: "beziehung", label: "Beziehung & Bindung", tags: ["relationship", "attachment"] },
  { id: "selbstwert", label: "Selbstwert & Selbstkritik", tags: ["selfesteem", "identity"] },
  { id: "trauma", label: "Belastende Erfahrungen", tags: ["trauma", "resilience"] },
  { id: "arbeit", label: "Arbeitskonflikte", tags: ["work", "conflict"] },
  { id: "suchtdruck", label: "Sucht & Kontrollverlust", tags: ["addiction", "impulse"] }
];

export const languageOptions = [
  "Deutsch",
  "Englisch",
  "Türkisch",
  "Bosnisch/Kroatisch/Serbisch",
  "Arabisch",
  "Französisch"
];

export const regionOptions = [
  "Wien",
  "Graz",
  "Linz",
  "Salzburg",
  "Innsbruck",
  "Klagenfurt",
  "Villach",
  "Wels",
  "St. Pölten",
  "Dornbirn",
  "Wiener Neustadt",
  "Steyr",
  "Feldkirch",
  "Bregenz",
  "Leonding",
  "Baden",
  "Krems",
  "Wolfsberg",
  "Leoben",
  "Klosterneuburg",
  "Traun",
  "Amstetten",
  "Kapfenberg",
  "Mödling",
  "Hallein",
  "Kufstein",
  "Traiskirchen",
  "Schwechat",
  "Braunau",
  "Stockerau"
];

// Alias for backwards compatibility
export const districtOptions = regionOptions;

export const settingOptions = [
  { id: "praxis", label: "Präsenz in Praxis" },
  { id: "online", label: "Online-Video" },
  { id: "egal", label: "Beides möglich" }
] as const;

export const styleOptions = ["strukturiert", "empathisch", "direkt", "analytisch"];

export const availabilityDays: Day[] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
export const availabilityTimes: TimeOfDay[] = ["Vormittag", "Nachmittag", "Abend"];

export const priorityOptions = [
  {
    id: "score",
    label: "Beste Passung",
    description: "Wir priorisieren die inhaltliche Passung."
  },
  {
    id: "next",
    label: "Schnellster Termin",
    description: "Frühe Termine stehen oben."
  },
  {
    id: "distance",
    label: "Kurze Distanz",
    description: "Nahe Praxen stehen oben."
  }
] as const;

export const dealbreakerOptions = [
  {
    id: "kasse-only",
    label: "Nur Kasse",
    description: "Keine Privat- oder Selbstzahlungsoption"
  },
  {
    id: "online-only",
    label: "Nur Online",
    description: "Präsenztermine kommen nicht in Frage"
  },
  {
    id: "praxis-only",
    label: "Nur Präsenz",
    description: "Online-Sitzungen kommen nicht in Frage"
  },
  {
    id: "language-only",
    label: "Nur gewünschte Sprache",
    description: "Keine Kompromisse bei der Sprache"
  },
  {
    id: "distance-only",
    label: "Maximale Distanz strikt",
    description: "Nur innerhalb der gewählten Distanz"
  },
  {
    id: "availability-only",
    label: "Nur gewählte Zeiten",
    description: "Keine Abweichung von den Zeitfenstern"
  }
];

export const defaultAnswers: PatientAnswers = {
  displayName: "",
  primaryGoal: "",
  matchPriority: "score",
  concerns: [],
  concernsText: "",
  urgency: 3,
  preferences: {
    setting: "egal",
    language: "Deutsch",
    district: "Wien",
    maxDistanceKm: 25
  },
  therapistStyle: [],
  availability: {
    days: [],
    times: []
  },
  insurance: "egal",
  dealbreakers: [],
  matchingMode: "explore"
};
