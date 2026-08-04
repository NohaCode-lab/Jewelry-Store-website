import { Request, Response, NextFunction } from 'express';
import { productRepository } from '../repositories/productRepository';
import { sendSuccess, sendError } from '../utils/response';
import { CacheService } from '../services/cacheService';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, sort } = req.query;
    const cacheKey = `mg_catalog_${category || 'all'}_${search || 'none'}_${sort || 'default'}`;

    // 1. Redis Cache Lookup
    const cachedResults = await CacheService.get<any[]>(cacheKey);
    if (cachedResults) {
      return sendSuccess(res, cachedResults, 200, undefined, { cached: true });
    }

    // 2. Database / Repository Query
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

    // 3. Write to Redis Cache (TTL = 1 hour)
    await CacheService.set(cacheKey, results, 3600);

    return sendSuccess(res, results, 200, undefined, { cached: false });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const cacheKey = `mg_product_${id}`;

    const cachedProduct = await CacheService.get<any>(cacheKey);
    if (cachedProduct) {
      return sendSuccess(res, cachedProduct, 200, undefined, { cached: true });
    }

    const product = await productRepository.findById(id);
    if (!product) return sendError(res, 'Product not found', 404, 'PRODUCT_NOT_FOUND');

    await CacheService.set(cacheKey, product, 3600);
    return sendSuccess(res, product, 200, undefined, { cached: false });
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

    // Cache Invalidation on Mutation
    await CacheService.del('mg_catalog_*');

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

    // Invalidate Redis Cache
    await CacheService.del('mg_catalog_*');
    await CacheService.del(`mg_product_${req.params.id}`);

    return sendSuccess(res, updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productRepository.findById(req.params.id);
    if (!product) return sendError(res, 'Product not found', 404, 'PRODUCT_NOT_FOUND');

    // Invalidate Redis Cache
    await CacheService.del('mg_catalog_*');
    await CacheService.del(`mg_product_${req.params.id}`);

    return sendSuccess(res, { message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};
