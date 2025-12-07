'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function TechniqueHero() {
  const scrollToContent = () => {
    const element = document.getElementById('philosophy');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-niwaki-pine/5 to-niwaki-cream overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #4a5d4a 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-niwaki-moss font-medium tracking-widest uppercase text-sm mb-6">
            The Complete Reference
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-niwaki-ink font-semibold leading-tight mb-6">
            Master the Art of{' '}
            <span className="text-niwaki-moss">Niwaki</span>
          </h1>
          <p className="text-xl md:text-2xl text-niwaki-bark max-w-2xl mx-auto leading-relaxed">
            Transform ordinary trees into living sculptures through ancient Japanese techniques refined over centuries
          </p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 max-w-xl mx-auto"
        >
          <div className="relative">
            <span className="absolute -left-4 -top-4 text-6xl text-niwaki-bamboo/30 font-serif">&ldquo;</span>
            <p className="text-lg md:text-xl text-niwaki-stone italic leading-relaxed pl-6">
              A bird should be able to fly through the tree without its feathers touching a leaf.
            </p>
            <footer className="mt-4 text-sm text-niwaki-stone/70">
              — Traditional Japanese garden principle
            </footer>
          </div>
        </motion.blockquote>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={scrollToContent}
          className="mt-16 flex flex-col items-center gap-2 text-niwaki-moss/60 hover:text-niwaki-moss transition-colors cursor-pointer group"
          aria-label="Scroll to content"
        >
          <span className="text-sm uppercase tracking-wider">Explore</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.button>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-niwaki-cream to-transparent" />
    </section>
  );
}
