import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    login, 
    register 
  } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleDemoLogin = () => {
    login('alex.foodie@example.com', 'demopass123');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      if (!email || !password) {
        showToast('Please enter both email and password', 'error');
        return;
      }
      login(email, password);
    } else {
      if (!name || !email || !password) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      register(name, email, phone);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-slide-up p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FoodieHub Account</span>
          </span>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">
            {authModalMode === 'login' ? 'Welcome Back!' : 'Create an Account'}
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            {authModalMode === 'login'
              ? 'Sign in to access your saved addresses & order history'
              : 'Join FoodieHub for fast ordering, discounts and rewards'}
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-brand-950/40 dark:to-slate-800 border border-orange-200 dark:border-brand-900/50 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-gray-900 dark:text-white">Testing the app?</p>
            <p className="text-[11px] text-gray-500 dark:text-slate-400">Use preloaded demo customer profile</p>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shrink-0 shadow-sm"
          >
            1-Click Demo Login
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-gray-100 dark:bg-slate-800 p-1 mb-6">
          <button
            type="button"
            onClick={() => setAuthModalMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
              authModalMode === 'login'
                ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthModalMode('register')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
              authModalMode === 'register'
                ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authModalMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3 text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {authModalMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-3 text-gray-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm transition shadow-md hover:shadow-glow flex items-center justify-center gap-2 mt-4"
          >
            <span>{authModalMode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
