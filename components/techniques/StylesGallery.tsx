'use client';

import { motion } from 'framer-motion';
import { NIWAKI_STYLES } from '@/lib/techniques-data';
import { StyleCard } from './StyleCard';

export function StylesGallery() {
  return (
    <section id="styles" className="py-24 bg-niwaki-paper">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-niwaki-ink mb-4">
            The Seven Classical Styles
          </h2>
          <p className="text-lg text-niwaki-bark max-w-2xl mx-auto">
            Each style represents a different natural phenomenon or growth condition,
            from windswept coastal cliffs to serene forest groves.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {NIWAKI_STYLES.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <StyleCard style={style} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
