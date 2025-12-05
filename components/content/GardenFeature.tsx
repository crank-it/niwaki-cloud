import Link from 'next/link'
import { MapPin, ExternalLink } from 'lucide-react'
import type { GardenContent } from '@/types'

interface GardenFeatureProps {
  garden: GardenContent
}

export function GardenFeature({ garden }: GardenFeatureProps) {
  const location = [garden.location.city, garden.location.country].filter(Boolean).join(', ')

  return (
    <Link
      href={`/gardens/${garden.slug}`}
      className="card group hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-stone-800 group-hover:text-stone-900">
            {garden.name}
          </h3>
          <p className="text-xs text-stone-400">{garden.japaneseName}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-600" />
      </div>

      <p className="text-sm text-stone-600 line-clamp-3 mb-3">{garden.description}</p>

      <div className="flex items-center gap-1 text-xs text-stone-500">
        <MapPin className="w-3.5 h-3.5" />
        <span>{location}</span>
      </div>

      {garden.highlights.length > 0 && (
        <div className="mt-3 pt-3 border-t border-stone-100">
          <ul className="text-xs text-stone-500 space-y-1">
            {garden.highlights.slice(0, 3).map((highlight, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-stone-400">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Link>
  )
}
