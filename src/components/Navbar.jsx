import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Sun, 
  Moon, 
  User, 
  Menu as MenuIcon, 
  X, 
  Search, 
  Sparkles, 
  Compass, 
  Tag, 
  Clock, 
  LogOut,
  ChevronDown,
  ChefHat
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { SearchBar } from './SearchBar';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [navSearchOpen, setNavSearchOpen] = useState(false);

  const { totals } = useCart();
  const { favorites } = useWishlist();
  const { user, logout, openLoginModal } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll shadow/background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setNavSearchOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Menu', path: '/menu' },
    { name: 'Offers', path: '/offers', badge: '50% OFF' },
    { name: 'My Orders', path: '/orders' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-md border-b border-gray-100 dark:border-slate-800' 
        : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-slate-800/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
                <ChefHat className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center">
                  Foodie<span className="text-brand-600">Hub</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-600 dark:text-gray-300 -mt-1">
                  Food Delivery
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/40 font-bold'
                        : 'text-gray-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Search bar inside header (Hidden on smallest screens) */}
          <div className="hidden md:block w-72 lg:w-80">
            <SearchBar placeholder="Search food, cuisines..." />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search icon button for mobile */}
            <button
              onClick={() => setNavSearchOpen(!navSearchOpen)}
              className="md:hidden p-2.5 rounded-xl text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Dark Mode"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 animate-fade-in" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 animate-fade-in" />
              )}
            </button>

            {/* Wishlist Link with Badge */}
            <Link
              to="/favorites"
              className="relative p-2.5 rounded-xl text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition group"
              aria-label="Favorites"
              title="View Favorites"
            >
              <Heart className="w-5 h-5 group-hover:text-rose-500 transition-colors" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart Link with Badge & Total */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white transition-all duration-200 shadow-md shadow-brand-500/20 group"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totals.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-brand-600 text-[11px] font-black flex items-center justify-center shadow-sm">
                    {totals.itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-sm">
                ${totals.grandTotal > 0 ? totals.grandTotal.toFixed(2) : '0.00'}
              </span>
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-500/30"
                  />
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-slate-400 hidden sm:block" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 z-50 animate-slide-up">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/orders"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700/60 transition"
                    >
                      <Clock className="w-4 h-4 text-brand-500" />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700/60 transition"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Wishlist ({favorites.length})</span>
                    </Link>
                    <Link
                      to="/offers"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700/60 transition"
                    >
                      <Tag className="w-4 h-4 text-amber-500" />
                      <span>Special Offers</span>
                    </Link>
                    <div className="border-t border-gray-100 dark:border-slate-700 my-1"></div>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-100 text-sm font-semibold transition"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar expandable */}
        {navSearchOpen && (
          <div className="md:hidden pb-4 pt-1 animate-slide-up">
            <SearchBar placeholder="Search food, restaurants..." />
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 shadow-2xl p-6 z-40 animate-slide-up">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold transition ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 font-bold'
                      : 'text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`
                }
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
            <div className="border-t border-gray-200 dark:border-slate-800 my-2 pt-2">
              <Link
                to="/favorites"
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span>Wishlist Items</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 text-xs font-bold">
                  {favorites.length}
                </span>
              </Link>
              {!user && (
                <button
                  onClick={openLoginModal}
                  className="w-full mt-2 py-3 rounded-2xl bg-brand-600 text-white font-bold flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  <span>Sign In / Register</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
