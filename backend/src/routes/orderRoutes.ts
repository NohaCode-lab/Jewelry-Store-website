import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new luxury jewelry order and enqueue background processing
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 *   get:
 *     summary: Retrieve user order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order history list
 */
router.post('/', authenticate, createOrder);
router.get('/my-orders', authenticate, getMyOrders);

export default router;
