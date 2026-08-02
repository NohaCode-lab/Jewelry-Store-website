const catalog = [
  {
    id: 'ring-01',
    name: 'The Eternal Solitaire Ring',
    description: 'A timeless 2.0 carat round brilliant diamond set in pure 950 Platinum.',
    price: 2450.0,
    category: 'rings',
    image: '/assets/ring-1.jpg',
    stock: 12,
  },
  {
    id: 'crown-01',
    name: 'The Empress Emerald Tiara',
    description: 'Hand-set Colombian emeralds surrounded by VVS1 diamonds.',
    price: 12800.0,
    category: 'crowns',
    image: '/assets/crown-1.jpg',
    stock: 3,
  },
  {
    id: 'necklace-01',
    name: 'The Royal Sapphire Choker',
    description: 'Deep royal blue sapphires linked by delicate 18K white gold strands.',
    price: 6400.0,
    category: 'necklace',
    image: '/assets/necklace-1.jpg',
    stock: 5,
  },
];

export const productService = {
  async getAllProducts(category?: string, search?: string) {
    let items = [...catalog];
    if (category && category !== 'all') {
      items = items.filter((p) => p.category === category);
    }
    if (search) {
      const query = search.toLowerCase();
      items = items.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }
    return items;
  },

  async getProductById(id: string) {
    return catalog.find((p) => p.id === id) || null;
  },

  async createProduct(data: any) {
    const item = { id: 'prod-' + Math.random().toString(36).substring(2, 9), ...data };
    catalog.push(item);
    return item;
  },
};
