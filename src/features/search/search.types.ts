import { Product } from '../../types/product';

export interface SearchResult {
  item: Product;
  score?: number;
  matches?: Array<{
    key?: string;
    value?: string;
    indices?: readonly [number, number][];
  }>;
}

export interface SearchQueryOptions {
  category?: string;
  maxResults?: number;
  threshold?: number; // Fuzzy match threshold (0.0 exact to 1.0 loose)
}
