import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';

import { Home } from './pages/Home';
import { Restaurants } from './pages/Restaurants';
import { Menu } from './pages/Menu';
import { FoodDetails } from './pages/FoodDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { MyOrders } from './pages/MyOrders';
import { Favorites } from './pages/Favorites';
import { Offers } from './pages/Offers';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <OrderProvider>
                <Router>
                  <ScrollToTop />
                  <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-200">
                    <Navbar />
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/restaurants" element={<Restaurants />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/food/:id" element={<FoodDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                        <Route path="/orders" element={<MyOrders />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/offers" element={<Offers />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                  <ToastContainer />
                  <AuthModal />
                </Router>
              </OrderProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
