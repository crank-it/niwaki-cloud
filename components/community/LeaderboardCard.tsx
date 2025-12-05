import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin } from 'lucide-react'

interface LeaderboardCardProps {
  rank: number
  id: string
  name: string
  city?: string
  country?: string
  photoUrl?: string
  voteCount: number
  userName?: string
  userAvatar?: string
}

export function LeaderboardCard({
  rank,
  id,
  name,
  city,
  country,
  photoUrl,
  voteCount,
  userName,
  userAvatar
}: LeaderboardCardProps) {
  const location = [city, country].filter(Boolean).join(', ')

  return (
    <Link
      href={`/gardens/${id}`}
      className="card flex gap-4 sm:gap-6 items-center hover:shadow-md transition-shadow group"
    >
      {/* Rank */}
      <div className="text-2xl sm:text-3xl font-light text-stone-300 w-8 sm:w-12 text-center flex-shrink-0">
        {rank}
      </div>

      {/* Photo */}
      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-stone-200 rounded-lg overflow-hidden flex-shrink-0">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            width={96}
            height={96}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            🌳
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-stone-800 group-hover:text-stone-900 truncate">
          {name}
        </h3>
        {location && (
          <p className="text-sm text-stone-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{location}</span>
          </p>
        )}
        {userName && (
          <div className="flex items-center gap-2 mt-2">
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName}
                width={20}
                height={20}
                className="w-5 h-5 rounded-full"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-stone-200" />
            )}
            <span className="text-xs text-stone-400">{userName}</span>
          </div>
        )}
      </div>

      {/* Vote count */}
      <div className="text-right flex-shrink-0">
        <div className="flex items-center gap-1 text-stone-600">
          <Heart className="w-4 h-4" />
          <span className="text-xl sm:text-2xl font-light">{voteCount}</span>
        </div>
        <div className="text-xs text-stone-400">votes</div>
      </div>
    </Link>
  )
}
