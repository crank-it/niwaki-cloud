'use client';

import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag, TreePine, ExternalLink } from 'lucide-react';
import { RESOURCES } from '@/lib/techniques-data';

export function ResourcesSection() {
  return (
    <section id="resources" className="py-24 bg-niwaki-cream">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-niwaki-ink mb-4">
            Continue Your Journey
          </h2>
          <p className="text-lg text-niwaki-bark max-w-2xl mx-auto">
            Deepen your understanding with these carefully selected resources from
            masters of the craft.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Books */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-niwaki-paper border border-niwaki-stone/20 rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4 text-niwaki-moss">
              <BookOpen className="w-6 h-6" />
              <h3 className="font-serif text-xl">Essential Reading</h3>
            </div>
            <ul className="space-y-4">
              {RESOURCES.books.map((book, index) => (
                <li key={index} className="border-b border-niwaki-stone/10 pb-3 last:border-0">
                  <p className="font-medium text-niwaki-ink text-sm">{book.title}</p>
                  <p className="text-sm text-niwaki-stone">{book.author}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Suppliers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-niwaki-paper border border-niwaki-stone/20 rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4 text-niwaki-moss">
              <ShoppingBag className="w-6 h-6" />
              <h3 className="font-serif text-xl">Quality Suppliers</h3>
            </div>
            <ul className="space-y-4">
              {RESOURCES.suppliers.map((supplier, index) => (
                <li key={index} className="border-b border-niwaki-stone/10 pb-3 last:border-0">
                  <p className="font-medium text-niwaki-ink text-sm">{supplier.name}</p>
                  {supplier.url && (
                    <a
                      href={`https://${supplier.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-niwaki-moss hover:underline inline-flex items-center gap-1"
                    >
                      {supplier.url}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Gardens to Visit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-niwaki-paper border border-niwaki-stone/20 rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4 text-niwaki-moss">
              <TreePine className="w-6 h-6" />
              <h3 className="font-serif text-xl">Gardens to Visit</h3>
            </div>
            <ul className="space-y-3">
              {RESOURCES.gardens.map((garden, index) => (
                <li
                  key={index}
                  className="text-sm text-niwaki-bark flex items-start gap-2"
                >
                  <span className="text-niwaki-moss">•</span>
                  {garden}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-niwaki-moss/5 border border-niwaki-moss/20 rounded-lg p-8 text-center"
        >
          <h4 className="font-serif text-2xl text-niwaki-ink mb-3">
            Ready to Begin?
          </h4>
          <p className="text-niwaki-bark mb-6 max-w-xl mx-auto">
            Start with a single tree. Choose one suitable for your climate and
            commitment level. Observe it through a full year before making major changes.
          </p>
          <p className="text-sm text-niwaki-stone italic">
            "In the beginner's mind there are many possibilities, but in the expert's
            there are few." — Shunryu Suzuki
          </p>
        </motion.div>
      </div>
    </section>
  );
}
