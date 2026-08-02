import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface WishlistState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product) => {
        const current = get().favorites;
        const exists = current.some((p) => p.id === product.id);

        if (exists) {
          set({ favorites: current.filter((p) => p.id !== product.id) });
        } else {
          set({ favorites: [...current, product] });
        }
      },

      isFavorite: (productId) => {
        return get().favorites.some((p) => p.id === productId);
      },

      clearWishlist: () => set({ favorites: [] }),
    }),
    {
      name: 'mangata-wishlist-storage',
    }
  )
);
