import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen -mt-10 px-6 pt-20 pb-24 overflow-hidden min-h-[85vh] flex items-center">
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
          <div className="absolute inset-0 bg-gradient-to-b from-beige/95 via-beige/90 to-beige/96" />
        </div>

        {/* Decorative blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange/25 to-yellow/20 rounded-full blur-3xl" />
          <div className="absolute top-16 -left-24 w-72 h-72 bg-gradient-to-br from-lavender/20 to-beige/20 rounded-full blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Finde Therapeut:innen, die zu dir passen
          </h1>
          <p className="text-xl text-ink/80 max-w-lg mx-auto">
            Ehrliche Empfehlungen, ohne Anmeldung, in deinem Tempo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/patient"
              className="rounded-full bg-orange px-8 py-4 text-base font-semibold text-white shadow-lift transition hover:brightness-110"
            >
              Jetzt starten
            </Link>
          </div>
          <p className="text-sm text-ink/50">Kostenlos und anonym</p>
        </div>
      </section>

      {/* How it works - 3 Steps */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-lavender/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-xl font-semibold text-orange">1</span>
          </div>
          <h3 className="text-lg font-semibold">Erzähl kurz, was du suchst</h3>
          <p className="mt-2 text-ink/70">
            Ein paar Fragen oder ein Schnellstart - du entscheidest.
          </p>
        </div>
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-lavender/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-xl font-semibold text-orange">2</span>
          </div>
          <h3 className="text-lg font-semibold">Sieh, wer passt</h3>
          <p className="mt-2 text-ink/70">
            Mit Erklärungen, warum - und ehrlichen Hinweisen, wenn etwas nicht ideal ist.
          </p>
        </div>
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-lavender/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-xl font-semibold text-orange">3</span>
          </div>
          <h3 className="text-lg font-semibold">Nimm Kontakt auf</h3>
          <p className="mt-2 text-ink/70">
            Vergleiche in Ruhe und nutze unsere fertige Kontakt-Vorlage.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="card p-8 max-w-2xl mx-auto text-center">
        <p className="text-lg text-ink/80 italic">
          "Die Seite hat mir geholfen, den Überblick zu bekommen. Am Ende hatte ich drei Namen und wusste, warum die zu mir passen könnten."
        </p>
        <p className="mt-4 text-sm text-ink/50">- Lisa, 29, Wien</p>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-6 pb-8">
        <h2 className="text-2xl font-semibold">Bereit für den ersten Schritt?</h2>
        <Link
          href="/patient"
          className="inline-block rounded-full bg-orange px-8 py-4 text-base font-semibold text-white shadow-lift transition hover:brightness-110"
        >
          Therapeut:in finden
        </Link>
        <p className="text-sm text-ink/50">
          Keine Anmeldung · Daten bleiben lokal · Jederzeit abbrechen
        </p>
      </section>
    </div>
  );
}
