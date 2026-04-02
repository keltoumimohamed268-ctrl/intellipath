import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center">
      <div className="site-container py-16">
        <section className="glass-card p-8 md:p-14">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1 text-sm text-orange-300">
              IntelliPath
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
              Apprenez les <span className="text-orange-500">Mathématiques</span> et l’
              <span className="text-orange-400"> Intelligence Artificielle</span>
              <br />
              dans une plateforme élégante.
            </h1>

            <p className="mt-6 max-w-2xl text-base md:text-lg text-zinc-300 leading-8">
              IntelliPath organise vos cours par matières, chapitres et PDF pour
              une expérience simple, moderne et efficace.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/subjects" className="orange-button">
                Voir les matières
              </Link>

              <Link href="/subjects" className="dark-button">
                Explorer la plateforme
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}