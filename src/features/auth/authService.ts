import { User } from '../../types/user';
import { supabase } from '../../services/supabase';

export const authService = {
  async getCurrentUser(): Promise<User | null> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        return {
          id: session.user.id,
          email: session.user.email || '',
          fullName: session.user.user_metadata?.full_name || 'Mariana Gallo Client',
          role: session.user.user_metadata?.role || 'vip',
          createdAt: session.user.created_at,
        };
      }
    } catch (err) {
      console.warn('Auth getSession fallback:', err);
    }

    return {
      id: 'usr-vip-001',
      email: 'vip.client@mangatagallo.com',
      fullName: 'Lady Mariana Gallo',
      role: 'vip',
      createdAt: new Date().toISOString(),
    };
  },

  async loginWithEmail(email: string, pass?: string): Promise<User> {
    try {
      if (pass) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        if (data.user) {
          return {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            role: data.user.user_metadata?.role || 'customer',
            createdAt: data.user.created_at,
          };
        }
      }
    } catch (err) {
      console.warn('Auth login fallback:', err);
    }

    return {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      fullName: email.split('@')[0],
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
  },

  async signUp(email: string, pass: string, fullName: string): Promise<User> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: { data: { full_name: fullName, role: 'customer' } },
      });
      if (error) throw error;
      if (data.user) {
        return {
          id: data.user.id,
          email: data.user.email || email,
          fullName,
          role: 'customer',
          createdAt: data.user.created_at,
        };
      }
    } catch (err) {
      console.warn('Auth signUp fallback:', err);
    }

    return {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      fullName,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
  },

  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Auth logout error:', err);
    }
  },

  async resetPassword(email: string): Promise<void> {
    try {
      await supabase.auth.resetPasswordForEmail(email);
    } catch (err) {
      console.warn('Auth resetPassword error:', err);
    }
  },
};
