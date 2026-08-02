import { Router } from 'express';
import { getCart, addItemToCart, updateCartItem, deleteCartItem } from '../controllers/cartController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, getCart);
router.post('/items', authenticate, addItemToCart);
router.put('/items/:id', authenticate, updateCartItem);
router.delete('/items/:id', authenticate, deleteCartItem);

export default router;
