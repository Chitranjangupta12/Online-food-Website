import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { foodItems } from '../data/foodItems';
import { FoodCard } from '../components/FoodCard';
import { EmptyState } from '../components/EmptyState';
import { FoodQuickViewModal } from '../components/FoodQuickViewModal';

export const Favorites = () => {
  const { favorites } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [quickViewFood, setQuickViewFood] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const favoriteFoodItems = foodItems.filter(item => favorites.includes(item.id));

  const handleOpenQuickView = (food) => {
    setQuickViewFood(food);
    setIsQuickViewOpen(true);
  };

  const handleAddAllToCart = () => {
    if (favoriteFoodItems.length === 0) return;
    favoriteFoodItems.forEach(item => {
      addToCart(item, 1);
    });
    showToast(`Added all ${favoriteFoodItems.length} favorites to cart! 🛒`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-rose-500 text-xs font-black uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-current" />
            <span>Wishlist Collection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Your Favorite Dishes ({favoriteFoodItems.length})
          </h1>
        </div>

        {favoriteFoodItems.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm hover:shadow-glow self-start sm:self-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add All to Cart</span>
          </button>
        )}
      </div>

      {/* Grid of Favorites */}
      {favoriteFoodItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteFoodItems.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onQuickView={handleOpenQuickView}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          type="favorites"
          title="Your Wishlist is Empty"
          message="You haven't saved any food items yet. Click the heart icon on any dish card to save your favorites for easy access."
          actionText="Discover Delicious Foods"
          actionLink="/menu"
        />
      )}

      {/* Quick View Customization Modal */}
      <FoodQuickViewModal
        food={quickViewFood}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

    </div>
  );
};
