import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Award, 
  Flame, 
  Percent, 
  Smartphone, 
  Star, 
  ShoppingBag,
  CheckCircle2,
  Copy,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { CategoryCard } from '../components/CategoryCard';
import { RestaurantCard } from '../components/RestaurantCard';
import { FoodCard } from '../components/FoodCard';
import { ReviewCard } from '../components/ReviewCard';
import { FoodQuickViewModal } from '../components/FoodQuickViewModal';
import { categories } from '../data/categories';
import { restaurants } from '../data/restaurants';
import { foodItems } from '../data/foodItems';
import { coupons } from '../data/coupons';
import { reviews } from '../data/reviews';
import { useToast } from '../context/ToastContext';

export const Home = () => {
  const [selectedQuickFood, setSelectedQuickFood] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleOpenQuickView = (food) => {
    setSelectedQuickFood(food);
    setIsQuickViewOpen(true);
  };

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    showToast(`Copied coupon "${code}" to clipboard! 🎟️`, 'success');
  };

  const bestSellers = foodItems.filter(f => f.bestseller).slice(0, 8);
  const featuredRestaurants = restaurants.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent dark:from-brand-950/40 dark:via-slate-900 dark:to-slate-900 border border-orange-200/60 dark:border-slate-800 p-6 sm:p-12 lg:p-16 overflow-hidden">
            
            {/* Background glowing shapes */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              
              {/* Left Column: Heading, Search & CTA */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 dark:bg-brand-500/20 border border-brand-500/30 text-brand-600 dark:text-brand-400 text-xs sm:text-sm font-extrabold uppercase tracking-wide animate-fade-in">
                  <Flame className="w-4 h-4 text-brand-500" />
                  <span>Free Express Delivery On Your First 3 Orders</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15]">
                  Delicious Food, <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Delivered to Your Door
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-gray-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Order from over 100+ gourmet local restaurants, cloud kitchens, and artisan chefs with fast 30-minute delivery and real-time live order tracking.
                </p>

                {/* Hero Search Bar */}
                <div className="max-w-xl mx-auto lg:mx-0 pt-2">
                  <SearchBar placeholder="Search for pizza, biryani, burgers or restaurants..." />
                </div>

                {/* Quick CTA Buttons & Trust Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    to="/menu"
                    className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm sm:text-base transition-all shadow-md hover:shadow-glow flex items-center gap-2.5"
                  >
                    <span>Explore Food Menu</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/restaurants"
                    className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-100 font-bold text-sm sm:text-base transition-all border border-gray-200 dark:border-slate-700 shadow-soft"
                  >
                    <span>Browse Restaurants</span>
                  </Link>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80 dark:border-slate-800 text-center lg:text-left">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">500+</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 font-medium">Dishes Curated</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400">30 Min</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 font-medium">Avg Delivery</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-500">4.9 ★</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 font-medium">10k+ Foodies</div>
                  </div>
                </div>

              </div>

              {/* Right Column: Hero Visual Graphic */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-72 sm:w-96 lg:w-full aspect-square">
                  
                  {/* Rotating decorative background glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-500/20 to-amber-500/20 blur-2xl animate-pulse-subtle"></div>
                  
                  {/* Central Delicious Food Image */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                      alt="Gourmet Dining"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Floating Badge 1: 50% Off Promo */}
                  <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white dark:bg-slate-800 rounded-2xl p-3.5 shadow-xl border border-gray-100 dark:border-slate-700 flex items-center gap-3 animate-float">
                    <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                      %
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Special Promo</p>
                      <p className="text-xs font-extrabold text-rose-500">Flat 50% OFF</p>
                    </div>
                  </div>

                  {/* Floating Badge 2: Fast Delivery */}
                  <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white dark:bg-slate-800 rounded-2xl p-3.5 shadow-xl border border-gray-100 dark:border-slate-700 flex items-center gap-3 animate-float [animation-delay:1.5s]">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Live Tracking</p>
                      <p className="text-xs font-extrabold text-emerald-500">25-30 Mins Arrival</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>What's on your mind?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Popular Categories
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. POPULAR RESTAURANTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
              <span>Top Rated Kitchens</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Popular Restaurants Near You
            </h2>
          </div>
          <Link
            to="/restaurants"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>See All Restaurants</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* 4. BEST-SELLING FOOD ITEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>Chef's Handpicked Specials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Best-Selling Delicacies
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore Full Menu ({foodItems.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onQuickView={handleOpenQuickView}
            />
          ))}
        </div>
      </section>

      {/* 5. SPECIAL OFFERS & COUPONS PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-orange-600 via-brand-600 to-amber-600 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-2 text-center lg:text-left max-w-xl">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                Limited Time Deals
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
                Claim Huge Discounts On Your Meals
              </h3>
              <p className="text-sm sm:text-base text-orange-100 font-normal">
                Use our verified active coupon codes at checkout and save up to 50% on every order!
              </p>
            </div>

            {/* Coupons preview pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {coupons.slice(0, 3).map((coupon) => (
                <div
                  key={coupon.code}
                  className="bg-white text-gray-900 rounded-2xl p-3.5 shadow-md flex items-center gap-3 border border-white/40"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 block">
                      {coupon.title}
                    </span>
                    <span className="text-sm font-black tracking-wide font-mono text-gray-900">
                      {coupon.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCoupon(coupon.code)}
                    className="p-2 rounded-xl bg-orange-50 hover:bg-brand-500 hover:text-white text-brand-600 transition"
                    title="Copy coupon code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 dark:text-brand-400 block mb-1">
            Loved by thousands of foodies
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            What Our Customers Are Saying
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
            Real experiences from happy food lovers ordering every day with FoodieHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* 7. APP DOWNLOAD PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          
          <div className="space-y-4 max-w-lg text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Friendly & Fast</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              Order Anywhere with FoodieHub
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Enjoy lightning-fast ordering, live GPS delivery updates, saved favorite addresses, and exclusive app-only promo perks.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => showToast('FoodieHub is a Progressive Web App! You can install it on your device directly.', 'info')}
                className="px-6 py-3 rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-md"
              >
                <span>Download for iOS / Android</span>
              </button>
            </div>
          </div>

          <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-slate-700">
            <img
              src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80"
              alt="Food delivery on the go"
              className="w-full h-48 sm:h-56 object-cover"
            />
          </div>

        </div>
      </section>

      {/* Quick View Customization Modal */}
      <FoodQuickViewModal
        food={selectedQuickFood}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

    </div>
  );
};
