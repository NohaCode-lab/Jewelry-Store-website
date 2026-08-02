import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Bot, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { OccasionType, RecipientType, StylePreference, AIConciergeResponse } from './ai.types';
import { aiService } from './aiService';
import { useCartStore } from '../../stores/cartStore';
import { useUIStore } from '../../stores/uiStore';
import { toast } from 'sonner';

export const AIConciergeModal: React.FC = () => {
  const { isAIConciergeOpen, setAIConciergeOpen, setCustomizingProduct } = useUIStore();
  const { addItem } = useCartStore();

  const [occasion, setOccasion] = useState<OccasionType>('Anniversary');
  const [recipient, setRecipient] = useState<RecipientType>('Partner');
  const [maxBudget, setMaxBudget] = useState<number>(5000);
  const [stylePreference, setStylePreference] = useState<StylePreference>('Classic Elegance');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<AIConciergeResponse | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await aiService.getLuxuryRecommendation({
        occasion,
        recipient,
        maxBudget,
        stylePreference,
      });
      setRecommendation(res);
      toast.success('AI Luxury Recommendation generated!');
    } catch {
      toast.error('Failed to generate recommendation.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (recommendation) {
      addItem(recommendation.primaryRecommendation, recommendation.suggestedMetal as any);
      toast.success(`Added ${recommendation.primaryRecommendation.title} to cart`);
    }
  };

  return (
    <AnimatePresence>
      {isAIConciergeOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAIConciergeOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-[#0f172a] text-white rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden z-10 p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setAIConciergeOpen(false)}
              className="absolute top-4 right-4 z-20 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-playfair text-2xl text-white font-bold flex items-center gap-2">
                  <span>AI Luxury Concierge</span>
                  <span className="text-[10px] uppercase font-mono tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-full">
                    Atelier AI
                  </span>
                </h3>
                <p className="text-xs text-white/50">Personalized High Jewelry Recommendations & Style Matching</p>
              </div>
            </div>

            {!recommendation ? (
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Occasion */}
                  <div>
                    <label className="text-xs text-amber-400 font-medium block mb-2">Occasion</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value as OccasionType)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      {['Anniversary', 'Engagement', 'Wedding', 'Black-Tie Gala', 'Birthday', 'Self-Reward'].map(
                        (occ) => (
                          <option key={occ} value={occ} className="bg-[#0f172a]">
                            {occ}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Recipient */}
                  <div>
                    <label className="text-xs text-amber-400 font-medium block mb-2">Recipient</label>
                    <select
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value as RecipientType)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      {['Partner', 'Self', 'Mother', 'Daughter', 'VIP Client'].map((rec) => (
                        <option key={rec} value={rec} className="bg-[#0f172a]">
                          {rec}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Style Preference */}
                  <div>
                    <label className="text-xs text-amber-400 font-medium block mb-2">Aesthetic Style Preference</label>
                    <select
                      value={stylePreference}
                      onChange={(e) => setStylePreference(e.target.value as StylePreference)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      {['Classic Elegance', 'Modern Regal', 'Minimalist Diamond', 'Vintage Royal'].map((st) => (
                        <option key={st} value={st} className="bg-[#0f172a]">
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-amber-400 font-medium">Maximum Investment Target</label>
                      <span className="font-mono text-sm font-semibold text-white">${maxBudget.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={15000}
                      step={500}
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold tracking-wider text-xs uppercase shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Consulting Atelier AI Engine...</span>
                    </div>
                  ) : (
                    <>
                      <Bot size={18} />
                      <span>Generate AI Luxury Recommendation</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Recommendation Results View */
              <div className="space-y-6">
                <div className="bg-white/5 border border-amber-500/30 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                  <img
                    src={recommendation.primaryRecommendation.mainImage}
                    alt={recommendation.primaryRecommendation.title}
                    className="w-full h-48 object-cover rounded-xl border border-white/10 md:col-span-1"
                  />
                  <div className="md:col-span-2 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-semibold tracking-widest text-amber-400">
                        Top AI Recommendation
                      </span>
                      <h4 className="font-playfair text-xl text-white font-bold mt-0.5">
                        {recommendation.primaryRecommendation.title}
                      </h4>
                      <p className="text-amber-400 font-semibold font-playfair text-lg mt-1">
                        ${recommendation.primaryRecommendation.price.toLocaleString()}
                      </p>
                    </div>

                    <p className="text-xs text-white/70 italic bg-black/40 p-3 rounded-xl border border-white/10">
                      "{recommendation.recommendationReasoning}"
                    </p>

                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Check size={14} className="text-amber-400" />
                      <span>
                        Suggested Metal: <strong className="text-white">{recommendation.suggestedMetal}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    <span>Add Recommendation to Cart</span>
                  </button>
                  <button
                    onClick={() => {
                      setAIConciergeOpen(false);
                      setCustomizingProduct(recommendation.primaryRecommendation);
                    }}
                    className="py-3.5 px-6 rounded-xl border border-white/20 hover:bg-white/10 text-xs text-white font-medium transition flex items-center justify-center gap-2"
                  >
                    <span>Customize Details</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => setRecommendation(null)}
                    className="py-3.5 px-4 rounded-xl border border-white/10 text-xs text-white/60 hover:text-white transition"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
