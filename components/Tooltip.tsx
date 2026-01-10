import React from "react";

export const Tooltip = ({ text }: { text: string }) => (
  <span className="relative group inline-flex items-center gap-2 text-xs text-ink/70">
    <span className="underline decoration-dotted">Warum fragen wir das?</span>
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-orange/30 text-xs font-semibold text-orange">
      ?
    </span>
    <span className="absolute left-1/2 top-8 w-56 -translate-x-1/2 rounded-xl bg-white px-3 py-2 text-xs text-ink shadow-soft opacity-0 transition group-hover:opacity-100">
      {text}
    </span>
  </span>
);
