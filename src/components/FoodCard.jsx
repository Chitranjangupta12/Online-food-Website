import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Clock, Plus, Minus, Eye, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const FoodCard = ({ food, onQuickView }) => {
  const { cartItems, addToCart, quickAddToCart, quickDecrement, getItemQuantity } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();

  const quantityInCart = getItemQuantity(food.id);
  const isFav = isFavorite(food.id);

  const discountPercent = food.originalPrice
    ? Math.round(((food.originalPrice - food.price) / food.originalPrice) * 100)
    : null;

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (food.sizes && food.sizes.length > 1 && onQuickView) {
      onQuickView(food);
    } else {
      quickAddToCart(food);
    }
  };

  const handleMinusClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    quickDecrement(food);
  };

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(food);
  };

  const handleEyeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(food);
  };

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-3xl p-3.5 sm:p-4 border border-gray-100 dark:border-slate-700/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-700 mb-3.5">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {food.bestseller && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Bestseller</span>
            </span>
          )}
          {discountPercent && discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-sm self-start">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Favorite & Quick View Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={handleHeartClick}
            aria-label="Add to wishlist"
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isFav
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 text-gray-700 dark:text-slate-200 hover:text-rose-500 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
          
          {onQuickView && (
            <button
              onClick={handleEyeClick}
              aria-label="Quick customize view"
              className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-gray-700 dark:text-slate-200 hover:text-brand-600 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 hidden sm:block"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Bottom Time & Veg tag pill */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-semibold text-white pointer-events-none">
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md">
            <span className={food.isVeg ? "veg-indicator" : "non-veg-indicator"} />
            <span>{food.isVeg ? "Veg" : "Non-Veg"}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{food.prepTime}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {food.restaurantName}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{food.rating}</span>
              <span className="text-gray-400 font-normal">({food.ratingCount})</span>
            </div>
          </div>

          <Link to={`/food/${food.id}`} className="block group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug line-clamp-1">
              {food.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {food.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-gray-100 dark:border-slate-700/60">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-gray-900 dark:text-white">
                ${food.price.toFixed(2)}
              </span>
              {food.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ${food.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {food.calories && (
              <span className="text-[10px] text-gray-400 block -mt-0.5">
                {food.calories}
              </span>
            )}
          </div>

          {/* Add to Cart or Stepper Button */}
          {quantityInCart > 0 ? (
            <div className="flex items-center bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-xl p-1 shadow-sm">
              <button
                onClick={handleMinusClick}
                className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 transition flex items-center justify-center font-bold"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">
                {quantityInCart}
              </span>
              <button
                onClick={handleAddClick}
                className="w-7 h-7 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition flex items-center justify-center font-bold"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddClick}
              className="px-3.5 py-2 rounded-xl bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-brand-600 dark:text-brand-400 text-xs font-bold transition-all duration-200 border border-brand-200 dark:border-brand-800/80 flex items-center gap-1.5 group-hover:bg-brand-500 group-hover:text-white"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
