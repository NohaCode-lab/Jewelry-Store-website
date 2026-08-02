import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Welcome to Mangata & Gallo VIP Registry, ${email}!`);
    setEmail('');
  };

  return (
    <section className="relative bg-[#070d1e] py-24 border-t border-white/5 overflow-hidden text-white">
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10 max-w-3xl">
        <motion.h2
          className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join Our Exclusive VIP Circle
        </motion.h2>

        <motion.p
          className="text-white/70 mb-10 max-w-xl mx-auto text-base font-light"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Be the first to preview high jewelry releases, private trunk shows, and receive personalized concierge updates.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto bg-white/5 backdrop-blur-xl p-3 rounded-2xl border border-amber-500/20 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <input
            type="email"
            placeholder="Enter your VIP email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition text-sm"
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-xs tracking-widest uppercase hover:from-amber-400 hover:to-amber-500 shadow-md transition-all shrink-0"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
