import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { speciesBySlug, allSpecies } from '@/content/species'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, Calendar, AlertTriangle, ShoppingBag, TreeDeciduous } from 'lucide-react'
import type { Difficulty } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allSpecies.map((species) => ({
    slug: species.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const species = speciesBySlug[slug]

  if (!species) {
    return { title: 'Species Not Found' }
  }

  return {
    title: `${species.commonName} (${species.scientificName})`,
    description: species.description,
  }
}

const difficultyColors: Record<Difficulty, 'success' | 'warning' | 'error'> = {
  beginner: 'success',
  intermediate: 'warning',
  expert: 'error',
}

export default async function SpeciesDetailPage({ params }: Props) {
  const { slug } = await params
  const species = speciesBySlug[slug]

  if (!species) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/species"
          className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Species</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-1">
                {species.commonName}
              </h1>
              <p className="text-lg text-stone-500 italic mb-1">{species.scientificName}</p>
              <p className="text-stone-400">{species.japaneseName}</p>
            </div>
            <Badge variant={difficultyColors[species.difficulty]} size="md">
              {species.difficulty}
            </Badge>
          </div>
        </header>

        {/* Quick facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card py-3 px-4 text-center">
            <p className="text-xs text-stone-500 uppercase tracking-wide">Time to Mature</p>
            <p className="text-stone-800 font-medium">{species.timeToMature}</p>
          </div>
          <div className="card py-3 px-4 text-center">
            <p className="text-xs text-stone-500 uppercase tracking-wide">Climate Zones</p>
            <p className="text-stone-800 font-medium">{species.climateZones.join(', ')}</p>
          </div>
          <div className="card py-3 px-4 text-center">
            <p className="text-xs text-stone-500 uppercase tracking-wide">Difficulty</p>
            <p className="text-stone-800 font-medium capitalize">{species.difficulty}</p>
          </div>
          <div className="card py-3 px-4 text-center">
            <p className="text-xs text-stone-500 uppercase tracking-wide">Related Species</p>
            <p className="text-stone-800 font-medium">{species.relatedSpecies.length}</p>
          </div>
        </div>

        {/* Description */}
        <section className="card mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TreeDeciduous className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-lg">Overview</h2>
          </div>
          <p className="text-stone-600 leading-relaxed">{species.description}</p>
        </section>

        {/* Characteristics */}
        <section className="card mb-6">
          <h2 className="section-title text-lg mb-4">Characteristics</h2>
          <ul className="space-y-2">
            {species.characteristics.map((char, i) => (
              <li key={i} className="flex items-start gap-2 text-stone-600">
                <span className="text-stone-400 mt-1">•</span>
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pruning Calendar */}
        <section className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-lg">Pruning Calendar</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(species.pruningCalendar).map(([season, task]) => (
              <div key={season} className="p-3 bg-stone-50 rounded-lg">
                <p className="text-sm font-medium text-stone-700 capitalize mb-1">{season}</p>
                <p className="text-sm text-stone-600">{task}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Techniques */}
        <section className="card mb-6">
          <h2 className="section-title text-lg mb-4">Pruning Techniques</h2>
          <ul className="space-y-2">
            {species.techniques.map((technique, i) => (
              <li key={i} className="flex items-start gap-2 text-stone-600">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>{technique}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="section-title text-lg">Common Mistakes</h2>
          </div>
          <ul className="space-y-2">
            {species.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2 text-stone-600">
                <span className="text-amber-600 mt-1">⚠</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Buying Tips */}
        <section className="card">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-lg">Buying Tips</h2>
          </div>
          <p className="text-stone-600 leading-relaxed">{species.buyingTips}</p>
        </section>
      </div>
    </div>
  )
}
