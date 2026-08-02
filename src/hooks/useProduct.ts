import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
};
