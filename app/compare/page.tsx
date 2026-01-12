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
      <div className="card p-8 max-w-2xl mx-auto text-center space-y-6">
        {/* Animierte Illustration */}
        <div className="relative w-56 h-36 mx-auto">
          <div className="absolute left-0 w-16 h-20 bg-lavender/30 rounded-xl animate-pulse" />
          <div className="absolute left-1/2 -translate-x-1/2 w-16 h-20 bg-lavender/60 rounded-xl border-2 border-lavender" />
          <div className="absolute right-0 w-16 h-20 bg-lavender/30 rounded-xl animate-pulse" />
          {/* Verbindungslinien */}
          <div className="absolute top-1/2 left-[20%] w-[25%] h-0.5 bg-ink/20" />
          <div className="absolute top-1/2 right-[20%] w-[25%] h-0.5 bg-ink/20" />
          {/* Pfeil */}
          <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 text-orange animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">Vergleiche bis zu 3 Therapeut:innen</h1>
          <p className="mt-2 text-sm text-ink/70">
            Sieh dir die Unterschiede auf einen Blick an - so findest du heraus, wer am besten zu dir passt.
          </p>
        </div>

        <div className="bg-beige/50 rounded-xl p-5 text-left">
          <p className="text-sm font-semibold mb-3">So geht's:</p>
          <ol className="space-y-3 text-sm text-ink/70">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-orange text-white rounded-full flex items-center justify-center text-xs font-semibold">1</span>
              <span>Gehe zu deinen <Link href="/results" className="text-orange underline font-medium">Empfehlungen</Link></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-orange text-white rounded-full flex items-center justify-center text-xs font-semibold">2</span>
              <span>Aktiviere bei interessanten Profilen das Häkchen "Vergleichen"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-orange text-white rounded-full flex items-center justify-center text-xs font-semibold">3</span>
              <span>Komm hierher zurück und sieh den Vergleich</span>
            </li>
          </ol>
        </div>

        {compareList.length === 1 && (
          <div className="bg-lavender/20 rounded-xl p-4 text-sm text-ink/70">
            <p className="font-medium text-ink">Fast geschafft!</p>
            <p className="mt-1">Du hast 1 Profil ausgewählt. Wähle noch mindestens 1 weiteres aus.</p>
          </div>
        )}

        <Link
          href="/results"
          className="inline-block bg-orange text-white rounded-full px-6 py-3 font-semibold hover:bg-orange/90 transition"
        >
          Zu meinen Empfehlungen
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
