import { UserRole } from '../../types/user';

export const permissions = {
  canAccessAdmin(role?: UserRole): boolean {
    return role === 'admin';
  },

  canAccessVIPConcierge(role?: UserRole): boolean {
    return role === 'vip' || role === 'admin';
  },

  canCreateOrders(role?: UserRole): boolean {
    return !!role;
  },
};
