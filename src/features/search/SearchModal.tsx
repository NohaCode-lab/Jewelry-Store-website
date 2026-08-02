import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { searchService } from './search.service';
import { useUIStore } from '../../stores/uiStore';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, setCustomizingProduct } = useUIStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  const searchResults = searchService.search(query, { maxResults: 5 });

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-[#0f172a] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-10 p-6 space-y-4"
          >
            {/* Search Input Bar */}
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search high jewelry, solitaire rings, tiaras (Fuzzy Engine)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results Container */}
            <div className="max-h-96 overflow-y-auto space-y-2 pt-2">
              {query.trim() === '' ? (
                <div className="text-center py-10 text-xs text-white/40 space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-amber-400/80 font-medium">
                    <Sparkles size={14} />
                    <span>Fuse.js Fuzzy Search Active</span>
                  </div>
                  <p>Type to search our fine jewelry catalog with typo tolerance...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-10 text-xs text-white/40">No jewelry matching "{query}" found.</div>
              ) : (
                searchResults.map(({ item: product }) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSearchOpen(false);
                      setCustomizingProduct(product);
                    }}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:border-amber-400/40 hover:bg-white/10 transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.mainImage}
                        alt={product.title}
                        className="w-14 h-14 object-cover rounded-lg border border-white/10"
                      />
                      <div>
                        <h4 className="font-playfair text-sm text-white font-medium group-hover:text-amber-400 transition">
                          {product.title}
                        </h4>
                        <p className="text-xs text-amber-400 font-semibold mt-0.5">${product.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-white/40 group-hover:text-amber-400 transition">
                      <span>View</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
