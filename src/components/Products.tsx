import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductFilter } from '../features/products/ProductFilter';
import { ProductCard } from '../features/products/ProductCard';
import { ProductFilterState } from '../types/product';

export const Products: React.FC = () => {
  const [filterState, setFilterState] = useState<ProductFilterState>({
    category: 'all',
    searchQuery: '',
    priceRange: [0, 50000],
    sortBy: 'featured',
  });

  const handleFilterChange = (newState: Partial<ProductFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newState }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (filterState.category !== 'all') {
      result = result.filter((p) => p.category === filterState.category);
    }

    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (filterState.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filterState.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filterState.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filterState]);

  return (
    <section id="products" className="py-24 bg-[#0a0f1d] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">Exquisite Collections</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">
            Handcrafted High Jewelry
          </h2>
          <div className="w-20 h-[1px] bg-amber-500 mx-auto mb-4" />
          <p className="text-white/70 text-sm leading-relaxed">
            Discover Mangata & Gallo's selection of fine engagement rings, diamond tiaras, and bespoke bridal jewelry.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <ProductFilter filterState={filterState} onFilterChange={handleFilterChange} />

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-lg font-playfair text-white/70">No jewelry matching your filter settings</p>
            <button
              onClick={() =>
                setFilterState({ category: 'all', searchQuery: '', priceRange: [0, 50000], sortBy: 'featured' })
              }
              className="mt-4 text-xs text-amber-400 hover:underline font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
