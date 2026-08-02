import { supabase } from './supabase';
import { Product } from '../types/product';
import { Order } from '../types/order';

export const adminService = {
  async createProduct(productPayload: Partial<Product>): Promise<Product> {
    try {
      if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        const { data, error } = await supabase.from('products').insert([productPayload]).select().single();
        if (error) throw error;
        return data as Product;
      }
    } catch (err) {
      console.warn('Supabase admin createProduct fallback:', err);
    }

    return {
      id: 'prod-' + Math.random().toString(36).substring(2, 9),
      title: productPayload.title || 'Custom Luxury Piece',
      slug: (productPayload.title || 'custom').toLowerCase().replace(/ /g, '-'),
      category: productPayload.category || 'rings',
      price: productPayload.price || 1500,
      description: productPayload.description || 'Exclusive Atelier creation',
      details: ['VVS1 Diamonds', 'Platinum 950'],
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockQuantity: 10,
      mainImage: productPayload.mainImage || '/assets/ring-1.jpg',
      images: [],
      availableMetals: ['18K Yellow Gold', '950 Platinum'],
      availableCarats: ['1.0 ct'],
      isBestSeller: true,
      isNewArrival: true,
    };
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    try {
      if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
        if (error) throw error;
      }
    } catch (err) {
      console.warn('Supabase admin updateOrderStatus error:', err);
    }
  },

  async deleteProduct(productId: string): Promise<void> {
    try {
      if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        const { error } = await supabase.from('products').delete().eq('id', productId);
        if (error) throw error;
      }
    } catch (err) {
      console.warn('Supabase admin deleteProduct error:', err);
    }
  },
};
