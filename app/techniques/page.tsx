import { Metadata } from 'next'
import { TechniqueCard } from '@/components/content/TechniqueCard'
import { allTechniques } from '@/content/techniques'
import { Scissors } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pruning Techniques',
  description: 'Master the art of Japanese cloud pruning with our comprehensive technique guides, from beginner basics to advanced methods.',
}

export default function TechniquesPage() {
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
        {allTechniques.map((technique) => (
          <TechniqueCard
            key={technique.slug}
            slug={technique.slug}
            title={technique.title}
            japaneseTitle={technique.japaneseTitle}
            difficulty={technique.difficulty}
            timeRequired={technique.timeRequired}
            introduction={technique.introduction}
          />
        ))}
      </div>

      {/* Coming soon */}
      <div className="mt-12 text-center">
        <p className="text-sm text-stone-500">
          More technique guides coming soon, including Midoritsumi (candle pinching),
          Momiage (needle plucking), and branch wiring.
        </p>
      </div>
    </div>
  )
}
