import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Mail, Phone, MapPin, Heart, Send, ShieldCheck, Clock, Award } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Subscribed! 🎁 Check your inbox for a 20% discount code.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Benefits Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-brand-500 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Superfast 30-Min Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hot & fresh food delivered right at your doorstep.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">100% Hygienic Kitchens</h4>
              <p className="text-xs text-slate-400 mt-0.5">Verified partner restaurants adhering to safety protocols.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Best Price Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">Exciting promo discounts, cashback & flat combo deals.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Foodie<span className="text-brand-500">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              FoodieHub connects hungry food lovers with the finest local restaurants and gourmet cloud kitchens. Experience lightning-fast delivery and mouth-watering meals every day.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition cursor-pointer">
                fb
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition cursor-pointer">
                ig
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition cursor-pointer">
                tw
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition cursor-pointer">
                yt
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/restaurants" className="hover:text-brand-400 transition">Explore Restaurants</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-brand-400 transition">Complete Food Menu</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-brand-400 transition">Coupons & Offers</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-brand-400 transition">Track Your Orders</Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-brand-400 transition">Saved Favorites</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide">Top Cuisines</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/menu?category=pizza" className="hover:text-brand-400 transition">Artisan Pizzas</Link>
              </li>
              <li>
                <Link to="/menu?category=burger" className="hover:text-brand-400 transition">Gourmet Burgers</Link>
              </li>
              <li>
                <Link to="/menu?category=biryani" className="hover:text-brand-400 transition">Dum Biryani</Link>
              </li>
              <li>
                <Link to="/menu?category=chinese" className="hover:text-brand-400 transition">Indo-Chinese Wok</Link>
              </li>
              <li>
                <Link to="/menu?category=south-indian" className="hover:text-brand-400 transition">South Indian Dosas</Link>
              </li>
              <li>
                <Link to="/menu?category=desserts" className="hover:text-brand-400 transition">Belgian Desserts</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 tracking-wide">Get Delicious Deals</h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to get exclusive weekly promo codes & secret menu alerts.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Subscribe Now</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} FoodieHub Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition">Security & Trust</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
