'use client'

import { useState, useCallback } from 'react'

type Style = 'chokkan' | 'moyogi' | 'shakan' | 'fukinagashi' | 'kengai' | 'han-kengai' | 'kabudachi'
type Maintenance = 'apprentice' | 'journeyman' | 'ninja'
type Quality = 'fast' | 'medium' | 'high'

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

const maintenanceLevels: { id: Maintenance; name: string; subtitle: string; emoji: string }[] = [
  { id: 'apprentice', name: '弟子', subtitle: 'Apprentice', emoji: '🌱' },
  { id: 'journeyman', name: '職人', subtitle: 'Craftsman', emoji: '✂️' },
  { id: 'ninja', name: '忍者', subtitle: 'Ninja', emoji: '🥷' },
]

const qualityOptions: { id: Quality; name: string; time: string }[] = [
  { id: 'fast', name: 'Fast', time: '~15s' },
  { id: 'medium', name: 'Medium', time: '~30s' },
  { id: 'high', name: 'High', time: '~60s' },
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
      className={`px-3 py-2 text-sm transition-all duration-200 border rounded ${
        selected
          ? 'bg-stone-800 text-white border-stone-800'
          : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export default function VisualizerPage() {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [style, setStyle] = useState<Style>('moyogi')
  const [years, setYears] = useState(6)
  const [maintenance, setMaintenance] = useState<Maintenance>('journeyman')
  const [quality, setQuality] = useState<Quality>('medium')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

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

The plants and trees have been transformed through ${years} years of professional Japanese niwaki cloud pruning in the ${styleName} style (${styleDescriptions[style]}).

CRITICAL REQUIREMENTS:
- This is the SAME garden from the original photo
- Maintain IDENTICAL: camera angle, lighting conditions, background elements, hardscape, all non-plant elements
- ONLY the vegetation has changed - shaped into authentic niwaki cloud pads
- The plants' root positions and base trunks remain in the exact same spots
- Show realistic ${years}-year development: ${maintenanceDescriptions[maintenance]}
- Cloud pads have characteristic soft, pillow-like appearance with clear negative space between layers

The result should look like a professional "after" photo taken from the exact same position as the "before" photo, years later.`
  }

  const buildInspirationPrompt = () => {
    const styleName = styles.find(s => s.id === style)?.subtitle || style

    return `Photorealistic photograph of a beautiful Japanese niwaki cloud-pruned tree in a serene garden setting. ${styleDescriptions[style]}. The tree shows ${years} years of careful development with ${maintenanceDescriptions[maintenance]}. Traditional Japanese garden atmosphere with raked gravel, moss, and stone elements. Professional landscape photography, natural daylight, shallow depth of field, 85mm lens aesthetic. The cloud pads have characteristic soft, pillow-like appearance with clearly defined negative space between layers. Authentic Japanese horticultural artistry in the ${styleName} style.`
  }

  const getImageBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        // Remove the data:image/xxx;base64, prefix
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
      // If user uploaded an image, use transformation mode
      // Otherwise, generate inspiration image
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

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-light">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl tracking-widest font-extralight mb-1">盛明</h1>
          <p className="text-xs tracking-[0.3em] text-stone-400 uppercase">Moraki Visualizer</p>
        </header>

        {/* Guidance */}
        <div className="text-center mb-8 text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
          <p>Generate niwaki inspiration images. Select your preferred style,</p>
          <p>development timeline, and maintenance level below.</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Reference Upload (Optional) */}
          <div>
            <label className="text-xs tracking-wider text-stone-400 uppercase mb-2 block text-center">
              Your Garden <span className="text-stone-300">(optional reference)</span>
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('fileInput')?.click()}
              className={`aspect-square border-2 border-dashed rounded cursor-pointer transition-all duration-300 flex items-center justify-center overflow-hidden ${
                imagePreview
                  ? 'border-stone-300'
                  : 'border-stone-200 hover:border-stone-400 bg-white'
              }`}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Upload" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <div className="text-4xl mb-3 text-stone-300">松</div>
                  <p className="text-sm text-stone-400">Drop image or click</p>
                </div>
              )}
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleDrop}
              className="hidden"
            />
          </div>

          {/* Right: Controls */}
          <div className="space-y-6">
            {/* Style */}
            <div>
              <label className="text-xs tracking-wider text-stone-400 uppercase mb-2 block">Style</label>
              <div className="flex flex-wrap gap-1">
                {styles.map((s) => (
                  <SelectButton
                    key={s.id}
                    selected={style === s.id}
                    onClick={() => setStyle(s.id)}
                  >
                    <span className="block text-xs">{s.name}</span>
                  </SelectButton>
                ))}
              </div>
              <p className="text-xs text-stone-400 mt-1">
                {styles.find(s => s.id === style)?.subtitle}
              </p>
            </div>

            {/* Years */}
            <div>
              <label className="text-xs tracking-wider text-stone-400 uppercase mb-2 block">Years of Development</label>
              <div className="flex gap-1">
                {yearOptions.map((y) => (
                  <SelectButton
                    key={y}
                    selected={years === y}
                    onClick={() => setYears(y)}
                    className="flex-1"
                  >
                    {y} years
                  </SelectButton>
                ))}
              </div>
            </div>

            {/* Maintenance */}
            <div>
              <label className="text-xs tracking-wider text-stone-400 uppercase mb-2 block">Maintenance Level</label>
              <div className="flex gap-1">
                {maintenanceLevels.map((m) => (
                  <SelectButton
                    key={m.id}
                    selected={maintenance === m.id}
                    onClick={() => setMaintenance(m.id)}
                    className="flex-1"
                  >
                    <span className="block">{m.emoji}</span>
                    <span className="block text-xs">{m.name}</span>
                  </SelectButton>
                ))}
              </div>
              <p className="text-xs text-stone-400 mt-1">
                {maintenanceLevels.find(m => m.id === maintenance)?.subtitle}
              </p>
            </div>

            {/* Quality */}
            <div>
              <label className="text-xs tracking-wider text-stone-400 uppercase mb-2 block">Quality</label>
              <div className="flex gap-1">
                {qualityOptions.map((q) => (
                  <SelectButton
                    key={q.id}
                    selected={quality === q.id}
                    onClick={() => setQuality(q.id)}
                    className="flex-1"
                  >
                    <span className="block text-xs">{q.name}</span>
                    <span className="block text-[10px] text-stone-400">{q.time}</span>
                  </SelectButton>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateVisualization}
              disabled={loading}
              className={`w-full py-4 text-sm tracking-widest uppercase transition-all duration-300 rounded ${
                loading
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-stone-800 text-white hover:bg-stone-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-pulse">生成中</span>
                  <span className="text-xs">Generating...</span>
                </span>
              ) : (
                '視覚化 — Visualize'
              )}
            </button>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 text-center">{error}</p>
            )}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="text-xs tracking-wider text-stone-400 uppercase">Result</span>
            </div>
            <div className="aspect-square max-w-lg mx-auto border border-stone-200 rounded overflow-hidden">
              <img src={result} alt="Niwaki visualization" className="w-full h-full object-cover" />
            </div>
            <div className="text-center mt-4">
              <a
                href={result}
                download="moraki-visualization.png"
                className="text-xs text-stone-500 hover:text-stone-800 underline"
              >
                Download Image
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-stone-100 text-center">
          <p className="text-[10px] text-stone-300 tracking-wider">森明 MORAKI · NIWAKI CLOUD</p>
        </footer>
      </div>
    </div>
  )
}
