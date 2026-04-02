import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center bg-white p-10 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          IntelliPath
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Plateforme d’apprentissage en Mathématiques et Intelligence Artificielle.
        </p>

        <Link
          href="/subjects"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Voir les matières
        </Link>
      </div>
    </main>
  )
}