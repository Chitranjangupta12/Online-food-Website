import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();
  
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('foodiehub_user');
      return saved ? JSON.parse(saved) : {
        name: "Alex Morgan",
        email: "alex.foodie@example.com",
        phone: "+1 (555) 234-5678",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        isLoggedIn: true
      };
    } catch {
      return null;
    }
  });

  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('foodiehub_addresses');
      return saved ? JSON.parse(saved) : [
        {
          id: "addr-1",
          type: "Home",
          fullName: "Alex Morgan",
          phone: "+1 (555) 234-5678",
          street: "742 Evergreen Terrace, Apt 4B",
          city: "Springfield",
          pincode: "97477",
          isDefault: true,
          instructions: "Please ring door bell, leave on porch table"
        },
        {
          id: "addr-2",
          type: "Work",
          fullName: "Alex Morgan",
          phone: "+1 (555) 234-5678",
          street: "Tech Tower 3, 5th Floor, Suite 502",
          city: "Springfield",
          pincode: "97478",
          isDefault: false,
          instructions: "Call security gate on arrival"
        }
      ];
    } catch {
      return [];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('foodiehub_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('foodiehub_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('foodiehub_addresses', JSON.stringify(savedAddresses));
    } catch (e) {
      console.error(e);
    }
  }, [savedAddresses]);

  const login = (email, password) => {
    const mockUser = {
      name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
      email,
      phone: "+1 (555) 019-2834",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      isLoggedIn: true
    };
    setUser(mockUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${mockUser.name}! 🎉`, 'success');
  };

  const register = (name, email, phone) => {
    const newUser = {
      name,
      email,
      phone: phone || "+1 (555) 987-6543",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      isLoggedIn: true
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Account created! Welcome to FoodieHub, ${name}! 🎉`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const addAddress = (address) => {
    const newAddress = {
      ...address,
      id: "addr-" + Date.now()
    };
    setSavedAddresses(prev => [...prev, newAddress]);
    showToast('Delivery address added!', 'success');
    return newAddress;
  };

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      savedAddresses,
      addAddress,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      openLoginModal,
      openRegisterModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
