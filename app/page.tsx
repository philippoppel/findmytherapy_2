import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section with Background Video */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen -mt-10 px-6 pt-16 pb-20 overflow-hidden min-h-screen flex items-center">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <video
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://videos.pexels.com/video-files/5234724/5234724-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          {/* Video Overlay - warm paper tint for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-beige/95 via-beige/90 to-beige/96" />
        </div>

        {/* Decorative blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange/25 to-yellow/20 rounded-full blur-3xl" />
          <div className="absolute top-16 -left-24 w-72 h-72 bg-gradient-to-br from-lavender/20 to-beige/20 rounded-full blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="pill w-fit">Du bist hier richtig</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Den ersten Schritt zu machen ist mutig. Wir helfen dir dabei.
            </h1>
            <p className="text-lg text-ink/80">
              Finde Therapeut:innen, die wirklich zu dir passen -
              in deinem Tempo, ohne Druck, mit ehrlichen Empfehlungen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/patient"
                className="rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-lift transition hover:brightness-110"
              >
                Ich möchte Hilfe finden
              </Link>
              <Link
                href="#das-sagen-andere"
                className="rounded-full border border-ink/20 bg-beige/80 backdrop-blur px-6 py-3 text-sm font-semibold text-ink shadow-soft transition hover:border-ink/40"
              >
                Mehr erfahren
              </Link>
            </div>
            <p className="text-sm text-ink/60">Kostenlos, anonym, keine Anmeldung nötig.</p>
          </div>
          <div className="relative">
            <img
              src="/illustrations/compass.svg"
              alt="Illustration Orientierung"
              className="absolute -bottom-6 -right-4 h-24 w-24"
            />
          </div>
        </div>
      </section>

      <section className="card p-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/60">Sicherheit</p>
          <h2 className="mt-2 text-2xl font-semibold">Deine Daten bleiben bei dir</h2>
          <p className="mt-2 text-sm text-ink/70">
            Alles passiert lokal in deinem Browser. Keine Registrierung, keine Speicherung auf Servern.
          </p>
        </div>
        <ul className="space-y-2 text-sm text-ink/75">
          <li>Du siehst immer, warum jemand empfohlen wird.</li>
          <li>Ehrliche Hinweise auf mögliche Nachteile.</li>
          <li>Dein Tempo, deine Entscheidung.</li>
          <li>Jederzeit abbrechen oder pausieren.</li>
        </ul>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Verstanden werden",
            text: "Du siehst genau, warum jemand zu dir passen könnte - und was vielleicht nicht ideal ist."
          },
          {
            title: "In deinem Tempo",
            text: "Starte mit zwei Fragen oder geh tiefer. Du entscheidest, wie viel du teilen möchtest."
          },
          {
            title: "Klarheit bekommen",
            text: "Vergleiche Therapeut:innen direkt und finde heraus, wer sich richtig anfühlt."
          }
        ].map((item, index) => (
          <div key={item.title} className="card p-6">
            <img
              src={index === 0 ? "/illustrations/conversation.svg" : index === 1 ? "/illustrations/journey.svg" : "/illustrations/insight.svg"}
              alt=""
              className="h-16 w-16"
            />
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-ink/70">{item.text}</p>
          </div>
        ))}
      </section>

      <section id="das-sagen-andere" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-8">
          <p className="text-xs uppercase tracking-wide text-ink/60">Das sagen andere</p>
          <h2 className="mt-2 text-2xl font-semibold">"Endlich hatte ich das Gefühl, nicht allein zu sein."</h2>
          <p className="mt-4 text-sm text-ink/75">
            Ich hab lange gezögert, mir Hilfe zu suchen. Die Seite hat mir geholfen,
            den Überblick zu bekommen. Keine komplizierten Formulare, keine Wartelisten-Angst.
            Einfach schauen, wer passen könnte.
          </p>
          <p className="mt-4 text-sm text-ink/75">
            Am Ende hatte ich drei Namen und wusste, warum die zu mir passen könnten.
            Die fertige Nachricht zum Kopieren hat mir echt geholfen - ich hätte sonst
            ewig gegrübelt, was ich schreiben soll.
          </p>
          <p className="mt-4 text-sm font-medium text-ink/60">- Lisa, 29, Wien</p>
        </div>
        <div className="space-y-4">
          <div className="card p-6">
            <p className="text-sm font-semibold">Was anderen geholfen hat</p>
            <ul className="mt-3 space-y-2 text-sm text-ink/75">
              <li>Sofort sehen, ob Kassenplatz oder Distanz passen.</li>
              <li>Verstehen, warum jemand empfohlen wird.</li>
              <li>Ehrliche Hinweise, wenn etwas nicht perfekt passt.</li>
              <li>Die fertige Kontakt-Nachricht zum Kopieren.</li>
            </ul>
          </div>
          <div className="card p-6">
            <p className="text-sm font-semibold">Ein Schritt nach dem anderen</p>
            <ul className="mt-3 space-y-2 text-sm text-ink/75">
              <li>Du musst nicht alles auf einmal entscheiden.</li>
              <li>Speichere Favoriten und vergleiche in Ruhe.</li>
              <li>Komm zurück, wann immer du bereit bist.</li>
              <li>Kein Zeitdruck, keine Verpflichtung.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="so-funktionierts" className="card p-8">
        <h2 className="text-2xl font-semibold">So einfach geht's</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/70 p-4">
            <img src="/illustrations/journey.svg" alt="" className="h-10 w-10" />
            <p className="text-sm font-semibold">1. Erzähl uns kurz, was du suchst</p>
            <p className="mt-2 text-sm text-ink/70">
              Ein paar Fragen genügen. Du musst nicht alles wissen oder perfekt formulieren.
            </p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <img src="/illustrations/insight.svg" alt="" className="h-10 w-10" />
            <p className="text-sm font-semibold">2. Wir zeigen dir, wer passen könnte</p>
            <p className="mt-2 text-sm text-ink/70">
              Mit ehrlichen Erklärungen - nicht nur wer passt, sondern auch warum und was vielleicht nicht ideal ist.
            </p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <img src="/illustrations/conversation.svg" alt="" className="h-10 w-10" />
            <p className="text-sm font-semibold">3. Du entscheidest in deinem Tempo</p>
            <p className="mt-2 text-sm text-ink/70">
              Speichere Favoriten, vergleiche in Ruhe, und wenn du bereit bist: Wir haben eine Kontakt-Vorlage für dich.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
