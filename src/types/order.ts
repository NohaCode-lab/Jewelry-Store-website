import { CartItem } from './cart';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isGiftPackaging: boolean;
  giftMessage?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  promoCode?: string;
  status: OrderStatus;
  createdAt: string;
}
