import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Store, 
  Search, 
  Star, 
  Clock, 
  Filter, 
  RotateCcw, 
  DollarSign, 
  Check, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { EmptyState } from '../components/EmptyState';

export const Restaurants = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState(0); // 0 = any, 25, 30
  const [priceRange, setPriceRange] = useState('all'); // 'all' | '$' | '$$' | '$$$'
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'delivery' | 'price-asc' | 'price-desc'

  // Extract all unique cuisines
  const allCuisines = useMemo(() => {
    const set = new Set();
    restaurants.forEach(r => r.cuisines.forEach(c => set.add(c)));
    return Array.from(set).sort();
  }, []);

  // Filtered & Sorted Restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter(rest => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = rest.name.toLowerCase().includes(q);
          const matchesCuisine = rest.cuisines.some(c => c.toLowerCase().includes(q));
          const matchesLocation = rest.location.toLowerCase().includes(q);
          if (!matchesName && !matchesCuisine && !matchesLocation) return false;
        }

        // Cuisine filter
        if (selectedCuisine !== 'all') {
          if (!rest.cuisines.includes(selectedCuisine)) return false;
        }

        // Rating filter
        if (minRating > 0 && rest.rating < minRating) return false;

        // Max delivery time
        if (maxDeliveryTime > 0 && rest.deliveryMinutes > maxDeliveryTime) return false;

        // Price range
        if (priceRange !== 'all' && rest.priceRange !== priceRange) return false;

        // Veg Only
        if (isVegOnly && !rest.isVegOnly) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'delivery') return a.deliveryMinutes - b.deliveryMinutes;
        if (sortBy === 'price-asc') return a.priceForTwo - b.priceForTwo;
        if (sortBy === 'price-desc') return b.priceForTwo - a.priceForTwo;
        return 0;
      });
  }, [searchQuery, selectedCuisine, minRating, maxDeliveryTime, priceRange, isVegOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('all');
    setMinRating(0);
    setMaxDeliveryTime(0);
    setPriceRange('all');
    setIsVegOnly(false);
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 sm:p-10 shadow-lg overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span>Top Partner Restaurants</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Explore Handpicked Restaurants
          </h1>
          <p className="text-sm text-orange-100 font-medium">
            Discover top-rated cuisines, award-winning chefs, and speedy delivery in your area.
          </p>
        </div>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-6 border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-4">
        
        {/* Search input and sort */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by restaurant name, cuisine or location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="rating">Highest Rated (★)</option>
                <option value="delivery">Fastest Delivery</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              className="p-2 text-xs font-bold text-gray-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 flex items-center gap-1 transition"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pt-3 border-t border-gray-100 dark:border-slate-700/60 flex flex-wrap items-center gap-2">
          
          {/* Cuisines Filter Dropdown */}
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-xs font-semibold text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Cuisines</option>
            {allCuisines.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Rating filter pills */}
          <button
            onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
              minRating === 4.5
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-gray-50 dark:bg-slate-700/60 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-amber-400'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Ratings 4.5+</span>
          </button>

          {/* Fast delivery pill */}
          <button
            onClick={() => setMaxDeliveryTime(maxDeliveryTime === 25 ? 0 : 25)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
              maxDeliveryTime === 25
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-gray-50 dark:bg-slate-700/60 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-brand-400'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Under 25 mins</span>
          </button>

          {/* Pure Veg Toggle */}
          <button
            onClick={() => setIsVegOnly(!isVegOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
              isVegOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-gray-50 dark:bg-slate-700/60 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-emerald-400'
            }`}
          >
            <span className="veg-indicator scale-75" />
            <span>Pure Veg Only</span>
          </button>

          {/* Price Range Pills */}
          {['$', '$$', '$$$'].map(p => (
            <button
              key={p}
              onClick={() => setPriceRange(priceRange === p ? 'all' : p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                priceRange === p
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                  : 'bg-gray-50 dark:bg-slate-700/60 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-brand-400'
              }`}
            >
              <span>{p}</span>
            </button>
          ))}

        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-500 dark:text-slate-400 px-2">
        <span>Showing {filteredRestaurants.length} Restaurants</span>
        {searchQuery && (
          <span>Searching for "{searchQuery}"</span>
        )}
      </div>

      {/* Restaurant Grid */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <EmptyState
          type="search"
          title="No restaurants matched your filters"
          message="Try resetting your active filters or searching for another keyword to explore our partner kitchens."
          actionText="Reset All Filters"
          onActionClick={handleResetFilters}
        />
      )}

    </div>
  );
};
