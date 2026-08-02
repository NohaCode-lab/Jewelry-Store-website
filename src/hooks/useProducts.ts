import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { ProductFilterState } from '../types/product';

export const useProducts = (filter?: Partial<ProductFilterState>) => {
  return useQuery({
    queryKey: ['products', filter],
    queryFn: () => productService.getProducts(filter),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2,
  });
};
