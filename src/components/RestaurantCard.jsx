import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, Tag, ArrowRight, DollarSign } from 'lucide-react';

export const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      
      {/* Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-slate-700">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Promo tag */}
        {restaurant.discount && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-brand-600 text-white shadow-md flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>{restaurant.discount}</span>
            </span>
          </div>
        )}

        {/* Veg Only Badge if applicable */}
        {restaurant.isVegOnly && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-emerald-600 text-white shadow-md flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Pure Veg</span>
            </span>
          </div>
        )}

        {/* Bottom banner on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <span>{restaurant.distance}</span>
          </div>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs shrink-0">
              <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              <span>{restaurant.rating}</span>
            </div>
          </div>

          {/* Cuisines */}
          <p className="text-xs text-gray-500 dark:text-slate-400 font-medium line-clamp-1 mb-2">
            {restaurant.cuisines.join(' • ')}
          </p>

          {/* Location & Cost for Two */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 pt-2 border-t border-gray-100 dark:border-slate-700/60">
            <span className="truncate max-w-[170px]">{restaurant.location}</span>
            <span className="font-semibold text-gray-700 dark:text-slate-300">
              ${restaurant.priceForTwo} for two
            </span>
          </div>
        </div>

        {/* View Menu Button */}
        <div className="pt-4 mt-2">
          <Link
            to={`/menu?restaurant=${encodeURIComponent(restaurant.name)}`}
            className="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700/60 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-gray-800 dark:text-slate-200 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 group-hover:bg-brand-600 group-hover:text-white shadow-sm"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
};
