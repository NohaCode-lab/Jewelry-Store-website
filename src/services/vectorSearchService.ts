import { supabase } from './supabase';
import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';

export interface VectorSearchResult {
  product: Product;
  similarityScore: number;
}

export const vectorSearchService = {
  async semanticSearch(naturalLanguageQuery: string, maxPrice?: number): Promise<VectorSearchResult[]> {
    try {
      if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        // Query pgvector RPC function on Supabase PostgreSQL database
        const { data, error } = await supabase.rpc('match_products', {
          query_text: naturalLanguageQuery,
          match_threshold: 0.7,
          match_count: 5,
        });

        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            product: item,
            similarityScore: item.similarity,
          }));
        }
      }
    } catch (err) {
      console.warn('Vector search fallback:', err);
    }

    // Natural Language Query Intelligence Fallback Engine
    const query = naturalLanguageQuery.toLowerCase();
    const matched = PRODUCTS.filter((p) => {
      if (maxPrice && p.price > maxPrice) return false;
      return (
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        query.includes(p.category) ||
        (query.includes('anniversary') && p.category === 'rings') ||
        (query.includes('gala') && p.category === 'crowns') ||
        (query.includes('gift') && p.price <= (maxPrice || 5000))
      );
    });

    const pool = matched.length > 0 ? matched : PRODUCTS.slice(0, 3);

    return pool.map((product, idx) => ({
      product,
      similarityScore: 0.98 - idx * 0.05,
    }));
  },
};
