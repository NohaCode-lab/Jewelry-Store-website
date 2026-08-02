import React, { useEffect } from 'react';
import ProductGrid from '../features/products/ProductGrid';

const CollectionsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-[#020617] text-white">
      <ProductGrid />
    </main>
  );
};

export default CollectionsPage;
