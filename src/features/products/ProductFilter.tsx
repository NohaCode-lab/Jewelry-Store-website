import React from 'react';
import { ProductCategory, ProductFilterState } from '../../types/product';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ProductFilterProps {
  filterState: ProductFilterState;
  onFilterChange: (newState: Partial<ProductFilterState>) => void;
}

const CATEGORIES: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Collections' },
  { id: 'rings', label: 'Rings' },
  { id: 'crowns', label: 'Crowns & Tiaras' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'bracelet', label: 'Bracelets' },
  { id: 'necklace', label: 'Necklaces' },
  { id: 'collections', label: 'Bridal Sets' },
];

export const ProductFilter: React.FC<ProductFilterProps> = ({ filterState, onFilterChange }) => {
  return (
    <div className="space-y-6 mb-10">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onFilterChange({ category: cat.id })}
            className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
              filterState.category === cat.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black border-amber-400 font-semibold shadow-lg shadow-amber-500/20'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search jewelry by name or style..."
            value={filterState.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <SlidersHorizontal size={14} className="text-amber-400" />
            <span>Sort By:</span>
          </div>
          <select
            value={filterState.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="featured" className="bg-[#0f172a]">
              Featured
            </option>
            <option value="price-low" className="bg-[#0f172a]">
              Price: Low to High
            </option>
            <option value="price-high" className="bg-[#0f172a]">
              Price: High to Low
            </option>
            <option value="rating" className="bg-[#0f172a]">
              Customer Rating
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
