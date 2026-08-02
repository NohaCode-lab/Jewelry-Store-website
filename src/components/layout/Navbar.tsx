import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo2 from '../../assets/optimized/logo2.webp';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useUIStore } from '../../stores/uiStore';

export interface NavLinkItem {
  id: string;
  name: string;
  path: string;
  hash: string;
}

export const navLinks: NavLinkItem[] = [
  { id: 'about', name: 'About', path: '/about', hash: '#about' },
  { id: 'designer', name: 'Designer', path: '/designer', hash: '#designer' },
  { id: 'collections', name: 'Collections', path: '/collections', hash: '#products' },
  { id: 'contact', name: 'Contact', path: '/contact', hash: '#contacts' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { items } = useCartStore();
  const { favorites } = useWishlistStore();
  const { setCartOpen, setWishlistOpen, setSearchOpen, setAIConciergeOpen } = useUIStore();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = favorites.length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background body scroll when mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleNavClick = (link: NavLinkItem) => {
    if (location.pathname === '/') {
      navigate(`/${link.hash}`);
      const sectionId = link.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(link.path);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/95 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl py-2.5'
          : 'bg-[#030712]/80 backdrop-blur-md border-b border-white/5 py-3.5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center gap-3">
        {/* LOGO */}
        <button onClick={handleLogoClick} className="flex items-center gap-2.5 group shrink-0">
          <img
            src={logo2}
            alt="Mangata & Gallo"
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full ring-1 ring-amber-500/40 transition duration-300 group-hover:scale-105 shrink-0"
          />
          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-playfair tracking-wide text-white group-hover:text-amber-400 transition whitespace-nowrap">
            Mangata &amp; Gallo
          </span>
        </button>

        {/* DESKTOP & TABLET NAV */}
        <nav className="hidden md:flex items-center justify-center mx-2">
          <ul className="flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (location.pathname === '/' && location.hash === link.hash);

              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className={`relative tracking-widest text-[11px] lg:text-xs uppercase transition duration-300 py-1 whitespace-nowrap font-medium group ${
                      isActive ? 'text-amber-400 font-semibold' : 'text-white/80 hover:text-amber-400'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[1px] bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* TOOLBAR ACTIONS */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* AI Concierge Trigger */}
          <button
            onClick={() => setAIConciergeOpen(true)}
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-300/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black transition flex items-center gap-1.5 text-xs font-medium shrink-0"
            title="AI Luxury Jewelry Concierge"
          >
            <Sparkles size={14} className="shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">AI Concierge</span>
          </button>

          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-1.5 sm:p-2 text-white/80 hover:text-amber-400 hover:bg-white/10 rounded-full transition shrink-0"
            title="Search Jewelry (Ctrl+K)"
          >
            <Search size={18} />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="relative p-1.5 sm:p-2 text-white/80 hover:text-rose-400 hover:bg-white/10 rounded-full transition shrink-0"
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
            className="relative p-1.5 sm:p-2 text-white/80 hover:text-amber-400 hover:bg-white/10 rounded-full transition shrink-0"
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
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-1 ml-0.5 hover:text-amber-400 transition"
            title="Toggle Navigation"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#030712] border-b border-amber-500/30 shadow-2xl md:hidden"
          >
            <div className="container mx-auto px-4 py-3">
              <ul className="flex flex-col items-center gap-2">
                {navLinks.map((link) => {
                  const isActive =
                    location.pathname === link.path ||
                    (location.pathname === '/' && location.hash === link.hash);

                  return (
                    <li key={link.id} className="w-full text-center">
                      <button
                        onClick={() => {
                          handleNavClick(link);
                          setIsOpen(false);
                        }}
                        className={`w-full py-2 text-xs tracking-widest uppercase hover:text-amber-400 hover:bg-white/5 rounded-lg transition font-medium ${
                          isActive ? 'text-amber-400 font-bold bg-white/5' : 'text-white/90'
                        }`}
                      >
                        {link.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
