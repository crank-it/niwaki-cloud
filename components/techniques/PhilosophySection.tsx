'use client';

import { motion } from 'framer-motion';
import { PHILOSOPHY_PRINCIPLES } from '@/lib/techniques-data';

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 bg-niwaki-cream">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-niwaki-ink mb-4">
            Philosophy Before Practice
          </h2>
          <p className="text-lg text-niwaki-bark max-w-2xl mx-auto">
            Niwaki (庭木, &ldquo;garden tree&rdquo;) differs fundamentally from Western topiary.
            Where topiary imposes geometric shapes onto plants, niwaki reveals what
            Japanese gardeners call a tree&apos;s &ldquo;quintessence&rdquo; — its essential character
            distilled and expressed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-serif text-2xl text-niwaki-ink mb-6">Core Principles</h3>
            <div className="space-y-4">
              {PHILOSOPHY_PRINCIPLES.map((principle, index) => (
                <motion.div
                  key={principle.principle}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-niwaki-paper rounded-lg p-5 border border-niwaki-stone/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className="text-3xl text-niwaki-moss font-serif">
                        {principle.japanese}
                      </span>
                      <p className="text-xs text-niwaki-stone mt-1">{principle.romanji}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-niwaki-ink">{principle.principle}</h4>
                      <p className="text-sm text-niwaki-bark mt-1">{principle.meaning}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-niwaki-pine/5 rounded-2xl p-8 border border-niwaki-moss/20">
              <h3 className="font-serif text-2xl text-niwaki-ink mb-4">
                The Rule of Two
              </h3>
              <p className="text-niwaki-bark leading-relaxed mb-6">
                At every fork with three or more branches, keep only two. This creates
                clean Y-shaped architecture throughout the tree — the fundamental
                structural principle of niwaki.
              </p>
              <div className="flex items-center justify-center py-8">
                {/* Simple Y-shape illustration */}
                <svg viewBox="0 0 120 100" className="w-40 h-32 text-niwaki-moss">
                  <path
                    d="M60 100 L60 50 L30 10 M60 50 L90 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Cloud shapes */}
                  <ellipse cx="30" cy="10" rx="15" ry="10" fill="currentColor" opacity="0.3" />
                  <ellipse cx="90" cy="10" rx="15" ry="10" fill="currentColor" opacity="0.3" />
                </svg>
              </div>
              <p className="text-sm text-niwaki-stone text-center italic">
                Two branches at each fork creates elegant, readable structure
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
