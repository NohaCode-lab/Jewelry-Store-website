import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../src/stores/cartStore';
import { PRODUCTS } from '../src/data/products';

describe('useCartStore Unit Tests', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should start with an empty cart', () => {
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(0);
  });

  it('should add item to cart with metal customization', () => {
    const product = PRODUCTS[0];
    useCartStore.getState().addItem(product, '18K Yellow Gold');

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].product.id).toBe(product.id);
    expect(items[0].selectedMetal).toBe('18K Yellow Gold');
    expect(items[0].quantity).toBe(1);
  });

  it('should update quantity when adding identical item', () => {
    const product = PRODUCTS[0];
    useCartStore.getState().addItem(product, '18K Yellow Gold');
    useCartStore.getState().addItem(product, '18K Yellow Gold');

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it('should calculate cart summary accurately', () => {
    const product = PRODUCTS[0]; // $3,450
    useCartStore.getState().addItem(product, '18K Yellow Gold');

    const summary = useCartStore.getState().getSummary();
    expect(summary.subtotal).toBe(3450);
    expect(summary.tax).toBe(Math.round(3450 * 0.08));
    expect(summary.shipping).toBe(0); // Free shipping threshold ($2000) met
    expect(summary.isFreeShippingEligible).toBe(true);
  });

  it('should remove item from cart', () => {
    const product = PRODUCTS[0];
    useCartStore.getState().addItem(product, '18K Yellow Gold');
    const itemId = useCartStore.getState().items[0].id;

    useCartStore.getState().removeItem(itemId);
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
