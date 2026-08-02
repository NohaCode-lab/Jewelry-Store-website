import { create } from 'zustand';
import { Product } from '../types/product';

interface UIState {
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isCheckoutOpen: boolean;
  isAIConciergeOpen: boolean;
  activeCustomizingProduct: Product | null;

  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  setAIConciergeOpen: (open: boolean) => void;
  setCustomizingProduct: (product: Product | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isWishlistOpen: false,
  isSearchOpen: false,
  isCheckoutOpen: false,
  isAIConciergeOpen: false,
  activeCustomizingProduct: null,

  setCartOpen: (open) => set({ isCartOpen: open }),
  setWishlistOpen: (open) => set({ isWishlistOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
  setAIConciergeOpen: (open) => set({ isAIConciergeOpen: open }),
  setCustomizingProduct: (product) => set({ activeCustomizingProduct: product }),
}));
