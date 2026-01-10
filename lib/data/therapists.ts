import type { Therapist } from "../types";

export const therapists: Therapist[] = [
  // === WIEN (15 Therapeuten) ===
  {
    id: "t01-hartmann",
    name: "Dr. Lena Hartmann",
    photo: "/people/person-01.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis", "online"],
    verfahren: "KVT",
    schwerpunkte: ["stress", "burnout", "anxiety", "panic"],
    stilTags: ["strukturiert", "direkt"],
    zielgruppenTags: ["Erwachsene", "Berufstätige"],
    kasse: true,
    preisRange: "Kasse / 80-110 EUR",
    availability: [
      { day: "Mo", time: "Nachmittag" },
      { day: "Mi", time: "Abend" },
      { day: "Fr", time: "Vormittag" }
    ],
    bioKurz: "Klare Strategien für Angst und Stress, kombiniert mit praxisnahen Übungen.",
    nextAvailableDays: 8
  },
  {
    id: "t02-wien-maier",
    name: "Mag. Claudia Maier",
    photo: "/people/person-02.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch"],
    setting: ["praxis"],
    verfahren: "Tiefenpsychologie",
    schwerpunkte: ["depression", "mood", "selfesteem", "relationship"],
    stilTags: ["empathisch", "analytisch"],
    zielgruppenTags: ["Erwachsene"],
    kasse: false,
    preisRange: "100-140 EUR",
    availability: [
      { day: "Di", time: "Vormittag" },
      { day: "Do", time: "Nachmittag" }
    ],
    bioKurz: "Tiefenpsychologische Arbeit an Lebensthemen und inneren Konflikten.",
    nextAvailableDays: 21
  },
  {
    id: "t03-wien-kovacs",
    name: "Dr. Maria Kovacs",
    photo: "/people/person-03.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Ungarisch", "Englisch"],
    setting: ["online"],
    verfahren: "KVT",
    schwerpunkte: ["anxiety", "panic", "sleep"],
    stilTags: ["strukturiert", "empathisch"],
    zielgruppenTags: ["Erwachsene", "Studierende"],
    kasse: true,
    preisRange: "Kasse / 75-100 EUR",
    availability: [
      { day: "Mo", time: "Abend" },
      { day: "Mi", time: "Vormittag" },
      { day: "Fr", time: "Abend" }
    ],
    bioKurz: "Online-Spezialistin für Angststörungen mit flexiblen Abendterminen.",
    nextAvailableDays: 3
  },
  {
    id: "t04-wien-fischer",
    name: "Thomas Fischer",
    photo: "/people/person-04.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis", "online"],
    verfahren: "Systemisch",
    schwerpunkte: ["relationship", "conflict", "work"],
    stilTags: ["direkt", "strukturiert"],
    zielgruppenTags: ["Paare", "Berufstätige"],
    kasse: false,
    preisRange: "110-150 EUR",
    availability: [
      { day: "Di", time: "Abend" },
      { day: "Sa", time: "Vormittag" }
    ],
    bioKurz: "Systemische Paartherapie und Konfliktbearbeitung im beruflichen Kontext.",
    nextAvailableDays: 14
  },
  {
    id: "t05-wien-yilmaz",
    name: "Dr. Elif Yilmaz",
    photo: "/people/person-05.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Türkisch", "Englisch"],
    setting: ["praxis", "online"],
    verfahren: "KVT",
    schwerpunkte: ["trauma", "anxiety", "depression"],
    stilTags: ["empathisch", "strukturiert"],
    zielgruppenTags: ["Erwachsene", "Jugendliche"],
    kasse: true,
    preisRange: "Kasse / 80-110 EUR",
    availability: [
      { day: "Mo", time: "Vormittag" },
      { day: "Mi", time: "Nachmittag" },
      { day: "Fr", time: "Vormittag" }
    ],
    bioKurz: "Traumasensible KVT, mehrsprachig, mit Fokus auf kulturelle Sensibilität.",
    nextAvailableDays: 6
  },
  {
    id: "t06-wien-schmidt",
    name: "Mag. Julia Schmidt",
    photo: "/people/person-06.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch"],
    setting: ["praxis"],
    verfahren: "Gestalt",
    schwerpunkte: ["selfesteem", "identity", "relationship"],
    stilTags: ["empathisch", "direkt"],
    zielgruppenTags: ["Erwachsene", "LGBTQIA+"],
    kasse: false,
    preisRange: "90-130 EUR",
    availability: [
      { day: "Di", time: "Nachmittag" },
      { day: "Do", time: "Abend" }
    ],
    bioKurz: "Gestalttherapie mit Fokus auf Selbstentfaltung und Identitätsfragen.",
    nextAvailableDays: 18
  },
  {
    id: "t07-wien-huber",
    name: "Dr. Martin Huber",
    photo: "/people/person-07.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis"],
    verfahren: "Tiefenpsychologie",
    schwerpunkte: ["depression", "trauma", "attachment"],
    stilTags: ["analytisch", "empathisch"],
    zielgruppenTags: ["Erwachsene"],
    kasse: true,
    preisRange: "Kasse / 90-120 EUR",
    availability: [
      { day: "Mo", time: "Nachmittag" },
      { day: "Mi", time: "Vormittag" }
    ],
    bioKurz: "Tiefenpsychologische Langzeittherapie bei komplexen Lebensthemen.",
    nextAvailableDays: 35
  },
  {
    id: "t08-wien-wagner",
    name: "Lisa Wagner",
    photo: "/people/person-08.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Englisch"],
    setting: ["online"],
    verfahren: "ACT",
    schwerpunkte: ["stress", "burnout", "work"],
    stilTags: ["strukturiert", "direkt"],
    zielgruppenTags: ["Berufstätige", "Führungskräfte"],
    kasse: false,
    preisRange: "95-130 EUR",
    availability: [
      { day: "Mo", time: "Abend" },
      { day: "Di", time: "Abend" },
      { day: "Do", time: "Abend" }
    ],
    bioKurz: "Online-Coaching für Führungskräfte mit Burnout-Prävention.",
    nextAvailableDays: 5
  },
  {
    id: "t09-wien-novak",
    name: "Mag. Peter Novak",
    photo: "/people/person-09.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Tschechisch"],
    setting: ["praxis", "online"],
    verfahren: "Systemisch",
    schwerpunkte: ["relationship", "attachment", "conflict"],
    stilTags: ["empathisch", "strukturiert"],
    zielgruppenTags: ["Paare", "Familien"],
    kasse: true,
    preisRange: "Kasse / 85-115 EUR",
    availability: [
      { day: "Mi", time: "Nachmittag" },
      { day: "Fr", time: "Vormittag" }
    ],
    bioKurz: "Systemische Paar- und Familientherapie mit lösungsorientiertem Ansatz.",
    nextAvailableDays: 12
  },
  {
    id: "t10-wien-bauer",
    name: "Dr. Katharina Bauer",
    photo: "/people/person-10.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch"],
    setting: ["praxis"],
    verfahren: "KVT",
    schwerpunkte: ["anxiety", "panic", "sleep", "stress"],
    stilTags: ["strukturiert", "empathisch"],
    zielgruppenTags: ["Erwachsene"],
    kasse: false,
    preisRange: "100-140 EUR",
    availability: [
      { day: "Di", time: "Vormittag" },
      { day: "Do", time: "Vormittag" }
    ],
    bioKurz: "Spezialisiert auf Angststörungen und Schlafprobleme mit KVT.",
    nextAvailableDays: 28
  },
  {
    id: "t11-wien-gruber",
    name: "Mag. Stefan Gruber",
    photo: "/people/person-11.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Englisch"],
    setting: ["online"],
    verfahren: "ACT",
    schwerpunkte: ["stress", "work", "identity"],
    stilTags: ["direkt", "strukturiert"],
    zielgruppenTags: ["Studierende", "Berufstätige"],
    kasse: true,
    preisRange: "Kasse / 70-95 EUR",
    availability: [
      { day: "Mo", time: "Abend" },
      { day: "Mi", time: "Abend" },
      { day: "Sa", time: "Vormittag" }
    ],
    bioKurz: "Flexible Online-Therapie für junge Erwachsene mit Leistungsdruck.",
    nextAvailableDays: 4
  },
  {
    id: "t12-wien-hofer",
    name: "Dr. Andrea Hofer",
    photo: "/people/person-12.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Italienisch"],
    setting: ["praxis", "online"],
    verfahren: "Integrativ",
    schwerpunkte: ["trauma", "resilience", "depression"],
    stilTags: ["empathisch", "analytisch"],
    zielgruppenTags: ["Erwachsene"],
    kasse: false,
    preisRange: "110-150 EUR",
    availability: [
      { day: "Di", time: "Nachmittag" },
      { day: "Do", time: "Nachmittag" }
    ],
    bioKurz: "Traumatherapie mit integrativem Ansatz und Körperarbeit.",
    nextAvailableDays: 22
  },
  {
    id: "t13-wien-pichler",
    name: "Mag. Eva Pichler",
    photo: "/people/person-13.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch"],
    setting: ["praxis"],
    verfahren: "Systemisch",
    schwerpunkte: ["relationship", "selfesteem", "identity"],
    stilTags: ["empathisch", "direkt"],
    zielgruppenTags: ["Erwachsene", "LGBTQIA+"],
    kasse: true,
    preisRange: "Kasse / 80-110 EUR",
    availability: [
      { day: "Mo", time: "Nachmittag" },
      { day: "Fr", time: "Nachmittag" }
    ],
    bioKurz: "Systemische Therapie mit queerfreundlichem Schwerpunkt.",
    nextAvailableDays: 9
  },
  {
    id: "t14-wien-moser",
    name: "Dr. Christian Moser",
    photo: "/people/person-14.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis"],
    verfahren: "Tiefenpsychologie",
    schwerpunkte: ["addiction", "impulse", "depression"],
    stilTags: ["analytisch", "direkt"],
    zielgruppenTags: ["Erwachsene"],
    kasse: false,
    preisRange: "120-160 EUR",
    availability: [
      { day: "Mi", time: "Vormittag" },
      { day: "Fr", time: "Vormittag" }
    ],
    bioKurz: "Tiefenpsychologische Arbeit bei Sucht und Impulskontrollstörungen.",
    nextAvailableDays: 42
  },
  {
    id: "t15-wien-weber",
    name: "Mag. Sarah Weber",
    photo: "/people/person-15.jpg",
    bezirk: "Wien",
    sprache: ["Deutsch", "Englisch", "Französisch"],
    setting: ["online", "praxis"],
    verfahren: "KVT",
    schwerpunkte: ["anxiety", "stress", "work"],
    stilTags: ["strukturiert", "empathisch"],
    zielgruppenTags: ["Berufstätige", "Expats"],
    kasse: true,
    preisRange: "Kasse / 85-115 EUR",
    availability: [
      { day: "Di", time: "Abend" },
      { day: "Do", time: "Abend" },
      { day: "Sa", time: "Vormittag" }
    ],
    bioKurz: "Internationale Klientel, flexible Termine, KVT-fokussiert.",
    nextAvailableDays: 7
  },

  // === GRAZ (6 Therapeuten) ===
  {
    id: "t16-graz-berger",
    name: "Mag. Jonas Berger",
    photo: "/people/person-16.jpg",
    bezirk: "Graz",
    sprache: ["Deutsch"],
    setting: ["praxis"],
    verfahren: "Tiefenpsychologie",
    schwerpunkte: ["selfesteem", "relationship", "identity"],
    stilTags: ["empathisch", "analytisch"],
    zielgruppenTags: ["Erwachsene", "Paare"],
    kasse: false,
    preisRange: "90-140 EUR",
    availability: [
      { day: "Di", time: "Vormittag" },
      { day: "Do", time: "Nachmittag" }
    ],
    bioKurz: "Arbeitet an Bindungsmustern und Selbstwert mit behutsamer Tiefe.",
    nextAvailableDays: 14
  },
  {
    id: "t17-graz-steiner",
    name: "Dr. Michael Steiner",
    photo: "/people/person-17.jpg",
    bezirk: "Graz",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis", "online"],
    verfahren: "KVT",
    schwerpunkte: ["depression", "anxiety", "stress"],
    stilTags: ["strukturiert", "direkt"],
    zielgruppenTags: ["Erwachsene", "Studierende"],
    kasse: true,
    preisRange: "Kasse / 75-100 EUR",
    availability: [
      { day: "Mo", time: "Nachmittag" },
      { day: "Mi", time: "Vormittag" },
      { day: "Fr", time: "Nachmittag" }
    ],
    bioKurz: "Evidenzbasierte KVT mit Fokus auf Depression und Angst.",
    nextAvailableDays: 8
  },
  {
    id: "t18-graz-fuchs",
    name: "Mag. Anna Fuchs",
    photo: "/people/person-18.jpg",
    bezirk: "Graz",
    sprache: ["Deutsch", "Slowenisch"],
    setting: ["online"],
    verfahren: "ACT",
    schwerpunkte: ["stress", "work", "burnout"],
    stilTags: ["empathisch", "strukturiert"],
    zielgruppenTags: ["Berufstätige"],
    kasse: false,
    preisRange: "80-110 EUR",
    availability: [
      { day: "Di", time: "Abend" },
      { day: "Do", time: "Abend" }
    ],
    bioKurz: "ACT-basierte Online-Therapie für Berufstätige mit Stressbelastung.",
    nextAvailableDays: 6
  },
  {
    id: "t19-graz-auer",
    name: "Dr. Elisabeth Auer",
    photo: "/people/person-19.jpg",
    bezirk: "Graz",
    sprache: ["Deutsch"],
    setting: ["praxis"],
    verfahren: "Gestalt",
    schwerpunkte: ["trauma", "resilience", "selfesteem"],
    stilTags: ["empathisch", "direkt"],
    zielgruppenTags: ["Erwachsene"],
    kasse: true,
    preisRange: "Kasse / 85-115 EUR",
    availability: [
      { day: "Mo", time: "Vormittag" },
      { day: "Mi", time: "Nachmittag" }
    ],
    bioKurz: "Traumasensible Gestalttherapie mit Fokus auf Ressourcenaktivierung.",
    nextAvailableDays: 16
  },
  {
    id: "t20-graz-wolf",
    name: "Mag. Daniel Wolf",
    photo: "/people/person-20.jpg",
    bezirk: "Graz",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis", "online"],
    verfahren: "Systemisch",
    schwerpunkte: ["relationship", "conflict", "attachment"],
    stilTags: ["strukturiert", "empathisch"],
    zielgruppenTags: ["Paare", "Familien"],
    kasse: false,
    preisRange: "100-140 EUR",
    availability: [
      { day: "Di", time: "Nachmittag" },
      { day: "Sa", time: "Vormittag" }
    ],
    bioKurz: "Systemische Paar- und Familientherapie mit Schwerpunkt Kommunikation.",
    nextAvailableDays: 11
  },
  {
    id: "t21-graz-winter",
    name: "Dr. Sophie Winter",
    photo: "/people/person-01.jpg",
    bezirk: "Graz",
    sprache: ["Deutsch"],
    setting: ["online"],
    verfahren: "KVT",
    schwerpunkte: ["anxiety", "panic", "sleep"],
    stilTags: ["strukturiert", "empathisch"],
    zielgruppenTags: ["Erwachsene", "Jugendliche"],
    kasse: true,
    preisRange: "Kasse / 70-95 EUR",
    availability: [
      { day: "Mo", time: "Abend" },
      { day: "Mi", time: "Abend" },
      { day: "Fr", time: "Vormittag" }
    ],
    bioKurz: "Online-Spezialistin für Angst und Schlaf mit flexiblen Terminen.",
    nextAvailableDays: 4
  },

  // === LINZ (5 Therapeuten) ===
  {
    id: "t22-linz-leitner",
    name: "Sarah Leitner",
    photo: "/people/person-02.jpg",
    bezirk: "Linz",
    sprache: ["Deutsch", "Englisch"],
    setting: ["online"],
    verfahren: "ACT",
    schwerpunkte: ["anxiety", "panic", "work", "stress"],
    stilTags: ["direkt", "strukturiert"],
    zielgruppenTags: ["Studierende", "Erwachsene"],
    kasse: true,
    preisRange: "Kasse / 75-95 EUR",
    availability: [
      { day: "Mo", time: "Abend" },
      { day: "Mi", time: "Vormittag" }
    ],
    bioKurz: "Online-fokussierte ACT mit konkreten Tools für Angst und Leistungsdruck.",
    nextAvailableDays: 5
  },
  {
    id: "t23-linz-eder",
    name: "Dr. Markus Eder",
    photo: "/people/person-03.jpg",
    bezirk: "Linz",
    sprache: ["Deutsch"],
    setting: ["praxis"],
    verfahren: "Tiefenpsychologie",
    schwerpunkte: ["depression", "trauma", "identity"],
    stilTags: ["analytisch", "empathisch"],
    zielgruppenTags: ["Erwachsene"],
    kasse: false,
    preisRange: "95-135 EUR",
    availability: [
      { day: "Di", time: "Nachmittag" },
      { day: "Do", time: "Vormittag" }
    ],
    bioKurz: "Tiefenpsychologische Langzeittherapie bei Depression und Trauma.",
    nextAvailableDays: 25
  },
  {
    id: "t24-linz-reiter",
    name: "Mag. Hannah Reiter",
    photo: "/people/person-04.jpg",
    bezirk: "Linz",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis", "online"],
    verfahren: "KVT",
    schwerpunkte: ["stress", "burnout", "sleep"],
    stilTags: ["strukturiert", "empathisch"],
    zielgruppenTags: ["Berufstätige"],
    kasse: true,
    preisRange: "Kasse / 80-105 EUR",
    availability: [
      { day: "Mo", time: "Nachmittag" },
      { day: "Mi", time: "Abend" },
      { day: "Fr", time: "Vormittag" }
    ],
    bioKurz: "KVT-basierte Stressbewältigung und Schlaftherapie.",
    nextAvailableDays: 9
  },
  {
    id: "t25-linz-lang",
    name: "Mag. David Lang",
    photo: "/people/person-05.jpg",
    bezirk: "Linz",
    sprache: ["Deutsch"],
    setting: ["online"],
    verfahren: "Systemisch",
    schwerpunkte: ["relationship", "conflict", "work"],
    stilTags: ["direkt", "strukturiert"],
    zielgruppenTags: ["Paare", "Teams"],
    kasse: false,
    preisRange: "90-130 EUR",
    availability: [
      { day: "Di", time: "Abend" },
      { day: "Do", time: "Abend" }
    ],
    bioKurz: "Systemische Online-Beratung bei Beziehungs- und Teamkonflikten.",
    nextAvailableDays: 7
  },
  {
    id: "t26-linz-brandner",
    name: "Dr. Maria Brandner",
    photo: "/people/person-06.jpg",
    bezirk: "Linz",
    sprache: ["Deutsch", "Bosnisch/Kroatisch/Serbisch"],
    setting: ["praxis"],
    verfahren: "Integrativ",
    schwerpunkte: ["trauma", "anxiety", "depression"],
    stilTags: ["empathisch", "analytisch"],
    zielgruppenTags: ["Erwachsene", "Jugendliche"],
    kasse: true,
    preisRange: "Kasse / 85-110 EUR",
    availability: [
      { day: "Mo", time: "Vormittag" },
      { day: "Mi", time: "Nachmittag" }
    ],
    bioKurz: "Mehrsprachige integrative Therapie mit Traumaschwerpunkt.",
    nextAvailableDays: 12
  },

  // === SALZBURG (5 Therapeuten) ===
  {
    id: "t27-salzburg-feld",
    name: "Dr. Markus Feld",
    photo: "/people/person-07.jpg",
    bezirk: "Salzburg",
    sprache: ["Deutsch", "Französisch"],
    setting: ["praxis"],
    verfahren: "Systemisch",
    schwerpunkte: ["relationship", "work", "conflict"],
    stilTags: ["direkt", "empathisch"],
    zielgruppenTags: ["Paare", "Teams"],
    kasse: false,
    preisRange: "110-160 EUR",
    availability: [
      { day: "Di", time: "Abend" },
      { day: "Sa", time: "Vormittag" }
    ],
    bioKurz: "Systemische Perspektive auf Beziehung, Familie und Teamkonflikte.",
    nextAvailableDays: 20
  },
  {
    id: "t28-salzburg-koenig",
    name: "Mag. Laura König",
    photo: "/people/person-08.jpg",
    bezirk: "Salzburg",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis", "online"],
    verfahren: "KVT",
    schwerpunkte: ["anxiety", "panic", "stress"],
    stilTags: ["strukturiert", "empathisch"],
    zielgruppenTags: ["Erwachsene", "Studierende"],
    kasse: true,
    preisRange: "Kasse / 75-100 EUR",
    availability: [
      { day: "Mo", time: "Nachmittag" },
      { day: "Mi", time: "Vormittag" },
      { day: "Fr", time: "Nachmittag" }
    ],
    bioKurz: "KVT-Spezialistin für Angststörungen mit Uni-Erfahrung.",
    nextAvailableDays: 6
  },
  {
    id: "t29-salzburg-richter",
    name: "Dr. Felix Richter",
    photo: "/people/person-09.jpg",
    bezirk: "Salzburg",
    sprache: ["Deutsch"],
    setting: ["praxis"],
    verfahren: "Gestalt",
    schwerpunkte: ["selfesteem", "identity", "relationship"],
    stilTags: ["empathisch", "direkt"],
    zielgruppenTags: ["Erwachsene"],
    kasse: false,
    preisRange: "95-135 EUR",
    availability: [
      { day: "Di", time: "Nachmittag" },
      { day: "Do", time: "Abend" }
    ],
    bioKurz: "Gestalttherapie mit Fokus auf Selbsterfahrung und Körperarbeit.",
    nextAvailableDays: 18
  },
  {
    id: "t30-salzburg-schmid",
    name: "Mag. Petra Schmid",
    photo: "/people/person-10.jpg",
    bezirk: "Salzburg",
    sprache: ["Deutsch", "Englisch"],
    setting: ["online"],
    verfahren: "ACT",
    schwerpunkte: ["stress", "burnout", "work"],
    stilTags: ["strukturiert", "direkt"],
    zielgruppenTags: ["Berufstätige", "Führungskräfte"],
    kasse: false,
    preisRange: "100-140 EUR",
    availability: [
      { day: "Mo", time: "Abend" },
      { day: "Mi", time: "Abend" }
    ],
    bioKurz: "ACT-Coaching für Berufstätige mit hoher Stressbelastung.",
    nextAvailableDays: 5
  },
  {
    id: "t31-salzburg-wimmer",
    name: "Dr. Georg Wimmer",
    photo: "/people/person-11.jpg",
    bezirk: "Salzburg",
    sprache: ["Deutsch"],
    setting: ["praxis", "online"],
    verfahren: "Tiefenpsychologie",
    schwerpunkte: ["depression", "trauma", "attachment"],
    stilTags: ["analytisch", "empathisch"],
    zielgruppenTags: ["Erwachsene"],
    kasse: true,
    preisRange: "Kasse / 90-120 EUR",
    availability: [
      { day: "Di", time: "Vormittag" },
      { day: "Do", time: "Nachmittag" }
    ],
    bioKurz: "Tiefenpsychologische Therapie bei Depression und Bindungsthemen.",
    nextAvailableDays: 28
  },

  // === INNSBRUCK (4 Therapeuten) ===
  {
    id: "t32-innsbruck-klein",
    name: "Miriam Klein",
    photo: "/people/person-12.jpg",
    bezirk: "Innsbruck",
    sprache: ["Deutsch", "Bosnisch/Kroatisch/Serbisch"],
    setting: ["praxis", "online"],
    verfahren: "KVT",
    schwerpunkte: ["depression", "mood", "selfesteem"],
    stilTags: ["empathisch", "strukturiert"],
    zielgruppenTags: ["Erwachsene", "Jugendliche"],
    kasse: true,
    preisRange: "Kasse / 70-100 EUR",
    availability: [
      { day: "Mi", time: "Nachmittag" },
      { day: "Fr", time: "Abend" }
    ],
    bioKurz: "Stabilisierung bei depressiver Verstimmung und Arbeit am Selbstwert.",
    nextAvailableDays: 9
  },
  {
    id: "t33-innsbruck-hauser",
    name: "Dr. Andreas Hauser",
    photo: "/people/person-13.jpg",
    bezirk: "Innsbruck",
    sprache: ["Deutsch", "Englisch", "Italienisch"],
    setting: ["praxis"],
    verfahren: "Systemisch",
    schwerpunkte: ["relationship", "conflict", "work"],
    stilTags: ["direkt", "strukturiert"],
    zielgruppenTags: ["Paare", "Familien"],
    kasse: false,
    preisRange: "105-145 EUR",
    availability: [
      { day: "Di", time: "Abend" },
      { day: "Sa", time: "Vormittag" }
    ],
    bioKurz: "Mehrsprachige systemische Paar- und Familientherapie.",
    nextAvailableDays: 15
  },
  {
    id: "t34-innsbruck-egger",
    name: "Mag. Christina Egger",
    photo: "/people/person-14.jpg",
    bezirk: "Innsbruck",
    sprache: ["Deutsch"],
    setting: ["online"],
    verfahren: "ACT",
    schwerpunkte: ["anxiety", "stress", "identity"],
    stilTags: ["empathisch", "strukturiert"],
    zielgruppenTags: ["Studierende", "Erwachsene"],
    kasse: true,
    preisRange: "Kasse / 70-95 EUR",
    availability: [
      { day: "Mo", time: "Abend" },
      { day: "Mi", time: "Abend" },
      { day: "Fr", time: "Vormittag" }
    ],
    bioKurz: "ACT-basierte Online-Therapie für junge Erwachsene.",
    nextAvailableDays: 4
  },
  {
    id: "t35-innsbruck-ortner",
    name: "Dr. Thomas Ortner",
    photo: "/people/person-15.jpg",
    bezirk: "Innsbruck",
    sprache: ["Deutsch"],
    setting: ["praxis"],
    verfahren: "Integrativ",
    schwerpunkte: ["trauma", "resilience", "depression"],
    stilTags: ["empathisch", "analytisch"],
    zielgruppenTags: ["Erwachsene"],
    kasse: false,
    preisRange: "100-140 EUR",
    availability: [
      { day: "Di", time: "Nachmittag" },
      { day: "Do", time: "Vormittag" }
    ],
    bioKurz: "Integrative Traumatherapie mit Körper- und Ressourcenarbeit.",
    nextAvailableDays: 22
  },

  // === KLEINERE STAEDTE (10 Therapeuten) ===
  {
    id: "t36-klagenfurt-graf",
    name: "Thomas Graf",
    photo: "/people/person-16.jpg",
    bezirk: "Klagenfurt",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis"],
    verfahren: "Gestalt",
    schwerpunkte: ["identity", "relationship", "selfesteem"],
    stilTags: ["empathisch", "direkt"],
    zielgruppenTags: ["Erwachsene", "LGBTQIA+"],
    kasse: false,
    preisRange: "85-130 EUR",
    availability: [
      { day: "Mo", time: "Vormittag" },
      { day: "Do", time: "Abend" }
    ],
    bioKurz: "Lebendige Gestaltarbeit, stärkt Selbstkontakt und Beziehungsklarheit.",
    nextAvailableDays: 12
  },
  {
    id: "t37-stpoelten-neumann",
    name: "Dr. Eva Neumann",
    photo: "/people/person-17.jpg",
    bezirk: "St. Pölten",
    sprache: ["Deutsch"],
    setting: ["praxis", "online"],
    verfahren: "Integrativ",
    schwerpunkte: ["trauma", "resilience", "sleep"],
    stilTags: ["empathisch", "analytisch"],
    zielgruppenTags: ["Erwachsene"],
    kasse: true,
    preisRange: "Kasse / 90-120 EUR",
    availability: [
      { day: "Di", time: "Nachmittag" },
      { day: "Mi", time: "Vormittag" }
    ],
    bioKurz: "Ruhiger, traumasensibler Ansatz mit Fokus auf Stabilisierung.",
    nextAvailableDays: 18
  },
  {
    id: "t38-wels-pfeiffer",
    name: "Nora Pfeiffer",
    photo: "/people/person-18.jpg",
    bezirk: "Wels",
    sprache: ["Deutsch", "Englisch"],
    setting: ["online"],
    verfahren: "KVT",
    schwerpunkte: ["stress", "work", "sleep"],
    stilTags: ["strukturiert", "analytisch"],
    zielgruppenTags: ["Berufstätige"],
    kasse: false,
    preisRange: "70-100 EUR",
    availability: [
      { day: "Mo", time: "Nachmittag" },
      { day: "Do", time: "Vormittag" }
    ],
    bioKurz: "Klarer Online-Plan für Schlaf, Stress und Leistungsdruck.",
    nextAvailableDays: 6
  },
  {
    id: "t39-villach-weiss",
    name: "Katharina Weiss",
    photo: "/people/person-19.jpg",
    bezirk: "Villach",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis", "online"],
    verfahren: "Systemisch",
    schwerpunkte: ["relationship", "attachment", "selfesteem"],
    stilTags: ["empathisch", "direkt"],
    zielgruppenTags: ["Paare", "Erwachsene"],
    kasse: false,
    preisRange: "95-135 EUR",
    availability: [
      { day: "Mi", time: "Abend" },
      { day: "Fr", time: "Nachmittag" }
    ],
    bioKurz: "Systemische Paarexpertise mit Fokus auf Bindung und Kommunikation.",
    nextAvailableDays: 16
  },
  {
    id: "t40-dornbirn-roth",
    name: "Daniela Roth",
    photo: "/people/person-20.jpg",
    bezirk: "Dornbirn",
    sprache: ["Deutsch", "Türkisch"],
    setting: ["praxis"],
    verfahren: "KVT",
    schwerpunkte: ["anxiety", "panic", "depression"],
    stilTags: ["strukturiert", "empathisch"],
    zielgruppenTags: ["Erwachsene", "Jugendliche"],
    kasse: true,
    preisRange: "Kasse / 65-90 EUR",
    availability: [
      { day: "Di", time: "Vormittag" },
      { day: "Do", time: "Abend" }
    ],
    bioKurz: "Mehrsprachige KVT mit klaren Tools gegen Angst und Grübeln.",
    nextAvailableDays: 10
  },
  {
    id: "t41-bregenz-stein",
    name: "Julia Stein",
    photo: "/people/person-01.jpg",
    bezirk: "Bregenz",
    sprache: ["Deutsch", "Englisch"],
    setting: ["online", "praxis"],
    verfahren: "ACT",
    schwerpunkte: ["identity", "selfesteem", "mood"],
    stilTags: ["empathisch", "analytisch"],
    zielgruppenTags: ["Erwachsene", "LGBTQIA+"],
    kasse: false,
    preisRange: "80-120 EUR",
    availability: [
      { day: "Mi", time: "Nachmittag" },
      { day: "Fr", time: "Vormittag" }
    ],
    bioKurz: "ACT und Wertearbeit für mehr Selbstvertrauen und innere Ruhe.",
    nextAvailableDays: 13
  },
  {
    id: "t42-krems-wagner",
    name: "Dr. Felix Wagner",
    photo: "/people/person-02.jpg",
    bezirk: "Krems",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis"],
    verfahren: "Tiefenpsychologie",
    schwerpunkte: ["trauma", "attachment", "identity"],
    stilTags: ["analytisch", "empathisch"],
    zielgruppenTags: ["Erwachsene"],
    kasse: true,
    preisRange: "Kasse / 90-130 EUR",
    availability: [
      { day: "Mo", time: "Vormittag" },
      { day: "Do", time: "Nachmittag" }
    ],
    bioKurz: "Tiefe Arbeit an Beziehungsmustern und biografischen Belastungen.",
    nextAvailableDays: 22
  },
  {
    id: "t43-wrneustadt-schulz",
    name: "Anna Schulz",
    photo: "/people/person-03.jpg",
    bezirk: "Wiener Neustadt",
    sprache: ["Deutsch"],
    setting: ["praxis", "online"],
    verfahren: "Systemisch",
    schwerpunkte: ["relationship", "attachment", "conflict"],
    stilTags: ["empathisch", "strukturiert"],
    zielgruppenTags: ["Paare", "Erwachsene"],
    kasse: false,
    preisRange: "95-135 EUR",
    availability: [
      { day: "Di", time: "Abend" },
      { day: "Fr", time: "Nachmittag" }
    ],
    bioKurz: "Systemische Begleitung bei Konflikten und Beziehungskrisen.",
    nextAvailableDays: 21
  },
  {
    id: "t44-moedling-krueger",
    name: "Manuel Krüger",
    photo: "/people/person-04.jpg",
    bezirk: "Mödling",
    sprache: ["Deutsch", "Englisch"],
    setting: ["praxis", "online"],
    verfahren: "Integrativ",
    schwerpunkte: ["stress", "burnout", "mood", "sleep"],
    stilTags: ["empathisch", "analytisch"],
    zielgruppenTags: ["Erwachsene", "Berufstätige"],
    kasse: true,
    preisRange: "Kasse / 85-120 EUR",
    availability: [
      { day: "Mi", time: "Vormittag" },
      { day: "Do", time: "Nachmittag" }
    ],
    bioKurz: "Integrativer Stil mit Fokus auf Regeneration und Stimmungsstabilisierung.",
    nextAvailableDays: 9
  },
  {
    id: "t45-hallein-kroner",
    name: "Lisa Kroner",
    photo: "/people/person-05.jpg",
    bezirk: "Hallein",
    sprache: ["Deutsch", "Arabisch"],
    setting: ["online", "praxis"],
    verfahren: "KVT",
    schwerpunkte: ["anxiety", "panic", "depression", "trauma"],
    stilTags: ["direkt", "empathisch"],
    zielgruppenTags: ["Erwachsene", "Jugendliche"],
    kasse: true,
    preisRange: "Kasse / 70-100 EUR",
    availability: [
      { day: "Di", time: "Nachmittag" },
      { day: "Fr", time: "Vormittag" }
    ],
    bioKurz: "Mehrsprachige KVT mit Fokus auf Stabilisierung und Angstregulation.",
    nextAvailableDays: 4
  }
];
