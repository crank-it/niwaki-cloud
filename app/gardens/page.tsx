import { Metadata } from 'next'
import { GardenFeature } from '@/components/content/GardenFeature'
import { allGardens } from '@/content/gardens'
import { Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Featured Gardens',
  description: 'Discover the world\'s finest Japanese gardens and niwaki collections, with visiting tips and detailed information.',
}

export default function GardensPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2 flex items-center justify-center gap-3">
          <Building2 className="w-8 h-8 text-stone-600" />
          <span>Featured Gardens</span>
        </h1>
        <p className="text-xs text-stone-500 tracking-widest uppercase mb-4">
          名園案内
        </p>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Explore the world&apos;s most inspiring Japanese gardens and niwaki collections,
          from historic estates in Japan to acclaimed gardens across the globe.
        </p>
      </div>

      {/* Gardens grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {allGardens.map((garden) => (
          <GardenFeature key={garden.slug} garden={garden} />
        ))}
      </div>

      {/* Coming soon */}
      <div className="mt-12 text-center">
        <p className="text-sm text-stone-500">
          More garden profiles coming soon, including Kenroku-en, Ryoan-ji, and the gardens of Kyoto.
        </p>
      </div>
    </div>
  )
}
