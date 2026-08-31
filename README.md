# 🍔 FoodieHub – Modern Online Food Ordering Platform

FoodieHub is a modern, responsive, and feature-packed frontend food ordering web application built with **React**, **React Router**, **Tailwind CSS**, **Lucide Icons**, and **LocalStorage** for full state persistence.

---

## 🌟 Key Features

- **🏠 Interactive Home Page**:
  - Hero banner with quick live food & restaurant search with instant dropdown previews
  - 8 Popular Category showcases
  - Featured partner restaurants
  - Chef's bestsellers with direct Add-to-Cart & Wishlist toggles
  - Active promo coupon banners with 1-click copy
  - Verified customer testimonials & rating stars
  - Responsive footer with newsletter subscription & quick links

- **🍽️ Full Menu Catalog**:
  - Multi-faceted filter sidebar: Filter by category (Pizza, Burger, Biryani, Chinese, South Indian, North Indian, Desserts, Beverages), dietary preference (Veg / Non-Veg), price range (<$10, $10-$15, $15+), and minimum rating (4.0+ / 4.5+)
  - Instant live keyword search
  - Sorting: Popularity, Highest Rated, Price (Low to High), Price (High to Low)
  - Quick view & customization modal

- **🏪 Restaurant Explorer**:
  - Browse top-rated restaurants with cuisine tags, delivery times, distances, and price for two
  - Filter by cuisine, delivery time (< 25 min), rating, price, and Pure Veg only

- **🔍 Rich Food Details Page**:
  - Large food photo preview with prep time, calories, and veg/non-veg indicator
  - Fresh ingredients tags
  - Interactive portion size selector (Regular, Medium, Large) with real-time price offsets
  - Optional add-ons & extra toppings with live calculation
  - Special cooking instructions note input
  - Related & frequently ordered dishes

- **🛒 Smart Cart Experience**:
  - Full CRUD cart management with custom item options
  - Quantity steppers (`+` / `-`)
  - Frequently ordered together upsell suggestions (beverages & desserts)
  - Real-time bill breakdown: Subtotal, Delivery fee (Free over $30), Packaging, 5% GST/Taxes, Coupon discount, Grand Total
  - Active coupon codes system (`FOODIE50`, `WELCOME20`, `TASTY30`, `FREEDEL`, `SUPERCOMBO`) with validation and instant feedback
  - LocalStorage persistence

- **💳 Seamless Mock Checkout**:
  - Multi-address picker from saved addresses (Home, Work) or add new delivery address with modal
  - Delivery speed selector (Standard vs. Express Priority)
  - Form validation with intuitive error states
  - Mock payment methods: Cash on Delivery, UPI (GPay, PhonePe, Paytm), and Credit/Debit Cards

- **🎉 Order Confirmation & Live Tracking**:
  - Celebratory confetti animation upon order placement
  - Unique Order ID generator (`FH-XXXXX`)
  - Live 4-step delivery status timeline tracker (Order Placed ➔ Preparing ➔ Out for Delivery ➔ Delivered)
  - Estimated arrival countdown
  - Delivery valet contact card
  - Printable receipt / invoice

- **📜 Order History & Reordering**:
  - Complete list of previous orders stored in LocalStorage (pre-seeded with initial orders for immediate demonstration)
  - Status filters (All, In Progress, Delivered)
  - 1-Click "Reorder" action that adds previous order items back into cart

- **❤️ Wishlist / Saved Favorites**:
  - Bookmark dishes with heart button
  - "Add All to Cart" action

- **🏷️ Offers & Deals Page**:
  - Dedicated promo coupon cards with copy-to-clipboard and 1-click apply

- **🌙 Dark Mode & Light Mode**:
  - Smooth theme toggle with LocalStorage persistence

- **👤 Authentication & Profiles**:
  - Mock Auth Modal with 1-click "Demo User Login" and profile switcher

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AddressModal.jsx
│   ├── AuthModal.jsx
│   ├── CartItem.jsx
│   ├── CategoryCard.jsx
│   ├── EmptyState.jsx
│   ├── FilterSidebar.jsx
│   ├── FoodCard.jsx
│   ├── FoodQuickViewModal.jsx
│   ├── Footer.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   ├── OrderCard.jsx
│   ├── RestaurantCard.jsx
│   ├── ReviewCard.jsx
│   ├── ScrollToTop.jsx
│   ├── SearchBar.jsx
│   └── ToastContainer.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── OrderContext.jsx
│   ├── ThemeContext.jsx
│   ├── ToastContext.jsx
│   └── WishlistContext.jsx
├── data/
│   ├── categories.js
│   ├── coupons.js
│   ├── foodItems.js
│   ├── restaurants.js
│   └── reviews.js
├── pages/
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Favorites.jsx
│   ├── FoodDetails.jsx
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── MyOrders.jsx
│   ├── NotFound.jsx
│   ├── Offers.jsx
│   ├── OrderConfirmation.jsx
│   └── Restaurants.jsx
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🚀 How to Run the Project Locally

### 1. Open Terminal in the project directory:
```bash
cd "d:\Projects\Online food Website"
```

### 2. Install dependencies (if not already installed):
```bash
npm install
```

### 3. Start the local development server:
```bash
npm run dev
```

### 4. Open in your browser:
Navigate to the local URL displayed in the terminal (usually `http://localhost:5173`).

---

## 📦 Production Build

To generate an optimized production bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```
