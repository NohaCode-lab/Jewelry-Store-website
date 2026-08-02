import { describe, it, expect } from 'vitest';
import { productService } from '../src/services/productService';

describe('productService Filter & Search Unit Tests', () => {
  it('should return all products when no category filter is specified', async () => {
    const products = await productService.getProducts({ category: 'all' });
    expect(products.length).toBeGreaterThan(0);
  });

  it('should filter products by category "rings"', async () => {
    const products = await productService.getProducts({ category: 'rings' });
    expect(products.every((p) => p.category === 'rings')).toBe(true);
  });

  it('should search products by query "Solitaire"', async () => {
    const products = await productService.getProducts({ searchQuery: 'Solitaire' });
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].title).toContain('Solitaire');
  });

  it('should sort products by price low to high', async () => {
    const products = await productService.getProducts({ sortBy: 'price-low' });
    for (let i = 0; i < products.length - 1; i++) {
      expect(products[i].price).toBeLessThanOrEqual(products[i + 1].price);
    }
  });
});
