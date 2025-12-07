import { Metadata } from 'next'
import { TechniqueCard } from '@/components/content/TechniqueCard'
import { createClient } from '@/lib/supabase/server'
import { Scissors } from 'lucide-react'
import type { Difficulty } from '@/types'

export const metadata: Metadata = {
  title: 'Pruning Techniques',
  description: 'Master the art of Japanese cloud pruning with our comprehensive technique guides, from beginner basics to advanced methods.',
}

// Map database difficulty to our Difficulty type
function mapDifficulty(level: number | null, description: string | null): Difficulty {
  if (description) {
    const desc = description.toLowerCase()
    if (desc.includes('beginner')) return 'beginner'
    if (desc.includes('expert') || desc.includes('advanced')) return 'expert'
    return 'intermediate'
  }
  if (level !== null) {
    if (level <= 3) return 'beginner'
    if (level >= 7) return 'expert'
    return 'intermediate'
  }
  return 'intermediate'
}

export default async function TechniquesPage() {
  const supabase = await createClient()

  const { data: techniques, error } = await supabase
    .from('techniques')
    .select('slug, name, japanese_name, japanese_characters, difficulty_level, difficulty_description, time_per_tree, summary')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('name')

  if (error) {
    console.error('Error fetching techniques:', error)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2 flex items-center justify-center gap-3">
          <Scissors className="w-8 h-8 text-stone-600" />
          <span>Pruning Techniques</span>
        </h1>
        <p className="text-xs text-stone-500 tracking-widest uppercase mb-4">
          剪定技法
        </p>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Learn the traditional Japanese techniques for creating and maintaining niwaki,
          from fundamental cloud shaping to advanced pine needle work.
        </p>
      </div>

      {/* Techniques grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {techniques && techniques.length > 0 ? (
          techniques.map((technique) => (
            <TechniqueCard
              key={technique.slug}
              slug={technique.slug}
              title={technique.name}
              japaneseTitle={technique.japanese_characters || technique.japanese_name || ''}
              difficulty={mapDifficulty(technique.difficulty_level, technique.difficulty_description)}
              timeRequired={technique.time_per_tree || 'Varies'}
              introduction={technique.summary}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-stone-500">
            <p>No techniques available yet. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Technique count */}
      {techniques && techniques.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-stone-500">
            {techniques.length} technique{techniques.length !== 1 ? 's' : ''} available
          </p>
        </div>
      )}
    </div>
  )
}
