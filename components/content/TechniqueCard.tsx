import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Clock } from 'lucide-react'
import type { Difficulty } from '@/types'

interface TechniqueCardProps {
  slug: string
  title: string
  japaneseTitle: string
  difficulty: Difficulty
  timeRequired: string
  introduction: string
}

const difficultyColors: Record<Difficulty, 'success' | 'warning' | 'error'> = {
  beginner: 'success',
  intermediate: 'warning',
  expert: 'error',
}

export function TechniqueCard({
  slug,
  title,
  japaneseTitle,
  difficulty,
  timeRequired,
  introduction
}: TechniqueCardProps) {
  return (
    <Link
      href={`/techniques/${slug}`}
      className="card group hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-stone-800 group-hover:text-stone-900">
            {title}
          </h3>
          <p className="text-xs text-stone-400">{japaneseTitle}</p>
        </div>
        <Badge variant={difficultyColors[difficulty]}>
          {difficulty}
        </Badge>
      </div>
      <p className="text-sm text-stone-600 line-clamp-3 mb-3">{introduction}</p>
      <div className="flex items-center gap-1 text-xs text-stone-500">
        <Clock className="w-3.5 h-3.5" />
        <span>{timeRequired}</span>
      </div>
    </Link>
  )
}
