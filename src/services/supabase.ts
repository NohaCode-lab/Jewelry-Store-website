// Supabase Client Initialization & Proxy Service Layer

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export interface DatabaseSchema {
  products: 'products';
  orders: 'orders';
  reviews: 'reviews';
  favorites: 'favorites';
  ai_history: 'ai_history';
}
