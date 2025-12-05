'use client'

import { MARKER_COLORS } from '@/lib/mapbox'

interface MapMarkerProps {
  isFeatured?: boolean
  onClick?: () => void
}

export function MapMarker({ isFeatured = false, onClick }: MapMarkerProps) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center transition-transform hover:scale-110"
      style={{ backgroundColor: isFeatured ? MARKER_COLORS.featured : MARKER_COLORS.default }}
    >
      <span className="text-white text-xs">🌳</span>
    </button>
  )
}
