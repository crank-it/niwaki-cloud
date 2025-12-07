'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PRUNING_TECHNIQUES } from '@/lib/techniques-data';
import { TechniqueCard } from './TechniqueCard';
import { TechniqueFilter } from './TechniqueFilter';
import type { FilterState } from '@/types/techniques';

export function TechniqueGrid() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    season: null,
    difficulty: null,
  });

  const filteredTechniques = useMemo(() => {
    return PRUNING_TECHNIQUES.filter((technique) => {
      if (filters.category !== 'all' && !technique.categories.includes(filters.category)) {
        return false;
      }
      if (filters.season && !technique.seasons.includes(filters.season)) {
        return false;
      }
      if (filters.difficulty && technique.difficulty !== filters.difficulty) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <section id="techniques" className="py-24 bg-niwaki-cream">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-niwaki-ink mb-4">
            Core Pruning Techniques
          </h2>
          <p className="text-lg text-niwaki-bark max-w-2xl mx-auto">
            Master these fundamental techniques to shape and maintain your niwaki.
            Each technique serves a specific purpose in the art of Japanese cloud pruning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <TechniqueFilter filters={filters} onFilterChange={setFilters} />
        </motion.div>

        <div className="space-y-4">
          {filteredTechniques.length === 0 ? (
            <div className="text-center py-12 text-niwaki-stone">
              No techniques match your current filters. Try adjusting your selection.
            </div>
          ) : (
            filteredTechniques.map((technique, index) => (
              <motion.div
                key={technique.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <TechniqueCard technique={technique} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
