"use client";

import { useState } from "react";
import { Modal } from "./Modal";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  therapistName: string;
  contactTemplate: string;
}

export const ContactModal = ({
  isOpen,
  onClose,
  therapistName,
  contactTemplate
}: ContactModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contactTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback für Browser ohne Clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = contactTemplate;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-5">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Super Wahl!</h2>
          <p className="mt-2 text-sm text-ink/70">
            So kannst du {therapistName} kontaktieren:
          </p>
        </div>

        <div className="bg-beige/50 rounded-xl p-4">
          <p className="text-xs text-ink/60 mb-2 font-medium">Kopiere diese Nachricht:</p>
          <pre className="whitespace-pre-wrap text-sm text-ink/80 leading-relaxed">
            {contactTemplate}
          </pre>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className={`flex-1 rounded-full px-5 py-3 font-semibold transition ${
              copied
                ? "bg-green-600 text-white"
                : "bg-orange text-white hover:bg-orange/90"
            }`}
          >
            {copied ? "Kopiert!" : "Nachricht kopieren"}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-full border border-ink/20 text-sm font-semibold hover:bg-ink/5 transition"
          >
            Später
          </button>
        </div>

        <div className="bg-lavender/20 rounded-xl p-4 text-sm text-ink/70">
          <p className="font-medium text-ink mb-1">Nächste Schritte:</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Kopiere die Nachricht oben</li>
            <li>Suche nach {therapistName} auf deren Website oder Google</li>
            <li>Sende die Nachricht per E-Mail oder Kontaktformular</li>
          </ol>
          <p className="mt-3 text-xs text-ink/60">
            Die meisten Therapeut:innen antworten innerhalb von 2-3 Tagen.
          </p>
        </div>
      </div>
    </Modal>
  );
};
