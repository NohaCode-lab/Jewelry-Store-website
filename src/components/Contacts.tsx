import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const Contacts: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Thank you for your message! Our VIP Concierge will respond shortly.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section id="contacts" data-section="contact" className="relative py-24 bg-[#020617] text-white border-t border-white/5 overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">Private Appointments & Support</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">
            Contact Concierge
          </h2>
          <div className="w-20 h-[1px] bg-amber-500 mx-auto mb-4" />
          <p className="text-white/70 text-sm">
            Reach out to our bespoke jewelry consultants for private consultations, custom sizing, or order inquiries.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#090d1a]/80 backdrop-blur-xl p-8 rounded-2xl border border-amber-500/20 shadow-2xl"
        >
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Lady Catherine"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. client@mangatagallo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">Message / Request</label>
            <textarea
              rows={4}
              required
              placeholder="How may our concierge assist you?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold tracking-wider uppercase text-xs hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isSubmitting ? 'Sending Request...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contacts;
