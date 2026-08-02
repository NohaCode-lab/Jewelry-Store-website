import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, authorizeRole('ADMIN'), createProduct);
router.put('/:id', authenticate, authorizeRole('ADMIN'), updateProduct);
router.delete('/:id', authenticate, authorizeRole('ADMIN'), deleteProduct);

export default router;
