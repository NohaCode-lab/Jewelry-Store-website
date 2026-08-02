import Fuse, { IFuseOptions } from 'fuse.js';
import { Product } from '../../types/product';
import { PRODUCTS } from '../../data/products';
import { SearchResult, SearchQueryOptions } from './search.types';

const fuseOptions: IFuseOptions<Product> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'category', weight: 0.3 },
    { name: 'description', weight: 0.15 },
    { name: 'details', weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  includeMatches: true,
  includeScore: true,
  minMatchCharLength: 2,
};

const fuseIndex = new Fuse(PRODUCTS, fuseOptions);

export const searchService = {
  search(query: string, options?: SearchQueryOptions): SearchResult[] {
    if (!query.trim()) return [];

    let results = fuseIndex.search(query);

    if (options?.category && options.category !== 'all') {
      results = results.filter((res) => res.item.category === options.category);
    }

    if (options?.maxResults) {
      results = results.slice(0, options.maxResults);
    }

    return results.map((res) => ({
      item: res.item,
      score: res.score,
      matches: res.matches as any,
    }));
  },
};
