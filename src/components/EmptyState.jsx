import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Clock, ArrowRight, Utensils } from 'lucide-react';

export const EmptyState = ({
  type = 'cart', // 'cart' | 'favorites' | 'search' | 'orders'
  title,
  message,
  actionText = "Explore Food Menu",
  actionLink = "/menu",
  onActionClick
}) => {
  let icon = <ShoppingBag className="w-12 h-12 text-brand-500" />;
  let defaultTitle = "Your cart is empty";
  let defaultMessage = "Looks like you haven't added any mouth-watering dishes yet. Explore our top categories and treat yourself!";

  if (type === 'favorites') {
    icon = <Heart className="w-12 h-12 text-rose-500" />;
    defaultTitle = "No favorites saved yet";
    defaultMessage = "Click the heart icon on any food item to save your favorite dishes here for quick reordering!";
  } else if (type === 'search') {
    icon = <Search className="w-12 h-12 text-brand-500" />;
    defaultTitle = "No delicious foods found";
    defaultMessage = "We couldn't find anything matching your search or filters. Try adjusting your keywords or category.";
  } else if (type === 'orders') {
    icon = <Clock className="w-12 h-12 text-amber-500" />;
    defaultTitle = "No previous orders found";
    defaultMessage = "You haven't placed any orders yet. Once you order, you can track delivery and reorder from here!";
  }

  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto flex flex-col items-center">
      <div className="w-24 h-24 rounded-3xl bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-slate-700/80 flex items-center justify-center mb-6 shadow-soft animate-float">
        {icon}
      </div>

      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
        {title || defaultTitle}
      </h3>

      <p className="text-sm text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">
        {message || defaultMessage}
      </p>

      {onActionClick ? (
        <button
          onClick={onActionClick}
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-glow flex items-center gap-2"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <Link
          to={actionLink}
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-glow flex items-center gap-2"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
};
