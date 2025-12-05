import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-500">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-lg font-light tracking-widest text-white hover:text-stone-300 transition-colors">
              niwaki
            </Link>
            <p className="text-xs text-stone-600 mt-1">
              雲の形 — The shape of clouds
            </p>
          </div>

          {/* Legal */}
          <div className="flex items-center gap-6 text-xs">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">
              Terms
            </Link>
            <span className="text-stone-600">
              © {new Date().getFullYear()} niwaki.cloud
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
