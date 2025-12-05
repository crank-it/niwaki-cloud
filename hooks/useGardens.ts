'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { GardenLocation, NearbyGarden } from '@/types'

interface UseGardensReturn {
  gardens: GardenLocation[]
  loading: boolean
  error: string | null
  fetchGardens: () => Promise<void>
  fetchNearbyGardens: (lat: number, lng: number, radiusKm?: number) => Promise<NearbyGarden[]>
  submitGarden: (garden: Omit<GardenLocation, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'status'>) => Promise<GardenLocation | null>
}

export function useGardens(): UseGardensReturn {
  const [gardens, setGardens] = useState<GardenLocation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = useMemo(() => createClient(), [])

  const fetchGardens = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('garden_locations')
        .select(`
          *,
          user:users(id, display_name, avatar_url),
          photos(id, storage_path, vote_count, is_primary)
        `)
        .eq('status', 'approved')
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setGardens(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gardens')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const fetchNearbyGardens = useCallback(async (
    lat: number,
    lng: number,
    radiusKm: number = 50
  ): Promise<NearbyGarden[]> => {
    try {
      const { data, error: fetchError } = await supabase
        .rpc('nearby_gardens', {
          lat,
          lng,
          radius_km: radiusKm,
          limit_count: 20
        })

      if (fetchError) throw fetchError
      return data || []
    } catch (err) {
      console.error('Failed to fetch nearby gardens:', err)
      return []
    }
  }, [supabase])

  const submitGarden = useCallback(async (
    garden: Omit<GardenLocation, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'status'>
  ): Promise<GardenLocation | null> => {
    try {
      const { data, error: insertError } = await supabase
        .from('garden_locations')
        .insert([garden])
        .select()
        .single()

      if (insertError) throw insertError
      return data
    } catch (err) {
      console.error('Failed to submit garden:', err)
      return null
    }
  }, [supabase])

  useEffect(() => {
    fetchGardens()
  }, [fetchGardens])

  return { gardens, loading, error, fetchGardens, fetchNearbyGardens, submitGarden }
}
