import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Heart, TreeDeciduous } from 'lucide-react'

interface Props {
  params: Promise<{ userId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params
  const supabase = await createClient()
  const { data: user } = await supabase
    .from('users')
    .select('display_name')
    .eq('id', userId)
    .single()

  return {
    title: user?.display_name || 'Gardener Profile',
    description: `View ${user?.display_name || 'this gardener'}'s niwaki collection and contributions.`,
  }
}

// Mock user data for when database is empty
const mockUsers: Record<string, any> = {
  'user-1': {
    id: 'user-1',
    display_name: 'Portland Parks',
    avatar_url: null,
    bio: 'Maintaining the stunning Japanese Garden in Portland, Oregon since 1963.',
    created_at: '2023-01-15T00:00:00Z',
    gardens: [
      {
        id: 'mock-1',
        name: 'Portland Japanese Garden',
        city: 'Portland',
        country: 'USA',
        photo_url: null,
        vote_count: 156,
        species: ['Japanese Black Pine', 'Japanese Maple']
      }
    ]
  },
  'user-2': {
    id: 'user-2',
    display_name: 'Japan Heritage',
    avatar_url: null,
    bio: 'Preserving and sharing Japan\'s historic garden traditions.',
    created_at: '2022-06-01T00:00:00Z',
    gardens: [
      {
        id: 'mock-2',
        name: 'Kenroku-en',
        city: 'Kanazawa',
        country: 'Japan',
        photo_url: null,
        vote_count: 234,
        species: ['Japanese Black Pine', 'Japanese Red Pine']
      }
    ]
  },
  'user-3': {
    id: 'user-3',
    display_name: 'Royal Botanic Gardens',
    avatar_url: null,
    bio: 'Kew Gardens - a UNESCO World Heritage Site with exceptional plant collections.',
    created_at: '2022-03-10T00:00:00Z',
    gardens: [
      {
        id: 'mock-3',
        name: 'Kew Gardens Japanese Gateway',
        city: 'London',
        country: 'UK',
        photo_url: null,
        vote_count: 89,
        species: ['Yew', 'Japanese Holly']
      }
    ]
  }
}

export default async function ProfilePage({ params }: Props) {
  const { userId } = await params
  const supabase = await createClient()

  // Try to get real user from database
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  // Check if we should use mock data
  const mockUser = mockUsers[userId]

  if (error && !mockUser) {
    notFound()
  }

  // Use real data if available, otherwise mock
  const displayUser = user || mockUser

  // Get user's gardens
  let gardens: any[] = []

  if (user) {
    const { data: realGardens } = await supabase
      .from('garden_locations')
      .select(`
        id, name, city, country, created_at,
        photos(storage_path, vote_count, wilson_score)
      `)
      .eq('user_id', userId)
      .eq('status', 'approved')
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    gardens = realGardens || []
  } else if (mockUser) {
    gardens = mockUser.gardens || []
  }

  // Calculate stats
  const totalVotes = gardens.reduce((sum, g) => {
    if (g.photos) {
      return sum + (g.photos.reduce((pSum: number, p: any) => pSum + (p.vote_count || 0), 0) || 0)
    }
    return sum + (g.vote_count || 0)
  }, 0)

  const allSpecies = [...new Set(gardens.flatMap(g =>
    g.garden_species?.map((gs: any) => gs.species?.common_name).filter(Boolean) ||
    g.species ||
    []
  ))]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-6 mb-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-stone-200 overflow-hidden flex-shrink-0">
            {displayUser.avatar_url ? (
              <Image
                src={displayUser.avatar_url}
                alt={displayUser.display_name || 'User'}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-stone-400">👤</div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-light text-stone-800">{displayUser.display_name || 'Anonymous Gardener'}</h1>
            {displayUser.bio && (
              <p className="text-stone-600 mt-2">{displayUser.bio}</p>
            )}
            <div className="flex items-center gap-4 mt-3 text-sm text-stone-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {new Date(displayUser.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-stone-200 p-4 text-center">
            <div className="text-3xl font-light text-stone-800">{gardens.length}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wide mt-1">Gardens</div>
          </div>
          <div className="bg-white rounded-lg border border-stone-200 p-4 text-center">
            <div className="text-3xl font-light text-stone-800">{totalVotes}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wide mt-1">Total Votes</div>
          </div>
          <div className="bg-white rounded-lg border border-stone-200 p-4 text-center">
            <div className="text-3xl font-light text-stone-800">{allSpecies.length}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wide mt-1">Species</div>
          </div>
        </div>

        {/* Gardens */}
        <div>
          <h2 className="text-xl font-light text-stone-800 mb-4 flex items-center gap-2">
            <TreeDeciduous className="w-5 h-5" />
            Gardens
          </h2>

          {gardens.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {gardens.map((garden: any) => {
                const photoUrl = garden.photos?.[0]?.storage_path
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${garden.photos[0].storage_path}`
                  : garden.photo_url

                const voteCount = garden.photos
                  ? garden.photos.reduce((s: number, p: any) => s + (p.vote_count || 0), 0)
                  : garden.vote_count || 0

                return (
                  <Link
                    key={garden.id}
                    href={`/gardens/${garden.id}`}
                    className="bg-white rounded-lg border border-stone-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-40 bg-stone-200 relative">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={garden.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-stone-300">🌳</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-stone-800">{garden.name}</h3>
                      <p className="text-sm text-stone-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {garden.city}, {garden.country}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-stone-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {voteCount}
                        </span>
                        {garden.species?.length > 0 && (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <TreeDeciduous className="w-3 h-3" /> {garden.species[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-stone-200 text-center py-12 text-stone-500">
              <p>No gardens submitted yet</p>
              <Link href="/submit" className="btn-primary mt-4 inline-block">
                Submit a Garden
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
