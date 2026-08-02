import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/authMiddleware';

// Mock in-memory user repository fallback when DB is disconnected
const memoryUsers: any[] = [];

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
    let user = memoryUsers.find((u) => u.email === email);

    if (!user) {
      // Create fallback demo user if logging in first time
      const passwordHash = await hashPassword(password);
      user = {
        id: 'usr-vip-001',
        name: 'Lady Mariana Gallo',
        email,
        passwordHash,
        role: 'VIP',
        createdAt: new Date(),
      };
      memoryUsers.push(user);
    } else {
      const match = await comparePassword(password, user.passwordHash);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
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
