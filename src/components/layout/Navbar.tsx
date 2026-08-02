import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Heart, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo2 from '../../assets/optimized/logo2.webp';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useUIStore } from '../../stores/uiStore';

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
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 group">
          <img
            src={logo2}
            alt="Mangata & Gallo"
            className="h-10 w-10 rounded-full ring-1 ring-white/20 transition duration-300 group-hover:scale-105"
          />
          <span className="text-lg md:text-xl font-playfair tracking-wide text-white group-hover:text-amber-400 transition">
            Mangata & Gallo
          </span>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="relative text-white/70 hover:text-white tracking-widest text-xs uppercase transition duration-300 group py-1"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* TOOLBAR ACTIONS */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* AI Concierge Trigger */}
          <button
            onClick={() => setAIConciergeOpen(true)}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-300/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black transition flex items-center gap-1.5 text-xs font-medium"
            title="AI Luxury Jewelry Concierge"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">AI Concierge</span>
          </button>

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition"
            title="Search Jewelry (Ctrl+K)"
          >
            <Search size={19} />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="relative p-2 text-white/70 hover:text-rose-400 hover:bg-white/10 rounded-full transition"
            title="Saved Wishlist"
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-white/70 hover:text-amber-400 hover:bg-white/10 rounded-full transition"
            title="Shopping Cart"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-1">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-[#0f172a]/95 backdrop-blur-xl border-b border-white/10 md:hidden"
            >
              <ul className="flex flex-col items-center py-8 gap-5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        handleNavClick(link.id);
                        setIsOpen(false);
                      }}
                      className="text-white/80 text-sm tracking-widest uppercase hover:text-amber-400 transition"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
