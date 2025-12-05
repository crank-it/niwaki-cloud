import Link from 'next/link'

const footerLinks = {
  learn: [
    { name: 'Species Guide', href: '/species' },
    { name: 'Techniques', href: '/techniques' },
    { name: 'History', href: '/history' },
    { name: 'Featured Gardens', href: '/gardens' },
  ],
  community: [
    { name: 'Community Map', href: '/map' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Submit a Garden', href: '/submit' },
  ],
  resources: [
    { name: 'AI Visualiser', href: '/visualizer' },
    { name: 'External Resources', href: '/resources' },
    { name: 'Tools & Products', href: '/tools' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-light tracking-widest text-white hover:text-stone-300 transition-colors">
              niwaki
            </Link>
            <p className="mt-2 text-sm text-stone-500">
              雲の形
            </p>
            <p className="mt-1 text-xs text-stone-600">
              The shape of clouds
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-4">Learn</h3>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} niwaki.cloud. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-stone-600 hover:text-stone-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-stone-600 hover:text-stone-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
