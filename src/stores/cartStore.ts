import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartSummary } from '../types/cart';
import { Product, MetalType, CaratSize } from '../types/product';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, selectedMetal: MetalType, selectedCarat?: CaratSize, ringSize?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getSummary: () => CartSummary;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, selectedMetal, selectedCarat, ringSize) => {
        const itemId = `${product.id}-${selectedMetal}-${selectedCarat || 'std'}-${ringSize || 0}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === itemId);

        let priceMultiplier = 1.0;
        if (selectedMetal === '950 Platinum') priceMultiplier = 1.25;
        if (selectedCarat === '2.0 ct') priceMultiplier *= 1.4;
        if (selectedCarat === '3.0 ct') priceMultiplier *= 1.8;

        const calculatedPrice = Math.round(product.price * priceMultiplier);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += 1;
          set({ items: updated });
        } else {
          const newItem: CartItem = {
            id: itemId,
            product,
            quantity: 1,
            selectedMetal,
            selectedCarat,
            ringSize,
            calculatedPrice,
          };
          set({ items: [...currentItems, newItem] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, delta) => {
        const updated = get()
          .items.map((item) => {
            if (item.id === id) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[];

        set({ items: updated });
      },

      clearCart: () => set({ items: [] }),

      getSummary: () => {
        const items = get().items;
        const subtotal = items.reduce((sum, item) => sum + item.calculatedPrice * item.quantity, 0);
        const freeShippingThreshold = 2000;
        const isFreeShippingEligible = subtotal >= freeShippingThreshold || subtotal === 0;
        const shipping = subtotal === 0 ? 0 : isFreeShippingEligible ? 0 : 150;
        const tax = Math.round(subtotal * 0.08); // 8% luxury sales tax
        const total = subtotal + tax + shipping;

        return {
          subtotal,
          tax,
          shipping,
          discount: 0,
          total,
          freeShippingThreshold,
          isFreeShippingEligible,
        };
      },
    }),
    {
      name: 'mangata-cart-storage',
    }
  )
);
