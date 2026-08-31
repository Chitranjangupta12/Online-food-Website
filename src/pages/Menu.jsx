import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  Search, 
  Filter, 
  X, 
  LayoutGrid, 
  List, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { foodItems } from '../data/foodItems';
import { categories } from '../data/categories';
import { FoodCard } from '../components/FoodCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { EmptyState } from '../components/EmptyState';
import { FoodQuickViewModal } from '../components/FoodQuickViewModal';

export const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoryFromUrl = searchParams.get('category') || 'all';
  const searchFromUrl = searchParams.get('search') || '';
  const restaurantFromUrl = searchParams.get('restaurant') || '';

  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [priceRange, setPriceRange] = useState('all'); // 'all' | 'under10' | '10to15' | 'above15'
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Quick view modal
  const [quickViewFood, setQuickViewFood] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Synchronize state when URL query params change
  useEffect(() => {
    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    if (searchFromUrl !== undefined) setSearchQuery(searchFromUrl);
  }, [searchFromUrl]);

  const handleOpenQuickView = (food) => {
    setQuickViewFood(food);
    setIsQuickViewOpen(true);
  };

  const handleSelectCategory = (catSlug) => {
    setSelectedCategory(catSlug);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (catSlug === 'all') {
        newParams.delete('category');
      } else {
        newParams.set('category', catSlug);
      }
      return newParams;
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDietaryFilter('all');
    setPriceRange('all');
    setMinRating(0);
    setSortBy('popular');
    setSearchParams({});
  };

  // Filter and sort items
  const filteredFoods = useMemo(() => {
    return foodItems
      .filter(item => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = item.name.toLowerCase().includes(q);
          const matchesDesc = item.description.toLowerCase().includes(q);
          const matchesCat = item.category.toLowerCase().includes(q);
          const matchesRest = item.restaurantName.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesCat && !matchesRest) return false;
        }

        // Restaurant filter from URL
        if (restaurantFromUrl && item.restaurantName.toLowerCase() !== restaurantFromUrl.toLowerCase()) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Dietary
        if (dietaryFilter === 'veg' && !item.isVeg) return false;
        if (dietaryFilter === 'non-veg' && item.isVeg) return false;

        // Price range
        if (priceRange === 'under10' && item.price >= 10) return false;
        if (priceRange === '10to15' && (item.price < 10 || item.price > 15)) return false;
        if (priceRange === 'above15' && item.price <= 15) return false;

        // Rating
        if (minRating > 0 && item.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [searchQuery, restaurantFromUrl, selectedCategory, dietaryFilter, priceRange, minRating, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-brand-600 via-orange-600 to-amber-600 text-white p-6 sm:p-10 shadow-lg overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Curated Catalog</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Explore All Delicious Dishes
          </h1>
          <p className="text-sm text-orange-100 font-medium">
            From oven-fired pizzas to fragrant dum biryanis, find your favorite meal handcrafted by top chefs.
          </p>
        </div>
      </div>

      {/* Horizontal Category Scroll Bar */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => handleSelectCategory('all')}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold shrink-0 transition-all flex items-center gap-2 border ${
            selectedCategory === 'all'
              ? 'bg-brand-600 text-white border-brand-600 shadow-md ring-2 ring-brand-500/20'
              : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border-gray-100 dark:border-slate-700/80 hover:border-brand-300'
          }`}
        >
          <span>🔥</span>
          <span>All Dishes ({foodItems.length})</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelectCategory(cat.slug)}
            className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all flex items-center gap-2 border ${
              selectedCategory === cat.slug
                ? 'bg-brand-600 text-white border-brand-600 shadow-md ring-2 ring-brand-500/20'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border-gray-100 dark:border-slate-700/80 hover:border-brand-300'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Search Bar & Mobile Filter Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700/80 shadow-soft">
        
        {/* Search */}
        <div className="relative w-full sm:w-80 lg:w-96">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish, ingredients, tags..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Pills & Mobile Trigger */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center gap-1.5 border border-brand-200 dark:border-brand-800"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="text-xs font-bold text-gray-500 dark:text-slate-400">
            Showing <span className="text-brand-600 dark:text-brand-400 font-extrabold">{filteredFoods.length}</span> Items
          </div>
        </div>

      </div>

      {/* Restaurant Filter Active Banner */}
      {restaurantFromUrl && (
        <div className="p-3 rounded-2xl bg-orange-50 dark:bg-brand-950/40 border border-orange-200 dark:border-brand-900/60 flex items-center justify-between">
          <p className="text-xs font-bold text-brand-800 dark:text-brand-300">
            Filtering menu for restaurant: <span className="underline">{restaurantFromUrl}</span>
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="text-xs font-extrabold text-brand-600 hover:underline"
          >
            Show All Restaurants
          </button>
        </div>
      )}

      {/* Main Content Layout: Sidebar + Food Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            dietaryFilter={dietaryFilter}
            onDietaryChange={setDietaryFilter}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  handleSelectCategory(cat);
                  setMobileFilterOpen(false);
                }}
                dietaryFilter={dietaryFilter}
                onDietaryChange={setDietaryFilter}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                minRating={minRating}
                onMinRatingChange={setMinRating}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                onResetFilters={handleResetFilters}
              />
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-4 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm"
              >
                Apply Filters ({filteredFoods.length} Results)
              </button>
            </div>
          </div>
        )}

        {/* Food Items Grid */}
        <div className="lg:col-span-9">
          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFoods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onQuickView={handleOpenQuickView}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              type="search"
              title="No food items found"
              message="We couldn't find any dishes matching your current filter criteria. Try changing categories or clearing price filters."
              actionText="Reset All Filters"
              onActionClick={handleResetFilters}
            />
          )}
        </div>

      </div>

      {/* Quick View Customization Modal */}
      <FoodQuickViewModal
        food={quickViewFood}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

    </div>
  );
};
