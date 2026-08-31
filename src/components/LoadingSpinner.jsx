import React from 'react';
import { ChefHat } from 'lucide-react';

export const LoadingSpinner = ({ text = "Loading delicious delicacies..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-orange-100 dark:border-slate-700 border-t-brand-600 animate-spin"></div>
        <div className="absolute text-brand-600 animate-pulse">
          <ChefHat className="w-6 h-6" />
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-600 dark:text-slate-400 animate-pulse">
        {text}
      </p>
    </div>
  );
};
