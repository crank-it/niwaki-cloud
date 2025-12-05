'use client'

import { useState } from 'react'
import type { UserPreferences, NiwakiStyle, MaturityYears, PruningFrequency, Resolution } from '@/types'

interface QuestionnaireProps {
  gardenImage: string
  onComplete: (preferences: UserPreferences) => void
}

const styleOptions: { id: NiwakiStyle; name: string; kanji: string }[] = [
  { id: 'spherical', name: 'Spherical', kanji: '玉' },
  { id: 'tiered', name: 'Tiered', kanji: '段' },
  { id: 'windswept', name: 'Windswept', kanji: '風' },
  { id: 'naturalistic', name: 'Natural', kanji: '自然' },
]

const frequencyOptions: { id: PruningFrequency; name: string }[] = [
  { id: 'minimal', name: 'Minimal' },
  { id: 'monthly', name: 'Monthly' },
  { id: 'weekly', name: 'Weekly' },
  { id: 'expert', name: 'Expert' },
]

const resolutionOptions: { id: Resolution; kanji: string; name: string; timePerStyle: string }[] = [
  { id: 'low', kanji: '速', name: 'Fast', timePerStyle: '~20s' },
  { id: 'medium', kanji: '中', name: 'Medium', timePerStyle: '~40s' },
  { id: 'high', kanji: '精', name: 'Quality', timePerStyle: '~60s' },
]

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [years, setYears] = useState<MaturityYears>(5)
  const [frequency, setFrequency] = useState<PruningFrequency>('monthly')
  const [styles, setStyles] = useState<NiwakiStyle[]>(['spherical', 'naturalistic'])
  const [resolution, setResolution] = useState<Resolution>('medium')

  const selectedResOption = resolutionOptions.find(r => r.id === resolution)!
  const timePerStyleSeconds = resolution === 'low' ? 20 : resolution === 'medium' ? 40 : 60
  const totalSeconds = timePerStyleSeconds * styles.length
  const estimatedTime = totalSeconds < 60
    ? `~${totalSeconds}s`
    : `~${Math.round(totalSeconds / 60)}m ${totalSeconds % 60}s`

  const toggleStyle = (styleId: NiwakiStyle) => {
    setStyles((prev) =>
      prev.includes(styleId)
        ? prev.filter((s) => s !== styleId)
        : prev.length < 4 ? [...prev, styleId] : prev
    )
  }

  const handleSubmit = () => {
    if (styles.length >= 2) {
      onComplete({ years, pruningFrequency: frequency, styles, resolution })
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Years */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-stone-600">Years of Development</span>
          <span className="text-sm font-medium text-stone-800">{years}</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={years}
          onChange={(e) => setYears(Number(e.target.value) as MaturityYears)}
          className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-800"
        />
        <div className="flex justify-between text-xs text-stone-400 mt-1">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      {/* Maintenance */}
      <div className="mb-6">
        <span className="text-sm text-stone-600 block mb-2">Maintenance Level</span>
        <div className="flex gap-2">
          {frequencyOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFrequency(option.id)}
              className={`
                flex-1 py-2 px-2 rounded text-xs font-medium transition-all
                ${frequency === option.id
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }
              `}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Styles */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-stone-600">Styles to Generate</span>
          <span className="text-xs text-stone-400">{styles.length}/4 selected</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {styleOptions.map((style) => {
            const isSelected = styles.includes(style.id)
            return (
              <button
                key={style.id}
                onClick={() => toggleStyle(style.id)}
                className={`
                  py-3 rounded text-center transition-all
                  ${isSelected
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }
                `}
              >
                <div className="text-lg mb-0.5">{style.kanji}</div>
                <div className="text-xs">{style.name}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Resolution */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-stone-600">Quality</span>
          <span className="text-xs text-stone-400">{selectedResOption.timePerStyle}/style</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {resolutionOptions.map((res) => {
            const isSelected = resolution === res.id
            return (
              <button
                key={res.id}
                onClick={() => setResolution(res.id)}
                className={`
                  py-2 rounded text-center transition-all
                  ${isSelected
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }
                `}
              >
                <div className="text-base mb-0.5">{res.kanji}</div>
                <div className="text-xs">{res.name}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={styles.length < 2}
        className="w-full py-3 bg-stone-800 text-white rounded font-medium hover:bg-stone-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="block">生成</span>
        <span className="block text-stone-400 text-xs">generate {estimatedTime}</span>
      </button>

      {styles.length < 2 && (
        <p className="text-center text-xs text-stone-400 mt-2">
          Select at least 2 styles
        </p>
      )}
    </div>
  )
}
