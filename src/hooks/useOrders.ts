import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { Order } from '../types/order';

export const useOrders = (userId?: string) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!userId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderPayload: Partial<Order>) => {
      try {
        if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
          const { data, error } = await supabase.from('orders').insert([orderPayload]).select().single();
          if (error) throw error;
          return data;
        }
      } catch (err) {
        console.warn('Supabase createOrder fallback:', err);
      }

      return {
        id: 'ord-' + Math.random().toString(36).substring(2, 9),
        orderNumber: 'MG-' + Math.floor(100000 + Math.random() * 900000),
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...orderPayload,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
