'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, TreePine } from 'lucide-react';
import type { NiwakiStyle } from '@/types/techniques';

interface StyleCardProps {
  style: NiwakiStyle;
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

export function StyleCard({ style }: StyleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-niwaki-paper border border-niwaki-stone/20 rounded-xl overflow-hidden hover:border-niwaki-moss/30 transition-colors"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-serif text-xl text-niwaki-ink">{style.name}</h3>
              <span className="text-2xl text-niwaki-moss">{style.japaneseCharacters}</span>
            </div>
            <p className="text-sm text-niwaki-stone italic mb-3">{style.japaneseName}</p>
            <DifficultyStars difficulty={style.difficulty} />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-niwaki-cream rounded-lg flex items-center justify-center">
              <TreePine className="w-8 h-8 text-niwaki-moss/60" />
            </div>
            <ChevronDown
              className={`w-5 h-5 text-niwaki-stone transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        <p className="text-niwaki-bark mt-4 line-clamp-2">{style.description}</p>
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
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-niwaki-ink mb-3">Characteristics</h4>
                  <ul className="space-y-2">
                    {style.characteristics.map((char, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-niwaki-bark">
                        <span className="text-niwaki-moss mt-1">•</span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-niwaki-ink mb-3">Best Species</h4>
                  <div className="flex flex-wrap gap-2">
                    {style.bestSpecies.map((species) => (
                      <span
                        key={species}
                        className="inline-block bg-niwaki-bamboo/20 text-niwaki-pine text-xs px-3 py-1 rounded-full"
                      >
                        {species}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
