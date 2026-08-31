import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleMinus = () => {
    updateQuantity(item.cartItemId, -1);
  };

  const handlePlus = () => {
    updateQuantity(item.cartItemId, 1);
  };

  const handleRemove = () => {
    removeFromCart(item.cartItemId);
  };

  const itemTotal = (item.unitPrice * item.quantity).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all duration-200">
      
      {/* Item info & image */}
      <div className="flex items-center gap-3.5 min-w-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 shadow-sm"
        />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={item.isVeg ? "veg-indicator shrink-0" : "non-veg-indicator shrink-0"} />
            <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate">
              {item.name}
            </h4>
          </div>

          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            {item.restaurantName}
          </p>

          {/* Size & Add-ons chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            {item.selectedSize && (
              <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-700 text-[11px] font-semibold text-gray-700 dark:text-slate-300">
                Size: {item.selectedSize.name}
              </span>
            )}
            {item.selectedAddOns && item.selectedAddOns.map((addon, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded-md bg-orange-50 dark:bg-brand-950/40 text-[11px] font-medium text-brand-700 dark:text-brand-300"
              >
                + {addon.name}
              </span>
            ))}
          </div>

          {/* Unit price */}
          <div className="text-xs font-semibold text-gray-600 dark:text-slate-300 mt-1">
            ${item.unitPrice.toFixed(2)} each
          </div>
        </div>
      </div>

      {/* Stepper, Total & Remove Action */}
      <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-slate-700">
        
        {/* Quantity Stepper */}
        <div className="flex items-center bg-gray-50 dark:bg-slate-700 rounded-xl p-1 border border-gray-200 dark:border-slate-600 shadow-inner">
          <button
            onClick={handleMinus}
            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 transition flex items-center justify-center font-bold"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">
            {item.quantity}
          </span>
          <button
            onClick={handlePlus}
            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 transition flex items-center justify-center font-bold"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[70px]">
          <span className="text-base font-black text-gray-900 dark:text-white">
            ${itemTotal}
          </span>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleRemove}
          className="p-2 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
          aria-label="Remove item"
          title="Remove from cart"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
