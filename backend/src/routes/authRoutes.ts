import { Router } from 'express';
import { register, login, logout, getMe, exportGdprData, refreshToken } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);
router.get('/gdpr-export', authenticate, exportGdprData);

export default router;
