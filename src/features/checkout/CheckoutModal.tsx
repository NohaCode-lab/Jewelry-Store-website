import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, CheckCircle, CreditCard, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import { useCartStore } from '../../stores/cartStore';
import { useUIStore } from '../../stores/uiStore';
import { toast } from 'sonner';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email address is required'),
  phone: z.string().min(7, 'Valid contact phone is required'),
  addressLine1: z.string().min(5, 'Shipping address line 1 is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  isGiftPackaging: z.boolean().optional(),
  giftMessage: z.string().optional(),
  promoCode: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setCheckoutOpen } = useUIStore();
  const { items, getSummary, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrderNum, setCompletedOrderNum] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const summary = getSummary();
  const finalTotal = Math.max(0, summary.total - appliedDiscount);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      isGiftPackaging: true,
    },
  });

  const isGift = watch('isGiftPackaging');

  const handleApplyPromo = (code?: string) => {
    if (code?.toUpperCase() === 'LUXURY10') {
      const disc = Math.round(summary.subtotal * 0.1);
      setAppliedDiscount(disc);
      toast.success('Promo code LUXURY10 applied: 10% Off!');
    } else if (code) {
      toast.error('Invalid promo code. Try "LUXURY10"');
    }
  };

  const onSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      const orderId = 'MG-' + Math.floor(100000 + Math.random() * 900000);
      setCompletedOrderNum(orderId);
      clearCart();
      toast.success(`Order ${orderId} successfully placed!`);

      // Trigger delight confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#fbbf24', '#ffffff', '#e2e8f0'],
      });
    }, 1800);
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    setOrderComplete(false);
    reset();
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-[#0f172a] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-10 p-6 md:p-8"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
            >
              <X size={20} />
            </button>

            {orderComplete ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                  <CheckCircle size={36} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                    Order Confirmed
                  </span>
                  <h2 className="text-3xl font-playfair font-bold text-white mt-1">Thank You for Your Order</h2>
                  <p className="text-xs text-white/60 mt-2">
                    Order Reference Number: <strong className="text-amber-400 font-mono">{completedOrderNum}</strong>
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto text-left text-xs text-white/70 space-y-2">
                  <p>
                    • A confirmation email & GIA authenticity certificate details have been dispatched to your inbox.
                  </p>
                  <p>• Express insured courier packaging with signature requirement enabled.</p>
                </div>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-xl bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-400 transition"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h3 className="font-playfair text-2xl text-white font-bold">Secure Checkout</h3>
                    <p className="text-xs text-white/50">Complimentary Insured Courier & Luxury Packaging</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Shipping Form */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      1. Shipping & Contact Details
                    </h4>

                    <div>
                      <input
                        {...register('fullName')}
                        placeholder="Full Name"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                      />
                      {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          {...register('email')}
                          placeholder="Email Address"
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                        />
                        {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <input
                          {...register('phone')}
                          placeholder="Phone Number"
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                        />
                        {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <input
                        {...register('addressLine1')}
                        placeholder="Street Address Line 1"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                      />
                      {errors.addressLine1 && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.addressLine1.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <input
                        {...register('city')}
                        placeholder="City"
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        {...register('state')}
                        placeholder="State"
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        {...register('postalCode')}
                        placeholder="ZIP Code"
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Gift Option */}
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <label className="flex items-center gap-2 text-xs text-amber-300 cursor-pointer">
                        <input {...register('isGiftPackaging')} type="checkbox" className="accent-amber-500 rounded" />
                        <Gift size={14} />
                        <span>Include Complimentary Velvet Gift Box & Ribbon</span>
                      </label>
                      {isGift && (
                        <textarea
                          {...register('giftMessage')}
                          placeholder="Personal gift card note (optional)..."
                          rows={2}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400 resize-none"
                        />
                      )}
                    </div>
                  </div>

                  {/* Right Column: Order Summary & Payment Button */}
                  <div className="space-y-4 flex flex-col justify-between bg-black/30 p-5 rounded-xl border border-white/10">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                        2. Order Summary
                      </h4>
                      <div className="max-h-44 overflow-y-auto space-y-2 pr-1 mb-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-xs">
                            <span className="text-white/80 line-clamp-1">
                              {item.quantity}x {item.product.title} ({item.selectedMetal})
                            </span>
                            <span className="font-semibold text-white">
                              ${(item.calculatedPrice * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Promo Code Input */}
                      <div className="flex gap-2 pt-2 border-t border-white/10">
                        <input
                          type="text"
                          id="promoInput"
                          placeholder="Promo code (LUXURY10)"
                          className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const val = (document.getElementById('promoInput') as HTMLInputElement)?.value;
                            handleApplyPromo(val);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-amber-400 font-medium transition"
                        >
                          Apply
                        </button>
                      </div>

                      <div className="space-y-1.5 text-xs text-white/70 pt-4 border-t border-white/10">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${summary.subtotal.toLocaleString()}</span>
                        </div>
                        {appliedDiscount > 0 && (
                          <div className="flex justify-between text-amber-400 font-medium">
                            <span>Promo Discount (LUXURY10)</span>
                            <span>-${appliedDiscount.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Luxury Sales Tax (8%)</span>
                          <span>${summary.tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-amber-400 font-medium">
                          <span>Insured Shipping</span>
                          <span>{summary.shipping === 0 ? 'Complimentary' : `$${summary.shipping}`}</span>
                        </div>
                        <div className="flex justify-between text-base font-semibold text-white pt-2 border-t border-white/10">
                          <span>Total Amount</span>
                          <span className="text-amber-400 font-playfair text-xl">${finalTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold tracking-wider text-xs uppercase shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Sparkles size={16} />
                          <span>Complete Order (${finalTotal.toLocaleString()})</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
