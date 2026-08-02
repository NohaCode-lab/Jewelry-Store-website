export type MetalType = '18K Yellow Gold' | '18K Rose Gold' | '950 Platinum' | '18K White Gold';

export type CaratSize = '0.5 ct' | '1.0 ct' | '1.5 ct' | '2.0 ct' | '3.0 ct';

export type ProductCategory = 'rings' | 'crowns' | 'earrings' | 'bracelet' | 'necklace' | 'collections';

export interface ProductCustomization {
  selectedMetal: MetalType;
  selectedCarat?: CaratSize;
  ringSize?: number;
  engravingText?: string;
}

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  description: string;
  details: string[];
  mainImage: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  availableMetals: MetalType[];
  availableCarats?: CaratSize[];
}

export interface ProductFilterState {
  category: ProductCategory | 'all';
  searchQuery: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
}
