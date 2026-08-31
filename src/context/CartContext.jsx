import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';
import { coupons } from '../data/coupons';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('foodiehub_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCouponCode, setAppliedCouponCode] = useState(() => {
    try {
      return localStorage.getItem('foodiehub_coupon') || 'FOODIE50';
    } catch {
      return 'FOODIE50';
    }
  });

  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Persist cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('foodiehub_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCouponCode) {
        localStorage.setItem('foodiehub_coupon', appliedCouponCode);
      } else {
        localStorage.removeItem('foodiehub_coupon');
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCouponCode]);

  /**
   * Helper to generate a unique key for an item with specific customizations
   */
  const generateCartItemId = (foodId, sizeName = 'Standard', addOns = []) => {
    const sortedAddons = [...addOns].map(a => a.name).sort().join('_');
    return `${foodId}__${sizeName}__${sortedAddons}`;
  };

  /**
   * Add to Cart
   */
  const addToCart = (foodItem, quantity = 1, selectedSize = null, selectedAddOns = [], specialNotes = '') => {
    const size = selectedSize || (foodItem.sizes ? foodItem.sizes[0] : { name: 'Standard', priceOffset: 0 });
    const addOns = selectedAddOns || [];
    const cartItemId = generateCartItemId(foodItem.id, size.name, addOns);

    const addOnsPrice = addOns.reduce((acc, curr) => acc + curr.price, 0);
    const unitPrice = parseFloat((foodItem.price + (size.priceOffset || 0) + addOnsPrice).toFixed(2));

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            id: foodItem.id,
            name: foodItem.name,
            image: foodItem.image,
            category: foodItem.category,
            restaurantName: foodItem.restaurantName,
            isVeg: foodItem.isVeg,
            basePrice: foodItem.price,
            unitPrice,
            selectedSize: size,
            selectedAddOns: addOns,
            specialNotes,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${quantity}x "${foodItem.name}" to cart! 🛒`, 'success');
  };

  /**
   * Remove item entirely from cart
   */
  const removeFromCart = (cartItemId) => {
    setCartItems(prev => {
      const item = prev.find(i => i.cartItemId === cartItemId);
      if (item) {
        showToast(`Removed "${item.name}" from cart`, 'info');
      }
      return prev.filter(i => i.cartItemId !== cartItemId);
    });
  };

  /**
   * Update quantity of a cart item
   */
  const updateQuantity = (cartItemId, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  /**
   * Get quantity of a base food item in cart
   */
  const getItemQuantity = (foodId) => {
    return cartItems
      .filter(item => item.id === foodId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  /**
   * Quick Add / Increment for standard item cards
   */
  const quickAddToCart = (foodItem) => {
    const existing = cartItems.find(i => i.id === foodItem.id);
    if (existing) {
      updateQuantity(existing.cartItemId, 1);
    } else {
      addToCart(foodItem, 1);
    }
  };

  /**
   * Quick Decrement for standard item cards
   */
  const quickDecrement = (foodItem) => {
    const existing = cartItems.find(i => i.id === foodItem.id);
    if (existing) {
      updateQuantity(existing.cartItemId, -1);
    }
  };

  /**
   * Clear all items
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Apply a coupon code
   */
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === cleanCode);
    if (!found) {
      showToast(`Coupon "${cleanCode}" is invalid!`, 'error');
      return false;
    }
    setAppliedCouponCode(cleanCode);
    showToast(`Coupon "${cleanCode}" applied successfully! 🎉`, 'success');
    return true;
  };

  /**
   * Remove active coupon
   */
  const removeCoupon = () => {
    setAppliedCouponCode('');
    showToast('Coupon removed', 'info');
  };

  /**
   * Real-time Totals and Discount calculations
   */
  const totals = useMemo(() => {
    const subtotal = parseFloat(
      cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0).toFixed(2)
    );

    const activeCoupon = coupons.find(c => c.code === appliedCouponCode);

    let discount = 0;
    let isCouponEligible = false;
    let couponMessage = '';

    if (activeCoupon) {
      if (subtotal >= activeCoupon.minOrder) {
        isCouponEligible = true;
        if (activeCoupon.freeDelivery) {
          discount = 3.99; // Standard delivery fee covered
          couponMessage = 'Free Delivery applied!';
        } else {
          const rawDiscount = (subtotal * activeCoupon.discountPercent) / 100;
          discount = parseFloat(Math.min(rawDiscount, activeCoupon.maxDiscount).toFixed(2));
          couponMessage = `${activeCoupon.discountPercent}% discount applied!`;
        }
      } else {
        isCouponEligible = false;
        couponMessage = `Add $${(activeCoupon.minOrder - subtotal).toFixed(2)} more to use ${activeCoupon.code}`;
      }
    }

    // Free delivery over $30 or with FREEDEL
    const baseDeliveryFee = subtotal > 0 ? (subtotal >= 30 || (activeCoupon?.freeDelivery && isCouponEligible) ? 0 : 3.99) : 0;
    const packagingFee = subtotal > 0 ? 1.49 : 0;
    const tax = subtotal > 0 ? parseFloat((subtotal * 0.05).toFixed(2)) : 0; // 5% GST

    const calculatedDiscount = isCouponEligible ? discount : 0;
    const grandTotal = Math.max(0, parseFloat((subtotal + baseDeliveryFee + packagingFee + tax - calculatedDiscount).toFixed(2)));

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      deliveryFee: baseDeliveryFee,
      packagingFee,
      tax,
      discount: calculatedDiscount,
      grandTotal,
      itemCount,
      activeCoupon,
      isCouponEligible,
      couponMessage
    };
  }, [cartItems, appliedCouponCode]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      quickAddToCart,
      quickDecrement,
      getItemQuantity,
      clearCart,
      appliedCouponCode,
      applyCoupon,
      removeCoupon,
      totals,
      deliveryNotes,
      setDeliveryNotes
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
