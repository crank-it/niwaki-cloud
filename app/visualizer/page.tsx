'use client'

import { useState } from 'react'
import { ImageUploader } from '@/components/visualizer/ImageUploader'
import { Questionnaire } from '@/components/visualizer/Questionnaire'
import { LoadingState } from '@/components/visualizer/LoadingState'
import { VariationGallery } from '@/components/visualizer/VariationGallery'
import { useVisualization } from '@/hooks/useVisualization'
import type { UserPreferences } from '@/types'

type Step = 'upload' | 'preferences' | 'generating' | 'results'

export default function VisualizerPage() {
  const [step, setStep] = useState<Step>('upload')
  const [gardenImage, setGardenImage] = useState<string | null>(null)
  const { generate, status, results, error, progress, reset } = useVisualization()

  const handleImageUpload = (imageDataUrl: string) => {
    setGardenImage(imageDataUrl)
    setStep('preferences')
  }

  const handlePreferencesComplete = async (preferences: UserPreferences) => {
    if (!gardenImage) return

    setStep('generating')
    await generate(gardenImage, preferences)

    if (status === 'complete') {
      setStep('results')
    }
  }

  const handleStartOver = () => {
    setGardenImage(null)
    setStep('upload')
    reset()
  }

  // Update step based on status
  if (status === 'complete' && step === 'generating') {
    setStep('results')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2">
            Niwaki Visualiser
          </h1>
          <p className="text-xs text-stone-500 tracking-widest uppercase">
            雲剪定視覚化ツール
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex justify-center gap-2 mb-12">
          {['upload', 'preferences', 'generating', 'results'].map((s, i) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === s
                  ? 'bg-stone-800'
                  : i < ['upload', 'preferences', 'generating', 'results'].indexOf(step)
                  ? 'bg-stone-400'
                  : 'bg-stone-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="card">
          {step === 'upload' && (
            <ImageUploader onUpload={handleImageUpload} />
          )}

          {step === 'preferences' && gardenImage && (
            <div>
              {/* Image preview */}
              <div className="mb-8">
                <div className="aspect-video rounded-lg overflow-hidden bg-stone-100 mb-2">
                  <img
                    src={gardenImage}
                    alt="Your garden"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handleStartOver}
                  className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
                >
                  ← Change image
                </button>
              </div>

              <Questionnaire
                gardenImage={gardenImage}
                onComplete={handlePreferencesComplete}
              />
            </div>
          )}

          {step === 'generating' && (
            <div className="py-12">
              <LoadingState status={status} progress={progress} />
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <p className="text-red-700 text-sm">{error}</p>
                  <button
                    onClick={handleStartOver}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 'results' && gardenImage && (
            <VariationGallery
              original={gardenImage}
              variations={results}
              onStartOver={handleStartOver}
            />
          )}
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-stone-400">
            Your images are processed securely and not stored after generation.
          </p>
        </div>
      </div>
    </div>
  )
}
