import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { sendSuccess } from '../utils/response';

const userCarts: Record<string, any[]> = {};

export const getCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || 'guest';
    const items = userCarts[userId] || [];
    return sendSuccess(res, { userId, items });
  } catch (err) {
    next(err);
  }
};

export const addItemToCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || 'guest';
    if (!userCarts[userId]) userCarts[userId] = [];

    const { productId, quantity, selectedMetal, selectedCarat } = req.body;
    const existingIndex = userCarts[userId].findIndex(
      (item) => item.productId === productId && item.selectedMetal === selectedMetal
    );

    if (existingIndex > -1) {
      userCarts[userId][existingIndex].quantity += quantity || 1;
    } else {
      userCarts[userId].push({
        id: 'cart-item-' + Math.random().toString(36).substring(2, 9),
        productId,
        quantity: quantity || 1,
        selectedMetal: selectedMetal || '18K Yellow Gold',
        selectedCarat,
      });
    }

    return sendSuccess(res, { userId, items: userCarts[userId] }, 201);
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || 'guest';
    const { id } = req.params;
    const { quantity } = req.body;

    if (userCarts[userId]) {
      const item = userCarts[userId].find((i) => i.id === id);
      if (item) item.quantity = quantity;
    }

    return sendSuccess(res, { userId, items: userCarts[userId] || [] });
  } catch (err) {
    next(err);
  }
};

export const deleteCartItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || 'guest';
    const { id } = req.params;

    if (userCarts[userId]) {
      userCarts[userId] = userCarts[userId].filter((i) => i.id !== id);
    }

    return sendSuccess(res, { userId, items: userCarts[userId] || [] });
  } catch (err) {
    next(err);
  }
};
