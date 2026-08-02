import { Product, MetalType, CaratSize } from './product';

export interface CartItem {
  id: string; // Unique cart item ID (product.id + metal + carat)
  product: Product;
  quantity: number;
  selectedMetal: MetalType;
  selectedCarat?: CaratSize;
  ringSize?: number;
  engraving?: string;
  calculatedPrice: number;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
  isFreeShippingEligible: boolean;
}
