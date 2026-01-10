"use client";

import Link from "next/link";
import { useState } from "react";

export const SiteHeader = () => {
  const [showCrisis, setShowCrisis] = useState(true);

  return (
    <>
      {/* Krisenhinweis - dezent aber sichtbar */}
      {showCrisis && (
        <div className="bg-lavender/40 border-b border-lavender text-ink/80 text-xs py-2 px-4">
          <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
            <p>
              <span className="font-medium">In einer akuten Krise?</span>{" "}
              <a href="tel:142" className="underline font-semibold">142</a> (Telefonseelsorge) |{" "}
              <a href="tel:01-31330" className="underline font-semibold">01/31330</a> (Psychiatrische Soforthilfe Wien) |{" "}
              <a href="tel:147" className="underline font-semibold">147</a> (Rat auf Draht, unter 18)
            </p>
            <button
              onClick={() => setShowCrisis(false)}
              className="text-ink/50 hover:text-ink/80 text-lg leading-none"
              aria-label="Hinweis schließen"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 border-b border-ink/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo-icon.jpeg" alt="" className="h-10 w-auto" />
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-ink">FindMy</span>
          <span className="text-orange">Therapy</span>
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/patient" className="hover:text-orange transition">
          Hilfe finden
        </Link>
        <Link href="/results" className="hover:text-orange transition">
          Meine Therapeut:innen
        </Link>
        <Link href="/compare" className="hover:text-orange transition">
          Therapeut:innen vergleichen
        </Link>
        <Link href="/patient" className="hover:text-orange transition">
          So funktioniert's
        </Link>
      </nav>
    </div>
  </header>
    </>
  );
};
