import { User } from '../types/user';

export const authService = {
  async getCurrentUser(): Promise<User | null> {
    return {
      id: 'usr-vip-001',
      email: 'vip.client@mangatagallo.com',
      fullName: 'Lady Mariana Gallo',
      role: 'vip',
      createdAt: new Date().toISOString(),
    };
  },

  async loginWithEmail(email: string): Promise<User> {
    return {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      fullName: email.split('@')[0],
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
  },

  async logout(): Promise<void> {
    // Session cleared
  },
};
