import React from 'react';
import { Link } from 'react-router-dom';

export const CategoryCard = ({ category, isSelected = false, onClick }) => {
  const content = (
    <div
      className={`group relative rounded-3xl p-3 sm:p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-between border ${
        isSelected
          ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 shadow-md ring-2 ring-brand-500/20'
          : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700/80 shadow-soft hover:shadow-card-hover hover:border-brand-300 hover:-translate-y-1'
      }`}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-2.5 bg-orange-50 dark:bg-slate-700 shadow-inner group-hover:scale-105 transition-transform duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h4 className={`text-sm sm:text-base font-bold transition-colors ${
        isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-gray-900 dark:text-white group-hover:text-brand-600'
      }`}>
        {category.name}
      </h4>

      <span className="text-[11px] font-medium text-gray-500 dark:text-slate-400 mt-0.5">
        {category.itemCount}
      </span>
    </div>
  );

  if (onClick) {
    return <div onClick={() => onClick(category.slug)}>{content}</div>;
  }

  return (
    <Link to={`/menu?category=${category.slug}`} className="block">
      {content}
    </Link>
  );
};
