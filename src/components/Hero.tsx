import React from 'react';
import { motion } from 'framer-motion';
import hero from '../assets/hero.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden pt-16">
      {/* BACKGROUND IMAGE WITH INFINITE PARALLAX */}
      <motion.img
        src={hero}
        alt="Luxury Jewelry"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 10,
          ease: 'easeOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#020617]/75 backdrop-blur-[1px]" />

      {/* GOLD AMBIENT LIGHT EFFECT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.15),transparent_60%)]" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.3em] text-amber-400 text-xs sm:text-sm mb-4 font-semibold"
        >
          Mangata &amp; Gallo High Jewelry
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-playfair font-bold leading-tight mb-6"
        >
          Timeless Elegance <br /> Crafted to Perfection
        </motion.h1>

        <div className="w-24 h-[1px] bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8" />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/80 text-base sm:text-lg md:text-xl mb-10 font-light leading-relaxed"
        >
          Discover fine handcrafted jewelry designed for life’s most meaningful celebrations. Every diamond reflects unmatched artistry, precision, and enduring legacy.
        </motion.p>

        <motion.a
          href="#collections"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-block border border-amber-500/50 bg-amber-500/10 text-amber-400 px-8 py-4 rounded-full tracking-widest text-xs uppercase font-medium hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-xl shadow-amber-500/10 hover:shadow-amber-500/30"
        >
          Explore Collections
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
