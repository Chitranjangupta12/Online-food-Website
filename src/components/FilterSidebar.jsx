import React from 'react';
import { Filter, RotateCcw, Check, Sparkles, Flame, DollarSign, Star } from 'lucide-react';
import { categories } from '../data/categories';

export const FilterSidebar = ({
  selectedCategory,
  onSelectCategory,
  dietaryFilter, // 'all' | 'veg' | 'non-veg'
  onDietaryChange,
  priceRange, // 'all' | 'under10' | '10to15' | 'above15'
  onPriceRangeChange,
  minRating, // 0 | 4.0 | 4.5
  onMinRatingChange,
  sortBy, // 'popular' | 'price-asc' | 'price-desc' | 'rating'
  onSortByChange,
  onResetFilters
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-6">
      
      {/* Top Header & Reset Button */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h3 className="font-extrabold text-gray-900 dark:text-white text-base">Filters</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-bold text-gray-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 block mb-2.5">
          Sort Food By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-sm font-semibold text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="popular">Popular & Bestsellers</option>
          <option value="rating">Highest Rated (★ 4.5+)</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Dietary Preference */}
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 block mb-2.5">
          Dietary Preference
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onDietaryChange('all')}
            className={`py-2 rounded-xl text-xs font-bold transition border ${
              dietaryFilter === 'all'
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-gray-50 dark:bg-slate-700/60 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-brand-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onDietaryChange('veg')}
            className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border ${
              dietaryFilter === 'veg'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-gray-50 dark:bg-slate-700/60 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-emerald-400'
            }`}
          >
            <span className="veg-indicator scale-75" />
            <span>Veg</span>
          </button>
          <button
            onClick={() => onDietaryChange('non-veg')}
            className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border ${
              dietaryFilter === 'non-veg'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-gray-50 dark:bg-slate-700/60 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-rose-400'
            }`}
          >
            <span className="non-veg-indicator scale-75" />
            <span>Non-Veg</span>
          </button>
        </div>
      </div>

      {/* Categories Pills */}
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 block mb-2.5">
          Categories
        </label>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
              selectedCategory === 'all'
                ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === 'all' && <Check className="w-4 h-4 text-brand-600" />}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat.slug
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold'
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </div>
              {selectedCategory === cat.slug && <Check className="w-4 h-4 text-brand-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 block mb-2.5">
          Price Range
        </label>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'Any Price' },
            { id: 'under10', label: 'Under $10 (Budget friendly)' },
            { id: '10to15', label: '$10 – $15 (Popular)' },
            { id: 'above15', label: '$15+ (Premium / Combos)' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => onPriceRangeChange(p.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                priceRange === p.id
                  ? 'bg-orange-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 font-bold border border-brand-300 dark:border-brand-800'
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <span>{p.label}</span>
              {priceRange === p.id && <Check className="w-3.5 h-3.5 text-brand-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 block mb-2.5">
          Minimum Rating
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 0, label: 'All' },
            { value: 4.0, label: '4.0+ ★' },
            { value: 4.8, label: '4.8+ ★' }
          ].map(r => (
            <button
              key={r.value}
              onClick={() => onMinRatingChange(r.value)}
              className={`py-2 rounded-xl text-xs font-bold transition border ${
                minRating === r.value
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-gray-50 dark:bg-slate-700/60 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-amber-400'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
