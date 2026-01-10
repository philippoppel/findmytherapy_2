import type { MatchResult, PatientAnswers } from "../lib/types";
import type { SyntheticEvent } from "react";
import { formatDistance, formatSetting, normalizePhotoSrc } from "../lib/utils";

const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const target = event.currentTarget;
  if (target.dataset.fallback) return;
  target.dataset.fallback = "true";
  target.src = "/therapist-placeholder.svg";
};

const buildRecommendations = (matches: MatchResult[], answers: PatientAnswers) => {
  const suggestions: string[] = [];
  const onlinePick = matches.find((match) => match.therapist.setting.includes("online"));
  const praxisPick = matches.find((match) => match.therapist.setting.includes("praxis"));
  const kassePick = matches.find((match) => match.therapist.kasse);

  if (answers.preferences.setting === "online" && onlinePick) {
    suggestions.push(`Wenn dir Online wichtig ist: ${onlinePick.therapist.name}.`);
  }
  if (answers.preferences.setting === "praxis" && praxisPick) {
    suggestions.push(`Wenn dir Präsenz wichtig ist: ${praxisPick.therapist.name}.`);
  }
  if (answers.insurance === "kasse" && kassePick) {
    suggestions.push(`Wenn dir Kasse wichtig ist: ${kassePick.therapist.name}.`);
  }
  if (answers.therapistStyle.includes("empathisch")) {
    const empathetic = matches.find((match) => match.therapist.stilTags.includes("empathisch"));
    if (empathetic) {
      suggestions.push(`Wenn dir empathischer Stil wichtig ist: ${empathetic.therapist.name}.`);
    }
  }

  if (!suggestions.length && matches[0]) {
    suggestions.push(`Wenn du schnell starten willst: ${matches[0].therapist.name}.`);
  }

  return suggestions.slice(0, 3);
};

type CompareTableProps = {
  matches: MatchResult[];
  answers: PatientAnswers;
};

export const CompareTable = ({ matches, answers }: CompareTableProps) => {
  const recommendations = buildRecommendations(matches, answers);
  const columns = matches.length;

  const highlightIfDifferent = (values: string[]) => {
    const unique = new Set(values);
    return unique.size > 1;
  };

  const settingValues = matches.map((match) => formatSetting(match.therapist.setting));
  const distanceValues = matches.map((match) => formatDistance(match.distanceKm));
  const nextValues = matches.map((match) => `${match.therapist.nextAvailableDays} Tage`);
  const insuranceValues = matches.map((match) => (match.therapist.kasse ? "Kasse" : "Privat"));

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-semibold">Direktvergleich</h2>
      <p className="text-sm text-ink/70">2-3 Profile nebeneinander, Unterschiede hervorgehoben.</p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-ink/60">
              <th className="py-2 pr-4">Merkmal</th>
              {matches.map((match) => (
                <th key={match.therapist.id} className="py-2 pr-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={normalizePhotoSrc(match.therapist.photo)}
                      alt={`Foto von ${match.therapist.name}`}
                      onError={handleImageError}
                      className="h-10 w-10 rounded-xl border border-ink/10 object-cover"
                    />
                    <span>{match.therapist.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 pr-4 font-medium">Score</td>
              {matches.map((match) => (
                <td key={match.therapist.id} className="py-3 pr-6">
                  {match.explanation.score}
                </td>
              ))}
            </tr>
            <tr className={highlightIfDifferent(settingValues) ? "bg-amber-50" : ""}>
              <td className="py-3 pr-4 font-medium">Setting</td>
              {settingValues.map((value, index) => (
                <td key={`${value}-${index}`} className="py-3 pr-6">
                  {value}
                </td>
              ))}
            </tr>
            <tr className={highlightIfDifferent(insuranceValues) ? "bg-amber-50" : ""}>
              <td className="py-3 pr-4 font-medium">Kasse</td>
              {insuranceValues.map((value, index) => (
                <td key={`${value}-${index}`} className="py-3 pr-6">
                  {value}
                </td>
              ))}
            </tr>
            <tr className={highlightIfDifferent(nextValues) ? "bg-amber-50" : ""}>
              <td className="py-3 pr-4 font-medium">Nächster Termin</td>
              {nextValues.map((value, index) => (
                <td key={`${value}-${index}`} className="py-3 pr-6">
                  {value}
                </td>
              ))}
            </tr>
            <tr className={highlightIfDifferent(distanceValues) ? "bg-amber-50" : ""}>
              <td className="py-3 pr-4 font-medium">Distanz</td>
              {distanceValues.map((value, index) => (
                <td key={`${value}-${index}`} className="py-3 pr-6">
                  {value}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium">Stil</td>
              {matches.map((match) => (
                <td key={match.therapist.id} className="py-3 pr-6">
                  {match.therapist.stilTags.join(", ")}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 pr-4 font-medium">Schwerpunkte</td>
              {matches.map((match) => (
                <td key={match.therapist.id} className="py-3 pr-6">
                  {match.therapist.schwerpunkte.slice(0, 4).join(", ")}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl bg-lavender/20 p-4">
        <p className="text-xs uppercase tracking-wide text-ink/60">Empfehlung</p>
        <ul className="mt-2 space-y-1 text-sm text-ink/80">
          {recommendations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {columns < 3 && (
          <p className="mt-2 text-xs text-ink/60">Du kannst bis zu 3 Profile vergleichen.</p>
        )}
      </div>
    </div>
  );
};
