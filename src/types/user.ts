export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: 'customer' | 'vip' | 'admin';
  createdAt: string;
}

export interface UserProfile extends User {
  phone?: string;
  preferredStyle?: string;
  wishlistIds: string[];
}
