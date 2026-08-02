import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-mangatagallo.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key-mangatagallo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface DatabaseSchema {
  products: 'products';
  categories: 'categories';
  orders: 'orders';
  order_items: 'order_items';
  profiles: 'profiles';
  ai_history: 'ai_history';
  reviews: 'reviews';
  wishlist: 'wishlist';
}
