"use client";

import { useState } from "react";
import type { SyntheticEvent } from "react";
import type { MatchResult } from "../lib/types";
import {
  formatAvailability,
  formatAvailabilityCoverage,
  formatDistance,
  formatInsurance,
  formatSetting,
  normalizePhotoSrc
} from "../lib/utils";

type MatchCardProps = {
  result: MatchResult;
  rank: number;
  isShortlisted: boolean;
  isMaybe: boolean;
  onShortlist: (id: string) => void;
  onMaybe: (id: string) => void;
  onExclude: (id: string, reason: string) => void;
  onToggleCompare: (id: string) => void;
  compareSelected: boolean;
  compareDisabled: boolean;
};

const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const target = event.currentTarget;
  if (target.dataset.fallback) return;
  target.dataset.fallback = "true";
  target.src = "/therapist-placeholder.svg";
};

const scoreLabel = (score: number) => {
  if (score >= 85) return "Sehr gut";
  if (score >= 70) return "Gut";
  if (score >= 55) return "Solide";
  if (score >= 40) return "Ok";
  return "Niedrig";
};

export const MatchCard = ({
  result,
  rank,
  isShortlisted,
  isMaybe,
  onShortlist,
  onMaybe,
  onExclude,
  onToggleCompare,
  compareSelected,
  compareDisabled
}: MatchCardProps) => {
  const [reason, setReason] = useState("");
  const { therapist, explanation, distanceKm } = result;

  return (
    <div className="card p-5 animate-fade-up">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex flex-1 items-start gap-4">
          <img
            src={normalizePhotoSrc(therapist.photo)}
            alt={`Foto von ${therapist.name}`}
            onError={handleImageError}
            className="h-20 w-20 rounded-2xl border border-ink/10 object-cover bg-white/80"
            loading="lazy"
          />
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-ink/50">#{rank} Empfehlung</p>
                <h3 className="text-xl font-semibold">{therapist.name}</h3>
                <p className="text-sm text-ink/70">
                  {therapist.verfahren} · {therapist.bezirk}
                </p>
              </div>
              <div className="text-right space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink/50">Passung</p>
                  <p className="text-lg font-semibold text-ink">{scoreLabel(explanation.score)}</p>
                </div>
                <label
                  className={`inline-flex items-center gap-2 text-xs text-ink/60 ${
                    compareDisabled ? "opacity-50" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={compareSelected}
                    disabled={compareDisabled}
                    onChange={() => onToggleCompare(therapist.id)}
                  />
                  Vergleichen
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="pill">Setting: {formatSetting(therapist.setting)}</span>
              <span className="pill">Distanz: {formatDistance(distanceKm)}</span>
              <span className="pill">Termin: ca. {therapist.nextAvailableDays} Tage</span>
              <span className="pill">{formatAvailabilityCoverage(result.availability)}</span>
              <span className="pill">{formatInsurance(therapist.kasse)}</span>
            </div>

            <div className="text-sm text-ink/80">
              <p>{explanation.reasons[0] ?? "Gute Passung zu deinen Kriterien."}</p>
              <p className="mt-1 text-xs text-ink/60">
                Trade-off: {explanation.tradeoffs[0] ?? "Keine auffälligen Nachteile."}
              </p>
            </div>

            <details className="rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm">
              <summary className="cursor-pointer text-xs font-semibold text-ink/60">
                Details anzeigen
              </summary>
              <div className="mt-3 grid gap-4 text-sm text-ink/80">
                <div className="flex flex-wrap gap-3 text-xs text-ink/60">
                  <span>Score: {explanation.score}</span>
                  <span>Abdeckung: {explanation.confidence}%</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink/50">Warum passt es?</p>
                  <ul className="mt-2 list-disc pl-4 space-y-1">
                    {explanation.reasons.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink/50">Mögliche Trade-offs</p>
                  <ul className="mt-2 list-disc pl-4 space-y-1">
                    {explanation.tradeoffs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs text-ink/60">
                  <p>{formatAvailabilityCoverage(result.availability)}</p>
                  <p>Nächster Termin: ca. {therapist.nextAvailableDays} Tage</p>
                  <p>Verfügbarkeit: {formatAvailability(therapist.availability)}</p>
                  <p>Sprachen: {therapist.sprache.join(", ")}</p>
                  <p>Schwerpunkte: {therapist.schwerpunkte.slice(0, 4).join(", ")}</p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-white/80 p-3 text-xs">
                  <p className="text-xs uppercase tracking-wide text-ink/50">Ausblenden</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <input
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      placeholder="Optionaler Grund"
                      className="flex-1 rounded-xl border border-ink/20 bg-white px-3 py-2 text-xs"
                    />
                    <button
                      onClick={() => onExclude(therapist.id, reason)}
                      className="rounded-full border border-ink/20 bg-white px-3 py-2 text-xs font-semibold"
                    >
                      Ausblenden
                    </button>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:w-44 lg:flex-col">
          <button
            onClick={() => onShortlist(therapist.id)}
            className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
              isShortlisted ? "bg-orange text-white" : "bg-white border border-ink/20"
            }`}
          >
            👍 Passt
          </button>
          <button
            onClick={() => onMaybe(therapist.id)}
            className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
              isMaybe ? "bg-amber-400 text-amber-950" : "bg-white border border-ink/20"
            }`}
          >
            🤔 Vielleicht
          </button>
        </div>
      </div>
    </div>
  );
};
