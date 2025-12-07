'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertOctagon, AlertTriangle, Clock, Palette, Settings } from 'lucide-react';
import { COMMON_MISTAKES } from '@/lib/techniques-data';

const CATEGORY_INFO: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  critical: {
    icon: <AlertOctagon className="w-5 h-5" />,
    label: 'Critical Errors',
    color: 'text-red-600',
  },
  timing: {
    icon: <Clock className="w-5 h-5" />,
    label: 'Timing Mistakes',
    color: 'text-amber-600',
  },
  style: {
    icon: <Palette className="w-5 h-5" />,
    label: 'Style Issues',
    color: 'text-blue-600',
  },
  maintenance: {
    icon: <Settings className="w-5 h-5" />,
    label: 'Maintenance Problems',
    color: 'text-purple-600',
  },
};

export function MistakesAccordion() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const groupedMistakes = COMMON_MISTAKES.reduce(
    (acc, mistake) => {
      if (!acc[mistake.category]) {
        acc[mistake.category] = [];
      }
      acc[mistake.category].push(mistake);
      return acc;
    },
    {} as Record<string, typeof COMMON_MISTAKES>
  );

  return (
    <section id="mistakes" className="py-24 bg-niwaki-cream">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-niwaki-ink mb-4">
            Common Mistakes to Avoid
          </h2>
          <p className="text-lg text-niwaki-bark max-w-2xl mx-auto">
            Learn from others' errors. These mistakes can set your niwaki back years—or kill
            branches entirely.
          </p>
        </motion.div>

        <div className="space-y-8">
          {Object.entries(groupedMistakes).map(([category, mistakes], categoryIndex) => {
            const info = CATEGORY_INFO[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
              >
                <div className={`flex items-center gap-3 mb-4 ${info?.color || 'text-niwaki-stone'}`}>
                  {info?.icon || <AlertTriangle className="w-5 h-5" />}
                  <h3 className="font-serif text-xl">{info?.label || category}</h3>
                </div>

                <div className="space-y-2">
                  {mistakes.map((mistake) => (
                    <div
                      key={mistake.id}
                      className="bg-niwaki-paper border border-niwaki-stone/20 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === mistake.id ? null : mistake.id)
                        }
                        className="w-full px-5 py-4 text-left hover:bg-niwaki-cream/50 transition-colors"
                        aria-expanded={expandedId === mistake.id}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-niwaki-ink">{mistake.mistake}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-niwaki-stone transition-transform ${
                              expandedId === mistake.id ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedId === mistake.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 border-t border-niwaki-stone/10 pt-3">
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-red-600 uppercase tracking-wider mb-1">
                                    Consequence
                                  </p>
                                  <p className="text-sm text-niwaki-bark">{mistake.consequence}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-niwaki-moss uppercase tracking-wider mb-1">
                                    Solution
                                  </p>
                                  <p className="text-sm text-niwaki-bark">{mistake.solution}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
