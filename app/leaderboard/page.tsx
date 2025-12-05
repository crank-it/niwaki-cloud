import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { LeaderboardCard } from '@/components/community/LeaderboardCard'
import { Trophy, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leaderboard',
  description: 'The highest-rated cloud-pruned gardens from our global community.',
}

export default async function LeaderboardPage() {
  const supabase = await createClient()

  // Fetch top gardens by Wilson score
  const { data: topGardens } = await supabase
    .from('photos')
    .select(`
      id,
      storage_path,
      title,
      vote_count,
      wilson_score,
      garden_location:garden_locations(id, name, city, country),
      user:users(display_name, avatar_url)
    `)
    .order('wilson_score', { ascending: false })
    .limit(50)

  // Mock data for demonstration
  const mockGardens = [
    {
      id: '1',
      name: 'Kenroku-en Pine Collection',
      city: 'Kanazawa',
      country: 'Japan',
      photoUrl: null,
      voteCount: 234,
      userName: 'garden_master',
      userAvatar: null
    },
    {
      id: '2',
      name: 'Portland Japanese Garden',
      city: 'Portland',
      country: 'USA',
      photoUrl: null,
      voteCount: 189,
      userName: 'niwaki_oregon',
      userAvatar: null
    },
    {
      id: '3',
      name: 'Surrey Cloud Garden',
      city: 'Guildford',
      country: 'UK',
      photoUrl: null,
      voteCount: 156,
      userName: 'cloud_pruner_uk',
      userAvatar: null
    },
    {
      id: '4',
      name: 'Backyard Niwaki Project',
      city: 'Melbourne',
      country: 'Australia',
      photoUrl: null,
      voteCount: 142,
      userName: 'aussie_gardens',
      userAvatar: null
    },
    {
      id: '5',
      name: 'Zen Courtyard Collection',
      city: 'Kyoto',
      country: 'Japan',
      photoUrl: null,
      voteCount: 128,
      userName: 'kyoto_zen',
      userAvatar: null
    }
  ]

  const gardens = topGardens?.length ? topGardens.map((photo: any) => ({
    id: photo.id,
    name: photo.garden_location?.name || photo.title || 'Unnamed Garden',
    city: photo.garden_location?.city,
    country: photo.garden_location?.country,
    photoUrl: photo.storage_path
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${photo.storage_path}`
      : null,
    voteCount: photo.vote_count,
    userName: photo.user?.display_name,
    userAvatar: photo.user?.avatar_url
  })) : mockGardens

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2 flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-stone-600" />
          <span>Top Rated Gardens</span>
        </h1>
        <p className="text-xs text-stone-500 tracking-widest uppercase">
          最高評価の庭園
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded-lg text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Top Rated</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-600 hover:bg-stone-200 rounded-lg text-sm transition-colors">
          <Clock className="w-4 h-4" />
          <span>Recent</span>
        </button>
      </div>

      {/* Leaderboard */}
      <div className="max-w-4xl mx-auto">
        {gardens.length > 0 ? (
          <div className="space-y-4">
            {gardens.map((garden: any, index: number) => (
              <LeaderboardCard
                key={garden.id}
                rank={index + 1}
                id={garden.id}
                name={garden.name}
                city={garden.city}
                country={garden.country}
                photoUrl={garden.photoUrl}
                voteCount={garden.voteCount}
                userName={garden.userName}
                userAvatar={garden.userAvatar}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-500 mb-4">No gardens have been submitted yet.</p>
            <Link href="/submit" className="btn-primary">
              Be the first to submit
            </Link>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-12 max-w-2xl mx-auto text-center">
        <p className="text-sm text-stone-500">
          Rankings are calculated using the Wilson score confidence interval,
          which accounts for both the number of votes and the ratio of upvotes.
        </p>
      </div>
    </div>
  )
}
