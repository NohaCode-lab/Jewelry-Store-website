import React from 'react';
import { Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import logo2 from '../assets/optimized/logo2.webp';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#020617] text-white pt-20 pb-10 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo2} alt="Mangata & Gallo" className="h-10 w-10 rounded-full ring-1 ring-amber-500/40" />
              <span className="font-playfair text-xl tracking-wide text-white">Mangata &amp; Gallo</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              Bespoke AI Luxury Commerce SaaS Platform featuring handcrafted fine jewelry, diamond crowns, and personalized concierge gift matching.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-amber-400 text-sm tracking-widest uppercase mb-5 font-semibold">Explore</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a href="#about" className="hover:text-amber-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-amber-400 transition">
                  High Jewelry Collections
                </a>
              </li>
              <li>
                <a href="#designer" className="hover:text-amber-400 transition">
                  Master Atelier Designer
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition">
                  Private Appointments
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier Location */}
          <div>
            <h4 className="text-amber-400 text-sm tracking-widest uppercase mb-5 font-semibold">Atelier Visit</h4>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              123 Diamond Ave, Suite 400
              <br />
              Austin, Texas, 78701
            </p>

            <div className="flex items-center gap-2.5 mt-4 text-sm text-white/80">
              <Phone size={16} className="text-amber-400" />
              <span>+1 (512) 890-4422</span>
            </div>

            <div className="flex items-center gap-2.5 mt-2 text-sm text-white/80">
              <Mail size={16} className="text-amber-400" />
              <span>concierge@mangatagallo.com</span>
            </div>
          </div>

          {/* Social Presence */}
          <div>
            <h4 className="text-amber-400 text-sm tracking-widest uppercase mb-5 font-semibold">Social Presence</h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={i}
                    href="#"
                    aria-label={item.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-amber-500 hover:text-black transition-all duration-300"
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Mangata &amp; Gallo Luxury Commerce SaaS. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-400 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-amber-400 transition">
              Security Notice
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
