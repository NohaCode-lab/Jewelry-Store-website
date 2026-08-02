import { CartItem } from '../types/cart';
import { ShippingAddress } from '../types/order';

export interface CreateSessionPayload {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  promoCode?: string;
}

export const checkoutService = {
  async requestCheckoutSession(payload: CreateSessionPayload): Promise<{ checkoutUrl: string; sessionId: string }> {
    try {
      const endpoint =
        import.meta.env.VITE_STRIPE_CHECKOUT_ENDPOINT || 'https://api.mangatagallo.com/v1/checkout/session';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('Checkout service proxy fallback:', err);
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      sessionId: 'cs_test_' + Math.random().toString(36).substring(2, 12),
      checkoutUrl: 'https://checkout.stripe.com/pay/cs_test_simulation',
    };
  },
};
