import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { Product, MetalType, CaratSize } from '../../types/product';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useUIStore } from '../../stores/uiStore';
import { toast } from 'sonner';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(
    product.imageVariants?.[0]?.metal || product.availableMetals[0] || '18K Yellow Gold'
  );
  const [selectedCarat, setSelectedCarat] = useState<CaratSize | undefined>(product.availableCarats?.[0]);
  const [ringSize, setRingSize] = useState<number>(6);

  // Sync state when active image changes
  const activeVariant = product.imageVariants?.[activeImageIndex];
  const activeTitle = activeVariant?.title || product.title;
  const activeDescription = activeVariant?.description || product.description;
  const basePrice = activeVariant?.price || product.price;

  // When metal button is clicked, auto-switch thumbnail if matching image variant exists
  const handleMetalSelect = (metal: MetalType) => {
    setSelectedMetal(metal);
    if (product.imageVariants) {
      const matchingIdx = product.imageVariants.findIndex((v) => v.metal === metal);
      if (matchingIdx !== -1) {
        setActiveImageIndex(matchingIdx);
      }
    }
  };

  // When thumbnail image is clicked, update active index and sync metal selection
  const handleImageClick = (idx: number) => {
    setActiveImageIndex(idx);
    const variant = product.imageVariants?.[idx];
    if (variant?.metal) {
      setSelectedMetal(variant.metal);
    }
  };

  // Calculate dynamic price multiplier (Carat & Platinum)
  let priceMultiplier = 1.0;
  if (selectedMetal === '950 Platinum' && !activeVariant) priceMultiplier = 1.25;
  if (selectedCarat === '2.0 ct') priceMultiplier *= 1.4;
  if (selectedCarat === '3.0 ct') priceMultiplier *= 1.8;
  const calculatedPrice = Math.round(basePrice * priceMultiplier);

  const { addItem } = useCartStore();
  const { isFavorite, toggleFavorite } = useWishlistStore();
  const { setCartOpen, setCheckoutOpen } = useUIStore();
  const favorited = isFavorite(product.id);

  const handleAddToCart = () => {
    const customizedProduct = {
      ...product,
      title: activeTitle,
      price: calculatedPrice,
      mainImage: product.images[activeImageIndex] || product.mainImage,
    };
    addItem(customizedProduct, selectedMetal, selectedCarat, product.category === 'rings' ? ringSize : undefined);
    toast.success(`Added ${activeTitle} (${selectedMetal}) to cart`);
    onClose();
  };

  const handleBuyNow = () => {
    const customizedProduct = {
      ...product,
      title: activeTitle,
      price: calculatedPrice,
      mainImage: product.images[activeImageIndex] || product.mainImage,
    };
    addItem(customizedProduct, selectedMetal, selectedCarat, product.category === 'rings' ? ringSize : undefined);
    onClose();
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0f172a] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition"
          >
            <X size={20} />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-black/40 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/50">
              <img
                src={product.images[activeImageIndex] || product.mainImage}
                alt={activeTitle}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <button
                onClick={() => toggleFavorite(product)}
                className="absolute top-3 left-3 p-2.5 rounded-full bg-black/60 border border-white/20 text-white/80 hover:text-rose-400 transition"
                title="Save to Wishlist"
              >
                <Heart size={18} fill={favorited ? '#f43f5e' : 'none'} className={favorited ? 'text-rose-500' : ''} />
              </button>
            </div>

            {/* Thumbnail Selector */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => {
                const varInfo = product.imageVariants?.[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => handleImageClick(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                    title={varInfo?.title || `View ${idx + 1}`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    {varInfo && (
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-amber-400 text-center py-0.5 font-medium truncate px-0.5">
                        ${varInfo.price.toLocaleString()}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">{product.category}</span>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-white mt-1 transition-all duration-300">
                {activeTitle}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-2xl font-semibold text-amber-400 font-playfair transition-all duration-300">
                  ${calculatedPrice.toLocaleString()}
                </span>
                <span className="text-xs text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  {product.rating} ★ ({product.reviewsCount} reviews)
                </span>
              </div>
              <p className="text-xs text-white/70 mt-4 leading-relaxed transition-all duration-300">
                {activeDescription}
              </p>
            </div>

            {/* Customization Options */}
            <div className="space-y-4">
              {/* Metal Choice */}
              <div>
                <label className="text-xs text-white/70 block mb-2 font-medium">Select Precious Metal</label>
                <div className="grid grid-cols-2 gap-2">
                  {product.availableMetals.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => handleMetalSelect(metal)}
                      className={`text-xs py-2 px-3 rounded-lg border text-left flex items-center justify-between transition ${
                        selectedMetal === metal
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-medium'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                      }`}
                    >
                      <span>{metal}</span>
                      {selectedMetal === metal && <Check size={14} className="text-amber-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Carat Choice (if applicable) */}
              {product.availableCarats && (
                <div>
                  <label className="text-xs text-white/70 block mb-2 font-medium">Select Diamond Carat Weight</label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableCarats.map((carat) => (
                      <button
                        key={carat}
                        onClick={() => setSelectedCarat(carat)}
                        className={`text-xs py-1.5 px-3 rounded-lg border transition ${
                          selectedCarat === carat
                            ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-medium'
                            : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                        }`}
                      >
                        {carat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ring Size (if ring) */}
              {product.category === 'rings' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-white/70 font-medium">US Ring Size</label>
                    <span className="text-[11px] text-amber-400 cursor-pointer hover:underline">Size Guide</span>
                  </div>
                  <select
                    value={ringSize}
                    onChange={(e) => setRingSize(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {[4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((size) => (
                      <option key={size} value={size} className="bg-[#0f172a]">
                        Size {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 rounded-xl border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs uppercase tracking-wider font-semibold shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
                >
                  <Sparkles size={15} />
                  <span>Buy Now</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 pt-1">
                <ShieldCheck size={14} className="text-amber-400" />
                <span>Includes GIA Gemological Certificate & Insured Delivery</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
