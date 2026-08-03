import { Request, Response, NextFunction } from 'express';
import { productRepository } from '../repositories/productRepository';
import { sendSuccess, sendError } from '../utils/response';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, sort } = req.query;
    let results = await productRepository.findAll();

    if (category && category !== 'all') {
      results = results.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
    }

    if (search) {
      const q = String(search).toLowerCase();
      results = results.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') results.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') results.sort((a, b) => b.price - a.price);

    return sendSuccess(res, results);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productRepository.findById(req.params.id);
    if (!product) return sendError(res, 'Product not found', 404, 'PRODUCT_NOT_FOUND');
    return sendSuccess(res, product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = {
      id: 'prod-' + Math.random().toString(36).substring(2, 9),
      ...req.body,
    };
    return sendSuccess(res, newProduct, 201, 'Product created successfully');
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productRepository.findById(req.params.id);
    if (!product) return sendError(res, 'Product not found', 404, 'PRODUCT_NOT_FOUND');
    const updated = { ...product, ...req.body };
    return sendSuccess(res, updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productRepository.findById(req.params.id);
    if (!product) return sendError(res, 'Product not found', 404, 'PRODUCT_NOT_FOUND');
    return sendSuccess(res, { message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};
