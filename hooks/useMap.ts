'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { MAPBOX_TOKEN, MAP_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM, MARKER_COLORS } from '@/lib/mapbox'
import type { MapMarkerData } from '@/lib/mapbox'

interface UseMapReturn {
  mapContainer: React.RefObject<HTMLDivElement>
  map: mapboxgl.Map | null
  isLoaded: boolean
  addMarker: (marker: MapMarkerData) => void
  addMarkers: (markers: MapMarkerData[]) => void
  clearMarkers: () => void
  flyTo: (lat: number, lng: number, zoom?: number) => void
  getUserLocation: () => Promise<{ lat: number; lng: number } | null>
}

export function useMap(): UseMapReturn {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

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
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      'top-right'
    )

    map.current.on('load', () => {
      setIsLoaded(true)
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  const addMarker = useCallback((markerData: MapMarkerData) => {
    if (!map.current) return

    const el = document.createElement('div')
    el.className = 'w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center transition-transform hover:scale-110'
    el.style.backgroundColor = markerData.isFeatured ? MARKER_COLORS.featured : MARKER_COLORS.default

    const innerEl = document.createElement('span')
    innerEl.className = 'text-white text-xs'
    innerEl.textContent = '🌳'
    el.appendChild(innerEl)

    const marker = new mapboxgl.Marker(el)
      .setLngLat([markerData.longitude, markerData.latitude])
      .addTo(map.current)

    markers.current.push(marker)
  }, [])

  const addMarkers = useCallback((markerDataArray: MapMarkerData[]) => {
    markerDataArray.forEach(addMarker)
  }, [addMarker])

  const clearMarkers = useCallback(() => {
    markers.current.forEach(marker => marker.remove())
    markers.current = []
  }, [])

  const flyTo = useCallback((lat: number, lng: number, zoom: number = 12) => {
    map.current?.flyTo({
      center: [lng, lat],
      zoom,
      duration: 2000,
    })
  }, [])

  const getUserLocation = useCallback(async (): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          resolve(null)
        }
      )
    })
  }, [])

  return {
    mapContainer: mapContainer as React.RefObject<HTMLDivElement>,
    map: map.current,
    isLoaded,
    addMarker,
    addMarkers,
    clearMarkers,
    flyTo,
    getUserLocation,
  }
}
