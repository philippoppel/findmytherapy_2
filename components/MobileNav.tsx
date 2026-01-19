"use client";

import { useState } from "react";
import Link from "next/link";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button - nur auf Mobile */}
      <button
        className="md:hidden p-2 -mr-2 rounded-lg hover:bg-ink/5 transition"
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
        fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        md:hidden
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl tracking-tight">
              <span className="text-ink font-bold">findmy</span>
              <span className="font-medium" style={{ color: "#8579b7" }}>therapy</span>
            </span>
            <button
              className="p-2 -mr-2 rounded-lg hover:bg-ink/5 transition"
              onClick={() => setIsOpen(false)}
              aria-label="Menü schließen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1">
            <Link
              href="/patient"
              className="block py-3 px-4 rounded-xl text-base font-medium hover:bg-lavender/30 hover:text-orange transition"
              onClick={() => setIsOpen(false)}
            >
              Hilfe finden
            </Link>
            <Link
              href="/results"
              className="block py-3 px-4 rounded-xl text-base font-medium hover:bg-lavender/30 hover:text-orange transition"
              onClick={() => setIsOpen(false)}
            >
              Meine Therapeut:innen
            </Link>
            <Link
              href="/compare"
              className="block py-3 px-4 rounded-xl text-base font-medium hover:bg-lavender/30 hover:text-orange transition"
              onClick={() => setIsOpen(false)}
            >
              Vergleichen
            </Link>
          </nav>

          <div className="mt-8 pt-6 border-t border-ink/10">
            <Link
              href="/patient"
              className="block w-full text-center bg-orange text-white rounded-full px-4 py-3 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Jetzt starten
            </Link>
          </div>

          <div className="mt-8 p-4 bg-lavender/20 rounded-xl">
            <p className="text-xs text-ink/70">
              <span className="font-semibold">In einer Krise?</span>
              <br />
              <a href="tel:142" className="underline">142</a> (Telefonseelsorge)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
