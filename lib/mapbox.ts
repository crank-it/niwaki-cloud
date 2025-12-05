// Mapbox configuration and utilities

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// Monochrome style that matches the Japanese aesthetic
export const MAP_STYLE = 'mapbox://styles/mapbox/light-v11'

// Default map center (roughly center of populated world)
export const DEFAULT_CENTER: [number, number] = [0, 30]
export const DEFAULT_ZOOM = 2

// Map bounds for clustering
export const CLUSTER_RADIUS = 50
export const CLUSTER_MAX_ZOOM = 14

// Custom marker colors matching the stone palette
export const MARKER_COLORS = {
  default: '#292524', // stone-800
  featured: '#059669', // emerald-600
  cluster: '#57534e', // stone-600
}

export interface MapMarkerData {
  id: string
  name: string
  latitude: number
  longitude: number
  photoUrl?: string
  voteCount: number
  isFeatured?: boolean
}

/**
 * Format coordinates for display
 */
export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S'
  const lngDir = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`
}

/**
 * Calculate distance between two points (Haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`
  } else if (km < 10) {
    return `${km.toFixed(1)}km`
  } else {
    return `${Math.round(km)}km`
  }
}
