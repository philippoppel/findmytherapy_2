"use client";

import { useEffect, useMemo, useState } from "react";
import type { MatchResult } from "../lib/types";
import { priorityOptions } from "../lib/data/options";
import { useAppStore } from "../lib/store";
import type { SyntheticEvent } from "react";
import {
  formatAvailabilityCoverage,
  formatDistance,
  formatInsurance,
  formatSetting,
  normalizePhotoSrc
} from "../lib/utils";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const notesStorageKey = "psy-matching-chat-notes";

const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const target = event.currentTarget;
  if (target.dataset.fallback) return;
  target.dataset.fallback = "true";
  target.src = "/therapist-placeholder.svg";
};

const buildIntro = (name: string, focusLabel: string, topMatches: MatchResult[]) => {
  if (topMatches.length === 0) {
    return "Schön, dass du hier bist. Gerade finde ich keine passenden Therapeut:innen mit deinen aktuellen Kriterien. Sollen wir gemeinsam schauen, was wir anpassen könnten?";
  }
  return `Hallo${name ? ` ${name}` : ""}! Wie geht es dir gerade?\n\nIch bin hier, um dir bei der Suche zu helfen. Ich habe ${topMatches.length} Therapeut:innen gefunden, die zu dir passen könnten.\n\nMöchtest du, dass ich dir ein paar davon vorstelle? Oder hast du Fragen?`;
};

const buildLocalReply = (name: string, focusLabel: string, topMatches: MatchResult[]) => {
  if (topMatches.length === 0) {
    return "Gerade finde ich keine passenden Therapeut:innen mit deinen Kriterien. Wollen wir gemeinsam schauen, was wir anpassen könnten - zum Beispiel die Entfernung oder das Setting?";
  }
  const [first, second] = topMatches;
  const lines = [
    `Danke${name ? `, ${name}` : ""}! Lass mich dir ein paar Vorschläge machen:`,
    "",
    `${first.therapist.name} könnte gut passen: ${first.explanation.reasons[0] ?? "Gute fachliche Passung."}`,
    second ? `\n${second.therapist.name} wäre auch eine Option: ${second.explanation.reasons[0] ?? "Passender Stil."}` : null,
    first.explanation.tradeoffs[0] ? `\nWas du wissen solltest: ${first.explanation.tradeoffs[0]}` : null,
    "",
    "Soll ich dir mehr über eine dieser Personen erzählen?"
  ].filter((line) => line !== null);
  return lines.join("\n");
};

type ChatMatchingProps = {
  topMatches: MatchResult[];
  visibleCount: number;
};

export const ChatMatching = ({ topMatches, visibleCount }: ChatMatchingProps) => {
  const {
    answers,
    shortlist,
    maybe,
    excluded,
    toggleShortlist,
    toggleMaybe,
    excludeCandidate,
    clearExcluded
  } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [hasSavedNotes, setHasSavedNotes] = useState(false);

  const focusLabel =
    priorityOptions.find((option) => option.id === answers.matchPriority)?.label ?? "Beste Passung";
  const name = answers.displayName.trim();
  const intro = useMemo(() => buildIntro(name, focusLabel, topMatches), [name, focusLabel, topMatches]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 0) {
        return [{ id: createId(), role: "assistant", content: intro }];
      }
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ id: createId(), role: "assistant", content: intro }];
      }
      return prev;
    });
  }, [intro]);

  useEffect(() => {
    const storedNotes = localStorage.getItem(notesStorageKey);
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(notesStorageKey, notes);
    setHasSavedNotes(notes.trim().length > 0);
  }, [notes]);

  const promptChips = [
    "Ich weiß nicht, wo ich anfangen soll",
    "Wer passt am besten zu mir?",
    "Worauf sollte ich achten?",
    "Hilf mir, mich zu entscheiden"
  ];

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const nextMessages = [...messages, { id: createId(), role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          answers,
          topMatches: topMatches.slice(0, 5).map((match) => ({
            name: match.therapist.name,
            score: match.explanation.score,
            reasons: match.explanation.reasons,
            tradeoffs: match.explanation.tradeoffs,
            confidence: match.explanation.confidence
          }))
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "AI-Chat nicht verfügbar.");
      }

      setMessages((prev) => [...prev, { id: createId(), role: "assistant", content: data.reply ?? "" }]);
    } catch (err) {
      const fallback = buildLocalReply(name, focusLabel, topMatches);
      setMessages((prev) => [...prev, { id: createId(), role: "assistant", content: fallback }]);
      setError(err instanceof Error ? err.message : "AI-Chat nicht verfügbar.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Dein Begleiter</h2>
            <p className="text-xs text-ink/60">
              Ich helfe dir, die richtige Entscheidung für dich zu finden.
            </p>
          </div>
          <button
            onClick={() => setMessages([{ id: createId(), role: "assistant", content: intro }])}
            className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs font-semibold"
          >
            Neustart
          </button>
        </div>

        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                message.role === "assistant"
                  ? "bg-lavender/30 text-ink"
                  : "bg-white border border-ink/10"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>

        {error && <p className="text-xs text-rose-900">Hinweis: {error}</p>}

        <div className="flex flex-wrap gap-2">
          {promptChips.map((chip) => (
            <button
              key={chip}
              onClick={() => sendMessage(chip)}
              className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="flex items-end gap-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Schreib mir, was dich beschäftigt oder frag mich etwas..."
            rows={2}
            className="flex-1 rounded-2xl border border-ink/20 bg-white px-3 py-2 text-sm"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage(input);
              }
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isSending}
            className="rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isSending ? "..." : "Senden"}
          </button>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-white/70 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-ink/60">Chat-Notizen</p>
            {hasSavedNotes && <span className="text-xs text-ink/50">Automatisch gespeichert</span>}
          </div>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Notiere hier, was dir wichtig ist oder welche Profile du kontaktieren willst."
            rows={3}
            className="w-full rounded-2xl border border-ink/20 bg-white px-3 py-2 text-sm"
          />
          <button
            onClick={() => {
              const blob = new Blob([notes], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "chat-notizen.txt";
              document.body.appendChild(link);
              link.click();
              link.remove();
              URL.revokeObjectURL(url);
            }}
            className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs font-semibold"
          >
            Notizen exportieren
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-4">
          <p className="text-xs uppercase tracking-wide text-ink/60">Kontext</p>
          <p className="mt-1 text-sm text-ink/70">
            Matches sichtbar: {visibleCount} | Fokus: {focusLabel}
          </p>
          {answers.primaryGoal.trim() && (
            <p className="mt-2 text-sm text-ink/70">Ziel: {answers.primaryGoal}</p>
          )}
        </div>

        <div className="card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Top Empfehlungen</h3>
            <span className="text-xs text-ink/60">{topMatches.length} Profile</span>
          </div>
          {topMatches.slice(0, 3).map((match) => (
            <div
              key={match.therapist.id}
              className="rounded-2xl border border-ink/10 bg-white/80 p-3 space-y-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={normalizePhotoSrc(match.therapist.photo)}
                  alt={`Foto von ${match.therapist.name}`}
                  onError={handleImageError}
                  className="h-12 w-12 rounded-2xl border border-ink/10 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{match.therapist.name}</p>
                  <p className="text-xs text-ink/60">
                    Score {match.explanation.score} | {formatSetting(match.therapist.setting)}
                  </p>
                </div>
              </div>
              <div className="text-xs text-ink/70">
                <p>{match.explanation.reasons[0]}</p>
                <p className="mt-1">Trade-off: {match.explanation.tradeoffs[0]}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-ink/70">
                <span>{formatDistance(match.distanceKm)}</span>
                <span>{formatInsurance(match.therapist.kasse)}</span>
                <span>Termin: ca. {match.therapist.nextAvailableDays} Tage</span>
                <span>{formatAvailabilityCoverage(match.availability)}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleShortlist(match.therapist.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    shortlist.includes(match.therapist.id)
                      ? "bg-orange text-white"
                      : "border border-ink/20 bg-white"
                  }`}
                >
                  👍 Passt
                </button>
                <button
                  onClick={() => toggleMaybe(match.therapist.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    maybe.includes(match.therapist.id)
                      ? "bg-amber-400 text-amber-950"
                      : "border border-ink/20 bg-white"
                  }`}
                >
                  🤔 Vielleicht
                </button>
                {excluded[match.therapist.id] ? (
                  <button
                    onClick={() => clearExcluded(match.therapist.id)}
                    className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-900"
                  >
                    Rückgängig
                  </button>
                ) : (
                  <button
                    onClick={() => excludeCandidate(match.therapist.id, "Nicht passend")}
                    className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs font-semibold"
                  >
                    ❌ Eher nicht
                  </button>
                )}
              </div>
            </div>
          ))}
          {topMatches.length === 0 && (
            <p className="text-sm text-ink/60">Aktuell keine passenden Profile.</p>
          )}
        </div>
      </div>
    </section>
  );
};
