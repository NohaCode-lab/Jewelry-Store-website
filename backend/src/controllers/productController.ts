import { Request, Response, NextFunction } from 'express';

const mockProducts = [
  {
    id: 'ring-01',
    name: 'The Eternal Solitaire Ring',
    description: 'A timeless 2.0 carat round brilliant diamond set in pure 950 Platinum.',
    price: 2450,
    category: 'rings',
    image: '/assets/ring-1.jpg',
    stock: 12,
  },
  {
    id: 'crown-01',
    name: 'The Empress Emerald Tiara',
    description: 'Hand-set Colombian emeralds surrounded by VVS1 diamonds.',
    price: 12800,
    category: 'crowns',
    image: '/assets/crown-1.jpg',
    stock: 3,
  },
  {
    id: 'necklace-01',
    name: 'The Royal Sapphire Choker',
    description: 'Deep royal blue sapphires linked by delicate 18K white gold strands.',
    price: 6400,
    category: 'necklace',
    image: '/assets/necklace-1.jpg',
    stock: 5,
  },
];

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, sort } = req.query;
    let results = [...mockProducts];

    if (category && category !== 'all') {
      results = results.filter((p) => p.category === category);
    }

    if (search) {
      const q = String(search).toLowerCase();
      results = results.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') results.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') results.sort((a, b) => b.price - a.price);

    return res.json(results);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = mockProducts.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = {
      id: 'prod-' + Math.random().toString(36).substring(2, 9),
      ...req.body,
      createdAt: new Date(),
    };
    mockProducts.push(newProduct);
    return res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const index = mockProducts.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    mockProducts[index] = { ...mockProducts[index], ...req.body };
    return res.json(mockProducts[index]);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const index = mockProducts.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    mockProducts.splice(index, 1);
    return res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};
