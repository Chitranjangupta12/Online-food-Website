import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Tag, 
  Percent, 
  ShieldCheck, 
  Sparkles, 
  Info,
  Check,
  Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/CartItem';
import { EmptyState } from '../components/EmptyState';
import { coupons } from '../data/coupons';
import { foodItems } from '../data/foodItems';

export const Cart = () => {
  const { 
    cartItems, 
    clearCart, 
    appliedCouponCode, 
    applyCoupon, 
    removeCoupon, 
    totals,
    deliveryNotes,
    setDeliveryNotes,
    quickAddToCart
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput.trim());
    if (ok) setCouponInput('');
  };

  const handleQuickApply = (code) => {
    applyCoupon(code);
  };

  // Upsell suggestions (Beverages & Desserts not currently in cart)
  const suggestedAddOns = foodItems
    .filter(item => (item.category === 'beverages' || item.category === 'desserts') && !cartItems.some(c => c.id === item.id))
    .slice(0, 3);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          type="cart"
          title="Your Cart is Empty"
          message="You haven't added anything to your cart yet. Explore our restaurant menus and discover delicious meals!"
          actionText="Browse Food Menu"
          actionLink="/menu"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Order Review</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Your Food Cart ({totals.itemCount} {totals.itemCount === 1 ? 'Item' : 'Items'})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add More Items</span>
          </Link>
          <button
            onClick={clearCart}
            className="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Cart Items List + Bill Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart Items & Add-on Upsells */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Cart Items List */}
          <div className="space-y-3">
            {cartItems.map((item) => (
              <CartItem key={item.cartItemId} item={item} />
            ))}
          </div>

          {/* Delivery Note */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/80 shadow-soft">
            <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-2">
              Note for Chef / Valet (Optional)
            </label>
            <input
              type="text"
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              placeholder="e.g. Please do not ring doorbell after 9pm, extra napkins"
              className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Suggested Upsells */}
          {suggestedAddOns.length > 0 && (
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">
                  Frequently Ordered Together
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {suggestedAddOns.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200/70 dark:border-slate-700 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                        <p className="text-xs font-black text-brand-600 dark:text-brand-400">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => quickAddToCart(item)}
                      className="w-full py-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-500 hover:text-white text-brand-600 dark:text-brand-400 text-xs font-bold transition flex items-center justify-center gap-1 border border-brand-200 dark:border-brand-800"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Coupon Box & Bill Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Coupon Application Box */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-brand-500" />
              <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">
                Have a Promo Code?
              </h4>
            </div>

            {/* Input form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="Enter promo coupon code"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-xs font-mono font-bold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow-sm"
              >
                Apply
              </button>
            </form>

            {/* Active coupon badge or status */}
            {appliedCouponCode && (
              <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                totals.isCouponEligible
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/30 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black uppercase px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px]">
                    {appliedCouponCode}
                  </span>
                  <span className="font-semibold">{totals.couponMessage}</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="font-bold text-rose-500 hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Suggested clickable coupons */}
            <div>
              <p className="text-[11px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider mb-2">
                Available Coupons
              </p>
              <div className="space-y-1.5">
                {coupons.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleQuickApply(c.code)}
                    className={`w-full p-2 rounded-xl text-left transition flex items-center justify-between text-xs border ${
                      appliedCouponCode === c.code
                        ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 font-bold text-brand-700 dark:text-brand-300'
                        : 'border-gray-100 dark:border-slate-700 hover:border-brand-200 text-gray-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-mono font-bold text-gray-900 dark:text-white mr-2">
                        {c.code}
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-slate-400">
                        {c.title}
                      </span>
                    </div>
                    {appliedCouponCode === c.code ? (
                      <Check className="w-3.5 h-3.5 text-brand-600" />
                    ) : (
                      <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400">
                        Tap to apply
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bill Summary Breakdown Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-4">
            <h4 className="font-extrabold text-sm text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-slate-700/60">
              Bill Details
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm text-gray-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span>Item Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">${totals.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Restaurant Packaging</span>
                <span className="font-semibold text-gray-900 dark:text-white">${totals.packagingFee.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Delivery Partner Fee</span>
                {totals.deliveryFee === 0 ? (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
                ) : (
                  <span className="font-semibold text-gray-900 dark:text-white">${totals.deliveryFee.toFixed(2)}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span>Taxes & Restaurant GST (5%)</span>
                <span className="font-semibold text-gray-900 dark:text-white">${totals.tax.toFixed(2)}</span>
              </div>

              {totals.discount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold pt-1">
                  <span>Coupon Discount ({appliedCouponCode})</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-700/60 flex items-baseline justify-between">
              <div>
                <span className="text-base font-black text-gray-900 dark:text-white block">
                  Grand Total
                </span>
                <span className="text-[11px] text-gray-400">Inclusive of all taxes</span>
              </div>
              <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                ${totals.grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Free Delivery incentive banner */}
            {totals.subtotal < 30 && totals.deliveryFee > 0 && (
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-brand-950/30 text-brand-800 dark:text-brand-300 text-xs font-semibold">
                💡 Add ${(30 - totals.subtotal).toFixed(2)} more to unlock <span className="font-bold">FREE Delivery!</span>
              </div>
            )}

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm sm:text-base transition-all shadow-md hover:shadow-glow flex items-center justify-center gap-2.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe & Secure Mock Checkout Experience</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
