'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, Clock, Leaf, Beaker, Timer } from 'lucide-react';
import type { PruningTechnique } from '@/types/techniques';

interface TechniqueCardProps {
  technique: PruningTechnique;
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Difficulty: ${difficulty} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= difficulty ? 'text-niwaki-moss' : 'text-niwaki-stone/30'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TechniqueVisual({ type }: { type?: string }) {
  if (!type) return null;

  const visuals: Record<string, React.ReactNode> = {
    'candle-pinching': (
      <svg viewBox="0 0 120 100" className="w-full h-24 text-niwaki-moss">
        <path d="M20 80 L60 50" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M60 50 L60 15" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.3" strokeDasharray="4 2" />
        <line x1="55" y1="20" x2="65" y2="30" stroke="#dc2626" strokeWidth="2" />
        <line x1="65" y1="20" x2="55" y2="30" stroke="#dc2626" strokeWidth="2" />
        <path d="M60 50 L45 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M60 50 L75 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="60" y="8" textAnchor="middle" className="text-[7px] fill-red-500">remove</text>
        <text x="35" y="20" textAnchor="middle" className="text-[7px] fill-niwaki-moss">keep</text>
        <text x="85" y="20" textAnchor="middle" className="text-[7px] fill-niwaki-moss">keep</text>
      </svg>
    ),
    'needle-plucking': (
      <svg viewBox="0 0 120 80" className="w-full h-20 text-niwaki-moss">
        <path d="M10 40 L110 40" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
        <g opacity="0.3">
          {[20, 30, 40].map((x) => (
            <g key={x}>
              <line x1={x} y1="40" x2={x-5} y2="25" stroke="currentColor" strokeWidth="1" />
              <line x1={x} y1="40" x2={x+5} y2="25" stroke="currentColor" strokeWidth="1" />
              <line x1={x} y1="40" x2={x-5} y2="55" stroke="currentColor" strokeWidth="1" />
              <line x1={x} y1="40" x2={x+5} y2="55" stroke="currentColor" strokeWidth="1" />
            </g>
          ))}
        </g>
        {[60, 70, 80, 90, 100].map((x) => (
          <g key={x}>
            <line x1={x} y1="40" x2={x-4} y2="28" stroke="currentColor" strokeWidth="1.5" />
            <line x1={x} y1="40" x2={x+4} y2="28" stroke="currentColor" strokeWidth="1.5" />
            <line x1={x} y1="40" x2={x-4} y2="52" stroke="currentColor" strokeWidth="1.5" />
            <line x1={x} y1="40" x2={x+4} y2="52" stroke="currentColor" strokeWidth="1.5" />
          </g>
        ))}
        <path d="M30 65 L25 70 L35 70 Z" fill="#dc2626" />
        <text x="30" y="78" textAnchor="middle" className="text-[6px] fill-red-500">pull down</text>
        <text x="30" y="15" textAnchor="middle" className="text-[6px] fill-niwaki-stone">2yr old</text>
        <text x="80" y="15" textAnchor="middle" className="text-[6px] fill-niwaki-moss">current year</text>
      </svg>
    ),
    'transparent-clouds': (
      <svg viewBox="0 0 120 80" className="w-full h-20 text-niwaki-moss">
        <path d="M60 80 L60 45" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M60 55 L30 35" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M60 55 L90 35" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M60 45 L60 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="25" cy="30" rx="18" ry="10" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <ellipse cx="95" cy="30" rx="18" ry="10" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <ellipse cx="60" cy="15" rx="15" ry="8" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M40 5 L35 25" stroke="#fbbf24" strokeWidth="1" opacity="0.5" />
        <path d="M80 5 L85 25" stroke="#fbbf24" strokeWidth="1" opacity="0.5" />
        <text x="60" y="78" textAnchor="middle" className="text-[6px] fill-niwaki-stone">light passes through</text>
      </svg>
    ),
    'pinching': (
      <svg viewBox="0 0 120 80" className="w-full h-20 text-niwaki-moss">
        <g transform="translate(0, 0)">
          <text x="30" y="10" textAnchor="middle" className="text-[7px] fill-niwaki-stone">before</text>
          <path d="M30 70 L30 30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M30 30 L30 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
          <circle cx="30" cy="15" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="26" cy="40" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="34" cy="50" r="2" fill="currentColor" opacity="0.3" />
        </g>
        <path d="M50 40 L70 40" stroke="currentColor" strokeWidth="1" />
        <polygon points="68,37 75,40 68,43" fill="currentColor" />
        <g transform="translate(60, 0)">
          <text x="30" y="10" textAnchor="middle" className="text-[7px] fill-niwaki-stone">after</text>
          <path d="M30 70 L30 35" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M30 40 L20 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M30 50 L40 35" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="20" cy="22" r="4" fill="currentColor" opacity="0.3" />
          <circle cx="40" cy="32" r="4" fill="currentColor" opacity="0.3" />
        </g>
      </svg>
    ),
    'defoliation': (
      <svg viewBox="0 0 120 80" className="w-full h-20 text-niwaki-moss">
        <path d="M10 50 L110 50" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
        {[25, 45, 65].map((x) => (
          <g key={x} opacity="0.3">
            <ellipse cx={x} cy="35" rx="8" ry="5" fill="currentColor" />
            <line x1={x-5} y1="30" x2={x+5} y2="40" stroke="#dc2626" strokeWidth="1.5" />
            <line x1={x+5} y1="30" x2={x-5} y2="40" stroke="#dc2626" strokeWidth="1.5" />
          </g>
        ))}
        <ellipse cx="95" cy="35" rx="8" ry="5" fill="currentColor" opacity="0.6" />
        <text x="95" y="25" textAnchor="middle" className="text-[5px] fill-niwaki-moss">sap drawer</text>
        <text x="45" y="70" textAnchor="middle" className="text-[6px] fill-niwaki-stone">remove all except tip leaf</text>
      </svg>
    ),
  };

  return visuals[type] || null;
}

export function TechniqueCard({ technique }: TechniqueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-niwaki-paper border border-niwaki-stone/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left hover:bg-niwaki-cream/50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="font-serif text-xl text-niwaki-ink">{technique.name}</h3>
              {technique.japaneseCharacters && (
                <span className="text-xl text-niwaki-moss">{technique.japaneseCharacters}</span>
              )}
            </div>
            {technique.japaneseName && (
              <p className="text-sm text-niwaki-stone italic mb-2">{technique.japaneseName}</p>
            )}
            <p className="text-niwaki-bark">{technique.purpose}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 text-xs bg-niwaki-cream px-3 py-1.5 rounded-full text-niwaki-bark">
                <Clock className="w-3.5 h-3.5" />
                {technique.timing[0]}
              </span>
              {technique.criticalWindow && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-full font-medium">
                  <Timer className="w-3.5 h-3.5" />
                  Critical: {technique.criticalWindow}
                </span>
              )}
              {technique.bestFor.slice(0, 2).map((species) => (
                <span
                  key={species}
                  className="inline-flex items-center gap-1.5 text-xs bg-niwaki-bamboo/20 text-niwaki-pine px-3 py-1.5 rounded-full"
                >
                  <Leaf className="w-3.5 h-3.5" />
                  {species}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <DifficultyStars difficulty={technique.difficulty} />
            <ChevronDown
              className={`w-5 h-5 text-niwaki-stone transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-niwaki-stone/10 pt-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-niwaki-ink mb-3">Step-by-Step Process</h4>
                  <ol className="space-y-2">
                    {technique.process.map((step) => (
                      <li key={step.step} className="flex gap-3 text-sm text-niwaki-bark">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-niwaki-moss/10 text-niwaki-moss text-xs flex items-center justify-center font-medium">
                          {step.step}
                        </span>
                        <span className="pt-0.5">{step.description}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col">
                  {technique.goalVisual && (
                    <div className="bg-niwaki-cream/50 rounded-lg p-4 mb-4">
                      <TechniqueVisual type={technique.goalVisual} />
                    </div>
                  )}

                  {technique.tips && technique.tips.length > 0 && (
                    <div className="bg-niwaki-moss/5 border border-niwaki-moss/20 rounded-lg p-3">
                      <h5 className="font-medium text-niwaki-pine text-sm mb-2">Quick Tips</h5>
                      <ul className="space-y-1">
                        {technique.tips.map((tip, index) => (
                          <li key={index} className="text-xs text-niwaki-bark flex items-start gap-2">
                            <span className="text-niwaki-moss">✓</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {technique.science && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3 items-start">
                    <Beaker className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-800 mb-1">The Science</h5>
                      <p className="text-sm text-blue-700">{technique.science}</p>
                    </div>
                  </div>
                </div>
              )}

              {technique.warnings && technique.warnings.length > 0 && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-amber-800 mb-1">Critical Warnings</h5>
                      <ul className="space-y-1">
                        {technique.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-amber-700">
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
