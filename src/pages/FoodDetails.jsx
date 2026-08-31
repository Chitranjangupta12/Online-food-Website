import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Star, 
  Clock, 
  Flame, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Store, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  Share2
} from 'lucide-react';
import { foodItems } from '../data/foodItems';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { FoodCard } from '../components/FoodCard';
import { EmptyState } from '../components/EmptyState';

export const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();
  const { showToast } = useToast();

  const food = foodItems.find(item => item.id === id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');

  useEffect(() => {
    if (food) {
      setSelectedSize(food.sizes ? food.sizes[0] : { name: 'Standard', priceOffset: 0 });
      setSelectedAddOns([]);
      setQuantity(1);
      setSpecialNotes('');
      window.scrollTo(0, 0);
    }
  }, [id, food]);

  if (!food) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          type="search"
          title="Dish not found"
          message="The food item you are looking for might have been removed or is temporarily unavailable."
          actionText="Back to Menu"
          actionLink="/menu"
        />
      </div>
    );
  }

  const isFav = isFavorite(food.id);

  const toggleAddon = (addon) => {
    setSelectedAddOns(prev => {
      const exists = prev.some(a => a.name === addon.name);
      if (exists) {
        return prev.filter(a => a.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  const addOnsTotal = selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);
  const sizeOffset = selectedSize?.priceOffset || 0;
  const unitPrice = parseFloat((food.price + sizeOffset + addOnsTotal).toFixed(2));
  const grandItemTotal = (unitPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    addToCart(food, quantity, selectedSize, selectedAddOns, specialNotes);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard! 🔗', 'success');
    }
  };

  const relatedFoods = foodItems
    .filter(item => (item.category === food.category || item.restaurantId === food.restaurantId) && item.id !== food.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-slate-400">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/menu" className="hover:text-brand-600">Menu</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/menu?category=${food.category}`} className="hover:text-brand-600 capitalize">
          {food.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 dark:text-white truncate max-w-[200px]">{food.name}</span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Food Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-slate-700/80 group">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {food.bestseller && (
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chef's Choice</span>
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white flex items-center gap-1.5 self-start">
                <span className={food.isVeg ? "veg-indicator" : "non-veg-indicator"} />
                <span>{food.isVeg ? "100% Pure Veg" : "Non-Vegetarian"}</span>
              </span>
            </div>

            {/* Top Right Action Icons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                aria-label="Share dish"
                className="p-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-gray-700 dark:text-slate-200 hover:text-brand-600 transition shadow-md"
                title="Share dish link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleFavorite(food)}
                aria-label="Add to wishlist"
                className={`p-2.5 rounded-full backdrop-blur-md transition shadow-md ${
                  isFav
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-slate-200 hover:text-rose-500'
                }`}
                title={isFav ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Bottom Meta Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white bg-black/60 backdrop-blur-md p-3 rounded-2xl">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Prep: {food.prepTime}</span>
              </div>
              {food.calories && (
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{food.calories}</span>
                </div>
              )}
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/80 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">Freshly Prepared</p>
                <p className="text-[11px] text-gray-500 dark:text-slate-400">Cooked upon your order</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/80 flex items-center gap-3">
              <Store className="w-5 h-5 text-brand-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{food.restaurantName}</p>
                <Link
                  to={`/menu?restaurant=${encodeURIComponent(food.restaurantName)}`}
                  className="text-[11px] text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                >
                  View Restaurant Menu &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customizations & Pricing */}
        <div className="lg:col-span-6 space-y-6 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-700/80 shadow-soft">
          
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {food.category}
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-500 font-black text-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{food.rating}</span>
                <span className="text-gray-400 font-normal">({food.ratingCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {food.name}
            </h1>

            <p className="text-sm text-gray-600 dark:text-slate-300 mt-2 leading-relaxed font-normal">
              {food.description}
            </p>
          </div>

          {/* Ingredients list */}
          {food.ingredients && (
            <div className="pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 mb-2">
                Ingredients & Toppings Included
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {food.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-gray-50 dark:bg-slate-700 text-xs font-semibold text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-600"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Portion Size Selection */}
          {food.sizes && food.sizes.length > 0 && (
            <div className="pt-3 border-t border-gray-100 dark:border-slate-700/60">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 block mb-3">
                Select Portion Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {food.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                      selectedSize?.name === size.name
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-gray-200 dark:border-slate-700 hover:border-brand-300 text-gray-800 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{size.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">
                        {size.priceOffset > 0 ? `+$${size.priceOffset.toFixed(2)}` : 'Standard'}
                      </p>
                    </div>
                    {selectedSize?.name === size.name && (
                      <Check className="w-4 h-4 text-brand-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons List */}
          {food.addOns && food.addOns.length > 0 && (
            <div className="pt-3 border-t border-gray-100 dark:border-slate-700/60">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 block mb-3">
                Add-Ons & Extra Dips
              </label>
              <div className="space-y-2">
                {food.addOns.map((addon, idx) => {
                  const isChecked = selectedAddOns.some(a => a.name === addon.name);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`w-full p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                        isChecked
                          ? 'border-brand-500 bg-orange-50/60 dark:bg-brand-950/30 text-gray-900 dark:text-white'
                          : 'border-gray-200 dark:border-slate-700 hover:border-brand-200 text-gray-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                          isChecked ? 'bg-brand-600 border-brand-600 text-white' : 'border-gray-300 dark:border-slate-600'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs font-semibold">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                        +${addon.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="pt-3 border-t border-gray-100 dark:border-slate-700/60">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 block mb-2">
              Special Cooking Instructions
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Mild spice, no onions, extra crispy, fork needed"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Quantity & Add to Cart Container */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-xs font-bold text-gray-500 dark:text-slate-400">Quantity:</span>
              <div className="flex items-center bg-gray-50 dark:bg-slate-700 rounded-xl p-1 border border-gray-200 dark:border-slate-600 shadow-inner">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-brand-500 hover:text-white transition flex items-center justify-center font-bold"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-black text-gray-900 dark:text-white text-base">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-brand-500 hover:text-white transition flex items-center justify-center font-bold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Total and Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm sm:text-base transition-all shadow-md hover:shadow-glow flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart • ${grandItemTotal}</span>
            </button>

          </div>

        </div>

      </div>

      {/* Related Dishes Section */}
      {relatedFoods.length > 0 && (
        <section className="pt-10 border-t border-gray-100 dark:border-slate-800 space-y-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-1">
              You Might Also Crave
            </span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Related Delicious Food Items
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedFoods.map((item) => (
              <FoodCard key={item.id} food={item} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
