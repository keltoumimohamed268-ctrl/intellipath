import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="site-container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold text-white">
          <span className="text-orange-500">Intelli</span>Path
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/" className="dark-button">
            Accueil
          </Link>
          <Link href="/subjects" className="dark-button">
            Matières
          </Link>
        </nav>
      </div>
    </header>
  )
}