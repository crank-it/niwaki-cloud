'use client'

import { X, Heart, MapPin, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface GardenPopupProps {
  garden: {
    id: string
    name: string
    description: string | null
    latitude: number
    longitude: number
    photo_url: string | null
    vote_count: number
    is_featured?: boolean
  }
  onClose: () => void
}

export function GardenPopup({ garden, onClose }: GardenPopupProps) {
  return (
    <div className="absolute top-4 left-4 w-80 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="relative">
        {garden.photo_url ? (
          <img
            src={garden.photo_url}
            alt={garden.name}
            className="w-full h-32 object-cover"
          />
        ) : (
          <div className="w-full h-32 bg-stone-100 flex items-center justify-center">
            <span className="text-4xl">🌳</span>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        {garden.is_featured && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-600 text-white text-xs rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-stone-800 mb-1">{garden.name}</h3>
        {garden.description && (
          <p className="text-sm text-stone-600 mb-3 line-clamp-2">{garden.description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{garden.vote_count} votes</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{garden.latitude.toFixed(2)}, {garden.longitude.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/gardens/${garden.id}`}
            className="flex-1 btn-primary text-center text-sm py-1.5"
          >
            View Details
          </Link>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${garden.latitude},${garden.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm py-1.5 px-3"
            title="Get directions"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
