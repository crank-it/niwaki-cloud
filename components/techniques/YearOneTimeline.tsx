'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { YEAR_ONE_PLAN } from '@/lib/techniques-data';

export function YearOneTimeline() {
  return (
    <section id="year-one" className="py-24 bg-niwaki-paper">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-niwaki-ink mb-4">
            Year One: Getting Started
          </h2>
          <p className="text-lg text-niwaki-bark max-w-2xl mx-auto">
            Transform any suitable tree into a niwaki with this systematic approach.
            Patience and observation are your greatest tools.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-niwaki-moss/30 transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {YEAR_ONE_PLAN.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-niwaki-moss border-4 border-niwaki-paper transform -translate-x-1/2 z-10" />

                {/* Content */}
                <div
                  className={`flex-1 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <div
                    className={`bg-niwaki-cream border border-niwaki-stone/20 rounded-lg p-5 ${
                      index % 2 === 0 ? 'md:ml-auto md:mr-0' : ''
                    } max-w-md`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <span className="text-sm font-medium text-niwaki-moss bg-niwaki-moss/10 px-3 py-1 rounded-full">
                        Months {phase.months}
                      </span>
                    </div>
                    <h3
                      className={`font-serif text-xl text-niwaki-ink mb-3 ${
                        index % 2 === 0 ? 'md:text-right' : ''
                      }`}
                    >
                      {phase.phase}
                    </h3>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <li
                          key={taskIndex}
                          className={`flex items-start gap-2 text-sm text-niwaki-bark ${
                            index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                          }`}
                        >
                          <CheckCircle className="w-4 h-4 text-niwaki-moss flex-shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-niwaki-bark italic">
            "The best time to start a niwaki was twenty years ago. The second best time is now."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
