import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700/80 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between relative">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-100 dark:text-slate-700 pointer-events-none" />

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(review.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-gray-200 text-gray-200 dark:fill-slate-600 dark:text-slate-600'
              }`}
            />
          ))}
          <span className="text-xs font-bold text-gray-700 dark:text-slate-300 ml-1.5">
            {review.rating.toFixed(1)}
          </span>
        </div>

        {/* Comment */}
        <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed mb-4 italic">
          "{review.comment}"
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                {review.userName}
              </h4>
              <CheckCircle className="w-3.5 h-3.5 text-brand-500 fill-brand-500/20" />
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400">
              Ordered <span className="font-semibold text-brand-600 dark:text-brand-400">{review.dishName}</span>
            </p>
          </div>
        </div>

        <span className="text-[11px] text-gray-400 dark:text-slate-500 font-medium">
          {review.date}
        </span>
      </div>
    </div>
  );
};
