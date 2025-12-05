'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { createClient } from '@/lib/supabase/client'
import { MAPBOX_TOKEN, MAP_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM, MARKER_COLORS } from '@/lib/mapbox'
import { GardenPopup } from './GardenPopup'
import { Locate, Plus, Minus } from 'lucide-react'

interface GardenMarker {
  id: string
  name: string
  description: string | null
  latitude: number
  longitude: number
  photo_url: string | null
  vote_count: number
  is_featured: boolean
}

export function GardenMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [selectedGarden, setSelectedGarden] = useState<GardenMarker | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const supabase = useMemo(() => createClient(), [])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.current.on('load', () => {
      setIsLoaded(true)
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Load gardens when map is ready
  useEffect(() => {
    if (!isLoaded || !map.current) return

    async function loadGardens() {
      const { data, error } = await supabase
        .from('garden_locations')
        .select(`
          id,
          name,
          description,
          is_featured,
          photos(storage_path, vote_count, is_primary)
        `)
        .eq('status', 'approved')
        .eq('is_public', true)

      if (error) {
        console.error('Failed to load gardens:', error)
        return
      }

      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []

      // Note: In a real implementation, you'd fetch lat/lng from the geography column
      // For now, we'll use mock data to demonstrate the UI
      const mockGardens: GardenMarker[] = [
        {
          id: '1',
          name: 'Portland Japanese Garden',
          description: 'One of the most authentic Japanese gardens outside of Japan',
          latitude: 45.5189,
          longitude: -122.7082,
          photo_url: null,
          vote_count: 156,
          is_featured: true
        },
        {
          id: '2',
          name: 'Kenroku-en Garden',
          description: 'One of the Three Great Gardens of Japan',
          latitude: 36.5625,
          longitude: 136.6628,
          photo_url: null,
          vote_count: 234,
          is_featured: true
        },
        {
          id: '3',
          name: 'Ryoan-ji Temple',
          description: 'Famous for its rock garden',
          latitude: 35.0342,
          longitude: 135.7181,
          photo_url: null,
          vote_count: 189,
          is_featured: true
        }
      ]

      // Add markers for each garden
      mockGardens.forEach((garden) => {
        if (!map.current) return

        const el = document.createElement('div')
        el.className = 'w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center transition-transform hover:scale-110'
        el.style.backgroundColor = garden.is_featured ? MARKER_COLORS.featured : MARKER_COLORS.default

        const innerEl = document.createElement('span')
        innerEl.className = 'text-white text-xs'
        innerEl.textContent = '🌳'
        el.appendChild(innerEl)

        el.addEventListener('click', () => {
          setSelectedGarden(garden)
          map.current?.flyTo({
            center: [garden.longitude, garden.latitude],
            zoom: 14,
            duration: 1500
          })
        })

        const marker = new mapboxgl.Marker(el)
          .setLngLat([garden.longitude, garden.latitude])
          .addTo(map.current)

        markersRef.current.push(marker)
      })
    }

    loadGardens()
  }, [isLoaded, supabase])

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        map.current?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 12,
          duration: 2000
        })
      },
      (error) => {
        console.error('Geolocation error:', error)
      }
    )
  }, [])

  const handleZoomIn = useCallback(() => {
    map.current?.zoomIn()
  }, [])

  const handleZoomOut = useCallback(() => {
    map.current?.zoomOut()
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Custom controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleLocate}
          className="w-10 h-10 bg-white rounded-lg shadow-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-800 hover:bg-stone-50 transition-colors"
          title="Find my location"
        >
          <Locate className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white rounded-lg shadow-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-800 hover:bg-stone-50 transition-colors"
          title="Zoom in"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white rounded-lg shadow-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-800 hover:bg-stone-50 transition-colors"
          title="Zoom out"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>

      {/* Garden popup */}
      {selectedGarden && (
        <GardenPopup
          garden={selectedGarden}
          onClose={() => setSelectedGarden(null)}
        />
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white border border-stone-200 rounded-lg shadow-lg py-3 px-4">
        <div className="text-xs text-stone-500 uppercase tracking-wide mb-2">Legend</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: MARKER_COLORS.default }}></div>
            <span className="text-stone-600">Community Garden</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: MARKER_COLORS.featured }}></div>
            <span className="text-stone-600">Featured Garden</span>
          </div>
        </div>
      </div>
    </div>
  )
}
