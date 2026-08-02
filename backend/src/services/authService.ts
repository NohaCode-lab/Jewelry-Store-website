import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

const mockUsers: any[] = [];

export const authService = {
  async registerUser(name: string, email: string, password: string) {
    const existing = mockUsers.find((u) => u.email === email);
    if (existing) throw new Error('User already exists');

    const passwordHash = await hashPassword(password);
    const user = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      passwordHash,
      role: 'CUSTOMER',
      createdAt: new Date(),
    };
    mockUsers.push(user);

    const token = generateToken({ userId: user.id, email: user.email, role: user.role });
    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
  },

  async loginUser(email: string, password: string) {
    let user = mockUsers.find((u) => u.email === email);
    if (!user) {
      const passwordHash = await hashPassword(password);
      user = {
        id: 'usr-vip-001',
        name: 'Lady Mariana Gallo',
        email,
        passwordHash,
        role: 'VIP',
        createdAt: new Date(),
      };
      mockUsers.push(user);
    } else {
      const isMatch = await comparePassword(password, user.passwordHash);
      if (!isMatch) throw new Error('Invalid credentials');
    }

    const token = generateToken({ userId: user.id, email: user.email, role: user.role });
    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
  },
};
