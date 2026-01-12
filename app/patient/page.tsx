"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProgressBar } from "../../components/ProgressBar";
import { Tooltip } from "../../components/Tooltip";
import { quickProfiles } from "../../lib/data/quickProfiles";
import {
  availabilityDays,
  availabilityTimes,
  concernOptions,
  dealbreakerOptions,
  defaultAnswers,
  districtOptions,
  languageOptions,
  priorityOptions,
  settingOptions,
  styleOptions
} from "../../lib/data/options";
import { runMatching, sortMatches } from "../../lib/matching";
import { useAppStore } from "../../lib/store";

const steps = [
  {
    id: "quick",
    title: "Erzähl uns von dir",
    tooltip: "Ein paar Worte genügen. Du musst nichts perfekt formulieren.",
    impact: "2-3 kurze Fragen, mehr brauchst du nicht.",
    optional: false
  },
  {
    id: "details",
    title: "Wenn du magst: Mehr Details",
    tooltip: "Nur wenn du gezielter suchen möchtest.",
    impact: "Komplett optional - für mehr Präzision.",
    optional: true
  }
];

const priorityLabelMap = {
  score: "Beste Passung",
  next: "Schnellster Termin",
  distance: "Kurze Distanz"
};

const toggleValue = <T,>(value: T, list: T[]) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

const topConcerns = concernOptions.slice(0, 6);
const goalSuggestions = [
  "Besser schlafen und zur Ruhe kommen",
  "Weniger Angst im Alltag",
  "Mehr Selbstvertrauen spüren",
  "Beziehungsmuster verstehen",
  "Weniger Druck und Überforderung"
];

const buildHardFilters = (answers: typeof defaultAnswers) => {
  const filters: string[] = [];
  const strictMode = answers.matchingMode === "strict";

  if (answers.dealbreakers.includes("online-only")) {
    filters.push("Setting: nur online");
  }
  if (answers.dealbreakers.includes("praxis-only")) {
    filters.push("Setting: nur Präsenz");
  }
  if (
    strictMode &&
    answers.preferences.setting !== "egal" &&
    !answers.dealbreakers.includes("online-only") &&
    !answers.dealbreakers.includes("praxis-only")
  ) {
    filters.push(`Setting: ${answers.preferences.setting}`);
  }

  if (answers.dealbreakers.includes("kasse-only") || (strictMode && answers.insurance === "kasse")) {
    filters.push("Kasse erforderlich");
  }

  if ((answers.dealbreakers.includes("language-only") || strictMode) && answers.preferences.language) {
    filters.push(`Sprache: ${answers.preferences.language}`);
  }

  if (answers.dealbreakers.includes("distance-only") || strictMode) {
    filters.push(`Distanz <= ${answers.preferences.maxDistanceKm} km`);
  }

  const prefersAvailability = answers.availability.days.length > 0 || answers.availability.times.length > 0;
  if (answers.dealbreakers.includes("availability-only") || (strictMode && prefersAvailability)) {
    filters.push("Zeiten strikt");
  }

  return Array.from(new Set(filters));
};

const buildSoftSignals = (answers: typeof defaultAnswers, hardFilters: string[]) => {
  const signals: string[] = [];

  if (answers.primaryGoal.trim().length > 0) {
    signals.push("Ziel beschrieben");
  }
  if (answers.concerns.length) {
    signals.push(`${answers.concerns.length} Anliegen`);
  }
  if (answers.therapistStyle.length) {
    signals.push(`Stil: ${answers.therapistStyle.join(", ")}`);
  }
  if (answers.availability.days.length || answers.availability.times.length) {
    signals.push("Zeitfenster angegeben");
  }

  if (answers.preferences.setting !== "egal" && !hardFilters.some((item) => item.startsWith("Setting"))) {
    signals.push(`Setting: ${answers.preferences.setting}`);
  }
  if (answers.preferences.language && !hardFilters.some((item) => item.startsWith("Sprache"))) {
    signals.push(`Sprache: ${answers.preferences.language}`);
  }
  if (answers.insurance !== "egal" && !hardFilters.includes("Kasse erforderlich")) {
    signals.push(`Kasse: ${answers.insurance}`);
  }

  signals.push(`Fokus: ${priorityLabelMap[answers.matchPriority]}`);

  return signals;
};

const buildConfidenceTips = (answers: typeof defaultAnswers) => {
  const tips: string[] = [];
  if (!answers.primaryGoal.trim()) tips.push("Ein kurzes Ziel macht die Empfehlung persönlicher.");
  if (!answers.concerns.length) tips.push("Wähle ein Thema für bessere Passung.");
  if (!answers.therapistStyle.length) tips.push("Ein Stil-Wunsch verbessert die Passung.");
  if (tips.length < 2) tips.push("Unsicher? Starte mit den Schnellmatches.");
  return tips.slice(0, 2);
};

export default function PatientPage() {
  const router = useRouter();
  const { answers, setAnswers, resetAnswers, therapists, hasHydrated } = useAppStore();
  const [step, setStep] = useState(0);
  const [selectedQuickProfiles, setSelectedQuickProfiles] = useState<string[]>([]);
  const [showAllConcerns, setShowAllConcerns] = useState(false);
  const [showPreviewDetails, setShowPreviewDetails] = useState(false);
  const [showQuickExtras, setShowQuickExtras] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hardFilters = useMemo(() => buildHardFilters(answers), [answers]);
  const softSignals = useMemo(() => buildSoftSignals(answers, hardFilters), [answers, hardFilters]);

  const matchSnapshot = useMemo(() => {
    const matches = runMatching(answers, therapists);
    const availableMatches = matches.filter((match) => !match.excluded);
    const sorted = sortMatches(availableMatches, "score");
    return {
      total: matches.length,
      availableCount: availableMatches.length,
      hardExcludedCount: matches.length - availableMatches.length,
      topMatch: sorted[0],
      confidence: matches[0]?.explanation.confidence ?? 0
    };
  }, [answers, therapists]);

  const conflictHint = useMemo(() => {
    if (matchSnapshot.availableCount <= 3) {
      return `Nur ${matchSnapshot.availableCount} von ${matchSnapshot.total} Profilen passen nach den harten Filtern.`;
    }
    if (hardFilters.length >= 3) {
      return `Aktiv: ${hardFilters.length} harte Filter - das reduziert die Auswahl spürbar.`;
    }
    return "";
  }, [hardFilters.length, matchSnapshot.availableCount, matchSnapshot.total]);

  const confidenceTips = useMemo(() => buildConfidenceTips(answers), [answers]);

  if (!hasHydrated) {
    return <div className="card p-6">Lade gespeicherte Eingaben...</div>;
  }

  const toggleQuickProfile = (profileId: string) => {
    const isSelected = selectedQuickProfiles.includes(profileId);

    if (isSelected) {
      // Entfernen
      setSelectedQuickProfiles((prev) => prev.filter((id) => id !== profileId));
    } else {
      // Hinzufügen
      setSelectedQuickProfiles((prev) => [...prev, profileId]);
    }

    // Kombiniere alle ausgewählten Profile
    const newSelected = isSelected
      ? selectedQuickProfiles.filter((id) => id !== profileId)
      : [...selectedQuickProfiles, profileId];

    if (newSelected.length === 0) {
      // Wenn keine Profile ausgewählt, zurücksetzen zu Defaults
      setAnswers((prev) => ({
        ...defaultAnswers,
        displayName: prev.displayName,
        primaryGoal: prev.primaryGoal
      }));
      return;
    }

    // Kombiniere Concerns aller ausgewählten Profile
    const combinedConcerns = new Set<string>();
    const combinedGoals: string[] = [];

    newSelected.forEach((id) => {
      const profile = quickProfiles.find((item) => item.id === id);
      if (profile) {
        profile.answers.concerns?.forEach((concern: string) => combinedConcerns.add(concern));
        if (profile.answers.primaryGoal) {
          combinedGoals.push(profile.answers.primaryGoal);
        }
      }
    });

    setAnswers((prev) => ({
      ...prev,
      concerns: Array.from(combinedConcerns),
      primaryGoal: prev.primaryGoal || combinedGoals[0] || ""
    }));
  };

  const applyGentleStart = () => {
    setAnswers((prev) => ({
      ...prev,
      primaryGoal: prev.primaryGoal.trim()
        ? prev.primaryGoal
        : "Ich bin unsicher und möchte mich erstmal orientieren.",
      preferences: { ...prev.preferences, setting: "egal" },
      insurance: "egal",
      matchPriority: "score",
      matchingMode: "explore",
      dealbreakers: []
    }));
    setSelectedQuickProfiles([]);
  };

  const stepConfig = steps[step];
  const lastStepIndex = steps.length - 1;
  const displayName = answers.displayName.trim();
  const priorityLabel = priorityLabelMap[answers.matchPriority];

  const confidenceTone =
    matchSnapshot.confidence >= 80
      ? "border-lavender bg-lavender/30"
      : matchSnapshot.confidence >= 65
      ? "border-amber-200 bg-amber-50"
      : "border-rose-200 bg-rose-50";

  const handleMatch = () => {
    router.push("/results");
  };

  return (
    <div className="space-y-8 pb-28">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">
              {displayName ? `Hallo ${displayName}, schön dass du hier bist` : "Schön, dass du hier bist"}
            </h1>
            <p className="text-sm text-ink/70">
              Nimm dir die Zeit, die du brauchst. Schritt {step + 1} von {steps.length}
            </p>
            {answers.primaryGoal.trim() && (
              <p className="text-sm text-ink/70">Was dich beschäftigt: {answers.primaryGoal}</p>
            )}
          </div>
          <button
            onClick={() => {
              resetAnswers();
              setSelectedQuickProfiles([]);
              setStep(0);
            }}
            className="rounded-full border border-ink/20 bg-white px-4 py-2 text-xs font-semibold"
          >
            Antworten zurücksetzen
          </button>
        </div>
        <ProgressBar current={step} total={steps.length} />
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card p-5 md:col-span-2">
          <p className="text-xs uppercase tracking-wide text-ink/60">Deine Suche</p>
          <p className="mt-2 text-sm text-ink/70">
            Du bist nicht allein. Schon mit wenigen Angaben können wir dir passende Therapeut:innen zeigen.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="pill">{matchSnapshot.availableCount} Therapeut:innen gefunden</span>
            {matchSnapshot.topMatch && (
              <span className="pill">
                z.B. {matchSnapshot.topMatch.therapist.name}
              </span>
            )}
            <span className="pill">Sortiert nach: {priorityLabel}</span>
          </div>
          <button
            onClick={() => setShowPreviewDetails((prev) => !prev)}
            className="mt-3 text-xs text-ink/70 underline"
          >
            {showPreviewDetails ? "Details ausblenden" : "Warum diese Empfehlungen?"}
          </button>
          {showPreviewDetails && (
            <div className="mt-3 grid gap-3 text-xs md:grid-cols-2">
              <div>
                <p className="font-semibold text-ink/70">Strenge Filter</p>
                {hardFilters.length ? (
                  <ul className="mt-1 list-disc pl-4 text-ink/70">
                    {hardFilters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-ink/60">Keine strengen Filter gesetzt.</p>
                )}
              </div>
              <div>
                <p className="font-semibold text-ink/70">Hilfreiche Hinweise</p>
                {softSignals.length ? (
                  <ul className="mt-1 list-disc pl-4 text-ink/70">
                    {softSignals.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-ink/60">Noch keine Hinweise gesetzt.</p>
                )}
              </div>
            </div>
          )}
          {conflictHint && (
            <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
              Hinweis: {conflictHint}
            </div>
          )}
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-ink/60">Kein Druck</p>
          <p className="mt-2 text-sm text-ink/70">
            Du kannst jederzeit Empfehlungen ansehen und später weitermachen. Alles bleibt nur bei dir.
          </p>
          <div className="mt-4 rounded-2xl border border-lavender bg-lavender/20 px-3 py-2">
            <p className="text-sm text-ink/70">
              Schon mit wenigen Angaben findest du passende Therapeut:innen. Je mehr du teilst, desto genauer werden die Empfehlungen - aber das ist optional.
            </p>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold">{stepConfig.title}</h2>
            {stepConfig.optional && <span className="pill">Optional</span>}
          </div>
          <Tooltip text={stepConfig.tooltip} />
        </div>
        <p className="mt-2 text-xs text-ink/60">Einfluss: {stepConfig.impact}</p>

        {step === 0 && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl bg-lavender/20 px-4 py-3 text-sm text-ink/80">
              Es gibt keine falschen Antworten. Schreib einfach, was dir in den Sinn kommt.
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl bg-white/70 p-4 space-y-4">
                <p className="text-sm font-semibold">Ein paar Fragen</p>
                <div>
                  <p className="text-sm font-semibold">Wie möchtest du genannt werden?</p>
                  <input
                    value={answers.displayName}
                    onChange={(event) =>
                      setAnswers((prev) => ({
                        ...prev,
                        displayName: event.target.value
                      }))
                    }
                    placeholder="Dein Vorname oder ein Spitzname"
                    className="mt-2 w-full rounded-2xl border border-ink/20 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">Was beschäftigt dich gerade?</p>
                  <p className="text-xs text-ink/60 mt-1">In deinen eigenen Worten - es muss nicht perfekt sein.</p>
                  <textarea
                    value={answers.primaryGoal}
                    onChange={(event) =>
                      setAnswers((prev) => ({
                        ...prev,
                        primaryGoal: event.target.value
                      }))
                    }
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-ink/20 bg-white px-4 py-3 text-sm"
                    placeholder="z.B. Ich schlafe schlecht und fühle mich oft überfordert..."
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {goalSuggestions.map((goal) => (
                      <button
                        key={goal}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            primaryGoal: goal
                          }))
                        }
                        className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs"
                      >
                        {goal}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                            primaryGoal: "Ich bin unsicher und möchte mich erstmal orientieren."
                        }))
                      }
                      className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs"
                    >
                      Ich weiß nicht
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">Wie möchtest du die Therapie machen?</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {settingOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, setting: option.id }
                          }))
                        }
                        className={`rounded-2xl border px-3 py-2 text-sm ${
                          answers.preferences.setting === option.id
                            ? "border-orange bg-lavender/30"
                            : "border-ink/10 bg-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowQuickExtras((prev) => !prev)}
                  className="rounded-full border border-ink/20 bg-white px-4 py-2 text-xs font-semibold"
                >
                  {showQuickExtras ? "Weniger anzeigen" : "Ich möchte genauer suchen (optional)"}
                </button>

                {showQuickExtras && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold">Thema (optional)</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(showAllConcerns ? concernOptions : topConcerns).map((option) => (
                          <button
                            key={option.id}
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                concerns: toggleValue(option.id, prev.concerns)
                              }))
                            }
                            className={`rounded-full border px-3 py-1 text-xs ${
                              answers.concerns.includes(option.id)
                                ? "border-orange bg-lavender/30"
                                : "border-ink/10 bg-white"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              concerns: [],
                              primaryGoal: prev.primaryGoal.trim()
                                ? prev.primaryGoal
                                : "Ich bin unsicher und möchte mich erstmal orientieren."
                            }))
                          }
                          className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs"
                        >
                          Ich weiß nicht
                        </button>
                      </div>
                      <button
                        onClick={() => setShowAllConcerns((prev) => !prev)}
                        className="mt-2 text-xs text-ink/70 underline"
                      >
                        {showAllConcerns ? "Weniger anzeigen" : "Mehr Themen"}
                      </button>
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Kasse / Selbstzahlung</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["kasse", "privat", "egal"].map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                insurance: option as typeof prev.insurance
                              }))
                            }
                            className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                              answers.insurance === option
                                ? "border-orange bg-lavender/30"
                                : "border-ink/10 bg-white"
                            }`}
                          >
                            {option === "kasse" && "Kasse"}
                            {option === "privat" && "Privat"}
                            {option === "egal" && "Egal"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Was ist dir am wichtigsten?</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {priorityOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                matchPriority: option.id
                              }))
                            }
                            className={`rounded-full border px-3 py-1 text-xs ${
                              answers.matchPriority === option.id
                                ? "border-orange bg-lavender/30"
                                : "border-ink/10 bg-white"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Wie dringend ist es für dich?</p>
                        <span className="pill text-xs">
                          {answers.urgency === 1 && "Keine Eile"}
                          {answers.urgency === 2 && "Bald wäre gut"}
                          {answers.urgency === 3 && "Zeitnah"}
                          {answers.urgency === 4 && "Dringend"}
                          {answers.urgency === 5 && "Sehr dringend"}
                        </span>
                      </div>
                      <p className="text-xs text-ink/60 mt-1">
                        Das hilft uns, Therapeut:innen mit kürzeren Wartezeiten höher zu zeigen.
                      </p>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={answers.urgency}
                        onChange={(event) =>
                          setAnswers((prev) => ({
                            ...prev,
                            urgency: Number(event.target.value)
                          }))
                        }
                        className="mt-2 w-full"
                      />
                      <div className="flex justify-between text-xs text-ink/50 mt-1">
                        <span>Keine Eile</span>
                        <span>Sehr dringend</span>
                      </div>
                      {answers.urgency >= 4 && (
                        <div className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-900">
                          <p className="font-semibold">Brauchst du sofortige Hilfe?</p>
                          <p className="mt-1">
                            Wenn es dir sehr schlecht geht: <a href="tel:142" className="underline font-semibold">142</a> (Telefonseelsorge, 24h)
                            oder <a href="tel:01-31330" className="underline font-semibold">01/31330</a> (Psychiatrische Soforthilfe Wien).
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl bg-white/70 p-4 space-y-4">
                <p className="text-sm font-semibold">Oder wähle Schnellstart-Themen</p>
                <p className="text-xs text-ink/60">Mehrere auswählen möglich - so bekommst du Empfehlungen für alle Themen.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {quickProfiles.map((profile) => {
                    const isSelected = selectedQuickProfiles.includes(profile.id);
                    return (
                      <button
                        key={profile.id}
                        onClick={() => toggleQuickProfile(profile.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          isSelected
                            ? "border-orange bg-lavender/30"
                            : "border-ink/10 bg-white hover:border-ink/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-sm font-semibold">{profile.title}</p>
                            <p className="mt-2 text-xs text-ink/70">{profile.description}</p>
                          </div>
                          {isSelected && (
                            <span className="flex-shrink-0 w-5 h-5 bg-orange text-white rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {selectedQuickProfiles.length > 0 && (
                  <p className="text-xs text-ink/60">
                    {selectedQuickProfiles.length} Thema{selectedQuickProfiles.length > 1 ? "n" : ""} ausgewählt
                  </p>
                )}
                <div className="rounded-2xl bg-lavender/20 px-3 py-2 text-xs text-ink/70">
                  Nicht sicher, was du brauchst? Kein Problem - starte einfach und schau, wer zu dir passen könnte.
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={applyGentleStart}
                    className="rounded-full border border-ink/20 bg-white px-4 py-2 text-xs font-semibold"
                  >
                    Einfach mal schauen
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleMatch}
                    className="rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white"
                  >
                    Zeig mir Empfehlungen
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-full border border-ink/20 bg-white px-5 py-2 text-sm font-semibold"
                  >
                    Mehr angeben
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl bg-lavender/20 px-4 py-3 text-sm text-ink/80">
              Nur wenn du magst: Hier kannst du gezielt verfeinern.
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-sm font-semibold">Stil</p>
                <p className="text-xs text-ink/60">Nur auswählen, wenn dir das wichtig ist.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {styleOptions.map((style) => (
                    <button
                      key={style}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          therapistStyle: toggleValue(style, prev.therapistStyle)
                        }))
                      }
                      className={`rounded-full border px-3 py-1 text-xs ${
                        answers.therapistStyle.includes(style)
                          ? "border-orange bg-lavender/30"
                          : "border-ink/10 bg-white"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-sm font-semibold">Verfügbarkeit</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {availabilityDays.map((day) => (
                    <button
                      key={day}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            days: toggleValue(day, prev.availability.days)
                          }
                        }))
                      }
                      className={`rounded-full border px-3 py-1 text-xs ${
                        answers.availability.days.includes(day)
                          ? "border-orange bg-lavender/30"
                          : "border-ink/10 bg-white"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {availabilityTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            times: toggleValue(time, prev.availability.times)
                          }
                        }))
                      }
                      className={`rounded-full border px-3 py-1 text-xs ${
                        answers.availability.times.includes(time)
                          ? "border-orange bg-lavender/30"
                          : "border-ink/10 bg-white"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/70 p-4 space-y-4">
              <div>
                <p className="text-sm font-semibold">Sprache</p>
                <select
                  value={answers.preferences.language}
                  onChange={(event) =>
                    setAnswers((prev) => ({
                      ...prev,
                      preferences: { ...prev.preferences, language: event.target.value }
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-ink/20 bg-white px-3 py-2 text-sm"
                >
                  {languageOptions.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm">
                  <span className="font-semibold">Stadt / Region</span>
                  <select
                    value={answers.preferences.district}
                    onChange={(event) =>
                      setAnswers((prev) => ({
                        ...prev,
                        preferences: { ...prev.preferences, district: event.target.value }
                      }))
                    }
                    className="mt-2 w-full rounded-2xl border border-ink/20 bg-white px-3 py-2"
                  >
                    {districtOptions.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm">
                  <span className="font-semibold">Max. Distanz (km)</span>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    value={answers.preferences.maxDistanceKm}
                    onChange={(event) =>
                      setAnswers((prev) => ({
                        ...prev,
                        preferences: { ...prev.preferences, maxDistanceKm: Number(event.target.value) }
                      }))
                    }
                    className="mt-2 w-full"
                  />
                  <span className="text-xs text-ink/60">{answers.preferences.maxDistanceKm} km</span>
                </label>
              </div>
            </div>

            <button
              onClick={() => setShowAdvanced((prev) => !prev)}
              className="rounded-full border border-ink/20 bg-white px-4 py-2 text-xs font-semibold"
            >
              {showAdvanced ? "Harte Filter ausblenden" : "Harte Filter anzeigen (nur wenn sehr wichtig)"}
            </button>

            {showAdvanced && (
              <div className="rounded-2xl bg-white/70 p-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold">Dealbreaker</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dealbreakerOptions.map((dealbreaker) => (
                      <button
                        key={dealbreaker.id}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            dealbreakers: toggleValue(dealbreaker.id, prev.dealbreakers)
                          }))
                        }
                        className={`rounded-full border px-3 py-1 text-xs ${
                          answers.dealbreakers.includes(dealbreaker.id)
                            ? "border-orange bg-lavender/30"
                            : "border-ink/10 bg-white"
                        }`}
                      >
                        {dealbreaker.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold">Wie streng sollen die Kriterien sein?</p>
                  <p className="text-xs text-ink/60 mt-1">Strikt zeigt nur exakte Treffer, Entdecken zeigt auch ähnliche.</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      { id: "strict", label: "Nur exakte Treffer" },
                      { id: "explore", label: "Auch Ähnliche zeigen" }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            matchingMode: mode.id as typeof prev.matchingMode
                          }))
                        }
                        className={`rounded-full border px-3 py-1 text-xs ${
                          answers.matchingMode === mode.id
                            ? "border-orange bg-lavender/30"
                            : "border-ink/10 bg-white"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold">Freitext (optional)</p>
                  <textarea
                    value={answers.concernsText}
                    onChange={(event) =>
                      setAnswers((prev) => ({
                        ...prev,
                        concernsText: event.target.value
                      }))
                    }
                    rows={3}
                    className="mt-2 w-full rounded-2xl border border-ink/20 bg-white px-3 py-2 text-sm"
                    placeholder="Optional: Details, die dir wichtig sind."
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <div className="fixed bottom-4 left-0 right-0 z-30">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-ink/20 bg-white/90 px-4 py-3 shadow-soft backdrop-blur">
            <button
              onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
              disabled={step === 0}
              className="rounded-full border border-ink/20 bg-white px-5 py-2 text-sm font-semibold disabled:opacity-40"
            >
              Zurück
            </button>
            <div className="flex items-center gap-2 text-xs text-ink/70">
              Schritt {step + 1} von {steps.length}
              <span className="hidden sm:inline">| {matchSnapshot.availableCount} Therapeut:innen gefunden</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {step < lastStepIndex && (
                <button
                  onClick={() => setStep((prev) => Math.min(prev + 1, lastStepIndex))}
                  className="rounded-full border border-ink/20 bg-white px-4 py-2 text-xs font-semibold"
                >
                  Mehr angeben
                </button>
              )}
              <button
                onClick={handleMatch}
                className="rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white"
              >
                Empfehlungen ansehen
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-ink/60">
        Hinweis: Diese Demo ersetzt keine medizinische Beratung.
      </div>

      <Link href="/results" className="text-xs text-ink/70 underline">
        Ergebnisse direkt ansehen
      </Link>
    </div>
  );
}
