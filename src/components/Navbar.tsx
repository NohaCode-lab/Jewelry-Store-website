import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Heart, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo2 from '../assets/optimized/logo2.webp';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { items } = useCartStore();
  const { favorites } = useWishlistStore();
  const { setCartOpen, setWishlistOpen, setSearchOpen, setAIConciergeOpen } = useUIStore();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = favorites.length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', name: 'About' },
    { id: 'designer', name: 'Designer' },
    { id: 'products', name: 'Collections' },
    { id: 'contacts', name: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#030712] border-b border-amber-500/20 shadow-2xl py-3' : 'bg-[#030712]/90 backdrop-blur-md py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center gap-4">
        {/* LOGO */}
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 group shrink-0">
          <img
            src={logo2}
            alt="Mangata & Gallo"
            className="h-9 w-9 md:h-10 md:w-10 rounded-full ring-1 ring-amber-500/30 transition duration-300 group-hover:scale-105 shrink-0"
          />
          <span className="text-base sm:text-lg md:text-xl font-playfair tracking-wide text-white group-hover:text-amber-400 transition whitespace-nowrap">
            Mangata & Gallo
          </span>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center justify-center">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="relative text-white/80 hover:text-amber-400 tracking-widest text-xs uppercase transition duration-300 py-1 whitespace-nowrap font-medium group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* TOOLBAR ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* AI Concierge Trigger */}
          <button
            onClick={() => setAIConciergeOpen(true)}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-300/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black transition flex items-center gap-1.5 text-xs font-medium shrink-0"
            title="AI Luxury Jewelry Concierge"
          >
            <Sparkles size={14} className="shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">AI Concierge</span>
          </button>

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-white/80 hover:text-amber-400 hover:bg-white/10 rounded-full transition shrink-0"
            title="Search Jewelry (Ctrl+K)"
          >
            <Search size={18} />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="relative p-2 text-white/80 hover:text-rose-400 hover:bg-white/10 rounded-full transition shrink-0"
            title="Saved Wishlist"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-white/80 hover:text-amber-400 hover:bg-white/10 rounded-full transition shrink-0"
            title="Shopping Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-1 ml-1" title="Toggle Navigation">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#030712] border-b border-amber-500/30 shadow-2xl lg:hidden"
          >
            <div className="container mx-auto px-6 py-4">
              <ul className="flex flex-col items-center gap-3">
                {navLinks.map((link) => (
                  <li key={link.id} className="w-full text-center">
                    <button
                      onClick={() => {
                        handleNavClick(link.id);
                        setIsOpen(false);
                      }}
                      className="w-full py-2 text-white/90 text-xs tracking-widest uppercase hover:text-amber-400 hover:bg-white/5 rounded-lg transition font-medium"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
