import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Compass, Plus } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useUIStore } from '../../stores/uiStore';
import { PRODUCTS } from '../../data/products';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { isCartOpen, setCartOpen, setCheckoutOpen } = useUIStore();
  const { items, addItem, removeItem, updateQuantity, getSummary } = useCartStore();
  const summary = getSummary();

  const handleCheckoutClick = () => {
    if (items.length === 0) {
      toast.error('Your cart is currently empty');
      return;
    }
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleExploreClick = () => {
    setCartOpen(false);
    navigate('/collections');
  };

  const handleAddSampleItem = () => {
    if (PRODUCTS.length > 0) {
      addItem(PRODUCTS[0], PRODUCTS[0].availableMetals[0]);
      toast.success(`Added ${PRODUCTS[0].title} to luxury cart`);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
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
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl text-white font-semibold">Luxury Cart</h3>
                    <p className="text-xs text-white/50">{items.reduce((s, i) => s + i.quantity, 0)} Items Selected</p>
                  </div>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition"
                  title="Close Cart"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="bg-gradient-to-r from-amber-950/40 to-slate-900 px-6 py-3 border-b border-amber-500/20 text-xs">
                {summary.isFreeShippingEligible ? (
                  <div className="flex items-center gap-2 text-amber-400 font-medium">
                    <Sparkles size={14} />
                    <span>Eligible for Complimentary Express Luxury Shipping</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-white/70 mb-1">
                      <span>Complimentary Shipping Progress</span>
                      <span className="text-amber-400 font-medium">
                        ${summary.freeShippingThreshold - summary.subtotal} away
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                        style={{ width: `${Math.min(100, (summary.subtotal / summary.freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12 text-white/60 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-amber-400/60">
                      <ShoppingBag size={36} />
                    </div>
                    <div>
                      <p className="text-xl font-playfair text-white font-medium">Your shopping bag is empty</p>
                      <p className="text-xs text-white/50 max-w-xs mx-auto mt-1">
                        Explore our high jewelry collections to add handcrafted rings, necklaces, and tiaras.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col gap-3 max-w-xs mx-auto">
                      <button
                        onClick={handleExploreClick}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
                      >
                        <Compass size={16} />
                        <span>Explore High Jewelry</span>
                      </button>

                      <button
                        onClick={handleAddSampleItem}
                        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-amber-400 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                      >
                        <Plus size={14} />
                        <span>Add Sample Solitaire Ring ($2,450)</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 hover:border-amber-500/30 transition group"
                    >
                      <img
                        src={item.product.mainImage}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded-lg border border-white/10"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-playfair text-sm text-white font-medium line-clamp-1">
                              {item.product.title}
                            </h4>
                            <button
                              onClick={() => {
                                removeItem(item.id);
                                toast.success('Removed item from cart');
                              }}
                              className="text-white/40 hover:text-red-400 transition"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <p className="text-xs text-amber-400 mt-0.5">{item.selectedMetal}</p>
                          {item.selectedCarat && (
                            <p className="text-[11px] text-white/50">{item.selectedCarat} VVS1 Diamond</p>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-white/20 rounded-lg bg-black/40">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-white/60 hover:text-white transition"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-semibold text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-white/60 hover:text-white transition"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-semibold text-amber-400 text-sm">
                            ${(item.calculatedPrice * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/50 space-y-4">
                  <div className="space-y-2 text-sm text-white/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">${summary.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Est. Luxury Sales Tax (8%)</span>
                      <span>${summary.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Express Insured Shipping</span>
                      <span className="text-amber-400">
                        {summary.shipping === 0 ? 'Complimentary' : `$${summary.shipping}`}
                      </span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between text-base font-semibold text-white">
                      <span>Total Amount</span>
                      <span className="text-amber-400 font-playfair text-lg">${summary.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold tracking-wider text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 pt-1">
                    <ShieldCheck size={14} className="text-amber-400/70" />
                    <span>Includes GIA Certificate & Insured Courier</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
