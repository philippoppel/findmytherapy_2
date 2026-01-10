import type { QuickProfile } from "../types";

export const quickProfiles: QuickProfile[] = [
  {
    id: "stress-burnout",
    title: "Stress - Burnout - Schlaf",
    description: "Hohe Belastung im Job, Erschöpfung, unruhiger Schlaf.",
    answers: {
      primaryGoal: "Mehr Schlaf und weniger Dauerstress.",
      matchPriority: "next",
      concerns: ["stress", "schlaf", "arbeit"],
      concernsText: "Seit Monaten durchgehend unter Druck, ich schlafe schlecht und kann kaum abschalten.",
      urgency: 4,
      therapistStyle: ["strukturiert", "empathisch"],
      insurance: "kasse",
      preferences: {
        setting: "egal",
        language: "Deutsch",
        district: "Wien",
        maxDistanceKm: 30
      },
      availability: {
        days: ["Di", "Do"],
        times: ["Nachmittag", "Abend"]
      },
      dealbreakers: ["kasse-only", "availability-only"],
      matchingMode: "explore"
    }
  },
  {
    id: "angst-panik",
    title: "Angst - Panik",
    description: "Wiederkehrende Angst, Vermeidung, körperliche Symptome.",
    answers: {
      primaryGoal: "Sicherer mit Panik und körperlichen Symptomen umgehen.",
      matchPriority: "score",
      concerns: ["angst", "stress"],
      concernsText: "Panikgefühle in U-Bahn und bei Präsentationen, ich brauche klare Strategien.",
      urgency: 5,
      therapistStyle: ["strukturiert", "direkt"],
      insurance: "egal",
      preferences: {
        setting: "online",
        language: "Deutsch",
        district: "Graz",
        maxDistanceKm: 50
      },
      availability: {
        days: ["Mo", "Mi"],
        times: ["Vormittag", "Abend"]
      },
      dealbreakers: ["online-only", "language-only"],
      matchingMode: "strict"
    }
  },
  {
    id: "beziehung-selbstwert",
    title: "Beziehung - Selbstwert",
    description: "Konflikte, Unsicherheit, Wunsch nach mehr Selbstvertrauen.",
    answers: {
      primaryGoal: "Selbstwert stärken und Beziehungsmuster verstehen.",
      matchPriority: "score",
      concerns: ["beziehung", "selbstwert"],
      concernsText: "Immer wieder dieselben Beziehungsmuster, ich möchte mich stabiler fühlen.",
      urgency: 3,
      therapistStyle: ["empathisch", "analytisch"],
      insurance: "privat",
      preferences: {
        setting: "praxis",
        language: "Deutsch",
        district: "Salzburg",
        maxDistanceKm: 20
      },
      availability: {
        days: ["Fr"],
        times: ["Nachmittag"]
      },
      dealbreakers: ["praxis-only", "distance-only"],
      matchingMode: "explore"
    }
  }
];
