import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tag, Percent, Copy, Check, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { coupons } from '../data/coupons';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const Offers = () => {
  const { applyCoupon, appliedCouponCode } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    showToast(`Copied code "${code}" to clipboard! 📋`, 'success');
  };

  const handleApplyAndGo = (code) => {
    applyCoupon(code);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Offers Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-brand-600 to-amber-600 text-white p-8 sm:p-12 shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
            <Percent className="w-3.5 h-3.5" />
            <span>Exclusive Discounts</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Best Food Offers & Promo Deals
          </h1>
          <p className="text-sm sm:text-base text-orange-100 font-medium">
            Save up to 50% on every order! Apply these verified promo coupons during checkout for instant savings.
          </p>
        </div>
      </div>

      {/* Coupons Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Active Promo Coupons
            </h2>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
              Click to copy or directly apply to your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => {
            const isCurrentApplied = appliedCouponCode === coupon.code;
            return (
              <div
                key={coupon.code}
                className={`bg-white dark:bg-slate-800 rounded-3xl p-6 border shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isCurrentApplied
                    ? 'border-brand-500 ring-2 ring-brand-500/20'
                    : 'border-gray-100 dark:border-slate-700/80'
                }`}
              >
                {/* Coupon Tag Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-lg text-white text-[10px] font-black uppercase tracking-wider ${coupon.badgeColor}`}>
                    {coupon.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{coupon.expiresIn}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 dark:text-white mb-1">
                    {coupon.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-4">
                    {coupon.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-700/50 border border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Coupon Code</span>
                      <span className="text-base font-black font-mono tracking-wider text-brand-600 dark:text-brand-400">
                        {coupon.code}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="p-2 rounded-xl bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:text-brand-600 shadow-sm transition"
                      title="Copy coupon code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-3 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-500 dark:text-slate-400">
                    Min spend: ${coupon.minOrder.toFixed(2)}
                  </span>

                  {isCurrentApplied ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      <Check className="w-3.5 h-3.5" />
                      <span>Applied</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApplyAndGo(coupon.code)}
                      className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow-sm"
                    >
                      Apply Code
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Special Deals Callout */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-400">
            Daily Flash Offer
          </span>
          <h3 className="text-2xl font-black">
            Order Above $30 & Enjoy 100% Free Express Delivery
          </h3>
          <p className="text-xs text-slate-400">
            No coupon needed! Automatically applied to all qualifying carts during checkout.
          </p>
        </div>

        <Link
          to="/menu"
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition flex items-center gap-2 shrink-0 shadow-md"
        >
          <span>Start Ordering Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
