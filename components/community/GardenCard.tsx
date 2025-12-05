import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

interface GardenCardProps {
  id: string
  name: string
  description?: string
  city?: string
  country?: string
  photoUrl?: string
  voteCount: number
  isFeatured?: boolean
  userName?: string
  userAvatar?: string
}

export function GardenCard({
  id,
  name,
  description,
  city,
  country,
  photoUrl,
  voteCount,
  isFeatured,
  userName,
  userAvatar
}: GardenCardProps) {
  const location = [city, country].filter(Boolean).join(', ')

  return (
    <Link
      href={`/gardens/${id}`}
      className="card p-0 overflow-hidden hover:shadow-md transition-shadow group"
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] bg-stone-200">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🌳
          </div>
        )}
        {isFeatured && (
          <Badge variant="success" className="absolute top-3 left-3">
            Featured
          </Badge>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm">
          <Heart className="w-3.5 h-3.5" />
          <span>{voteCount}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-stone-800 group-hover:text-stone-900 line-clamp-1">
          {name}
        </h3>
        {location && (
          <p className="text-sm text-stone-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </p>
        )}
        {description && (
          <p className="text-sm text-stone-600 mt-2 line-clamp-2">{description}</p>
        )}
        {userName && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-100">
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
            <span className="text-xs text-stone-400">by {userName}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
