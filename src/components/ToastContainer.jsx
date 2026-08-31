import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
        let borderClass = "border-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-100";

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
          borderClass = "border-rose-500/20 bg-rose-50 dark:bg-rose-950/80 text-rose-900 dark:text-rose-100";
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
          borderClass = "border-blue-500/20 bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-100";
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
          borderClass = "border-amber-500/20 bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-100";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-slide-up ${borderClass}`}
          >
            <div className="flex items-center gap-3 pr-2">
              {icon}
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
