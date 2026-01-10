export type Day = "Mo" | "Di" | "Mi" | "Do" | "Fr" | "Sa" | "So";
export type TimeOfDay = "Vormittag" | "Nachmittag" | "Abend";

export type AvailabilitySlot = {
  day: Day;
  time: TimeOfDay;
};

export type Therapist = {
  id: string;
  name: string;
  photo: string;
  bezirk: string;
  geo?: { lat: number; lng: number };
  sprache: string[];
  setting: Array<"online" | "praxis">;
  verfahren: string;
  schwerpunkte: string[];
  stilTags: string[];
  zielgruppenTags: string[];
  kasse: boolean;
  preisRange: string;
  availability: AvailabilitySlot[];
  bioKurz: string;
  nextAvailableDays: number;
};

export type PatientPreferences = {
  setting: "online" | "praxis" | "egal";
  language: string;
  district: string;
  maxDistanceKm: number;
};

export type PatientAnswers = {
  displayName: string;
  primaryGoal: string;
  matchPriority: "score" | "next" | "distance";
  concerns: string[];
  concernsText: string;
  urgency: number;
  preferences: PatientPreferences;
  therapistStyle: string[];
  availability: { days: Day[]; times: TimeOfDay[] };
  insurance: "kasse" | "privat" | "egal";
  dealbreakers: string[];
  matchingMode: "strict" | "explore";
};

export type MatchExplanation = {
  score: number;
  breakdown: {
    clinical: number;
    human: number;
    practical: number;
    vibe: number;
  };
  reasons: string[];
  tradeoffs: string[];
  confidence: number;
};

export type MatchResult = {
  therapist: Therapist;
  distanceKm: number;
  availability: { coverage: number; matched: number; requested: number };
  explanation: MatchExplanation;
  excluded: boolean;
  excludeReasons: string[];
};

export type QuickProfile = {
  id: string;
  title: string;
  description: string;
  answers: Partial<PatientAnswers>;
};
