export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

class ProductRepository {
  private products: ProductData[] = [
    {
      id: 'prd-001',
      name: 'The Celestial Solitaire Diamond Ring',
      description: 'Handcrafted 18k yellow gold solitaire ring with brilliant-cut diamond.',
      price: 4850.0,
      category: 'Rings',
      image: '/assets/ring-1.webp',
      stock: 15,
    },
    {
      id: 'prd-002',
      name: 'Royal Sapphire Halo Pendant Necklace',
      description: 'Deep velvet blue Ceylon sapphire surrounded by micro-pave diamond halo.',
      price: 6200.0,
      category: 'Necklaces',
      image: '/assets/necklace-1.webp',
      stock: 8,
    },
    {
      id: 'prd-003',
      name: 'Mangata Emerald Cut Drop Earrings',
      description: 'Vibrant green Colombian emeralds suspended in platinum drops.',
      price: 3950.0,
      category: 'Earrings',
      image: '/assets/earrings-1.webp',
      stock: 12,
    },
  ];

  async findAll(): Promise<ProductData[]> {
    return this.products;
  }

  async findById(id: string): Promise<ProductData | null> {
    return this.products.find((p) => p.id === id) || null;
  }

  async findByCategory(category: string): Promise<ProductData[]> {
    return this.products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  async search(query: string): Promise<ProductData[]> {
    const q = query.toLowerCase();
    return this.products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }
}

export const productRepository = new ProductRepository();
export default productRepository;
