import React from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../../types/product';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useUIStore } from '../../stores/uiStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { isFavorite, toggleFavorite } = useWishlistStore();
  const { setCustomizingProduct } = useUIStore();
  const favorited = isFavorite(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, product.availableMetals[0]);
    toast.success(`Added ${product.title} to cart`);
  };

  return (
    <div
      onClick={() => setCustomizingProduct(product)}
      className="group bg-[#0f172a]/80 rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-500 flex flex-col justify-between cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
        <img
          src={product.mainImage}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="text-[10px] uppercase font-semibold tracking-wider bg-amber-500 text-black px-2.5 py-0.5 rounded-full shadow-md">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="text-[10px] uppercase font-semibold tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 px-2.5 py-0.5 rounded-full">
              New Arrival
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
            toast.info(favorited ? 'Removed from wishlist' : 'Saved to wishlist');
          }}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/80 hover:text-rose-400 hover:scale-110 transition"
        >
          <Heart size={16} fill={favorited ? '#f43f5e' : 'none'} className={favorited ? 'text-rose-500' : ''} />
        </button>

        {/* Quick View Action Hover Bar */}
        <div className="absolute bottom-3 inset-x-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCustomizingProduct(product);
            }}
            className="flex-1 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-medium hover:bg-white hover:text-black transition flex items-center justify-center gap-1.5"
          >
            <Eye size={14} />
            <span>Customize</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="p-2 rounded-xl bg-amber-500 text-black font-medium hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
            title="Quick Add to Cart"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-1 text-xs text-white/50">
            <span className="uppercase tracking-widest">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={12} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          </div>
          <h3 className="font-playfair text-lg text-white font-medium group-hover:text-amber-400 transition-colors line-clamp-1">
            {product.title}
          </h3>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <div>
            <p className="text-xs text-white/40">Starting at</p>
            <p className="font-playfair text-lg font-semibold text-amber-400">${product.price.toLocaleString()}</p>
          </div>
          <span className="text-[11px] text-white/60 hover:text-white transition flex items-center gap-1">
            Details →
          </span>
        </div>
      </div>
    </div>
  );
};
