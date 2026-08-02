import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    text: 'Absolutely breathtaking craftsmanship! The custom engagement ring exceeded all expectations. Mariana captured our vision flawlessly.',
    author: 'Emily R. — Austin, TX',
    rating: 5,
  },
  {
    text: 'Working with Mangata & Gallo for our 10th anniversary band was an extraordinary experience. Dedicated, discrete, and unmatched diamond quality.',
    author: 'Jason M. — New York, NY',
    rating: 5,
  },
  {
    text: 'The AI Concierge matched the perfect diamond drop earrings for my bridal gala. Superb customer service and heirloom quality.',
    author: 'Sarah A. — London, UK',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="testimonials" className="py-24 bg-[#020617] text-white border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">Client Stories</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">Client Appraisals</h2>
          <div className="w-20 h-[1px] bg-amber-500 mx-auto mb-4" />
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Read how our patron community describes their bespoke Mangata &amp; Gallo jewelry acquisition experience.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#0a0f1d] p-8 rounded-2xl border border-white/10 shadow-xl hover:border-amber-500/30 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-amber-400 text-sm mb-4">{'★'.repeat(t.rating)}</div>
                <p className="text-white/80 text-sm italic leading-relaxed font-light mb-6">"{t.text}"</p>
              </div>
              <cite className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans not-italic">
                — {t.author}
              </cite>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
