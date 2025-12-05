import { Metadata } from 'next'
import { SpeciesCard } from '@/components/content/SpeciesCard'
import { allSpecies } from '@/content/species'
import { TreeDeciduous } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Species Guide',
  description: 'Comprehensive guides to the best tree and shrub species for Japanese cloud pruning (niwaki), from beginner-friendly to expert level.',
}

export default function SpeciesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2 flex items-center justify-center gap-3">
          <TreeDeciduous className="w-8 h-8 text-stone-600" />
          <span>Species Guide</span>
        </h1>
        <p className="text-xs text-stone-500 tracking-widest uppercase mb-4">
          樹種ガイド
        </p>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Learn which trees and shrubs are best suited for cloud pruning, from beginner-friendly
          evergreens to the expert-level pines that define traditional Japanese gardens.
        </p>
      </div>

      {/* Difficulty legend */}
      <div className="flex justify-center gap-6 mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-emerald-100"></span>
          <span className="text-stone-600">Beginner</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-amber-100"></span>
          <span className="text-stone-600">Intermediate</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-red-100"></span>
          <span className="text-stone-600">Expert</span>
        </div>
      </div>

      {/* Species grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {allSpecies.map((species) => (
          <SpeciesCard
            key={species.slug}
            slug={species.slug}
            commonName={species.commonName}
            scientificName={species.scientificName}
            japaneseName={species.japaneseName}
            difficulty={species.difficulty}
            description={species.description}
          />
        ))}
      </div>

      {/* Coming soon */}
      <div className="mt-12 text-center">
        <p className="text-sm text-stone-500">
          More species guides coming soon, including Juniper, Boxwood, Scots Pine, and Japanese Maple.
        </p>
      </div>
    </div>
  )
}
