import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import { refreshTokenRepository } from '../repositories/refreshTokenRepository';

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
      return sendError(res, 'User already exists with this email', 400, 'USER_EXISTS');
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

    // Issue Hashed Refresh Token & Set HTTP-Only Cookie
    const rawRefreshToken = crypto.randomBytes(40).toString('hex');
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await refreshTokenRepository.createToken(newUser.id, rawRefreshToken, refreshExpiresAt);

    res.cookie('mg_refresh_token', rawRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: refreshExpiresAt,
    });

    return sendSuccess(
      res,
      {
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
        token,
      },
      201,
      'User registered successfully'
    );
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const user = memoryUsers.find((u) => u.email === email);

    if (!user) {
      return sendError(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    const match = await comparePassword(password, user.passwordHash);
    if (!match) {
      return sendError(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    const token = generateToken({ userId: user.id, email: user.email, role: user.role });

    // Issue Hashed Refresh Token & Set HTTP-Only Cookie
    const rawRefreshToken = crypto.randomBytes(40).toString('hex');
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await refreshTokenRepository.createToken(user.id, rawRefreshToken, refreshExpiresAt);

    res.cookie('mg_refresh_token', rawRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: refreshExpiresAt,
    });

    return sendSuccess(res, {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawToken = req.cookies?.mg_refresh_token || req.body?.refreshToken;
    if (!rawToken) {
      return sendError(res, 'Refresh token required', 401, 'REFRESH_TOKEN_REQUIRED');
    }

    const validRecord = await refreshTokenRepository.findValidToken(rawToken);
    if (!validRecord) {
      return sendError(res, 'Invalid or revoked refresh token', 401, 'INVALID_REFRESH_TOKEN');
    }

    // Refresh Token Rotation: Revoke previous token and issue a new pair
    await refreshTokenRepository.revokeToken(rawToken);

    const user = memoryUsers.find((u) => u.id === validRecord.userId) || {
      id: validRecord.userId,
      email: 'client@mangatagallo.com',
      role: 'CUSTOMER',
    };

    const newAccessToken = generateToken({ userId: user.id, email: user.email, role: user.role });
    const newRawRefreshToken = crypto.randomBytes(40).toString('hex');
    const newRefreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await refreshTokenRepository.createToken(user.id, newRawRefreshToken, newRefreshExpiresAt);

    res.cookie('mg_refresh_token', newRawRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: newRefreshExpiresAt,
    });

    return sendSuccess(res, { token: newAccessToken }, 200, 'Access token refreshed successfully');
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response) => {
  const rawToken = req.cookies?.mg_refresh_token;
  if (rawToken) {
    await refreshTokenRepository.revokeToken(rawToken);
  }
  res.clearCookie('mg_refresh_token');
  return sendSuccess(res, { message: 'Logged out successfully' });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) return sendError(res, 'Unauthorized', 401, 'UNAUTHORIZED');
  return sendSuccess(res, { user: req.user });
};

export const exportGdprData = async (req: AuthRequest, res: Response) => {
  if (!req.user) return sendError(res, 'Unauthorized', 401, 'UNAUTHORIZED');

  const user = memoryUsers.find((u) => u.id === req.user?.userId) || req.user;

  return sendSuccess(res, {
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
