import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 bg-[#020617] text-white border-t border-white/5">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">Our Legacy</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">Timeless Elegance</h2>
          <div className="w-20 h-[1px] bg-amber-500 mx-auto mb-8" />
          <p className="text-lg md:text-xl leading-relaxed text-white/80 font-light">
            Mangata &amp; Gallo is an elite luxury jewelry atelier specializing in bespoke milestone creations for life’s most extraordinary moments. With a passion for precision, every diamond is hand-selected and every piece crafted with master skill. Our designs seamlessly bridge classical mastery with modern luxury.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
