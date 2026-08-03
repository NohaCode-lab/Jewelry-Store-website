import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/authMiddleware';

// Seeded in-memory user repository
const memoryUsers: any[] = [
  {
    id: 'usr-vip-001',
    name: 'Lady Mariana Gallo',
    email: 'vip.client@mangatagallo.com',
    passwordHash: bcrypt.hashSync('Password123!', 10),
    role: 'VIP',
    createdAt: new Date(),
  },
  {
    id: 'usr-admin-001',
    name: 'Atelier Admin',
    email: 'admin@mangatagallo.com',
    passwordHash: bcrypt.hashSync('Password123!', 10),
    role: 'ADMIN',
    createdAt: new Date(),
  },
];

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = RegisterSchema.parse(req.body);
    const existing = memoryUsers.find((u) => u.email === email);
    if (existing) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const passwordHash = await hashPassword(password);
    const newUser = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      passwordHash,
      role: 'CUSTOMER',
      createdAt: new Date(),
    };
    memoryUsers.push(newUser);

    const token = generateToken({ userId: newUser.id, email: newUser.email, role: newUser.role });

    return res.status(201).json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const user = memoryUsers.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await comparePassword(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ userId: user.id, email: user.email, role: user.role });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response) => {
  return res.json({ message: 'Logged out successfully' });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  return res.json({ user: req.user });
};

export const exportGdprData = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  
  const user = memoryUsers.find((u) => u.id === req.user?.userId) || req.user;

  return res.json({
    exportDate: new Date().toISOString(),
    gdprNotice: 'Under GDPR Article 20, you have the right to receive your personal data in a structured, machine-readable format.',
    userProfile: {
      id: user.id || req.user.userId,
      name: user.name || 'Valued Client',
      email: user.email || req.user.email,
      role: user.role || req.user.role,
      createdAt: user.createdAt || new Date().toISOString(),
    },
    privacySettings: {
      dataProcessingConsent: true,
      essentialCookies: true,
      analyticsConsent: false,
    },
  });
};

