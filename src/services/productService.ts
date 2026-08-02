import { Product, ProductFilterState } from '../types/product';
import { PRODUCTS } from '../data/products';
import { supabase } from './supabase';

export const productService = {
  async getProducts(filter?: Partial<ProductFilterState>): Promise<Product[]> {
    try {
      if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        let query = supabase.from('products').select('*');

        if (filter?.category && filter.category !== 'all') {
          query = query.eq('category_slug', filter.category);
        }

        if (filter?.sortBy) {
          if (filter.sortBy === 'price-low') query = query.order('base_price', { ascending: true });
          if (filter.sortBy === 'price-high') query = query.order('base_price', { ascending: false });
          if (filter.sortBy === 'rating') query = query.order('rating', { ascending: false });
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data as any;
        }
      }
    } catch (err) {
      console.warn('Supabase product query fallback:', err);
    }

    // Offline / Mock Data Resilience
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
    try {
      if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (!error && data) return data as any;
      }
    } catch (err) {
      console.warn('Supabase product fetch fallback:', err);
    }

    return PRODUCTS.find((p) => p.id === id);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or('is_bestseller.eq.true,is_new_arrival.eq.true');
        if (!error && data && data.length > 0) return data as any;
      }
    } catch (err) {
      console.warn('Supabase featured fetch fallback:', err);
    }

    return PRODUCTS.filter((p) => p.isBestSeller || p.isNewArrival);
  },
};
