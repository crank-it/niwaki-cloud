import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, Clock, Wrench, AlertTriangle, BookOpen, Lightbulb, CheckCircle } from 'lucide-react'
import type { Difficulty } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: technique } = await supabase
    .from('techniques')
    .select('name, summary')
    .eq('slug', slug)
    .single()

  if (!technique) {
    return { title: 'Technique Not Found' }
  }

  return {
    title: technique.name,
    description: technique.summary,
  }
}

const difficultyColors: Record<Difficulty, 'success' | 'warning' | 'error'> = {
  beginner: 'success',
  intermediate: 'warning',
  expert: 'error',
}

interface Step {
  step: number
  title: string
  description: string
}

interface Tool {
  name: string
  description?: string
  price_range?: string
}

interface Mistake {
  mistake: string
  consequence?: string
  prevention?: string
}

export default async function TechniqueDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: technique, error } = await supabase
    .from('techniques')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !technique) {
    notFound()
  }

  const difficulty = mapDifficulty(technique.difficulty_level, technique.difficulty_description)

  // Parse JSONB fields
  const preparationSteps: Step[] = technique.preparation_steps || []
  const techniqueSteps: Step[] = technique.technique_steps || []
  const finishingSteps: Step[] = technique.finishing_steps || []
  const toolsRequired: Tool[] = technique.tools_required || []
  const optionalTools: Tool[] = technique.optional_tools || []
  const commonMistakes: Mistake[] = technique.common_mistakes || []
  const proTips: string[] = technique.pro_tips || []

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
                {technique.name}
              </h1>
              <p className="text-stone-400">
                {technique.japanese_characters || technique.japanese_name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={difficultyColors[difficulty]} size="md">
                {technique.difficulty_description || difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm text-stone-500">
            {technique.time_per_tree && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{technique.time_per_tree}</span>
              </div>
            )}
            {technique.primary_season && (
              <span className="text-stone-400">• {technique.primary_season}</span>
            )}
          </div>
        </header>

        {/* Summary */}
        <section className="card mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-lg">Overview</h2>
          </div>
          <p className="text-stone-600 leading-relaxed">{technique.summary}</p>
        </section>

        {/* Full Description */}
        {technique.description && (
          <section className="card mb-6">
            <h2 className="section-title text-lg mb-4">About This Technique</h2>
            <div className="text-stone-600 leading-relaxed whitespace-pre-line">
              {technique.description}
            </div>
          </section>
        )}

        {/* Philosophy */}
        {technique.philosophy && (
          <section className="card mb-6">
            <h2 className="section-title text-lg mb-4">Philosophy</h2>
            <p className="text-stone-600 leading-relaxed whitespace-pre-line italic">
              {technique.philosophy}
            </p>
          </section>
        )}

        {/* Preparation Steps */}
        {preparationSteps.length > 0 && (
          <section className="card mb-6">
            <h2 className="section-title text-lg mb-4">Preparation</h2>
            <div className="space-y-4">
              {preparationSteps.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-stone-200 text-stone-700 rounded-full flex items-center justify-center text-sm font-medium">
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
        )}

        {/* Main Technique Steps */}
        {techniqueSteps.length > 0 && (
          <section className="card mb-6">
            <h2 className="section-title text-lg mb-4">Step-by-Step Guide</h2>
            <div className="space-y-4">
              {techniqueSteps.map((step) => (
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
        )}

        {/* Finishing Steps */}
        {finishingSteps.length > 0 && (
          <section className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h2 className="section-title text-lg">Finishing Up</h2>
            </div>
            <div className="space-y-3">
              {finishingSteps.map((step) => (
                <div key={step.step} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-medium">
                    {step.step}
                  </div>
                  <div>
                    <span className="font-medium text-stone-700">{step.title}:</span>{' '}
                    <span className="text-stone-600">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Aftercare */}
        {technique.aftercare && (
          <section className="card mb-6">
            <h2 className="section-title text-lg mb-4">Aftercare</h2>
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">
              {technique.aftercare}
            </p>
          </section>
        )}

        {/* Tools */}
        {(toolsRequired.length > 0 || optionalTools.length > 0) && (
          <section className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-stone-600" />
              <h2 className="section-title text-lg">Tools & Equipment</h2>
            </div>

            {toolsRequired.length > 0 && (
              <>
                <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-3">Required</h3>
                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  {toolsRequired.map((tool, i) => (
                    <div key={i} className="p-3 bg-stone-50 rounded-lg">
                      <p className="font-medium text-stone-700">{tool.name}</p>
                      {tool.description && <p className="text-sm text-stone-500">{tool.description}</p>}
                      {tool.price_range && <p className="text-xs text-stone-400 mt-1">{tool.price_range}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}

            {optionalTools.length > 0 && (
              <>
                <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-3">Optional</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {optionalTools.map((tool, i) => (
                    <div key={i} className="p-3 bg-stone-50 rounded-lg border border-dashed border-stone-200">
                      <p className="font-medium text-stone-700">{tool.name}</p>
                      {tool.description && <p className="text-sm text-stone-500">{tool.description}</p>}
                      {tool.price_range && <p className="text-xs text-stone-400 mt-1">{tool.price_range}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* Pro Tips */}
        {proTips.length > 0 && (
          <section className="card mb-6 bg-amber-50 border-amber-200">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h2 className="section-title text-lg">Pro Tips</h2>
            </div>
            <ul className="space-y-2">
              {proTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-700">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Common Mistakes */}
        {commonMistakes.length > 0 && (
          <section className="card">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="section-title text-lg">Common Mistakes to Avoid</h2>
            </div>
            <div className="space-y-4">
              {commonMistakes.map((item, i) => (
                <div key={i} className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <p className="font-medium text-red-800 mb-1">{item.mistake}</p>
                  {item.consequence && (
                    <p className="text-sm text-red-600 mb-2">
                      <strong>Consequence:</strong> {item.consequence}
                    </p>
                  )}
                  {item.prevention && (
                    <p className="text-sm text-stone-600">
                      <strong>Prevention:</strong> {item.prevention}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* History & Origin */}
        {technique.history_and_origin && (
          <section className="card mt-6">
            <h2 className="section-title text-lg mb-4">History & Origin</h2>
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">
              {technique.history_and_origin}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
