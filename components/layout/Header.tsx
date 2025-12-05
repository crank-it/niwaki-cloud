'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface NavGroup {
  character: string
  label: string
  items: { name: string; href: string; description?: string }[]
}

const navigationGroups: NavGroup[] = [
  {
    character: '学',
    label: 'Learn',
    items: [
      { name: 'Species Guide', href: '/species', description: 'Comprehensive guides for niwaki trees' },
      { name: 'Techniques', href: '/techniques', description: 'Pruning methods and approaches' },
      { name: 'History', href: '/history', description: '1000 years of cloud pruning' },
    ],
  },
  {
    character: '探',
    label: 'Explore',
    items: [
      { name: 'Discover Gardens', href: '/discover', description: 'Map, rankings & community gardens' },
      { name: 'Featured Gardens', href: '/gardens', description: 'World-renowned niwaki locations' },
    ],
  },
  {
    character: '創',
    label: 'Create',
    items: [
      { name: 'AI Visualiser', href: '/visualizer', description: 'See your garden transformed' },
      { name: 'Submit Garden', href: '/submit', description: 'Share your niwaki with the world' },
    ],
  },
  {
    character: '具',
    label: 'Tools',
    items: [
      { name: 'Resources', href: '/resources', description: 'Books, courses & organisations' },
      { name: 'Equipment', href: '/tools', description: 'Recommended tools & suppliers' },
    ],
  },
]

function NavDropdown({ group, isActive }: { group: NavGroup; isActive: boolean }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex flex-col items-center px-3 py-1 transition-colors group ${
          isActive ? 'text-white' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <span className="text-2xl font-light leading-none">{group.character}</span>
        <span className="text-[10px] tracking-wide flex items-center gap-0.5">
          {group.label}
          <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-stone-800 border border-stone-700 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="py-2">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 hover:bg-stone-700 transition-colors"
              >
                <span className="block text-sm text-white">{item.name}</span>
                {item.description && (
                  <span className="block text-xs text-stone-400 mt-0.5">{item.description}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.publicMetadata?.role === 'moderator'

  const isGroupActive = (group: NavGroup) => {
    return group.items.some(item => pathname.startsWith(item.href))
  }

  return (
    <header className="bg-stone-900 text-stone-100 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start hover:opacity-80 transition-opacity">
            <span className="text-xl font-light tracking-[0.3em]">niwaki</span>
            <span className="text-[9px] text-stone-500 tracking-widest -mt-1">雲の形</span>
          </Link>

          {/* Desktop Navigation - Character Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationGroups.map((group) => (
              <NavDropdown
                key={group.character}
                group={group}
                isActive={isGroupActive(group)}
              />
            ))}
            {isAdmin && (
              <Link
                href="/admin/moderation"
                className={`flex flex-col items-center px-3 py-1 transition-colors ${
                  pathname.startsWith('/admin') ? 'text-white' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span className="text-2xl font-light leading-none">管</span>
                <span className="text-[10px] tracking-wide">Admin</span>
              </Link>
            )}
          </nav>

          {/* Auth & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            {isSignedIn ? (
              <>
                <Link href="/profile" className="hidden sm:block text-sm text-stone-400 hover:text-white transition-colors">
                  Profile
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm text-stone-400 hover:text-white transition-colors">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn-primary text-sm py-1.5">
                    Join
                  </button>
                </SignUpButton>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-stone-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-stone-800">
            {navigationGroups.map((group) => (
              <div key={group.character} className="mb-4">
                <div className="flex items-center gap-2 px-2 mb-2">
                  <span className="text-xl text-stone-500">{group.character}</span>
                  <span className="text-xs uppercase tracking-widest text-stone-500">{group.label}</span>
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2 px-4 text-sm transition-colors ${
                        pathname.startsWith(item.href) ? 'text-white bg-stone-800' : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {isAdmin && (
              <div className="pt-4 border-t border-stone-800">
                <Link
                  href="/admin/moderation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-4 text-sm text-stone-400 hover:text-white"
                >
                  <span className="text-stone-500 mr-2">管</span>
                  Admin Panel
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
