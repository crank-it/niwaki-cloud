import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { techniquesBySlug, allTechniques } from '@/content/techniques'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, Clock, Wrench, AlertTriangle, BookOpen } from 'lucide-react'
import type { Difficulty } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allTechniques.map((technique) => ({
    slug: technique.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const technique = techniquesBySlug[slug]

  if (!technique) {
    return { title: 'Technique Not Found' }
  }

  return {
    title: technique.title,
    description: technique.introduction,
  }
}

const difficultyColors: Record<Difficulty, 'success' | 'warning' | 'error'> = {
  beginner: 'success',
  intermediate: 'warning',
  expert: 'error',
}

export default async function TechniqueDetailPage({ params }: Props) {
  const { slug } = await params
  const technique = techniquesBySlug[slug]

  if (!technique) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/techniques"
          className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Techniques</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-1">
                {technique.title}
              </h1>
              <p className="text-stone-400">{technique.japaneseTitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={difficultyColors[technique.difficulty]} size="md">
                {technique.difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-stone-500 mt-4">
            <Clock className="w-4 h-4" />
            <span>{technique.timeRequired}</span>
          </div>
        </header>

        {/* Introduction */}
        <section className="card mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-lg">Introduction</h2>
          </div>
          <p className="text-stone-600 leading-relaxed">{technique.introduction}</p>
        </section>

        {/* Philosophy */}
        <section className="card mb-6">
          <h2 className="section-title text-lg mb-4">Philosophy</h2>
          <p className="text-stone-600 leading-relaxed whitespace-pre-line">{technique.philosophy}</p>
        </section>

        {/* Principles */}
        {technique.principles.length > 0 && (
          <section className="card mb-6">
            <h2 className="section-title text-lg mb-4">Key Principles</h2>
            <div className="space-y-4">
              {technique.principles.map((principle, i) => (
                <div key={i} className="p-4 bg-stone-50 rounded-lg">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-medium text-stone-800">{principle.name}</span>
                    <span className="text-sm text-stone-500">({principle.meaning})</span>
                  </div>
                  <p className="text-sm text-stone-600">{principle.application}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Steps */}
        <section className="card mb-6">
          <h2 className="section-title text-lg mb-4">Step-by-Step Guide</h2>
          <div className="space-y-4">
            {technique.steps.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-medium text-stone-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-stone-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-lg">Tools Required</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {technique.tools.map((tool, i) => (
              <div key={i} className="p-3 bg-stone-50 rounded-lg">
                <p className="font-medium text-stone-700">{tool.name}</p>
                <p className="text-sm text-stone-500">{tool.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="card">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="section-title text-lg">Common Mistakes to Avoid</h2>
          </div>
          <ul className="space-y-2">
            {technique.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2 text-stone-600">
                <span className="text-amber-600 mt-1">⚠</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
