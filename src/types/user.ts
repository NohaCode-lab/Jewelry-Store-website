export type UserRole = 'customer' | 'vip' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface UserProfile extends User {
  phone?: string;
  preferredStyle?: string;
  wishlistIds: string[];
}
