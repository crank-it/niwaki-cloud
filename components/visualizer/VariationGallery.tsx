'use client'

import { useState, useCallback, useEffect } from 'react'
import { ImgComparisonSlider } from '@img-comparison-slider/react'
import type { VisualizationResult } from '@/types'

interface VariationGalleryProps {
  original: string
  variations: VisualizationResult[]
  onStartOver: () => void
}

export function VariationGallery({
  original,
  variations,
  onStartOver
}: VariationGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const selectedVariation = variations[selectedIndex]

  // Auto-cycle through variations
  useEffect(() => {
    if (!isAutoPlaying || variations.length <= 1) return
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % variations.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, variations.length])

  const handleManualSelect = (index: number) => {
    setIsAutoPlaying(false)
    setSelectedIndex(index)
  }

  const handleDownload = useCallback(async (imageUrl: string, styleName: string) => {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `niwaki-${styleName.toLowerCase().replace(/\s+/g, '-')}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, [])

  if (variations.length === 0) {
    return (
      <div className="text-center">
        <p className="text-stone-500 mb-1">生成失敗</p>
        <p className="text-stone-400 text-xs mb-4">generation failed</p>
        <button onClick={onStartOver} className="btn-primary text-center">
          <span className="block">再試行</span>
          <span className="block text-stone-300 text-[10px]">retry</span>
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Comparison slider */}
      <div className="rounded-lg overflow-hidden shadow-xl border border-stone-200">
        <ImgComparisonSlider className="w-full aspect-[4/3]">
          <img slot="first" src={original} alt="Original" className="w-full h-full object-cover" />
          <img slot="second" src={selectedVariation?.imageUrl || original} alt={selectedVariation?.styleName} className="w-full h-full object-cover" />
        </ImgComparisonSlider>
      </div>

      {/* Style buttons */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {variations.map((variation, index) => (
          <button
            key={variation.id}
            onClick={() => handleManualSelect(index)}
            className={`
              px-3 py-1.5 rounded text-sm transition-all
              ${selectedIndex === index
                ? 'bg-stone-800 text-white'
                : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
              }
            `}
          >
            {variation.styleName}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3 mt-3">
        <button onClick={onStartOver} className="btn-secondary text-xs py-1.5 px-4 text-center">
          <span className="block">新規</span>
          <span className="block text-stone-400 text-[10px]">new</span>
        </button>
        <button
          onClick={() => handleDownload(selectedVariation.imageUrl, selectedVariation.styleName)}
          className="btn-primary text-xs py-1.5 px-4 text-center"
        >
          <span className="block">保存</span>
          <span className="block text-stone-300 text-[10px]">save</span>
        </button>
      </div>
    </div>
  )
}
