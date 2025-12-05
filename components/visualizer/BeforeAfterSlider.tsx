'use client'

import { ImgComparisonSlider } from '@img-comparison-slider/react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = ''
}: BeforeAfterSliderProps) {
  return (
    <div className={`relative ${className}`}>
      <ImgComparisonSlider className="w-full rounded-xl overflow-hidden shadow-2xl">
        <img
          slot="first"
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover"
        />
        <img
          slot="second"
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
        />
      </ImgComparisonSlider>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-stone-700 shadow-lg">
          {beforeLabel}
        </span>
        <span className="px-3 py-1.5 bg-stone-800/90 backdrop-blur-sm rounded-full text-sm font-medium text-white shadow-lg">
          {afterLabel}
        </span>
      </div>
    </div>
  )
}
