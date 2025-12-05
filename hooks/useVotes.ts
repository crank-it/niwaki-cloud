'use client'

import { useState, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUser } from '@clerk/nextjs'

interface UseVotesReturn {
  vote: (photoId: string, value: 1 | -1) => Promise<boolean>
  removeVote: (photoId: string) => Promise<boolean>
  getUserVote: (photoId: string) => Promise<1 | -1 | null>
  loading: boolean
}

export function useVotes(): UseVotesReturn {
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const supabase = useMemo(() => createClient(), [])

  const vote = useCallback(async (photoId: string, value: 1 | -1): Promise<boolean> => {
    if (!user) return false

    setLoading(true)
    try {
      // Use upsert to handle both new votes and vote changes
      const { error } = await supabase
        .from('votes')
        .upsert({
          user_id: user.id,
          photo_id: photoId,
          value
        }, {
          onConflict: 'user_id,photo_id'
        })

      if (error) throw error
      return true
    } catch (err) {
      console.error('Failed to vote:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [supabase, user])

  const removeVote = useCallback(async (photoId: string): Promise<boolean> => {
    if (!user) return false

    setLoading(true)
    try {
      const { error } = await supabase
        .from('votes')
        .delete()
        .eq('user_id', user.id)
        .eq('photo_id', photoId)

      if (error) throw error
      return true
    } catch (err) {
      console.error('Failed to remove vote:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [supabase, user])

  const getUserVote = useCallback(async (photoId: string): Promise<1 | -1 | null> => {
    if (!user) return null

    try {
      const { data, error } = await supabase
        .from('votes')
        .select('value')
        .eq('user_id', user.id)
        .eq('photo_id', photoId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null // No rows found
        throw error
      }

      return data?.value as 1 | -1 | null
    } catch (err) {
      console.error('Failed to get user vote:', err)
      return null
    }
  }, [supabase, user])

  return { vote, removeVote, getUserVote, loading }
}
