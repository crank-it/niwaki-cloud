'use client';

import { motion } from 'framer-motion';
import { Scissors, Wrench, Cable } from 'lucide-react';
import { TOOLS } from '@/lib/techniques-data';

const CATEGORY_INFO: Record<string, { icon: React.ReactNode; label: string }> = {
  cutting: { icon: <Scissors className="w-5 h-5" />, label: 'Cutting Tools' },
  maintenance: { icon: <Wrench className="w-5 h-5" />, label: 'Maintenance' },
  training: { icon: <Cable className="w-5 h-5" />, label: 'Training Materials' },
};

export function ToolsSection() {
  const groupedTools = TOOLS.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<string, typeof TOOLS>
  );

  return (
    <section id="tools" className="py-24 bg-niwaki-paper">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-niwaki-ink mb-4">
            Essential Tools
          </h2>
          <p className="text-lg text-niwaki-bark max-w-2xl mx-auto">
            Quality tools make precise work possible. Invest in the best you can afford—they'll
            last decades with proper care.
          </p>
        </motion.div>

        <div className="space-y-8">
          {Object.entries(groupedTools).map(([category, tools], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-niwaki-moss">
                  {CATEGORY_INFO[category]?.icon}
                </div>
                <h3 className="font-serif text-xl text-niwaki-ink">
                  {CATEGORY_INFO[category]?.label || category}
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-niwaki-cream border border-niwaki-stone/20 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-niwaki-ink">{tool.name}</h4>
                        {tool.japaneseEquivalent && (
                          <p className="text-sm text-niwaki-moss">{tool.japaneseEquivalent}</p>
                        )}
                      </div>
                      {tool.priceRange && (
                        <span className="text-sm text-niwaki-stone">{tool.priceRange}</span>
                      )}
                    </div>
                    <p className="text-sm text-niwaki-bark mb-2">{tool.purpose}</p>
                    {tool.recommended && (
                      <p className="text-xs text-niwaki-moss">
                        Recommended: <span className="font-medium">{tool.recommended}</span>
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-niwaki-moss/5 border border-niwaki-moss/20 rounded-lg p-6"
        >
          <h4 className="font-medium text-niwaki-pine mb-3">Tool Care Tips</h4>
          <ul className="space-y-2 text-sm text-niwaki-bark">
            <li className="flex items-start gap-2">
              <span className="text-niwaki-moss">✓</span>
              Clean blades after each use with Mini Clean Mate or alcohol to remove sap
            </li>
            <li className="flex items-start gap-2">
              <span className="text-niwaki-moss">✓</span>
              Apply camellia oil to prevent rust, especially before storage
            </li>
            <li className="flex items-start gap-2">
              <span className="text-niwaki-moss">✓</span>
              Sharpen regularly—dull blades crush rather than cut, causing damage
            </li>
            <li className="flex items-start gap-2">
              <span className="text-niwaki-moss">✓</span>
              Store in a dry place, preferably in protective sheaths
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
