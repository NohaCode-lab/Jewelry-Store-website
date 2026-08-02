import { Product, ProductFilterState } from '../types/product';
import { PRODUCTS } from '../data/products';

export const productService = {
  async getProducts(filter?: Partial<ProductFilterState>): Promise<Product[]> {
    let result = [...PRODUCTS];

    if (filter?.category && filter.category !== 'all') {
      result = result.filter((p) => p.category === filter.category);
    }

    if (filter?.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (filter?.sortBy) {
      if (filter.sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
      if (filter.sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
      if (filter.sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  },

  async getProductById(id: string): Promise<Product | undefined> {
    return PRODUCTS.find((p) => p.id === id);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    return PRODUCTS.filter((p) => p.isBestSeller || p.isNewArrival);
  },
};
