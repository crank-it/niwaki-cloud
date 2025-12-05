'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { createClient } from '@/lib/supabase/client'
import { MapPin, Trophy, Filter, X, ChevronRight, User, TreeDeciduous, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
}

interface Garden {
  id: string
  name: string
  description: string | null
  city: string | null
  country: string | null
  latitude: number
  longitude: number
  photo_url: string | null
  vote_count: number
  wilson_score: number
  rank: number
  species: string[]
  user: {
    id: string
    display_name: string | null
    avatar_url: string | null
  } | null
}

type ViewMode = 'map' | 'list'
type SortBy = 'rank' | 'newest' | 'nearest'

// Mock data for when database is empty
const mockGardens: Garden[] = [
  {
    id: 'mock-1',
    name: 'Portland Japanese Garden',
    description: 'One of the most authentic Japanese gardens outside of Japan, featuring stunning cloud-pruned pines.',
    city: 'Portland',
    country: 'USA',
    latitude: 45.5189,
    longitude: -122.7074,
    photo_url: null,
    vote_count: 156,
    wilson_score: 0.92,
    rank: 1,
    species: ['Japanese Black Pine', 'Japanese Maple'],
    user: { id: 'user-1', display_name: 'Portland Parks', avatar_url: null }
  },
  {
    id: 'mock-2',
    name: 'Kenroku-en',
    description: 'One of the Three Great Gardens of Japan, renowned for its traditional niwaki specimens.',
    city: 'Kanazawa',
    country: 'Japan',
    latitude: 36.5625,
    longitude: 136.6625,
    photo_url: null,
    vote_count: 234,
    wilson_score: 0.95,
    rank: 2,
    species: ['Japanese Black Pine', 'Japanese Red Pine'],
    user: { id: 'user-2', display_name: 'Japan Heritage', avatar_url: null }
  },
  {
    id: 'mock-3',
    name: 'Kew Gardens Japanese Gateway',
    description: 'Beautiful examples of cloud-pruned trees surrounding the historic Japanese Gateway.',
    city: 'London',
    country: 'UK',
    latitude: 51.4787,
    longitude: -0.2956,
    photo_url: null,
    vote_count: 89,
    wilson_score: 0.78,
    rank: 3,
    species: ['Yew', 'Japanese Holly'],
    user: { id: 'user-3', display_name: 'Royal Botanic Gardens', avatar_url: null }
  },
  {
    id: 'mock-4',
    name: 'Huntington Japanese Garden',
    description: 'A serene Japanese garden featuring impressive cloud-pruned specimens and koi ponds.',
    city: 'San Marino',
    country: 'USA',
    latitude: 34.1292,
    longitude: -118.1145,
    photo_url: null,
    vote_count: 67,
    wilson_score: 0.71,
    rank: 4,
    species: ['Japanese Black Pine'],
    user: { id: 'user-4', display_name: 'Huntington Library', avatar_url: null }
  },
  {
    id: 'mock-5',
    name: 'Albert Kahn Musée',
    description: 'Exceptional Japanese garden in Paris with masterfully pruned cloud trees.',
    city: 'Boulogne-Billancourt',
    country: 'France',
    latitude: 48.8422,
    longitude: 2.2281,
    photo_url: null,
    vote_count: 45,
    wilson_score: 0.65,
    rank: 5,
    species: ['Japanese Black Pine', 'Boxwood'],
    user: { id: 'user-5', display_name: 'Musée Albert Kahn', avatar_url: null }
  }
]

export function DiscoverView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  const [gardens, setGardens] = useState<Garden[]>([])
  const [selectedGarden, setSelectedGarden] = useState<Garden | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('map')
  const [sortBy, setSortBy] = useState<SortBy>('rank')
  const [filterSpecies, setFilterSpecies] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = useMemo(() => createClient(), [])

  // Fetch gardens with ranking
  useEffect(() => {
    async function loadGardens() {
      setLoading(true)

      try {
        const { data, error } = await supabase
          .from('garden_locations')
          .select(`
            id, name, description, city, country, latitude, longitude,
            photos(storage_path, vote_count, wilson_score),
            users:user_id(id, display_name, avatar_url)
          `)
          .eq('status', 'approved')
          .eq('is_public', true)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Supabase error:', error)
          // Fall back to mock data
          setGardens(mockGardens)
          setLoading(false)
          return
        }

        if (!data || data.length === 0) {
          // Use mock data if no real data
          setGardens(mockGardens)
          setLoading(false)
          return
        }

        // Transform and rank
        const transformed: Garden[] = data.map((g: any) => ({
          id: g.id,
          name: g.name,
          description: g.description,
          city: g.city,
          country: g.country,
          latitude: g.latitude || 0,
          longitude: g.longitude || 0,
          photo_url: g.photos?.[0]?.storage_path || null,
          vote_count: g.photos?.reduce((sum: number, p: any) => sum + (p.vote_count || 0), 0) || 0,
          wilson_score: g.photos?.[0]?.wilson_score || 0,
          rank: 0,
          species: [],
          user: g.users ? {
            id: g.users.id || '',
            display_name: g.users.display_name || 'Anonymous',
            avatar_url: g.users.avatar_url || null,
          } : null
        }))

        // Sort by wilson_score and assign ranks
        transformed.sort((a, b) => b.wilson_score - a.wilson_score)
        transformed.forEach((g, i) => g.rank = i + 1)

        setGardens(transformed)
      } catch (err) {
        console.error('Failed to load gardens:', err)
        setGardens(mockGardens)
      }

      setLoading(false)
    }

    loadGardens()
  }, [supabase])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      console.warn('Mapbox token not configured')
      return
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 30],
      zoom: 2,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    // Geolocation
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: false,
      showUserLocation: true,
    })
    map.current.addControl(geolocate, 'bottom-right')

    geolocate.on('geolocate', (e: any) => {
      setUserLocation({ lat: e.coords.latitude, lng: e.coords.longitude })
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Add markers to map
  useEffect(() => {
    if (!map.current || gardens.length === 0) return

    // Clear existing markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    gardens.forEach((garden) => {
      if (!garden.latitude || !garden.longitude) return

      // Create custom marker element
      const el = document.createElement('div')
      el.className = 'relative cursor-pointer group'

      // Rank badge for top 10
      if (garden.rank <= 10) {
        const badge = document.createElement('div')
        badge.className = `absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
          garden.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
          garden.rank === 2 ? 'bg-stone-300 text-stone-700' :
          garden.rank === 3 ? 'bg-amber-600 text-amber-100' :
          'bg-stone-600 text-white'
        }`
        badge.textContent = garden.rank.toString()
        el.appendChild(badge)
      }

      // Marker dot
      const dot = document.createElement('div')
      dot.className = `w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-110 ${
        garden.rank <= 3 ? 'bg-emerald-600' : 'bg-stone-700'
      }`
      dot.innerHTML = '<span class="text-white text-xs">🌳</span>'
      el.appendChild(dot)

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([garden.longitude, garden.latitude])
        .addTo(map.current!)

      el.addEventListener('click', () => {
        setSelectedGarden(garden)
        map.current?.flyTo({
          center: [garden.longitude, garden.latitude],
          zoom: 12,
          duration: 1000,
        })
      })

      markersRef.current.push(marker)
    })
  }, [gardens])

  // Get sorted/filtered gardens for list view
  const displayGardens = useCallback(() => {
    let result = [...gardens]

    if (filterSpecies) {
      result = result.filter(g => g.species.includes(filterSpecies))
    }

    switch (sortBy) {
      case 'rank':
        result.sort((a, b) => a.rank - b.rank)
        break
      case 'newest':
        // Already sorted by created_at desc from query
        break
      case 'nearest':
        if (userLocation) {
          result.sort((a, b) => {
            const distA = Math.sqrt(Math.pow(a.latitude - userLocation.lat, 2) + Math.pow(a.longitude - userLocation.lng, 2))
            const distB = Math.sqrt(Math.pow(b.latitude - userLocation.lat, 2) + Math.pow(b.longitude - userLocation.lng, 2))
            return distA - distB
          })
        }
        break
    }

    return result
  }, [gardens, filterSpecies, sortBy, userLocation])

  // Get unique species for filter
  const allSpecies = useMemo(() => {
    return [...new Set(gardens.flatMap(g => g.species))].sort()
  }, [gardens])

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-white border-r border-stone-200 flex flex-col z-10">
        {/* Header */}
        <div className="p-4 border-b border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-light text-stone-800">
              <span className="text-2xl mr-2">探</span>
              Discover
            </h1>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded transition-colors ${viewMode === 'map' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                <MapPin className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                <Trophy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="flex-1 text-sm border border-stone-200 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <option value="rank">Top Rated</option>
              <option value="newest">Newest</option>
              <option value="nearest">Nearest</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 border rounded transition-colors ${showFilters ? 'border-stone-800 bg-stone-800 text-white' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Species filter dropdown */}
          {showFilters && allSpecies.length > 0 && (
            <div className="mt-3 p-3 bg-stone-50 rounded-lg">
              <label className="text-xs text-stone-500 uppercase tracking-wide">Filter by Species</label>
              <select
                value={filterSpecies || ''}
                onChange={(e) => setFilterSpecies(e.target.value || null)}
                className="w-full mt-1 text-sm border border-stone-200 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                <option value="">All Species</option>
                {allSpecies.map(species => (
                  <option key={species} value={species}>{species}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Garden List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-stone-500">
              <div className="inline-block text-4xl mb-2 animate-pulse">☁️</div>
              <p className="text-sm">Loading gardens...</p>
            </div>
          ) : displayGardens().length === 0 ? (
            <div className="p-8 text-center text-stone-500">
              <p>No gardens found</p>
            </div>
          ) : (
            displayGardens().map((garden) => (
              <button
                key={garden.id}
                onClick={() => {
                  setSelectedGarden(garden)
                  if (viewMode === 'map' && map.current && garden.latitude && garden.longitude) {
                    map.current.flyTo({
                      center: [garden.longitude, garden.latitude],
                      zoom: 12,
                      duration: 1000,
                    })
                  }
                }}
                className={`w-full p-4 border-b border-stone-100 hover:bg-stone-50 transition-colors text-left ${
                  selectedGarden?.id === garden.id ? 'bg-stone-50' : ''
                }`}
              >
                <div className="flex gap-3">
                  {/* Rank */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium ${
                    garden.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    garden.rank === 2 ? 'bg-stone-200 text-stone-600' :
                    garden.rank === 3 ? 'bg-amber-100 text-amber-700' :
                    'bg-stone-100 text-stone-500'
                  }`}>
                    {garden.rank <= 3 ? ['🥇', '🥈', '🥉'][garden.rank - 1] : garden.rank}
                  </div>

                  {/* Photo */}
                  <div className="w-16 h-16 bg-stone-200 rounded overflow-hidden flex-shrink-0">
                    {garden.photo_url ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${garden.photo_url}`}
                        alt={garden.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 text-2xl">🌳</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-stone-800 truncate">{garden.name}</h3>
                    <p className="text-xs text-stone-500">{garden.city}, {garden.country}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-stone-400 flex items-center gap-1">
                        <Heart className="w-3 h-3" /> {garden.vote_count}
                      </span>
                      {garden.species.length > 0 && (
                        <span className="text-xs text-emerald-600 flex items-center gap-1">
                          <TreeDeciduous className="w-3 h-3" /> {garden.species[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-stone-300 flex-shrink-0 self-center" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Map / List View */}
      <div className="flex-1 relative">
        {viewMode === 'map' ? (
          <div ref={mapContainer} className="w-full h-full">
            {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
                <div className="text-center text-stone-500 p-8">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-light">Map not configured</p>
                  <p className="text-sm mt-2">Add NEXT_PUBLIC_MAPBOX_TOKEN to enable the map</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full overflow-y-auto bg-stone-50 p-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-light text-stone-800 mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Top Rated Gardens
              </h2>
              <div className="grid gap-4">
                {displayGardens().slice(0, 50).map((garden) => (
                  <GardenCard key={garden.id} garden={garden} onClick={() => setSelectedGarden(garden)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Garden Panel */}
        {selectedGarden && (
          <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden z-20">
            <button
              onClick={() => setSelectedGarden(null)}
              className="absolute top-2 right-2 p-1 text-stone-400 hover:text-stone-600 z-10 bg-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo */}
            <div className="h-40 bg-stone-200 relative">
              {selectedGarden.photo_url ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${selectedGarden.photo_url}`}
                  alt={selectedGarden.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-stone-300">🌳</div>
              )}
              {/* Rank badge */}
              <div className={`absolute top-3 left-3 px-2 py-1 rounded text-sm font-medium ${
                selectedGarden.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                selectedGarden.rank === 2 ? 'bg-stone-300 text-stone-700' :
                selectedGarden.rank === 3 ? 'bg-amber-600 text-white' :
                'bg-stone-800 text-white'
              }`}>
                #{selectedGarden.rank}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-medium text-lg text-stone-800">{selectedGarden.name}</h3>
              <p className="text-sm text-stone-500">{selectedGarden.city}, {selectedGarden.country}</p>

              {selectedGarden.description && (
                <p className="text-sm text-stone-600 mt-3 line-clamp-3">{selectedGarden.description}</p>
              )}

              {/* Species */}
              {selectedGarden.species.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center gap-1 text-xs text-stone-500 mb-1">
                    <TreeDeciduous className="w-3 h-3" />
                    Species
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedGarden.species.map(s => (
                      <span key={s} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gardener */}
              {selectedGarden.user && (
                <Link
                  href={`/profile/${selectedGarden.user.id}`}
                  className="mt-4 flex items-center gap-2 p-2 -mx-2 rounded hover:bg-stone-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center overflow-hidden">
                    {selectedGarden.user.avatar_url ? (
                      <Image
                        src={selectedGarden.user.avatar_url}
                        alt={selectedGarden.user.display_name || 'User'}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-stone-700">{selectedGarden.user.display_name || 'Anonymous'}</div>
                    <div className="text-xs text-stone-400">View profile</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300" />
                </Link>
              )}

              {/* Stats & Actions */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-stone-500">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {selectedGarden.vote_count} votes
                  </span>
                </div>
                <Link
                  href={`/gardens/${selectedGarden.id}`}
                  className="btn-primary text-sm py-1.5"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function GardenCard({ garden, onClick }: { garden: Garden; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-lg border border-stone-200 overflow-hidden hover:shadow-md transition-shadow text-left"
    >
      <div className="flex">
        {/* Rank */}
        <div className={`w-16 flex items-center justify-center text-2xl font-light ${
          garden.rank === 1 ? 'bg-yellow-50 text-yellow-600' :
          garden.rank === 2 ? 'bg-stone-100 text-stone-500' :
          garden.rank === 3 ? 'bg-amber-50 text-amber-600' :
          'bg-stone-50 text-stone-400'
        }`}>
          {garden.rank <= 3 ? ['🥇', '🥈', '🥉'][garden.rank - 1] : garden.rank}
        </div>

        {/* Photo */}
        <div className="w-24 h-24 bg-stone-200 flex-shrink-0">
          {garden.photo_url ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${garden.photo_url}`}
              alt={garden.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl text-stone-300">🌳</div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 p-4">
          <h3 className="font-medium text-stone-800">{garden.name}</h3>
          <p className="text-sm text-stone-500">{garden.city}, {garden.country}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-stone-400 flex items-center gap-1">
              <Heart className="w-3 h-3" /> {garden.vote_count}
            </span>
            {garden.user && (
              <span className="text-sm text-stone-400">by {garden.user.display_name || 'Anonymous'}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
