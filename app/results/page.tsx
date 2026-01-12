"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ContactModal } from "../../components/ContactModal";
import { MatchCard } from "../../components/MatchCard";
import { Toast } from "../../components/Toast";
import { computeAnalytics } from "../../lib/analytics";
import { priorityOptions } from "../../lib/data/options";
import { runMatching, sortMatches } from "../../lib/matching";
import { useAppStore } from "../../lib/store";

export default function ResultsPage() {
  const {
    answers,
    therapists,
    shortlist,
    maybe,
    excluded,
    toggleShortlist,
    toggleMaybe,
    excludeCandidate,
    clearExcluded,
    toggleCompare,
    compareList,
    setCompareList,
    hasHydrated,
    toast,
    hideToast
  } = useAppStore();
  const [sortBy, setSortBy] = useState<"score" | "next" | "distance">(answers.matchPriority);
  const [onlyKasse, setOnlyKasse] = useState(false);
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedTherapistName, setSelectedTherapistName] = useState("");

  useEffect(() => {
    if (!hasHydrated) return;
    setSortBy(answers.matchPriority);
  }, [answers.matchPriority, hasHydrated]);

  const matches = useMemo(() => runMatching(answers, therapists), [answers, therapists]);

  const hardExcluded = matches.filter((match) => match.excluded);
  const visibleMatches = matches.filter((match) => !match.excluded);

  const filtered = useMemo(
    () =>
      visibleMatches.filter((match) => {
        if (onlyKasse && !match.therapist.kasse) return false;
        if (onlyOnline && !match.therapist.setting.includes("online")) return false;
        if (excluded[match.therapist.id]) return false;
        return true;
      }),
    [excluded, onlyKasse, onlyOnline, visibleMatches]
  );

  const sorted = useMemo(() => sortMatches(filtered, sortBy), [filtered, sortBy]);
  const topMatches = sorted.slice(0, 3);
  const remainingMatches = sorted.slice(3);

  const priorityMeta =
    priorityOptions.find((option) => option.id === answers.matchPriority) ??
    priorityOptions[0];

  const profileHighlights = [
    answers.concerns.length ? `${answers.concerns.length} Anliegen` : null,
    answers.preferences.setting !== "egal" ? `Setting: ${answers.preferences.setting}` : null,
    answers.insurance !== "egal" ? `Kasse: ${answers.insurance}` : null,
    answers.preferences.language ? `Sprache: ${answers.preferences.language}` : null,
    answers.preferences.maxDistanceKm ? `Distanz: ${answers.preferences.maxDistanceKm} km` : null
  ].filter((item): item is string => Boolean(item));

  const shortlistItems = shortlist
    .map((id) => matches.find((match) => match.therapist.id === id))
    .filter(Boolean);
  const maybeItems = maybe.map((id) => matches.find((match) => match.therapist.id === id)).filter(Boolean);

  const manualExcluded = Object.entries(excluded).map(([id, entry]) => {
    const match = matches.find((item) => item.therapist.id === id);
    return {
      id,
      name: match?.therapist.name ?? id,
      reason: entry.reason
    };
  });

  const compareMatches = compareList
    .map((id) => matches.find((match) => match.therapist.id === id))
    .filter((match): match is typeof matches[number] => Boolean(match));
  const compareReady = compareList.length >= 2;
  const compareFull = compareList.length >= 3;
  const confidence = matches[0]?.explanation.confidence ?? 0;
  const availabilityPreferenceLabel = useMemo(() => {
    const days = answers.availability.days;
    const times = answers.availability.times;
    if (!days.length && !times.length) return "Flexibel";
    const dayLabel = days.length ? days.join(", ") : "Alle Tage";
    const timeLabel = times.length ? times.join(", ") : "Alle Zeiten";
    return `${dayLabel} · ${timeLabel}`;
  }, [answers.availability.days, answers.availability.times]);

  const waitStats = useMemo(() => {
    const values = filtered.map((match) => match.therapist.nextAvailableDays).sort((a, b) => a - b);
    if (values.length === 0) return null;
    const fastest = values[0];
    const median = values[Math.floor(values.length / 2)];
    return { fastest, median };
  }, [filtered]);

  const contactTemplate = useMemo(() => {
    const nameLine = answers.displayName.trim() ? `Hallo, ich bin ${answers.displayName.trim()}.` : "Hallo,";
    const goalLine = answers.primaryGoal.trim()
      ? `Ich suche Unterstützung bei: ${answers.primaryGoal.trim()}.`
      : "Ich suche aktuell einen Platz für Psychotherapie.";
    const availabilityLine =
      availabilityPreferenceLabel === "Flexibel"
        ? "Zeitlich bin ich flexibel."
        : `Meine bevorzugten Zeiten: ${availabilityPreferenceLabel}.`;
    const insuranceLine =
      answers.insurance === "egal"
        ? "Kassa oder Privat ist für mich ok."
        : answers.insurance === "kasse"
        ? "Ich suche einen Kassenplatz."
        : "Ich suche privat/selbstzahlend.";
    return [
      nameLine,
      goalLine,
      availabilityLine,
      insuranceLine,
      "Gibt es aktuell freie Kapazitäten für ein Erstgespräch?",
      "Danke und liebe Grüße"
    ].join("\n");
  }, [
    answers.displayName,
    answers.primaryGoal,
    answers.insurance,
    availabilityPreferenceLabel
  ]);

  const reasonAnalytics = useMemo(() => computeAnalytics(filtered), [filtered]);
  const topTradeoffs = useMemo(() => {
    const tradeoffCounts = new Map<string, number>();
    filtered.forEach((match) => {
      match.explanation.tradeoffs.forEach((tradeoff) => {
        if (!tradeoff) return;
        tradeoffCounts.set(tradeoff, (tradeoffCounts.get(tradeoff) ?? 0) + 1);
      });
    });
    return Array.from(tradeoffCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([tradeoff, count]) => ({ tradeoff, count }));
  }, [filtered]);
  const topMatchLabel = () => {
    // Für den besten Match immer positives Label verwenden
    return "Beste Passung";
  };

  const handleShortlistWithModal = (id: string) => {
    const isAlreadyShortlisted = shortlist.includes(id);
    toggleShortlist(id);

    // Nur Modal öffnen wenn neu hinzugefügt wird
    if (!isAlreadyShortlisted) {
      const match = matches.find((m) => m.therapist.id === id);
      if (match) {
        setSelectedTherapistName(match.therapist.name);
        setContactModalOpen(true);
      }
    }
  };

  if (!hasHydrated) {
    return <div className="card p-6">Lade Ergebnisse...</div>;
  }

  return (
    <div className="space-y-10">
      {/* Emotionale Bestätigung */}
      <div className="rounded-2xl bg-gradient-to-r from-lavender/40 to-lavender/20 border border-lavender px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💜</div>
          <div>
            <p className="text-lg font-semibold text-ink">
              {answers.displayName ? `${answers.displayName}, d` : "D"}u hast einen wichtigen Schritt gemacht.
            </p>
            <p className="mt-1 text-sm text-ink/70">
              Dir Hilfe zu suchen erfordert Mut. Egal wie es weitergeht - allein dass du hier bist, zählt.
            </p>
          </div>
        </div>
      </div>

      <header className="card p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink/60">Deine Empfehlungen</p>
            <h1 className="text-3xl font-semibold">Menschen, die zu dir passen könnten</h1>
            <p className="text-sm text-ink/70">
              Sortiert nach dem, was dir wichtig ist. Schau in Ruhe - es gibt keinen Zeitdruck.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/patient"
              className="rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white"
            >
              Suche anpassen
            </Link>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-xs uppercase tracking-wide text-ink/60">Passende Profile</p>
            <p className="mt-2 text-3xl font-semibold">{visibleMatches.length}</p>
            <p className="text-xs text-ink/60">
              Hard-Filter ausgeschlossen: {hardExcluded.length}
            </p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-xs uppercase tracking-wide text-ink/60">Dein Fokus</p>
            <p className="mt-2 text-lg font-semibold">{priorityMeta.label}</p>
            <p className="text-xs text-ink/60">{priorityMeta.description}</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-xs uppercase tracking-wide text-ink/60">Bester Match</p>
            {sorted[0] ? (
              <div className="mt-2 space-y-1 text-sm text-ink/80">
                <p className="font-semibold">{sorted[0].therapist.name}</p>
                <p>
                  Passung {topMatchLabel()} · Termin ca. {sorted[0].therapist.nextAvailableDays} Tage
                </p>
              </div>
            ) : (
              <p className="mt-2 text-sm text-ink/60">Noch keine Treffer.</p>
            )}
          </div>
        </div>
        {filtered.length <= 3 && (
          <div className="rounded-2xl border border-ink/10 bg-white/80 p-4 text-sm text-ink/70">
            <p className="font-semibold text-ink">Mehr Auswahl möglich</p>
            <p className="mt-2">
              Aktuell siehst du {filtered.length} Profil{filtered.length === 1 ? "" : "e"}.
              Wenn du mehr Optionen möchtest, kannst du Distanz, Setting oder Kassa leicht öffnen.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="pill">Setting: egal</span>
              <span className="pill">Kasse: egal</span>
              <span className="pill">Distanz erweitern</span>
            </div>
          </div>
        )}
      </header>

      <div className="sticky top-4 z-20">
        <div className="card p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={onlyKasse} onChange={() => setOnlyKasse(!onlyKasse)} />
                Nur Kasse
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={onlyOnline} onChange={() => setOnlyOnline(!onlyOnline)} />
                Nur Online
              </label>
              <label className="flex items-center gap-2">
                Sortieren
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
                  className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs"
                >
                  <option value="score">Höchster Score</option>
                  <option value="next">Nächster Termin</option>
                  <option value="distance">Geringste Distanz</option>
                </select>
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink/70">
              <span>Vergleich: {compareList.length}/3</span>
              {compareList.length > 0 && (
                <button
                  onClick={() => setCompareList([])}
                  className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs"
                >
                  Leeren
                </button>
              )}
              <Link
                href="/compare"
                className={`rounded-full border border-ink/20 bg-white px-3 py-1 text-xs font-semibold ${
                  compareReady ? "" : "pointer-events-none opacity-50"
                }`}
                aria-disabled={!compareReady}
              >
                Vergleichen
              </Link>
              {compareFull && (
                <span className="text-xs text-ink/60">Max. 3 Profile</span>
              )}
            </div>
          </div>
          {compareMatches.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs">
              {compareMatches.map((match) => (
                <span key={match.therapist.id} className="pill">
                  {match.therapist.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">Unsere Top-Empfehlungen für dich</h2>
                <p className="text-sm text-ink/60">
                  {topMatches.length} von {visibleMatches.length} Therapeut:innen
                </p>
              </div>
              <p className="text-xs text-ink/60">Schau sie dir in Ruhe an.</p>
            </div>
            <div className="mt-4 space-y-4">
              {topMatches.length === 0 ? (
                <div className="card-muted p-4 text-sm text-ink/70">
                  Keine Matches nach den aktuellen Kriterien. Passe deine Angaben im Fragebogen an.
                </div>
              ) : (
                topMatches.map((match, index) => (
                  <MatchCard
                    key={match.therapist.id}
                    result={match}
                    rank={index + 1}
                    isShortlisted={shortlist.includes(match.therapist.id)}
                    isMaybe={maybe.includes(match.therapist.id)}
                    onShortlist={handleShortlistWithModal}
                    onMaybe={toggleMaybe}
                    onExclude={excludeCandidate}
                    onToggleCompare={toggleCompare}
                    compareSelected={compareList.includes(match.therapist.id)}
                    compareDisabled={compareFull && !compareList.includes(match.therapist.id)}
                  />
                ))
              )}
            </div>
          </section>

          <section className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Weitere Ergebnisse</h2>
              </div>
              <p className="text-sm text-ink/60">Alle weiteren Profile in der Reihenfolge.</p>
            </div>

            <div className="mt-4 space-y-4">
              {remainingMatches.length === 0 ? (
                <div className="card-muted p-4 text-sm text-ink/70">
                  Keine weiteren Profile nach den aktuellen Filtern.
                </div>
              ) : (
                remainingMatches.map((match, index) => (
                  <MatchCard
                    key={match.therapist.id}
                    result={match}
                    rank={index + topMatches.length + 1}
                    isShortlisted={shortlist.includes(match.therapist.id)}
                    isMaybe={maybe.includes(match.therapist.id)}
                    onShortlist={handleShortlistWithModal}
                    onMaybe={toggleMaybe}
                    onExclude={excludeCandidate}
                    onToggleCompare={toggleCompare}
                    compareSelected={compareList.includes(match.therapist.id)}
                    compareDisabled={compareFull && !compareList.includes(match.therapist.id)}
                  />
                ))
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="card p-5 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/60">Dein Profil</p>
              <h2 className="mt-2 text-xl font-semibold">
                {answers.displayName ? `Hi ${answers.displayName}` : "Hi"}
              </h2>
              <p className="mt-2 text-sm text-ink/70">
                {answers.primaryGoal.trim()
                  ? `Ziel: ${answers.primaryGoal}`
                  : "Kein Ziel hinterlegt. Das verbessert die Passung."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {profileHighlights.length > 0 ? (
                profileHighlights.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-xs text-ink/60">Noch keine Highlights gesetzt.</span>
              )}
            </div>
          </div>

          <div className="card p-5 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/60">Erstkontakt-Vorlage</p>
              <p className="mt-2 text-sm text-ink/70">
                Kurz, freundlich und sofort versandbereit. Du kannst sie direkt kopieren.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/80 p-3 text-sm text-ink/70 whitespace-pre-line">
              {contactTemplate}
            </div>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(contactTemplate);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch {
                  setCopied(false);
                }
              }}
              className="rounded-full border border-ink/20 bg-white px-3 py-2 text-xs font-semibold"
            >
              {copied ? "Kopiert!" : "Vorlage kopieren"}
            </button>
          </div>

          <div className="card p-5 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/60">Terminlage</p>
              <p className="mt-2 text-sm text-ink/70">
                {waitStats
                  ? `Schnellste Option: ca. ${waitStats.fastest} Tage. Median: ${waitStats.median} Tage.`
                  : "Noch keine Daten für eine Termin-Einschätzung."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="pill">Zeitfenster: {availabilityPreferenceLabel}</span>
              <span className="pill">Fokus: {priorityMeta.label}</span>
            </div>
          </div>

          <div className="card p-5 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/60">Warum diese Reihenfolge?</p>
              <p className="mt-2 text-sm text-ink/70">
                Fokus: {priorityMeta.label}. Der Score gewichtet Anliegen, Stil und praktische Umsetzbarkeit.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/50">Häufigste Gründe</p>
              {reasonAnalytics.topReasons.length > 0 ? (
                <ul className="mt-2 space-y-1 text-sm text-ink/70">
                  {reasonAnalytics.topReasons.slice(0, 3).map((item) => (
                    <li key={item.reason}>
                      {item.reason} ({item.count})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-ink/60">Noch keine Gründe sichtbar.</p>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/50">Typische Trade-offs</p>
              {topTradeoffs.length > 0 ? (
                <ul className="mt-2 space-y-1 text-sm text-ink/70">
                  {topTradeoffs.map((item) => (
                    <li key={item.tradeoff}>
                      {item.tradeoff} ({item.count})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-ink/60">Aktuell keine Trade-offs.</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="pill">Passgenauigkeit: {confidence}%</span>
              <span className="pill">{filtered.length} Therapeut:innen</span>
            </div>
          </div>

          <div className="card p-5">
            <p className="text-xs uppercase tracking-wide text-ink/60">Merkliste</p>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-ink/70">
              <span>Passt: {shortlistItems.length}</span>
              <span>Vielleicht: {maybeItems.length}</span>
            </div>
            {shortlistItems.length || maybeItems.length ? (
              <ul className="mt-3 space-y-1 text-sm">
                {shortlistItems.slice(0, 4).map((match) => (
                  <li key={match?.therapist.id}>{match?.therapist.name}</li>
                ))}
                {maybeItems.slice(0, 2).map((match) => (
                  <li key={match?.therapist.id}>{match?.therapist.name}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-ink/60">Noch keine Favoriten gesetzt.</p>
            )}
          </div>

        </aside>
      </section>

      {manualExcluded.length > 0 && (
        <details className="card p-6">
          <summary className="cursor-pointer text-sm font-semibold text-ink/70">
            Manuell ausgeschlossen ({manualExcluded.length})
          </summary>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            {manualExcluded.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-2">
                <span>
                  {item.name} {item.reason ? `- Grund: ${item.reason}` : ""}
                </span>
                <button
                  onClick={() => clearExcluded(item.id)}
                  className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs"
                >
                  Rückgängig
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}

      <section className="card p-6">
        <h2 className="text-xl font-semibold">Wie geht's weiter?</h2>
        <p className="mt-2 text-sm text-ink/70">
          Nimm dir die Zeit, die du brauchst. Es gibt keinen Druck.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-sm font-semibold">Vergleichen</p>
            <p className="text-xs text-ink/60 mt-1">Schau dir 2-3 Profile nebeneinander an.</p>
            <Link href="/compare" className="mt-2 inline-block rounded-full border border-ink/20 bg-white px-3 py-1 text-xs">
              Zum Vergleich
            </Link>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-sm font-semibold">Suche anpassen</p>
            <p className="text-xs text-ink/60 mt-1">Ändere deine Angaben, wenn nötig.</p>
            <Link href="/patient" className="mt-2 inline-block rounded-full border border-ink/20 bg-white px-3 py-1 text-xs">
              Zur Suche
            </Link>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-sm font-semibold">Kontakt aufnehmen</p>
            <p className="text-xs text-ink/60 mt-1">Nutze unsere Vorlage für die erste Nachricht.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-2 rounded-full border border-ink/20 bg-white px-3 py-1 text-xs"
            >
              Nach oben
            </button>
          </div>
        </div>
      </section>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        therapistName={selectedTherapistName}
        contactTemplate={contactTemplate}
      />
    </div>
  );
}
