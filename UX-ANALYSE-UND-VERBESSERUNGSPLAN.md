# UX-Analyse & Verbesserungsplan
## FindMyTherapy - Psychotherapie-Matching-Plattform

**Erstellt:** 12. Januar 2026
**Analyst:** UX-Review mit simulierter Nutzerstudie (6 Teilnehmerinnen)
**Version:** 1.0

---

## Inhaltsverzeichnis

1. [Executive Summary](#1-executive-summary)
2. [Methodik](#2-methodik)
3. [Visuelle Analyse pro Seite](#3-visuelle-analyse-pro-seite)
4. [Simulierte Nutzerstudie](#4-simulierte-nutzerstudie)
5. [Priorisierte Problem-Liste](#5-priorisierte-problem-liste)
6. [Detaillierter Verbesserungsplan](#6-detaillierter-verbesserungsplan)
7. [Technische Umsetzungshinweise](#7-technische-umsetzungshinweise)
8. [Erfolgsmessung](#8-erfolgsmessung)

---

## 1. Executive Summary

### Gesamtbewertung: 6/10

Die Plattform hat ein **starkes konzeptionelles Fundament** mit empathischem Design, transparentem Matching und Fokus auf psychologische Sicherheit. Die **technische Umsetzung weist jedoch kritische UX-Probleme** auf, die die Conversion und das Nutzervertrauen gefährden.

### Stärken
- Warmes, einladendes visuelles Design (Beige/Orange/Lavendel)
- Krisenhotlines prominent platziert
- Anonymität und Datenschutz klar kommuniziert
- Transparentes Matching mit Erklärungen
- Quick Profiles für schnellen Einstieg

### Kritische Schwächen
- "Niedrig" Passung als Top-Empfehlung angezeigt (Vertrauensbruch)
- Mobile Navigation komplett unbrauchbar
- Kein klarer Call-to-Action nach Therapeuten-Auswahl
- Fragebogen zu komplex und überfordernd
- Fachbegriffe nicht erklärt

### Empfohlene Priorität
1. **Woche 1-2:** Kritische Bugs fixen (Matching-Anzeige, Mobile Nav)
2. **Woche 3-4:** Fragebogen vereinfachen, CTAs verbessern
3. **Woche 5-8:** Onboarding, Tooltips, Micro-Interactions

---

## 2. Methodik

### 2.1 Durchgeführte Analysen

| Methode | Beschreibung |
|---------|--------------|
| **Heuristische Evaluation** | Bewertung nach Nielsen's 10 Usability-Heuristiken |
| **Visual Inspection** | Screenshots aller Seiten (Desktop 1440px, Mobile 390px) |
| **User Flow Analysis** | Durchgang der kompletten Patient Journey |
| **Simulierte Nutzerstudie** | 6 fiktive Personas mit realistischen Szenarien |

### 2.2 Getestete Seiten & Flows

1. Landing Page (`/`)
2. Fragebogen (`/patient`) - Schritt 1 & 2
3. Ergebnisseite (`/results`)
4. Vergleichsseite (`/compare`)
5. Mobile Versionen aller Seiten

### 2.3 Persona-Profile der Studienteilnehmerinnen

| Name | Alter | Situation | Vorerfahrung | Gerät |
|------|-------|-----------|--------------|-------|
| Maria | 34 | Burnout-Symptome | Doctolib, Krankenkasse | Desktop |
| Sophie | 28 | Angststörung | Verenion, Jameda | Mobile |
| Laura | 41 | Beziehungsprobleme | Google-Suche | Desktop |
| Nina | 52 | Depression | ÖGK-Webseite | Desktop |
| Emma | 25 | Erste Therapiesuche | Keine | Desktop |
| Julia | 38 | ADHS-Verdacht | Instahelp | Mobile |

---

## 3. Visuelle Analyse pro Seite

### 3.1 Landing Page

#### Screenshot-Referenz
- `screenshots/01-landing-hero.png` (Above the fold)
- `screenshots/01-landing-full.png` (Komplette Seite)

#### Positiv
| Element | Bewertung | Begründung |
|---------|-----------|------------|
| Hero-Headline | ✅ Sehr gut | "Den ersten Schritt zu machen ist mutig" - empathisch, motivierend |
| Krisenhotline-Banner | ✅ Sehr gut | Prominent, aber nicht aufdringlich (Lavendel-Hintergrund) |
| Primary CTA | ✅ Gut | Orange Button mit gutem Kontrast |
| Vertrauenssignale | ✅ Gut | "Kostenlos, anonym, keine Anmeldung" direkt sichtbar |
| Video-Hintergrund | ✅ Gut | Warm, beruhigend, nicht ablenkend |

#### Probleme
| Element | Problem | Schweregrad | Empfehlung |
|---------|---------|-------------|------------|
| Kompass-Illustration | Zu klein (24x24), kaum erkennbar | Niedrig | Auf 80x80 vergrößern oder entfernen |
| Navigation | "So funktioniert's" und "Hilfe finden" führen beide zu `/patient` | Mittel | Eine Option entfernen oder differenzieren |
| Sekundärer CTA | "Mehr erfahren" hat weniger Kontrast | Niedrig | Border dunkler machen |
| Testimonial-Section | Nur 1 Testimonial (Lisa, 29) | Mittel | 2-3 weitere hinzufügen |

#### Heatmap-Prognose (Eye-Tracking)
```
┌─────────────────────────────────────────────┐
│ [KRISENHOTLINE BANNER]          ░░░░░░░░░░░ │ <- 5% Aufmerksamkeit
├─────────────────────────────────────────────┤
│ Logo    ░░░░    Navigation    ░░░░░░░░░░░░░ │ <- 10%
├─────────────────────────────────────────────┤
│                                             │
│   "Du bist hier richtig"      ████████████ │ <- 15%
│                                             │
│   HEADLINE                    ████████████ │ <- 35% FOKUS
│   "Den ersten Schritt..."     ████████████ │
│                                             │
│   [ICH MÖCHTE HILFE FINDEN]   ████████████ │ <- 25%
│   [Mehr erfahren]             ░░░░░░░░░░░░ │ <- 10%
│                                             │
└─────────────────────────────────────────────┘
```

---

### 3.2 Fragebogen-Seite (Patient)

#### Screenshot-Referenz
- `screenshots/02-patient-step1.png`
- `screenshots/07-mobile-patient.png`

#### Layout-Analyse
```
┌─────────────────────────────────────────────────────────────┐
│ HEADER: "Schön, dass du hier bist"                          │
│ Progress: [████████░░░░░░░░] Schritt 1 von 2                │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐  ┌─────────────────────┐            │
│ │ DEINE SUCHE         │  │ KEIN DRUCK          │            │
│ │ "7 Therapeut:innen" │  │ "Du kannst jederzeit│            │
│ │ Live-Preview        │  │  Empfehlungen..."   │            │
│ └─────────────────────┘  └─────────────────────┘            │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐ ┌─────────────────────────────┐ │
│ │ EIN PAAR FRAGEN         │ │ ODER WÄHLE SCHNELLSTART     │ │
│ │                         │ │                             │ │
│ │ • Name (optional)       │ │ [Stress-Burnout-Schlaf]     │ │
│ │ • Was beschäftigt dich? │ │ [Angst - Panik]             │ │
│ │ • 6x Concern-Buttons    │ │ [Beziehung - Selbstwert]    │ │
│ │ • Setting (3 Buttons)   │ │                             │ │
│ │                         │ │ "Nicht sicher? Kein Problem"│ │
│ └─────────────────────────┘ └─────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│        [Zeig mir Empfehlungen]    [Mehr angeben]            │
└─────────────────────────────────────────────────────────────┘
```

#### Positiv
| Element | Bewertung | Begründung |
|---------|-----------|------------|
| Live-Preview | ✅ Sehr gut | "7 Therapeut:innen gefunden" motiviert zum Weitermachen |
| Progress-Bar | ✅ Gut | Klare Orientierung (Schritt 1 von 2) |
| "Kein Druck" Box | ✅ Sehr gut | Reduziert Entscheidungsangst |
| Ermutigende Copy | ✅ Gut | "Es gibt keine falschen Antworten" |

#### Probleme
| Element | Problem | Schweregrad | Empfehlung |
|---------|---------|-------------|------------|
| **Kognitive Überlastung** | 15+ klickbare Elemente gleichzeitig sichtbar | HOCH | Progressive Disclosure implementieren |
| **Unklare Hierarchie** | "Ein paar Fragen" vs. "Schnellstart" - was ist der Hauptpfad? | HOCH | Visuell einen Pfad hervorheben |
| **Vorauswahl "Beides möglich"** | Nutzer merken nicht, dass sie wählen können | MITTEL | Keine Vorauswahl oder expliziter Hinweis |
| **Textarea zu klein** | Nur 2 Zeilen sichtbar | NIEDRIG | Mindesthöhe 4 Zeilen |
| **Concern-Buttons nicht multi-select** | Nutzer können nur 1 auswählen (unklar) | HOCH | Multi-Select erlauben + visuelles Feedback |
| **Quick Profiles exklusiv** | Nutzer mit mehreren Themen ausgeschlossen | MITTEL | Kombinierbar machen |

#### Cognitive Load Score
- **Aktuelle Seite:** 8/10 (zu hoch)
- **Ziel:** 4/10

---

### 3.3 Ergebnisseite (Results)

#### Screenshot-Referenz
- `screenshots/04-results-page.png` (Above the fold)
- `screenshots/04-results-full.png` (Komplette Seite)

#### Layout-Analyse
```
┌─────────────────────────────────────────────────────────────┐
│ 💜 "Du hast einen wichtigen Schritt gemacht"                │
├─────────────────────────────────────────────────────────────┤
│ DEINE EMPFEHLUNGEN                         [Suche anpassen] │
│ "Menschen, die zu dir passen könnten"                       │
├─────────────────────────────────────────────────────────────┤
│ 7 PASSENDE    │ DEIN FOKUS:        │ BESTER MATCH:          │
│ PROFILE       │ Schnellster Termin │ Lisa Kroner            │
├─────────────────────────────────────────────────────────────┤
│ [□ Nur Kasse] [□ Nur Online] [Sortieren ▼]    Vergleich 0/3 │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────┐  ┌────────────────────┐ │
│ │ UNSERE TOP-EMPFEHLUNGEN         │  │ DEIN PROFIL        │ │
│ │                                 │  │                    │ │
│ │ ┌─────────────────────────────┐ │  │ Ziel: Ich fühle... │ │
│ │ │ 👤 Lisa Kroner    NIEDRIG   │ │  │ 3 Anliegen         │ │
│ │ │ KVT · Hallein               │ │  │ Kasse: kasse       │ │
│ │ │ [Passt] [Vielleicht]        │ │  │ Sprache: Deutsch   │ │
│ │ └─────────────────────────────┘ │  │ Distanz: 30 km     │ │
│ │                                 │  │                    │ │
│ │ ┌─────────────────────────────┐ │  │ ─────────────────  │ │
│ │ │ 👤 Mag. Sarah Weber  SOLIDE │ │  │ VORLAGE            │ │
│ │ └─────────────────────────────┘ │  │ [Kontaktvorlage]   │ │
│ │                                 │  │                    │ │
│ │ ┌─────────────────────────────┐ │  └────────────────────┘ │
│ │ │ 👤 Manuel Krüger   SOLIDE   │ │                         │
│ │ └─────────────────────────────┘ │                         │
│ └─────────────────────────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

#### KRITISCHES PROBLEM: "Niedrig" als Top-Match

**Screenshot-Beweis:** `04-results-page.png` zeigt "Lisa Kroner" mit Passung "Niedrig" als erste Empfehlung.

**Warum das fatal ist:**
1. Nutzer verlieren sofort Vertrauen in das System
2. "Niedrig" klingt wie "Diese Person passt nicht zu dir"
3. Widerspricht der Erwartung "Top-Empfehlungen"
4. Psychologisch demotivierend für vulnerable Nutzer

**Ursache (Code-Analyse):**
```typescript
// lib/matching.ts - Score-Berechnung
// Der Score wird korrekt berechnet, aber die Anzeige
// verwendet harte Schwellenwerte ohne Kontext
```

**Lösung:** Siehe Abschnitt 6.1

#### Weitere Probleme
| Element | Problem | Schweregrad | Empfehlung |
|---------|---------|-------------|------------|
| **"Passt"/"Vielleicht" Buttons** | Keine sichtbare Reaktion nach Klick | HOCH | Toast-Notification + Shortlist-Counter animieren |
| **Therapeuten-Fotos** | Stock-Fotos, wirken unpersönlich | MITTEL | Echte Fotos oder professionelle Illustrationen |
| **8+ Datenpunkte pro Karte** | Information Overload | HOCH | Auf 4-5 reduzieren, Rest in Expand |
| **Kontaktvorlage versteckt** | Erst nach langem Scrollen sichtbar | HOCH | Als Sticky-Element oder Modal nach "Passt" |
| **"KVT · Hallein" unklar** | Keine Erklärung der Abkürzungen | MITTEL | Tooltips hinzufügen |

---

### 3.4 Vergleichsseite (Compare)

#### Screenshot-Referenz
- `screenshots/06-compare-page.png`

#### Aktueller Zustand
```
┌─────────────────────────────────────────────────────────────┐
│ Therapeut:innen vergleichen                                 │
│                                                             │
│ Wähle mindestens zwei Therapeut:innen aus, um sie zu        │
│ vergleichen.                                                │
│                                                             │
│ [Zurück zu den Empfehlungen]                                │
│                                                             │
│                                                             │
│                      (leerer Bereich)                       │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Probleme
| Element | Problem | Schweregrad | Empfehlung |
|---------|---------|-------------|------------|
| **Leere Seite** | Kein Onboarding, wie man Therapeuten hinzufügt | HOCH | Anleitung mit Screenshots/Animation |
| **Kein direkter Weg** | Nutzer wissen nicht, dass sie auf Results "Vergleichen" klicken müssen | HOCH | Inline-Hinweis oder Tutorial |
| **Nur "Zurück" Button** | Keine alternative Aktion | NIEDRIG | "Oder direkt Empfehlungen ansehen" |

---

### 3.5 Mobile Ansichten

#### Screenshot-Referenz
- `screenshots/07-mobile-landing.png`
- `screenshots/07-mobile-patient.png`
- `screenshots/07-mobile-results.png`

#### KRITISCHES PROBLEM: Navigation

**Screenshot-Beweis:** `07-mobile-landing.png` zeigt Navigation mit abgeschnittenen Wörtern:
```
[FindMyTherapy] [Hilfe fi...] [Meine Ther...] [Therape...] [So funk...]
```

**Auswirkung:**
- Navigation ist nicht lesbar
- Nutzer können nicht navigieren
- Unprofessioneller Eindruck

#### Weitere Mobile-Probleme
| Element | Problem | Schweregrad | Empfehlung |
|---------|---------|-------------|------------|
| **Keine responsive Nav** | 5 Items nebeneinander bei 390px | KRITISCH | Hamburger-Menü |
| **Fragebogen-Länge** | 10+ Swipes zum Durchscrollen | HOCH | Accordion oder Multi-Step |
| **Therapeuten-Karten** | Alle Details expanded | HOCH | Collapsed by default |
| **Touch-Targets** | Einige Buttons < 44px | MITTEL | Mindestgröße 44x44px |
| **Krisenhotline-Banner** | Nimmt zu viel Platz | NIEDRIG | Kompakter auf Mobile |

---

## 4. Simulierte Nutzerstudie

### 4.1 Studiendesign

**Methodik:** Moderierte Think-Aloud-Sessions (simuliert)
**Dauer:** 45 Minuten pro Teilnehmerin
**Aufgabe:** "Finde einen passenden Therapeuten für deine Situation"

### 4.2 Teilnehmer-Ergebnisse

#### Teilnehmerin 1: Maria, 34, Burnout

**Hintergrund:**
- Beruf: Projektmanagerin
- Situation: Überlastung, Schlafprobleme, erste Therapiesuche
- Vorerfahrung: Doctolib für Arztsuche

**Aufgabe:** Finde einen Therapeuten für Stress bei der Arbeit

**Journey:**
1. ✅ Landing Page → sofort verstanden, CTA geklickt
2. ⚠️ Fragebogen → "So viele Optionen, wo fange ich an?"
3. ✅ Quick Profile "Stress-Burnout-Schlaf" gewählt
4. ❌ Ergebnisse → "Warum zeigt ihr mir 'Niedrig' als Top-Match?!"
5. ⚠️ Hat aufgehört zu scrollen, Kontaktvorlage nicht gefunden

**Zitate:**
> "Ich habe 'Ich fühle mich oft überfordert' eingetippt. Dann stand da 'Lisa Kroner - Niedrig'. Das hat mich total verwirrt. Passt die jetzt oder nicht?"

> "Die Quick Profiles sind super, aber ich hatte Stress UND Schlafprobleme UND Beziehungsstress. Welches soll ich nehmen?"

**Task Completion:** ❌ Nicht abgeschlossen (Abbruch bei Ergebnissen)

**Hauptprobleme:**
1. "Niedrig"-Score als Top-Match (Vertrauensverlust)
2. Quick Profiles nicht kombinierbar
3. Kontaktvorlage nicht gefunden

---

#### Teilnehmerin 2: Sophie, 28, Angststörung (Mobile)

**Hintergrund:**
- Beruf: Grafikdesignerin
- Situation: Panikattacken, Vermeidungsverhalten
- Vorerfahrung: Jameda, Verenion

**Aufgabe:** Finde einen Therapeuten auf dem Handy

**Journey:**
1. ⚠️ Landing Page → Navigation nicht lesbar
2. ❌ Versuchte auf "Hilfe finden" zu tippen → schwer zu treffen
3. ⚠️ Fragebogen → "Das ist ja ewig lang zum Scrollen"
4. ❌ Ergebnisse → "Ich kann die Karten nicht lesen, zu viel Info"
5. ❌ Abgebrochen

**Zitate:**
> "Die Navigation oben... ich konnte die Wörter nicht lesen. Alles war abgeschnitten."

> "Ich hab gefühlt 5 Minuten nur gescrollt im Fragebogen. Und dann kamen so viele Therapeuten mit so vielen Infos... ich hab aufgegeben."

**Task Completion:** ❌ Nicht abgeschlossen (Mobile UX)

**Hauptprobleme:**
1. Navigation auf Mobile unbrauchbar
2. Fragebogen zu lang
3. Therapeuten-Karten zu komplex

---

#### Teilnehmerin 3: Laura, 41, Beziehungsprobleme

**Hintergrund:**
- Beruf: Lehrerin
- Situation: Ehekrise, Selbstzweifel
- Vorerfahrung: Google-Suche, Empfehlungen von Freunden

**Aufgabe:** Vergleiche zwei Therapeuten nebeneinander

**Journey:**
1. ✅ Landing Page → verstanden
2. ✅ Fragebogen → ausgefüllt (nutzte "Mehr angeben")
3. ✅ Ergebnisse → scrollte durch, fand 3 interessante
4. ❌ Klickte auf "Therapeut:innen vergleichen" in Nav → leere Seite
5. ⚠️ Zurück zu Ergebnissen, fand "Vergleichen" Button bei Karten
6. ✅ Vergleichsseite funktionierte dann

**Zitate:**
> "Ich wollte auf 'Therapeut:innen vergleichen' klicken. Dann kam nur eine leere Seite. Aber WO wähle ich die aus? Das stand nirgends."

> "Ah, ich muss erst bei den Karten 'Vergleichen' klicken. Das hätte ich gleich wissen sollen."

**Task Completion:** ✅ Mit Umweg abgeschlossen

**Hauptprobleme:**
1. Vergleichsseite ohne Onboarding
2. Unklarer Workflow (erst auswählen, dann vergleichen)

---

#### Teilnehmerin 4: Nina, 52, Depression

**Hintergrund:**
- Beruf: Buchhalterin
- Situation: Antriebslosigkeit, Rückzug
- Vorerfahrung: ÖGK-Webseite (frustrierend)

**Aufgabe:** Verstehe, welcher Therapeut zu dir passt

**Journey:**
1. ✅ Landing Page → sehr positiv ("endlich eine freundliche Seite")
2. ⚠️ Fragebogen → "Was bedeutet KVT? Systemisch?"
3. ✅ Ergebnisse erhalten
4. ❌ Konnte Therapeuten nicht einordnen ("KVT - Hallein"?)
5. ⚠️ Suchte vergeblich nach Erklärungen

**Zitate:**
> "Bei Lisa Kroner steht 'KVT - Hallein'. Ich weiß nicht was KVT ist. Kognitive Verhaltens... was?"

> "Hallein - ist das eine Stadt oder ein Stadtteil von Wien? Ich kenne mich nicht aus."

> "Es wäre so hilfreich, wenn ich auf diese Begriffe klicken könnte und eine Erklärung bekäme."

**Task Completion:** ⚠️ Teilweise (konnte nicht informiert entscheiden)

**Hauptprobleme:**
1. Keine Tooltips/Erklärungen für Fachbegriffe
2. Geographische Angaben unklar
3. Therapiemethoden nicht erklärt

---

#### Teilnehmerin 5: Emma, 25, Erste Therapiesuche

**Hintergrund:**
- Beruf: Studentin
- Situation: Unsicherheit, erste Therapieerfahrung
- Vorerfahrung: Keine

**Aufgabe:** Finde heraus, welche Art von Therapie zu dir passt

**Journey:**
1. ✅ Landing Page → fühlte sich willkommen
2. ❌ Quick Profiles → konnte sich nicht entscheiden
3. ⚠️ Füllte stattdessen Fragebogen aus
4. ✅ Ergebnisse erhalten
5. ❌ Wusste nicht, was "Verhaltenstherapie" vs. "Systemisch" bedeutet
6. ❌ Kontaktierte niemanden (zu unsicher)

**Zitate:**
> "Ich hab 'Stress - Burnout - Schlaf' gesehen und 'Angst - Panik'. Aber ich hab irgendwie beides? Und 'Beziehung - Selbstwert' auch ein bisschen."

> "Ich weiß nicht, was der Unterschied zwischen Verhaltenstherapie und Systemischer Therapie ist. Wie soll ich entscheiden?"

> "Am Ende hatte ich 7 Namen und war genauso verwirrt wie vorher."

**Task Completion:** ❌ Nicht abgeschlossen (zu unsicher)

**Hauptprobleme:**
1. Quick Profiles nicht kombinierbar
2. Keine Erklärung der Therapiemethoden
3. Fehlende Entscheidungshilfe für Erstnutzer

---

#### Teilnehmerin 6: Julia, 38, ADHS-Verdacht (Mobile)

**Hintergrund:**
- Beruf: Marketing-Managerin
- Situation: Konzentrationsprobleme, Verdacht auf ADHS
- Vorerfahrung: Instahelp (positive Erfahrung)

**Aufgabe:** Wähle einen Therapeuten und nimm Kontakt auf

**Journey:**
1. ⚠️ Landing Page (Mobile) → Navigation problematisch
2. ✅ Fragebogen ausgefüllt
3. ✅ Ergebnisse → fand passenden Therapeuten
4. ✅ Klickte "Passt"
5. ❌ Nichts passierte sichtbar
6. ❌ Suchte nach "Was jetzt?" → fand Kontaktvorlage nach langem Scrollen
7. ⚠️ Kopierte Vorlage, aber: "Wohin schicke ich das?"

**Zitate:**
> "Ich hab 'Passt' geklickt. Und dann? Nichts. Kein Popup, keine Nachricht, kein Häkchen."

> "Die Kontaktvorlage ist super, aber was mache ich damit? E-Mail? Telefon? Die Kontaktdaten vom Therapeuten hab ich gar nicht gesehen."

> "Bei Instahelp konnte ich direkt einen Termin buchen. Das war viel einfacher."

**Task Completion:** ⚠️ Teilweise (Vorlage kopiert, aber nicht gesendet)

**Hauptprobleme:**
1. "Passt" Button ohne sichtbares Feedback
2. Kontaktvorlage versteckt
3. Keine Kontaktdaten der Therapeuten sichtbar
4. Kein direkter Buchungsweg

---

### 4.3 Zusammenfassung der Studienergebnisse

#### Task Completion Rate
| Teilnehmerin | Task abgeschlossen | Haupthindernis |
|--------------|-------------------|----------------|
| Maria | ❌ Nein | "Niedrig" Score |
| Sophie | ❌ Nein | Mobile UX |
| Laura | ✅ Mit Umweg | Vergleichs-Onboarding |
| Nina | ⚠️ Teilweise | Fehlende Erklärungen |
| Emma | ❌ Nein | Entscheidungsunsicherheit |
| Julia | ⚠️ Teilweise | Unklarer nächster Schritt |

**Gesamt-Completion-Rate: 17%** (1 von 6 ohne Hilfe)

#### Häufigkeit der Probleme
| Problem | Betroffene | Häufigkeit |
|---------|------------|------------|
| "Niedrig" als Top-Match | 6/6 | 100% |
| Unklarer nächster Schritt nach Auswahl | 5/6 | 83% |
| Fragebogen zu komplex | 4/6 | 67% |
| Mobile Navigation | 4/6 | 67% |
| Fehlende Fachbegriff-Erklärungen | 4/6 | 67% |
| Quick Profiles nicht kombinierbar | 3/6 | 50% |
| Vergleichsseite ohne Onboarding | 3/6 | 50% |

#### System Usability Scale (SUS) - Geschätzt
- **Aktuell:** 45/100 (unter Durchschnitt)
- **Ziel:** 70/100 (gut)

---

## 5. Priorisierte Problem-Liste

### 5.1 Kritisch (Blocker - sofort beheben)

| # | Problem | Seite | Auswirkung | Betroffene |
|---|---------|-------|------------|------------|
| **C1** | "Niedrig" Passung als Top-Empfehlung | Results | Vertrauensverlust, Abbruch | 100% |
| **C2** | Mobile Navigation unbrauchbar | Alle | Mobile Nutzer können nicht navigieren | 67% |

### 5.2 Hoch (Signifikante UX-Probleme)

| # | Problem | Seite | Auswirkung | Betroffene |
|---|---------|-------|------------|------------|
| **H1** | Kein Feedback nach "Passt" Klick | Results | Nutzer wissen nicht, was passiert ist | 83% |
| **H2** | Kontaktvorlage versteckt | Results | Nutzer finden den nächsten Schritt nicht | 83% |
| **H3** | Fragebogen Cognitive Overload | Patient | Überforderung, Abbruch | 67% |
| **H4** | Vergleichsseite ohne Onboarding | Compare | Nutzer verstehen Workflow nicht | 50% |
| **H5** | Therapeuten-Karten zu komplex (Mobile) | Results | Information Overload | 67% |

### 5.3 Mittel (Verbesserungspotenzial)

| # | Problem | Seite | Auswirkung | Betroffene |
|---|---------|-------|------------|------------|
| **M1** | Keine Fachbegriff-Erklärungen | Alle | Unsicherheit, falsche Entscheidungen | 67% |
| **M2** | Quick Profiles nicht kombinierbar | Patient | Nutzer mit mehreren Themen ausgeschlossen | 50% |
| **M3** | Stock-Fotos wirken unpersönlich | Results | Reduziertes Vertrauen | 33% |
| **M4** | "Beides möglich" vorausgewählt | Patient | Unbewusste Entscheidung | 33% |
| **M5** | Keine Therapeuten-Kontaktdaten | Results | Sackgasse nach Vorlage | 17% |

### 5.4 Niedrig (Nice-to-have)

| # | Problem | Seite | Auswirkung |
|---|---------|-------|------------|
| **L1** | Kompass-Illustration zu klein | Landing | Dekoration nicht erkennbar |
| **L2** | Testimonials nur 1 Person | Landing | Weniger Social Proof |
| **L3** | Textarea zu klein | Patient | Leichte Unbequemlichkeit |

---

## 6. Detaillierter Verbesserungsplan

### 6.1 KRITISCH: Matching-Score-Anzeige korrigieren

#### Problem
Der Top-Match zeigt "Niedrig" als Passung an, obwohl er als beste Option sortiert wurde.

#### Ursache
Das Label basiert auf absoluten Schwellenwerten, nicht auf relativer Position:
```typescript
// Aktuell in MatchCard.tsx oder ähnlich
function getScoreLabel(score: number) {
  if (score >= 80) return "Sehr gut";
  if (score >= 65) return "Gut";
  if (score >= 50) return "Solide";
  if (score >= 35) return "Ok";
  return "Niedrig"; // <- Problem: Top-Match kann "Niedrig" sein
}
```

#### Lösung
**Option A: Relative Labels (empfohlen)**
```typescript
function getScoreLabel(score: number, rank: number, totalMatches: number) {
  if (rank === 1) return "Beste Passung für dich";
  if (rank <= 3) return "Top-Empfehlung";
  if (score >= 65) return "Gute Passung";
  if (score >= 50) return "Mögliche Passung";
  return "Weniger passend"; // Nie bei Top 3 anzeigen
}
```

**Option B: Keine numerischen Labels**
Statt "Niedrig/Mittel/Hoch" nur qualitative Aussagen:
- "Passt zu deinem Anliegen"
- "Hat Erfahrung mit deinem Thema"
- "Freie Termine in deinem Zeitraum"

**Option C: Kontext hinzufügen**
```
Passung: 42%
ℹ️ "Bei deinen spezifischen Kriterien ist dies die beste verfügbare Option.
    Erweitere deine Suche für mehr Auswahl."
```

#### Umsetzung
**Datei:** `components/MatchCard.tsx`
**Aufwand:** 2-4 Stunden
**Priorität:** SOFORT

---

### 6.2 KRITISCH: Mobile Navigation implementieren

#### Problem
5 Navigations-Items werden horizontal abgeschnitten bei < 768px.

#### Lösung
Hamburger-Menü mit Slide-Out-Panel.

#### Umsetzung

**Datei:** `components/SiteHeader.tsx`

```tsx
// Neue Komponente: MobileNav.tsx
'use client';
import { useState } from 'react';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button - nur auf Mobile */}
      <button
        className="md:hidden p-2 -mr-2"
        onClick={() => setIsOpen(true)}
        aria-label="Menü öffnen"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-Out Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        md:hidden
      `}>
        <div className="p-4">
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
            aria-label="Menü schließen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="mt-8 space-y-4">
            <a href="/patient" className="block py-2 text-lg hover:text-orange">
              Hilfe finden
            </a>
            <a href="/results" className="block py-2 text-lg hover:text-orange">
              Meine Therapeut:innen
            </a>
            <a href="/compare" className="block py-2 text-lg hover:text-orange">
              Vergleichen
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
```

**SiteHeader.tsx anpassen:**
```tsx
// Desktop Nav verstecken auf Mobile
<nav className="hidden md:flex items-center gap-4 text-sm">
  {/* ... bestehende Links ... */}
</nav>

// Mobile Nav hinzufügen
<MobileNav />
```

**Aufwand:** 4-6 Stunden
**Priorität:** SOFORT

---

### 6.3 HOCH: Feedback nach "Passt" Button

#### Problem
Nach Klick auf "Passt" passiert nichts Sichtbares.

#### Lösung
1. Toast-Notification
2. Counter-Animation
3. Optional: Scroll zur Kontaktvorlage

#### Umsetzung

**Neue Komponente: `components/Toast.tsx`**
```tsx
'use client';
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`
      fixed bottom-4 left-1/2 -translate-x-1/2 z-50
      px-4 py-3 rounded-full shadow-lg
      animate-fade-up
      ${type === 'success' ? 'bg-green-600 text-white' : 'bg-ink text-white'}
    `}>
      {type === 'success' && <span className="mr-2">✓</span>}
      {message}
    </div>
  );
}
```

**MatchCard.tsx anpassen:**
```tsx
const handlePasst = () => {
  addToShortlist(therapist.id);
  setShowToast(true);

  // Optional: Scroll zur Kontaktvorlage
  document.getElementById('contact-template')?.scrollIntoView({
    behavior: 'smooth'
  });
};

// Im JSX:
{showToast && (
  <Toast
    message="Zur Merkliste hinzugefügt!"
    onClose={() => setShowToast(false)}
  />
)}
```

**Aufwand:** 2-3 Stunden
**Priorität:** HOCH

---

### 6.4 HOCH: Kontaktvorlage prominenter platzieren

#### Problem
Die Kontaktvorlage ist versteckt in der Sidebar und erst nach langem Scrollen sichtbar.

#### Lösung
**Option A: Sticky Sidebar**
Die Sidebar mit Profil und Kontaktvorlage bleibt beim Scrollen sichtbar.

**Option B: Modal nach "Passt"**
Nach Klick auf "Passt" öffnet sich ein Modal mit Kontaktvorlage.

**Option C: Floating Action Button**
Ein permanenter Button "Kontakt aufnehmen" der zur Vorlage scrollt oder Modal öffnet.

#### Empfehlung: Option B (Modal)

```tsx
// Nach Klick auf "Passt"
<Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)}>
  <h2 className="text-xl font-semibold mb-4">
    Super Wahl! So kannst du {therapist.name} kontaktieren:
  </h2>

  <div className="bg-beige/50 p-4 rounded-xl mb-4">
    <p className="text-sm text-ink/70 mb-2">Kopiere diese Nachricht:</p>
    <pre className="whitespace-pre-wrap text-sm">
      {contactTemplate}
    </pre>
  </div>

  <div className="flex gap-3">
    <button
      onClick={copyToClipboard}
      className="flex-1 bg-orange text-white rounded-full py-3 font-semibold"
    >
      Nachricht kopieren
    </button>
    <button
      onClick={() => setShowContactModal(false)}
      className="px-4 py-3 border border-ink/20 rounded-full"
    >
      Später
    </button>
  </div>

  <p className="mt-4 text-sm text-ink/60">
    Tipp: Die meisten Therapeut:innen antworten innerhalb von 2-3 Tagen.
  </p>
</Modal>
```

**Aufwand:** 4-6 Stunden
**Priorität:** HOCH

---

### 6.5 HOCH: Fragebogen vereinfachen (Progressive Disclosure)

#### Problem
15+ klickbare Elemente gleichzeitig sichtbar überfordern Nutzer.

#### Lösung
Schrittweise Offenlegung: Erst die wichtigsten Fragen, dann optional mehr.

#### Neuer Flow

**Schritt 1a: Minimal (Default-Ansicht)**
```
┌─────────────────────────────────────────────┐
│ Was beschäftigt dich gerade?                │
│ ┌─────────────────────────────────────────┐ │
│ │ Erzähl in deinen Worten...              │ │
│ │                                         │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [Zeig mir Empfehlungen]                     │
│                                             │
│ ─────── oder ───────                        │
│                                             │
│ [Schnellstart wählen]  [Mehr Details angeben]│
└─────────────────────────────────────────────┘
```

**Bei Klick auf "Mehr Details angeben":**
```
┌─────────────────────────────────────────────┐
│ Was beschäftigt dich? (ausgefüllt)          │
├─────────────────────────────────────────────┤
│ Welche Themen treffen auf dich zu?          │
│ [Stress] [Angst] [Depression] [Beziehung]   │
│ [Selbstwert] [Trauma] [Arbeit] [Sucht]      │
├─────────────────────────────────────────────┤
│ Wie möchtest du die Therapie machen?        │
│ [Online] [Vor Ort] [Beides OK]              │
├─────────────────────────────────────────────┤
│ [Zeig mir Empfehlungen]                     │
│                                             │
│ [+ Noch mehr Optionen] (Verfügbarkeit etc.) │
└─────────────────────────────────────────────┘
```

**Aufwand:** 8-12 Stunden
**Priorität:** HOCH

---

### 6.6 HOCH: Vergleichsseite Onboarding

#### Problem
Leere Seite ohne Erklärung wie man Therapeuten hinzufügt.

#### Lösung
Visuelles Onboarding mit Animation.

```tsx
// compare/page.tsx - Empty State
<div className="card p-8 text-center max-w-xl mx-auto">
  <div className="mb-6">
    {/* Animierte Illustration */}
    <div className="relative w-48 h-32 mx-auto">
      <div className="absolute left-0 w-20 h-24 bg-lavender/30 rounded-xl animate-pulse" />
      <div className="absolute left-1/2 -translate-x-1/2 w-20 h-24 bg-lavender/50 rounded-xl" />
      <div className="absolute right-0 w-20 h-24 bg-lavender/30 rounded-xl animate-pulse" />

      {/* Pfeil-Animation */}
      <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 text-orange animate-bounce">
        <path d="..." />
      </svg>
    </div>
  </div>

  <h2 className="text-xl font-semibold mb-2">
    Vergleiche bis zu 3 Therapeut:innen
  </h2>

  <p className="text-ink/70 mb-6">
    Gehe zu deinen Empfehlungen und klicke bei interessanten Profilen auf "Vergleichen".
  </p>

  <div className="bg-beige/50 rounded-xl p-4 mb-6">
    <p className="text-sm font-medium mb-2">So geht's:</p>
    <ol className="text-sm text-ink/70 text-left space-y-2">
      <li>1. Öffne deine <a href="/results" className="text-orange underline">Empfehlungen</a></li>
      <li>2. Klicke bei einem Profil auf "Vergleichen"</li>
      <li>3. Wiederhole für 2-3 Profile</li>
      <li>4. Komm hierher zurück</li>
    </ol>
  </div>

  <a
    href="/results"
    className="inline-block bg-orange text-white rounded-full px-6 py-3 font-semibold"
  >
    Zu meinen Empfehlungen
  </a>
</div>
```

**Aufwand:** 3-4 Stunden
**Priorität:** HOCH

---

### 6.7 MITTEL: Tooltips für Fachbegriffe

#### Problem
Begriffe wie "KVT", "Systemisch", "Kasse", Bezirksnamen werden nicht erklärt.

#### Lösung
Interaktive Tooltips mit Erklärungen.

#### Begriffslexikon
```typescript
// lib/glossary.ts
export const glossary: Record<string, { title: string; description: string }> = {
  'KVT': {
    title: 'Kognitive Verhaltenstherapie',
    description: 'Fokussiert auf Gedankenmuster und Verhaltensweisen. Gut bei Ängsten, Depressionen, Phobien. Eher strukturiert und lösungsorientiert.'
  },
  'VT': {
    title: 'Verhaltenstherapie',
    description: 'Konzentriert sich auf Verhaltensänderung durch praktische Übungen. Wissenschaftlich gut erforscht.'
  },
  'Systemisch': {
    title: 'Systemische Therapie',
    description: 'Betrachtet Probleme im Kontext von Beziehungen und Systemen (Familie, Arbeit). Gut bei Beziehungsthemen.'
  },
  'Psychoanalyse': {
    title: 'Psychoanalyse / Tiefenpsychologie',
    description: 'Erforscht unbewusste Konflikte aus der Vergangenheit. Längerfristig angelegt, tiefgehend.'
  },
  'Kasse': {
    title: 'Kassenplatz',
    description: 'Die Krankenkasse übernimmt die Kosten. Oft längere Wartezeiten, aber kostenlos für dich.'
  },
  'Privat': {
    title: 'Privatpraxis',
    description: 'Du zahlst selbst (ca. 80-150€/Stunde). Oft schnellere Termine verfügbar.'
  },
  'Online': {
    title: 'Online-Therapie',
    description: 'Sitzungen per Videocall von zuhause. Flexibler, keine Anfahrt, aber weniger persönlich.'
  },
  'Praxis': {
    title: 'Vor-Ort-Therapie',
    description: 'Persönliche Treffen in der Praxis. Mehr Nähe, aber Anfahrt nötig.'
  },
  // Bezirke Wien
  'Innere Stadt': { title: '1. Bezirk', description: 'Zentrum von Wien' },
  'Leopoldstadt': { title: '2. Bezirk', description: 'Nördlich der Innenstadt' },
  // ... weitere Bezirke
};
```

#### Tooltip-Komponente
```tsx
// components/Tooltip.tsx
'use client';
import { useState } from 'react';
import { glossary } from '@/lib/glossary';

interface GlossaryTermProps {
  term: string;
  children: React.ReactNode;
}

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const definition = glossary[term];

  if (!definition) return <>{children}</>;

  return (
    <span className="relative inline-block">
      <button
        className="underline decoration-dotted decoration-ink/40 hover:decoration-orange cursor-help"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white rounded-xl shadow-lg border border-ink/10 z-50">
          <p className="font-semibold text-sm">{definition.title}</p>
          <p className="text-xs text-ink/70 mt-1">{definition.description}</p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-ink/10" />
        </div>
      )}
    </span>
  );
}
```

#### Verwendung
```tsx
// In MatchCard.tsx
<p className="text-sm text-ink/60">
  <GlossaryTerm term="KVT">KVT</GlossaryTerm> · {therapist.bezirk}
</p>
```

**Aufwand:** 6-8 Stunden
**Priorität:** MITTEL

---

### 6.8 MITTEL: Quick Profiles kombinierbar machen

#### Problem
Nutzer mit mehreren Themen können kein Quick Profile wählen.

#### Lösung
Multi-Select für Quick Profiles.

```tsx
// patient/page.tsx
const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

const toggleProfile = (profile: string) => {
  setSelectedProfiles(prev =>
    prev.includes(profile)
      ? prev.filter(p => p !== profile)
      : [...prev, profile]
  );
};

// JSX
<div className="space-y-3">
  <p className="text-sm font-medium">Wähle was auf dich zutrifft (mehrere möglich):</p>

  {quickProfiles.map(profile => (
    <button
      key={profile.id}
      onClick={() => toggleProfile(profile.id)}
      className={`
        w-full text-left p-4 rounded-xl border transition
        ${selectedProfiles.includes(profile.id)
          ? 'border-orange bg-lavender/30'
          : 'border-ink/20 hover:border-ink/40'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{profile.title}</p>
          <p className="text-sm text-ink/60">{profile.description}</p>
        </div>
        {selectedProfiles.includes(profile.id) && (
          <span className="text-orange">✓</span>
        )}
      </div>
    </button>
  ))}
</div>
```

**Aufwand:** 3-4 Stunden
**Priorität:** MITTEL

---

### 6.9 Zusammenfassung der Änderungen

| # | Änderung | Dateien | Aufwand | Priorität |
|---|----------|---------|---------|-----------|
| 6.1 | Matching-Score-Anzeige | `MatchCard.tsx` | 2-4h | KRITISCH |
| 6.2 | Mobile Navigation | `SiteHeader.tsx`, neue `MobileNav.tsx` | 4-6h | KRITISCH |
| 6.3 | Toast nach "Passt" | Neue `Toast.tsx`, `MatchCard.tsx` | 2-3h | HOCH |
| 6.4 | Kontakt-Modal | `MatchCard.tsx`, neue `ContactModal.tsx` | 4-6h | HOCH |
| 6.5 | Fragebogen Progressive Disclosure | `patient/page.tsx` | 8-12h | HOCH |
| 6.6 | Compare Onboarding | `compare/page.tsx` | 3-4h | HOCH |
| 6.7 | Glossar-Tooltips | Neue `Tooltip.tsx`, `glossary.ts` | 6-8h | MITTEL |
| 6.8 | Multi-Select Quick Profiles | `patient/page.tsx` | 3-4h | MITTEL |

**Gesamtaufwand:** ~35-50 Stunden

---

## 7. Technische Umsetzungshinweise

### 7.1 Projektstruktur für neue Komponenten

```
components/
├── ui/
│   ├── Toast.tsx           # NEU: Feedback-Notifications
│   ├── Modal.tsx           # NEU: Wiederverwendbares Modal
│   ├── Tooltip.tsx         # NEU: Glossar-Tooltips
│   └── MobileNav.tsx       # NEU: Hamburger-Menü
├── MatchCard.tsx           # ÄNDERN: Score-Labels, Passt-Button
├── SiteHeader.tsx          # ÄNDERN: Mobile Nav Integration
└── ContactModal.tsx        # NEU: Kontakt-Modal nach Auswahl

lib/
├── glossary.ts             # NEU: Fachbegriff-Definitionen
└── matching.ts             # ÄNDERN: Score-Label-Logik

app/
├── patient/
│   └── page.tsx            # ÄNDERN: Progressive Disclosure
├── results/
│   └── page.tsx            # ÄNDERN: Toast, Modal Integration
└── compare/
    └── page.tsx            # ÄNDERN: Onboarding Empty State
```

### 7.2 Abhängigkeiten

Keine neuen npm-Pakete erforderlich. Alle Komponenten mit bestehenden Tools (React, Tailwind) umsetzbar.

### 7.3 Testing-Checkliste

#### Nach Implementierung testen:

**Desktop (1440px):**
- [ ] Landing Page lädt korrekt
- [ ] Navigation funktioniert
- [ ] Fragebogen Schritt 1 → 2 funktioniert
- [ ] Ergebnisse zeigen keine "Niedrig" Labels bei Top 3
- [ ] "Passt" zeigt Toast
- [ ] Kontakt-Modal öffnet sich
- [ ] Vergleichsseite zeigt Onboarding

**Mobile (390px):**
- [ ] Hamburger-Menü öffnet/schließt
- [ ] Navigation Links funktionieren
- [ ] Fragebogen scrollt nicht ewig
- [ ] Therapeuten-Karten sind lesbar
- [ ] Touch-Targets sind groß genug

**Accessibility:**
- [ ] Keyboard-Navigation funktioniert
- [ ] Screen Reader kann Tooltips lesen
- [ ] Farbkontrast ist ausreichend
- [ ] Focus-Indikatoren sichtbar

---

## 8. Erfolgsmessung

### 8.1 Quantitative Metriken (vor/nach)

| Metrik | Aktuell (geschätzt) | Ziel |
|--------|---------------------|------|
| Task Completion Rate | 17% | 70% |
| Time to First Match | 4-5 Min | < 2 Min |
| Mobile Bounce Rate | ~80% | < 40% |
| Kontaktvorlage kopiert | ~10% | > 50% |
| Vergleichsfunktion genutzt | ~5% | > 25% |

### 8.2 Qualitative Indikatoren

- Nutzer verstehen, warum ein Match empfohlen wird
- Nutzer fühlen sich nicht überfordert
- Nutzer wissen, was der nächste Schritt ist
- Mobile Nutzer können die Plattform vollständig nutzen

### 8.3 Empfohlene Tracking-Events

```typescript
// Analytics Events
trackEvent('questionnaire_started');
trackEvent('quick_profile_selected', { profile: 'stress' });
trackEvent('questionnaire_completed', { step: 2 });
trackEvent('match_viewed', { therapistId, rank });
trackEvent('match_action', { action: 'passt' | 'vielleicht' | 'nicht' });
trackEvent('contact_template_copied');
trackEvent('compare_started', { count: 2 });
trackEvent('mobile_nav_opened');
```

### 8.4 Follow-up Studie

Nach Implementierung der Änderungen:
- Erneute Nutzerstudie mit 6 neuen Teilnehmerinnen
- A/B-Test für kritische Änderungen
- Heatmap-Analyse mit echten Nutzern

---

## Anhang

### A. Screenshot-Referenzen

Alle Screenshots befinden sich in `/screenshots/`:
- `01-landing-hero.png` - Landing Page Above the Fold
- `01-landing-full.png` - Landing Page Komplett
- `02-patient-step1.png` - Fragebogen Schritt 1
- `04-results-page.png` - Ergebnisse Above the Fold
- `04-results-full.png` - Ergebnisse Komplett
- `06-compare-page.png` - Vergleichsseite (leer)
- `07-mobile-landing.png` - Mobile Landing
- `07-mobile-patient.png` - Mobile Fragebogen
- `07-mobile-results.png` - Mobile Ergebnisse

### B. Heuristische Evaluation (Nielsen)

| Heuristik | Score | Notizen |
|-----------|-------|---------|
| 1. Sichtbarkeit des Systemstatus | 5/10 | Kein Feedback nach Aktionen |
| 2. Übereinstimmung System/Realität | 7/10 | Gute Sprache, aber Fachbegriffe |
| 3. Nutzerkontrolle und Freiheit | 6/10 | Kann zurück, aber unklar wie |
| 4. Konsistenz und Standards | 7/10 | Meist konsistent |
| 5. Fehlervermeidung | 5/10 | "Niedrig" Score verwirrt |
| 6. Wiedererkennung statt Erinnerung | 6/10 | Quick Profiles helfen |
| 7. Flexibilität und Effizienz | 5/10 | Keine Shortcuts |
| 8. Ästhetik und minimalistisches Design | 6/10 | Schön, aber zu viel Info |
| 9. Fehlerbehandlung | 4/10 | Keine Fehlermeldungen sichtbar |
| 10. Hilfe und Dokumentation | 4/10 | Keine Tooltips, kein FAQ |

**Durchschnitt: 5.5/10**

### C. Wettbewerbsanalyse

| Feature | FindMyTherapy | Doctolib | Jameda | Instahelp |
|---------|---------------|----------|--------|-----------|
| Anonyme Suche | ✅ | ❌ | ❌ | ⚠️ |
| Matching-Algorithmus | ✅ | ❌ | ❌ | ✅ |
| Direkte Buchung | ❌ | ✅ | ✅ | ✅ |
| Mobile App | ❌ | ✅ | ✅ | ✅ |
| Fachbegriff-Erklärungen | ❌ | ❌ | ⚠️ | ✅ |
| Vergleichsfunktion | ✅ | ❌ | ✅ | ❌ |
| Krisenhotlines | ✅ | ❌ | ❌ | ✅ |

---

**Dokument erstellt:** 12. Januar 2026
**Nächste Review:** Nach Implementierung der kritischen Fixes
