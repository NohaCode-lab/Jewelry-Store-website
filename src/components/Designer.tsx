import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import designer from '../assets/designer.jpg';

export const Designer: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="designer" className="py-24 bg-[#070d1e] text-white border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">Master Atelier</span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">Meet the Designer</h2>
            <div className="w-20 h-[1px] bg-amber-500 mx-auto" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="w-64 md:w-80 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-amber-500/30 shrink-0">
              <img src={designer} alt="Mariana Gallo" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-playfair text-amber-400 mb-4">Mariana Gallo</h3>
              <p className="text-white/80 leading-relaxed mb-6 font-light">
                Mariana, owner and lead designer, holds advanced certifications in diamond cutting and master metalsmithing. From her signature atelier in Austin, Texas, she handcrafts each bespoke high jewelry creation with meticulous precision, blending classical heritage with modern architectural elegance.
              </p>
              <div className="font-playfair italic text-2xl text-amber-400/80 text-right md:text-left">
                M.G. — Lead Atelier Designer
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Designer;
