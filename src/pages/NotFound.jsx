import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowLeft, Home, UtensilsCrossed } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto shadow-soft animate-float">
          <ChefHat className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-black text-brand-600 tracking-tight">404</span>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Oops! The food page or delicacy you are seeking seems to have been eaten or moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
