export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black/60">
      <div className="site-container py-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-zinc-300">
            Nom Prénom : KELTOUMI Mohamed
          </p>
          <p className="text-sm text-zinc-400">
            Contact : intellipath2022@gmail.com
          </p>
        </div>

        <p className="text-sm text-zinc-500">
          © 2026 IntelliPath
        </p>
      </div>
    </footer>
  )
}