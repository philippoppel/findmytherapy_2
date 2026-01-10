"use client";

import Link from "next/link";
import { CompareTable } from "../../components/CompareTable";
import { runMatching } from "../../lib/matching";
import { useAppStore } from "../../lib/store";

export default function ComparePage() {
  const { answers, therapists, compareList, hasHydrated } = useAppStore();

  if (!hasHydrated) {
    return <div className="card p-6">Lade Vergleich...</div>;
  }

  const matches = runMatching(answers, therapists).filter((match) => compareList.includes(match.therapist.id));

  if (compareList.length < 2) {
    return (
      <div className="card p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Therapeut:innen vergleichen</h1>
        <p className="text-sm text-ink/70">
          Wähle mindestens zwei Therapeut:innen aus, um sie zu vergleichen.
        </p>
        <Link href="/results" className="rounded-full border border-ink/20 bg-white px-4 py-2 text-sm">
          Zurück zu den Empfehlungen
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Dein Vergleich</h1>
        <p className="text-sm text-ink/70">
          Schau dir die Unterschiede in Ruhe an - so findest du heraus, wer am besten passt.
        </p>
      </header>

      <CompareTable matches={matches} answers={answers} />

      <Link href="/results" className="text-sm text-ink/70 underline">
        Weitere Therapeut:innen ansehen
      </Link>
    </div>
  );
}
