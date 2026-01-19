import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "FindMyTherapy - Hilfe finden, die zu dir passt",
  description: "Für Patient:innen: Finde Therapeut:innen, die wirklich zu dir passen. Ehrlich, transparent, in deinem Tempo.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="text-ink">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">{children}</main>
        <footer className="border-t border-ink/10 bg-white/60">
          <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-ink/70">
            Hinweis für Patient:innen: Keine medizinische Beratung.
          </div>
        </footer>
      </body>
    </html>
  );
}
