import React from 'react'
import * as LucideIcons from 'lucide-react'
import logo2 from "../assets/logo2.jpg";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617] text-white pt-20 pb-10 overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + Description */}
          <div>
            <img src={logo2} alt="Mangata & Gallo" className="h-10 w-10 rounded-full ring-1 ring-white/20 transition duration-300 group-hover:scale-105 group-hover:opacity-80"
 />
            <p className="text-white/70 leading-relaxed">
              Luxury jewelry crafted for unforgettable moments. Discover elegance and timeless beauty.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-accent text-lg mb-5 font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-accent transition duration-300">About Us</a></li>
              <li><a href="#products" className="hover:text-accent transition duration-300">Products</a></li>
              <li><a href="#contacts" className="hover:text-accent transition duration-300">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition duration-300">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-accent text-lg mb-5 font-semibold">Visit Us</h4>
            <p className="text-white/70 leading-relaxed">
              123 Diamond Ave <br /> Austin, Texas, 78701
            </p>

            <div className="flex items-center gap-3 mt-4 text-white/80">
              <LucideIcons.Phone size={18} className="text-accent" />
              <span>(123) 456-7890</span>
            </div>

            <div className="flex items-center gap-3 mt-3 text-white/80">
              <LucideIcons.Mail size={18} className="text-accent" />
              <span>info@mangatagallo.com</span>
            </div>

            <p className="mt-5 text-white/60 text-sm">
              Mon–Fri: 10am–6pm <br />
              Sat: 11am–4pm
            </p>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-accent text-lg mb-5 font-semibold">Follow Us</h4>

            <div className="flex gap-4">
              {[ 
                { icon: LucideIcons.Facebook },
                { icon: LucideIcons.Instagram },
                { icon: LucideIcons.Linkedin }
              ].map((item, i) => (
                <a 
                  key={i}
                  href="#"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 
                             hover:bg-accent hover:text-black hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-white/50 text-sm">
            © 2025 Mangata & Gallo. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-accent transition">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition">Terms</a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer