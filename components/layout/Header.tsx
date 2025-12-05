'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Visualiser', href: '/visualizer', ja: '視覚化' },
  { name: 'Map', href: '/map', ja: '地図' },
  { name: 'Species', href: '/species', ja: '樹種' },
  { name: 'Techniques', href: '/techniques', ja: '技法' },
  { name: 'Gardens', href: '/gardens', ja: '庭園' },
]

export function Header() {
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.publicMetadata?.role === 'moderator'

  return (
    <header className="bg-stone-900 text-stone-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="text-lg font-light tracking-widest hover:text-stone-300 transition-colors">
            niwaki
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    isActive ? 'text-white' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span className="block text-[10px] text-stone-500">{item.ja}</span>
                  <span>{item.name}</span>
                </Link>
              )
            })}
            {isAdmin && (
              <Link
                href="/admin/moderation"
                className={`text-sm transition-colors ${
                  pathname.startsWith('/admin') ? 'text-white' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span className="block text-[10px] text-stone-500">管理</span>
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Auth */}
          <div className="flex items-center space-x-3">
            {isSignedIn ? (
              <>
                <Link href="/submit" className="hidden sm:block btn-primary text-sm py-1.5">
                  Submit Garden
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
              className="md:hidden p-2 text-stone-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-stone-800">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm transition-colors ${
                      isActive ? 'text-white' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="text-[10px] text-stone-500 mr-2">{item.ja}</span>
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              {isSignedIn && (
                <Link
                  href="/submit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm text-stone-400 hover:text-stone-200"
                >
                  <span className="text-[10px] text-stone-500 mr-2">投稿</span>
                  <span>Submit Garden</span>
                </Link>
              )}
              {isAdmin && (
                <Link
                  href="/admin/moderation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm text-stone-400 hover:text-stone-200"
                >
                  <span className="text-[10px] text-stone-500 mr-2">管理</span>
                  <span>Admin</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
