'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useVotes } from '@/hooks/useVotes'
import { useUser } from '@clerk/nextjs'

interface VoteButtonProps {
  photoId: string
  initialVoteCount: number
  className?: string
}

export function VoteButton({ photoId, initialVoteCount, className = '' }: VoteButtonProps) {
  const { isSignedIn } = useUser()
  const { vote, removeVote, getUserVote, loading } = useVotes()
  const [voteCount, setVoteCount] = useState(initialVoteCount)
  const [userVote, setUserVote] = useState<1 | -1 | null>(null)

  useEffect(() => {
    if (isSignedIn) {
      getUserVote(photoId).then(setUserVote)
    }
  }, [isSignedIn, photoId, getUserVote])

  const handleVote = async () => {
    if (!isSignedIn || loading) return

    if (userVote === 1) {
      // Remove vote
      const success = await removeVote(photoId)
      if (success) {
        setVoteCount(prev => prev - 1)
        setUserVote(null)
      }
    } else {
      // Add vote
      const success = await vote(photoId, 1)
      if (success) {
        setVoteCount(prev => prev + (userVote === -1 ? 2 : 1))
        setUserVote(1)
      }
    }
  }

  return (
    <button
      onClick={handleVote}
      disabled={loading || !isSignedIn}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
        userVote === 1
          ? 'bg-red-100 text-red-700 hover:bg-red-200'
          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
      } ${!isSignedIn ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      title={isSignedIn ? 'Vote for this garden' : 'Sign in to vote'}
    >
      <Heart
        className={`w-4 h-4 ${userVote === 1 ? 'fill-current' : ''}`}
      />
      <span>{voteCount}</span>
    </button>
  )
}
