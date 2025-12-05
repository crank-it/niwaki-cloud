import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { gardensBySlug, allGardens } from '@/content/gardens'
import { ArrowLeft, MapPin, Clock, Ticket, Globe, Lightbulb, TreeDeciduous } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allGardens.map((garden) => ({
    slug: garden.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const garden = gardensBySlug[slug]

  if (!garden) {
    return { title: 'Garden Not Found' }
  }

  return {
    title: garden.name,
    description: garden.description,
  }
}

export default async function GardenDetailPage({ params }: Props) {
  const { slug } = await params
  const garden = gardensBySlug[slug]

  if (!garden) {
    notFound()
  }

  const location = [garden.location.city, garden.location.region, garden.location.country]
    .filter(Boolean)
    .join(', ')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/gardens"
          className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Gardens</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-1">
            {garden.name}
          </h1>
          <p className="text-stone-400 mb-3">{garden.japaneseName}</p>
          <div className="flex items-center gap-1 text-stone-500">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </header>

        {/* Description */}
        <section className="card mb-6">
          <p className="text-stone-600 leading-relaxed">{garden.description}</p>
        </section>

        {/* Highlights */}
        <section className="card mb-6">
          <h2 className="section-title text-lg mb-4">Highlights</h2>
          <ul className="space-y-2">
            {garden.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 text-stone-600">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Garden Areas */}
        {garden.gardens.length > 0 && (
          <section className="card mb-6">
            <h2 className="section-title text-lg mb-4">Garden Areas</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {garden.gardens.map((area, i) => (
                <div key={i} className="p-4 bg-stone-50 rounded-lg">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-medium text-stone-800">{area.name}</span>
                    <span className="text-sm text-stone-500">({area.style})</span>
                  </div>
                  <p className="text-sm text-stone-600">{area.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Niwaki Notes */}
        <section className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TreeDeciduous className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-lg">Niwaki Notes</h2>
          </div>
          <p className="text-stone-600 leading-relaxed">{garden.niwakiNotes}</p>
        </section>

        {/* Practical Info */}
        <section className="card mb-6">
          <h2 className="section-title text-lg mb-4">Practical Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-stone-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-stone-700">Hours</p>
                <p className="text-sm text-stone-600">{garden.practicalInfo.hours}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Ticket className="w-5 h-5 text-stone-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-stone-700">Admission</p>
                <p className="text-sm text-stone-600">{garden.practicalInfo.admission}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-stone-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-stone-700">Address</p>
                <p className="text-sm text-stone-600">{garden.practicalInfo.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-stone-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-stone-700">Website</p>
                <a
                  href={garden.practicalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-600 hover:text-stone-800 underline"
                >
                  {garden.practicalInfo.website.replace('https://', '')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Visiting Tips */}
        <section className="card">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h2 className="section-title text-lg">Visiting Tips</h2>
          </div>
          <ul className="space-y-2">
            {garden.visitingTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-stone-600">
                <span className="text-amber-600 mt-1">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Map link */}
        <div className="mt-8 text-center">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${garden.location.coordinates.lat},${garden.location.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>View on Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  )
}
