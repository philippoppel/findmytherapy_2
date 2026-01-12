"use client";

import { useState } from "react";
import { glossary } from "../lib/glossary";

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
}

export const GlossaryTerm = ({ term, children }: GlossaryTermProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const definition = glossary[term];

  // Wenn kein Eintrag im Glossar, einfach den Text zurückgeben
  if (!definition) {
    return <>{children ?? term}</>;
  }

  return (
    <span className="relative inline-block">
      <button
        className="underline decoration-dotted decoration-ink/40 hover:decoration-orange cursor-help transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {children ?? term}
      </button>

      {isOpen && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white rounded-xl shadow-lg border border-ink/10 z-50 text-left">
          <span className="block font-semibold text-sm text-ink">{definition.title}</span>
          <span className="block text-xs text-ink/70 mt-1 leading-relaxed">{definition.description}</span>
          {/* Pfeil */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-ink/10" />
        </span>
      )}
    </span>
  );
};
