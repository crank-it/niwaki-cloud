'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  items: {
    name: string
    href: string
    ja?: string
  }[]
  className?: string
}

export function Navigation({ items, className = '' }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className={`flex items-center gap-4 ${className}`}>
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              text-sm transition-colors
              ${isActive
                ? 'text-stone-900 font-medium'
                : 'text-stone-500 hover:text-stone-700'
              }
            `}
          >
            {item.ja && (
              <span className="block text-[10px] text-stone-400">{item.ja}</span>
            )}
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
