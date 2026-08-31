import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UtensilsCrossed, Store, X, ArrowRight } from 'lucide-react';
import { foodItems } from '../data/foodItems';
import { restaurants } from '../data/restaurants';

export const SearchBar = ({ placeholder = "Search for food or restaurants...", className = "", onSearchSubmit }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length > 0) {
      const foods = foodItems
        .filter(item =>
          item.name.toLowerCase().includes(trimmed) ||
          item.category.toLowerCase().includes(trimmed) ||
          item.description.toLowerCase().includes(trimmed)
        )
        .slice(0, 5);

      const rests = restaurants
        .filter(r =>
          r.name.toLowerCase().includes(trimmed) ||
          r.cuisines.some(c => c.toLowerCase().includes(trimmed)) ||
          r.location.toLowerCase().includes(trimmed)
        )
        .slice(0, 3);

      setFilteredFoods(foods);
      setFilteredRestaurants(rests);
      setIsOpen(true);
    } else {
      setFilteredFoods([]);
      setFilteredRestaurants([]);
      setIsOpen(false);
    }
  }, [query]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    if (onSearchSubmit) {
      onSearchSubmit(query.trim());
    } else {
      navigate(`/menu?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectFood = (foodId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/food/${foodId}`);
  };

  const handleSelectRestaurant = (restId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/restaurants?id=${restId}`);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-4 text-gray-400 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-white dark:bg-slate-800/90 text-gray-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-slate-700 shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base font-medium"
        />
        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-all shadow-sm hover:shadow-glow flex items-center gap-1"
          >
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Instant Dropdown Preview */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-50 animate-fade-in divide-y divide-gray-100 dark:divide-slate-700/60 max-h-[80vh] overflow-y-auto">
          {filteredFoods.length === 0 && filteredRestaurants.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <p className="font-medium text-sm">No exact matches for "{query}"</p>
              <button
                onClick={handleSubmit}
                className="mt-2 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 inline-flex items-center gap-1"
              >
                Search all menu items &rarr;
              </button>
            </div>
          ) : (
            <>
              {filteredFoods.length > 0 && (
                <div className="p-3">
                  <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400 flex items-center gap-1.5">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-brand-500" />
                    <span>Dishes ({filteredFoods.length})</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {filteredFoods.map(food => (
                      <button
                        key={food.id}
                        type="button"
                        onClick={() => handleSelectFood(food.id)}
                        className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-700/60 transition text-left group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-11 h-11 rounded-lg object-cover shrink-0"
                          />
                          <div className="truncate">
                            <div className="flex items-center gap-1.5">
                              <span className={food.isVeg ? "veg-indicator shrink-0" : "non-veg-indicator shrink-0"} />
                              <p className="text-sm font-semibold text-gray-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate">
                                {food.name}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                              {food.restaurantName} • {food.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 pl-3">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            ${food.price.toFixed(2)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredRestaurants.length > 0 && (
                <div className="p-3">
                  <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-brand-500" />
                    <span>Restaurants ({filteredRestaurants.length})</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {filteredRestaurants.map(rest => (
                      <button
                        key={rest.id}
                        type="button"
                        onClick={() => handleSelectRestaurant(rest.id)}
                        className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-700/60 transition text-left group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={rest.image}
                            alt={rest.name}
                            className="w-11 h-11 rounded-lg object-cover shrink-0"
                          />
                          <div className="truncate">
                            <p className="text-sm font-semibold text-gray-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate">
                              {rest.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                              {rest.cuisines.join(', ')} • {rest.deliveryTime}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 pl-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                            ★ {rest.rating}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-2.5 bg-gray-50 dark:bg-slate-800/80 text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center justify-center gap-1 w-full py-1"
                >
                  <span>See all matching results for "{query}"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
