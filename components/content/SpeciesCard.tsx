import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import type { Difficulty } from '@/types'

interface SpeciesCardProps {
  slug: string
  commonName: string
  scientificName: string
  japaneseName: string
  difficulty: Difficulty
  description: string
}

const difficultyColors: Record<Difficulty, 'success' | 'warning' | 'error'> = {
  beginner: 'success',
  intermediate: 'warning',
  expert: 'error',
}

export function SpeciesCard({
  slug,
  commonName,
  scientificName,
  japaneseName,
  difficulty,
  description
}: SpeciesCardProps) {
  return (
    <Link
      href={`/species/${slug}`}
      className="card group hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-stone-800 group-hover:text-stone-900">
            {commonName}
          </h3>
          <p className="text-sm text-stone-500 italic">{scientificName}</p>
          <p className="text-xs text-stone-400">{japaneseName}</p>
        </div>
        <Badge variant={difficultyColors[difficulty]}>
          {difficulty}
        </Badge>
      </div>
      <p className="text-sm text-stone-600 line-clamp-3">{description}</p>
    </Link>
  )
}
