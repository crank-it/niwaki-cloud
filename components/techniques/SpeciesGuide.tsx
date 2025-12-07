'use client';

import { motion } from 'framer-motion';
import { Star, Clock, Leaf } from 'lucide-react';
import { SPECIES_GUIDE } from '@/lib/techniques-data';

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

export function SpeciesGuide() {
  return (
    <section id="species" className="py-24 bg-niwaki-cream">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-niwaki-ink mb-4">
            Species Selection Guide
          </h2>
          <p className="text-lg text-niwaki-bark max-w-2xl mx-auto">
            Not all trees are suited to niwaki training. Choose species that respond well
            to pruning and match your commitment level.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIES_GUIDE.map((species, index) => (
            <motion.div
              key={species.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-niwaki-paper border border-niwaki-stone/20 rounded-lg p-5 hover:border-niwaki-moss/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-serif text-lg text-niwaki-ink">{species.name}</h3>
                  <p className="text-sm text-niwaki-stone italic">{species.scientificName}</p>
                </div>
                {species.isTraditional && (
                  <span className="text-xs bg-niwaki-moss/10 text-niwaki-moss px-2 py-1 rounded-full">
                    Traditional
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-niwaki-stone" />
                  <DifficultyStars difficulty={species.difficulty} />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-niwaki-bark mb-3">
                <Clock className="w-4 h-4 text-niwaki-stone flex-shrink-0" />
                <span>{species.maintenanceFrequency}</span>
              </div>

              <div className="mb-3">
                <p className="text-xs text-niwaki-stone uppercase tracking-wider mb-2">
                  Best Techniques
                </p>
                <div className="flex flex-wrap gap-1">
                  {species.bestTechniques.map((technique) => (
                    <span
                      key={technique}
                      className="inline-flex items-center gap-1 text-xs bg-niwaki-bamboo/20 text-niwaki-pine px-2 py-1 rounded-full"
                    >
                      <Leaf className="w-3 h-3" />
                      {technique}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-niwaki-bark">{species.notes}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
