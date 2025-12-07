'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { TRAINING_METHODS, WIRE_COMPARISON } from '@/lib/techniques-data';

export function BranchTraining() {
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);

  return (
    <section id="training" className="py-24 bg-niwaki-cream">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-niwaki-ink mb-4">
            Branch Training Methods
          </h2>
          <p className="text-lg text-niwaki-bark max-w-2xl mx-auto">
            Shaping branches is a gradual process. These methods allow you to guide growth
            without damage, creating elegant forms over seasons and years.
          </p>
        </motion.div>

        {/* Training Methods */}
        <div className="space-y-4 mb-12">
          {TRAINING_METHODS.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-niwaki-paper border border-niwaki-stone/20 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedMethod(expandedMethod === method.id ? null : method.id)}
                className="w-full p-6 text-left hover:bg-niwaki-cream/50 transition-colors"
                aria-expanded={expandedMethod === method.id}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-niwaki-ink mb-2">{method.name}</h3>
                    <p className="text-niwaki-bark">{method.description}</p>
                    <p className="text-sm text-niwaki-moss mt-2 font-medium">
                      Duration: {method.duration}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-niwaki-stone transition-transform ml-4 flex-shrink-0 ${
                      expandedMethod === method.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {expandedMethod === method.id && (
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
                          <h4 className="font-medium text-niwaki-ink mb-3">When to Use</h4>
                          <p className="text-sm text-niwaki-bark mb-4">{method.whenToUse}</p>

                          <h4 className="font-medium text-niwaki-ink mb-3">Materials Needed</h4>
                          <ul className="space-y-1">
                            {method.materials.map((material, idx) => (
                              <li key={idx} className="text-sm text-niwaki-bark flex items-start gap-2">
                                <span className="text-niwaki-moss">•</span>
                                {material}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-niwaki-ink mb-3">Step-by-Step Process</h4>
                          <ol className="space-y-2">
                            {method.process.map((step) => (
                              <li key={step.step} className="flex gap-3 text-sm text-niwaki-bark">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-niwaki-moss/10 text-niwaki-moss text-xs flex items-center justify-center font-medium">
                                  {step.step}
                                </span>
                                <span className="pt-0.5">{step.description}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {method.tips && method.tips.length > 0 && (
                        <div className="mt-4 bg-niwaki-moss/5 border border-niwaki-moss/20 rounded-lg p-3">
                          <div className="flex gap-2 items-start">
                            <CheckCircle className="w-4 h-4 text-niwaki-moss flex-shrink-0 mt-0.5" />
                            <div>
                              <h5 className="font-medium text-niwaki-pine text-sm mb-1">Tips</h5>
                              <ul className="space-y-1">
                                {method.tips.map((tip, idx) => (
                                  <li key={idx} className="text-xs text-niwaki-bark">
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {method.warnings && method.warnings.length > 0 && (
                        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <div className="flex gap-2 items-start">
                            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h5 className="font-medium text-amber-800 text-sm mb-1">Warnings</h5>
                              <ul className="space-y-1">
                                {method.warnings.map((warning, idx) => (
                                  <li key={idx} className="text-xs text-amber-700">
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
            </motion.div>
          ))}
        </div>

        {/* Wire Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-niwaki-paper border border-niwaki-stone/20 rounded-lg overflow-hidden"
        >
          <div className="p-6 border-b border-niwaki-stone/10">
            <h3 className="font-serif text-xl text-niwaki-ink">Wire Type Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-niwaki-cream/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-niwaki-stone uppercase tracking-wider">
                    Wire Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-niwaki-stone uppercase tracking-wider">
                    Best For
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-niwaki-stone uppercase tracking-wider">
                    Gauge
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-niwaki-stone uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-niwaki-stone/10">
                {WIRE_COMPARISON.map((wire) => (
                  <tr
                    key={wire.type}
                    className={wire.bestFor === 'NEVER USE' ? 'bg-red-50' : ''}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-niwaki-ink">
                      {wire.type}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        wire.bestFor === 'NEVER USE' ? 'text-red-600 font-bold' : 'text-niwaki-bark'
                      }`}
                    >
                      {wire.bestFor}
                    </td>
                    <td className="px-6 py-4 text-sm text-niwaki-bark">{wire.gauge}</td>
                    <td className="px-6 py-4 text-sm text-niwaki-bark">{wire.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
