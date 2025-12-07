'use client'

import { useState, useCallback } from 'react'
import { LoadingPlayer } from '@/components/remotion/LoadingPlayer'

type Style = 'chokkan' | 'moyogi' | 'shakan' | 'fukinagashi' | 'kengai' | 'han-kengai' | 'kabudachi'
type Maintenance = 'apprentice' | 'journeyman' | 'ninja'

const styles: { id: Style; name: string; subtitle: string }[] = [
  { id: 'chokkan', name: '直幹', subtitle: 'Formal Upright' },
  { id: 'moyogi', name: '模様木', subtitle: 'Informal Upright' },
  { id: 'shakan', name: '斜幹', subtitle: 'Slanting' },
  { id: 'fukinagashi', name: '吹き流し', subtitle: 'Windswept' },
  { id: 'kengai', name: '懸崖', subtitle: 'Cascade' },
  { id: 'han-kengai', name: '半懸崖', subtitle: 'Semi-Cascade' },
  { id: 'kabudachi', name: '株立ち', subtitle: 'Multi-Trunk' },
]

const yearOptions = [3, 6, 9]

const maintenanceLevels: { id: Maintenance; name: string; subtitle: string }[] = [
  { id: 'apprentice', name: '弟子', subtitle: 'Apprentice' },
  { id: 'journeyman', name: '職人', subtitle: 'Craftsman' },
  { id: 'ninja', name: '忍者', subtitle: 'Master' },
]

const styleDescriptions: Record<Style, string> = {
  chokkan: 'formal upright with perfectly straight trunk, symmetrical horizontal cloud pads arranged in tiers',
  moyogi: 'informal upright with gentle S-curves, natural asymmetrical cloud placement creating organic flow',
  shakan: 'dramatically slanted trunk at 45 degrees with counterbalanced clouds, windswept character',
  fukinagashi: 'windswept form with all foliage swept dramatically to one side as if shaped by coastal winds',
  kengai: 'cascading form with trunk and clouds flowing downward like a waterfall over rocks',
  'han-kengai': 'semi-cascade with horizontal extension, clouds reaching gracefully outward over water',
  kabudachi: 'multi-trunk clump rising from single base, each trunk with individual cloud formations creating forest effect'
}

const maintenanceDescriptions: Record<Maintenance, string> = {
  apprentice: 'early training visible with emerging cloud shapes, natural growth patterns still present, foundational structure developing',
  journeyman: 'well-defined cloud pads with balanced proportions, professional maintenance evident, clean branch structure',
  ninja: 'masterful precision with perfect cloud formations, museum-quality sculptural art, flawless negative space between layers'
}

function SelectButton({
  selected,
  onClick,
  children,
  className = ''
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 text-sm transition-all duration-300 rounded-lg ${
        selected
          ? 'text-stone-100 shadow-lg'
          : 'bg-stone-100/80 text-stone-600 shadow-sm hover:shadow-md hover:bg-stone-100'
      } ${className}`}
      style={selected ? {
        background: 'linear-gradient(135deg, #4a3728 0%, #5c4433 50%, #3d2d22 100%)',
      } : undefined}
    >
      {children}
    </button>
  )
}

type Step = 'upload' | 'style' | 'years' | 'maintenance' | 'generate'

export default function VisualizerPage() {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [style, setStyle] = useState<Style | null>(null)
  const [years, setYears] = useState<number | null>(null)
  const [maintenance, setMaintenance] = useState<Maintenance | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Determine current step
  const getCurrentStep = (): Step => {
    if (result) return 'generate' // Show result
    if (!style) return 'style'
    if (!years) return 'years'
    if (!maintenance) return 'maintenance'
    return 'generate'
  }

  const currentStep = getCurrentStep()

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = 'dataTransfer' in e
      ? e.dataTransfer?.files[0]
      : e.target?.files?.[0]

    if (file && file.type.startsWith('image/')) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    }
  }, [])

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const buildTransformationPrompt = () => {
    const styleName = styles.find(s => s.id === style)?.subtitle || style

    return `Photorealistic photograph showing this exact garden scene after professional Japanese niwaki transformation.

The plants and trees have been transformed through ${years} years of professional Japanese niwaki cloud pruning in the ${styleName} style (${styleDescriptions[style!]}).

CRITICAL REQUIREMENTS:
- This is the SAME garden from the original photo
- Maintain IDENTICAL: camera angle, lighting conditions, background elements, hardscape, all non-plant elements
- ONLY the vegetation has changed - shaped into authentic niwaki cloud pads
- The plants' root positions and base trunks remain in the exact same spots
- Show realistic ${years}-year development: ${maintenanceDescriptions[maintenance!]}
- Cloud pads have characteristic soft, pillow-like appearance with clear negative space between layers

The result should look like a professional "after" photo taken from the exact same position as the "before" photo, years later.`
  }

  const buildInspirationPrompt = () => {
    const styleName = styles.find(s => s.id === style)?.subtitle || style

    return `Photorealistic photograph of a beautiful Japanese niwaki cloud-pruned tree in a serene garden setting. ${styleDescriptions[style!]}. The tree shows ${years} years of careful development with ${maintenanceDescriptions[maintenance!]}. Traditional Japanese garden atmosphere with raked gravel, moss, and stone elements. Professional landscape photography, natural daylight, shallow depth of field, 85mm lens aesthetic. The cloud pads have characteristic soft, pillow-like appearance with clearly defined negative space between layers. Authentic Japanese horticultural artistry in the ${styleName} style.`
  }

  const getImageBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const generateVisualization = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      let requestBody: { prompt: string; image?: string; mimeType?: string }

      if (image) {
        const imageBase64 = await getImageBase64(image)
        requestBody = {
          prompt: buildTransformationPrompt(),
          image: imageBase64,
          mimeType: image.type,
        }
      } else {
        requestBody = {
          prompt: buildInspirationPrompt(),
        }
      }

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Generation failed. Please try again.')
      }

      const data = await response.json()
      if (data.images && data.images.length > 0) {
        setResult(data.images[0])
      } else {
        throw new Error('No image generated')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStyle(null)
    setYears(null)
    setMaintenance(null)
    setResult(null)
    setError(null)
    setImage(null)
    setImagePreview(null)
  }

  return (
    <div
      className="min-h-screen text-stone-800 font-light relative"
      style={{
        background: `
          linear-gradient(135deg, rgba(245,245,244,0.9) 0%, rgba(250,250,249,0.95) 100%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")
        `,
        backgroundColor: '#fafaf9',
      }}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-50/95 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-80 h-80 mx-auto">
              <LoadingPlayer />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6 py-12 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl tracking-widest font-extralight mb-1">盛明</h1>
          <p className="text-xs tracking-[0.3em] text-stone-400 uppercase">Moraki</p>
        </header>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-16">

          {/* Small thumbnail if image uploaded */}
          {imagePreview && !result && (
            <div className="mb-8 flex justify-center animate-in fade-in duration-500">
              <div
                className="relative group cursor-pointer"
                onClick={() => {
                  setImage(null)
                  setImagePreview(null)
                }}
              >
                <img
                  src={imagePreview}
                  alt="Your garden"
                  className="w-16 h-16 object-cover rounded-lg shadow-md opacity-60"
                />
                <div className="absolute inset-0 bg-stone-800/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">×</span>
                </div>
              </div>
            </div>
          )}

          {/* Step: Style */}
          {currentStep === 'style' && !result && (
            <div className="text-center animate-in fade-in duration-700">
              {/* Photo upload area - hide if image already uploaded */}
              {!imagePreview && (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('fileInput')?.click()}
                  className="w-48 h-32 mx-auto mb-10 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center bg-stone-100/60 shadow-sm hover:shadow-md hover:bg-stone-100/80"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2 text-stone-300">松</div>
                    <p className="text-xs text-stone-400">upload photo</p>
                    <p className="text-[11px] text-stone-300">optional</p>
                  </div>
                </div>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleDrop}
                className="hidden"
              />

              <label className="text-sm tracking-wider text-stone-400 uppercase mb-6 block">
                Style
              </label>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {styles.map((s, i) => (
                  <div
                    key={s.id}
                    className="animate-in fade-in duration-500"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <SelectButton
                      selected={false}
                      onClick={() => setStyle(s.id)}
                    >
                      <span className="text-sm">{s.name} {s.subtitle}</span>
                    </SelectButton>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step: Years */}
          {currentStep === 'years' && !result && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <label className="text-sm tracking-wider text-stone-400 uppercase mb-6 block">
                Years
              </label>
              <div className="flex justify-center gap-3">
                {yearOptions.map((y, i) => (
                  <div
                    key={y}
                    className="animate-in fade-in duration-300"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <SelectButton
                      selected={false}
                      onClick={() => setYears(y)}
                    >
                      <span className="text-base px-2">{y}</span>
                    </SelectButton>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step: Maintenance */}
          {currentStep === 'maintenance' && !result && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <label className="text-sm tracking-wider text-stone-400 uppercase mb-6 block">
                Maintenance
              </label>
              <div className="flex justify-center gap-2">
                {maintenanceLevels.map((m, i) => (
                  <div
                    key={m.id}
                    className="animate-in fade-in duration-300"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <SelectButton
                      selected={false}
                      onClick={() => setMaintenance(m.id)}
                    >
                      <span className="text-sm">{m.name} {m.subtitle}</span>
                    </SelectButton>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step: Generate */}
          {currentStep === 'generate' && !result && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={generateVisualization}
                disabled={loading}
                className="relative px-12 py-5 text-stone-100 transition-all duration-300 hover:opacity-90 rounded-lg shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #4a3728 0%, #5c4433 50%, #3d2d22 100%)',
                }}
              >
                <span className="block text-2xl tracking-widest mb-1">夢を形に</span>
                <span className="block text-xs tracking-wider opacity-60">Shape your dreams</span>
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center animate-in fade-in duration-300">
              <p className="text-sm text-red-500 mb-4">{error}</p>
              <button
                onClick={resetForm}
                className="text-sm text-stone-400 hover:text-stone-600 underline"
              >
                Start over
              </button>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="text-center animate-in fade-in duration-700 w-full max-w-md">
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg mb-6">
                <img src={result} alt="Niwaki visualization" className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-center gap-4">
                <a
                  href={result}
                  download="moraki-visualization.png"
                  className="inline-block px-6 py-2 text-sm text-stone-600 tracking-wider bg-stone-100/80 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  Download
                </a>
                <button
                  onClick={resetForm}
                  className="px-6 py-2 text-sm text-stone-400 tracking-wider hover:text-stone-600 transition-all"
                >
                  Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="pt-6 text-center">
          <p className="text-xs text-stone-300 tracking-wider">森明 MORAKI</p>
        </footer>
      </div>
    </div>
  )
}
