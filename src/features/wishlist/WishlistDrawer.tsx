import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useCartStore } from '../../stores/cartStore';
import { useUIStore } from '../../stores/uiStore';
import { toast } from 'sonner';

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, setWishlistOpen } = useUIStore();
  const { favorites, toggleFavorite } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleMoveToCart = (product: any) => {
    addItem(product, product.availableMetals[0]);
    toggleFavorite(product);
    toast.success(`Moved ${product.title} to your cart`);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#0f172a] text-white border-l border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Heart size={18} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl text-white font-semibold">Wishlist & Favorites</h3>
                    <p className="text-xs text-white/50">{favorites.length} Saved Items</p>
                  </div>
                </div>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {favorites.length === 0 ? (
                  <div className="text-center py-20 text-white/50 space-y-4">
                    <Heart size={48} className="mx-auto text-white/20" />
                    <p className="text-lg font-playfair">Your wishlist is empty</p>
                    <p className="text-xs max-w-xs mx-auto">
                      Click the heart icon on any jewelry piece to save your favorite designs for later.
                    </p>
                  </div>
                ) : (
                  favorites.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 hover:border-amber-500/30 transition group"
                    >
                      <img
                        src={product.mainImage}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded-lg border border-white/10"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-playfair text-sm text-white font-medium line-clamp-1">
                              {product.title}
                            </h4>
                            <button
                              onClick={() => {
                                toggleFavorite(product);
                                toast.info('Removed from wishlist');
                              }}
                              className="text-white/40 hover:text-rose-400 transition"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <p className="text-xs text-amber-400 font-semibold mt-1">${product.price.toLocaleString()}</p>
                        </div>

                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="mt-2 text-xs py-1.5 px-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-black font-medium transition flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag size={13} />
                          <span>Move to Cart</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
