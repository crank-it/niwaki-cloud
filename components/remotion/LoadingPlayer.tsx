'use client'

import { useEffect, useState } from 'react'

const quotes = [
  { japanese: '急がば回れ', english: 'If in a hurry, take the long way' },
  { japanese: '石の上にも三年', english: 'Three years on a stone brings warmth' },
  { japanese: '七転び八起き', english: 'Fall seven times, rise eight' },
  { japanese: '継続は力なり', english: 'Continuity is strength' },
  { japanese: '塵も積もれば山となる', english: 'Even dust piles into mountains' },
  { japanese: '千里の道も一歩から', english: 'A thousand mile journey begins with one step' },
]

export const LoadingPlayer = () => {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setQuoteIndex(i => (i + 1) % quotes.length)
        setFade(true)
      }, 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const quote = quotes[quoteIndex]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Main character with subtle pulse */}
      <div className="text-8xl text-stone-300 mb-8 animate-pulse">
        松
      </div>

      {/* Quote with fade transition */}
      <div
        className={`text-center transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-xl text-stone-600 tracking-widest mb-2">
          {quote.japanese}
        </p>
        <p className="text-sm text-stone-400 italic">
          {quote.english}
        </p>
      </div>

      {/* Subtle loading dots */}
      <div className="mt-8 flex gap-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-stone-300"
            style={{
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}
