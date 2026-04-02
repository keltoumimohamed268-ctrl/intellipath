export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black/60">
      <div className="site-container py-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-zinc-400">
          © 2026 IntelliPath. Tous droits réservés.
        </p>

        <p className="text-sm text-zinc-500">
          Mathématiques • Intelligence Artificielle
        </p>
      </div>
    </footer>
  )
}