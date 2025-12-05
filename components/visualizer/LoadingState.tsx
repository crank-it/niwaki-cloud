'use client'

import { useEffect, useState } from 'react'

interface LoadingStateProps {
  status: string
  progress?: number
}

const messages = [
  { jp: '分析中', en: 'analysing' },
  { jp: '構成中', en: 'composing' },
  { jp: '剪定中', en: 'pruning' },
  { jp: '完成間近', en: 'almost done' },
]

export function LoadingState({ progress = 50 }: LoadingStateProps) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center">
      {/* Minimal ink brush circle */}
      <div className="mb-6 relative w-24 h-24 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#44403c"
            strokeWidth="2"
            strokeDasharray="8 4"
            className="opacity-30"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="#44403c"
            className="opacity-20"
          />
          <circle
            cx="50"
            cy="30"
            r="12"
            fill="#44403c"
            className="cloud-animate"
          />
          <circle
            cx="38"
            cy="45"
            r="10"
            fill="#57534e"
            className="cloud-animate cloud-animate-delay-1"
          />
          <circle
            cx="62"
            cy="45"
            r="10"
            fill="#57534e"
            className="cloud-animate cloud-animate-delay-2"
          />
          <rect x="47" y="55" width="6" height="20" fill="#78716c" />
        </svg>
      </div>

      <div className="mb-4 h-10">
        <p className="text-stone-600 text-sm">{messages[messageIndex].jp}</p>
        <p className="text-stone-400 text-xs">{messages[messageIndex].en}</p>
      </div>

      {/* Minimal progress */}
      <div className="w-32 mx-auto bg-stone-200 rounded-full h-0.5">
        <div
          className="bg-stone-600 h-0.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
