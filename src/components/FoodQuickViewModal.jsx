import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  Flame, 
  Plus, 
  Minus, 
  Check, 
  ShoppingBag, 
  Heart, 
  Sparkles,
  Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const FoodQuickViewModal = ({ food, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();

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
    }
  }, [food]);

  if (!isOpen || !food) return null;

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
  const finalTotal = (unitPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    addToCart(food, quantity, selectedSize, selectedAddOns, specialNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        
        {/* Top Floating Close & Wishlist Buttons */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(food)}
            className={`p-2.5 rounded-full backdrop-blur-md transition shadow-md ${
              isFav ? 'bg-rose-500 text-white' : 'bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-slate-200 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Hero Image & Tags */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 shadow-inner">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                <span className={food.isVeg ? "veg-indicator" : "non-veg-indicator"} />
                <span>{food.isVeg ? "100% Vegetarian" : "Non-Vegetarian"}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{food.prepTime}</span>
              </span>
            </div>
          </div>

          {/* Title & Info */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {food.restaurantName} • {food.category}
              </span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{food.rating}</span>
                <span className="text-gray-400 font-normal">({food.ratingCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {food.name}
            </h2>

            <p className="text-sm text-gray-600 dark:text-slate-300 mt-2 leading-relaxed">
              {food.description}
            </p>
          </div>

          {/* Ingredients list */}
          {food.ingredients && (
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 mb-2">
                Fresh Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {food.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-xs font-semibold text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Portion Size Selection */}
          {food.sizes && food.sizes.length > 0 && (
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 mb-2.5">
                Choose Portion Size
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {food.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                      selectedSize?.name === size.name
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-gray-200 dark:border-slate-700 hover:border-brand-300 text-gray-800 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{size.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">
                        {size.priceOffset > 0 ? `+$${size.priceOffset.toFixed(2)}` : 'Standard Price'}
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

          {/* Add-ons & Extra Toppings */}
          {food.addOns && food.addOns.length > 0 && (
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 mb-2.5">
                Optional Add-Ons & Extras
              </h4>
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

          {/* Cooking Instructions textarea */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 block mb-2">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Less spicy, dressing on the side, extra cutlery"
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

        </div>

        {/* Modal Footer with Total & Add to Cart */}
        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-slate-800/80 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity stepper */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 dark:text-slate-400">Qty:</span>
            <div className="flex items-center bg-white dark:bg-slate-700 rounded-xl p-1 border border-gray-200 dark:border-slate-600 shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-brand-500 hover:text-white transition flex items-center justify-center font-bold"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-black text-gray-900 dark:text-white text-base">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-brand-500 hover:text-white transition flex items-center justify-center font-bold"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm transition-all shadow-md hover:shadow-glow flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Add to Cart • ${finalTotal}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
