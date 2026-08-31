import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { showToast } = useToast();
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('foodiehub_favorites');
      return saved ? JSON.parse(saved) : ["pizza-1", "biryani-1", "dessert-1"];
    } catch {
      return ["pizza-1", "biryani-1", "dessert-1"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('foodiehub_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = (foodItem) => {
    const isFav = favorites.includes(foodItem.id);
    if (isFav) {
      setFavorites(prev => prev.filter(id => id !== foodItem.id));
      showToast(`Removed "${foodItem.name}" from favorites`, 'info');
    } else {
      setFavorites(prev => [...prev, foodItem.id]);
      showToast(`Added "${foodItem.name}" to favorites ❤️`, 'success');
    }
  };

  const isFavorite = (foodId) => favorites.includes(foodId);

  return (
    <WishlistContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
