import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const OrderContext = createContext();

const initialMockOrders = [
  {
    orderId: "FH-89421",
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: "Delivered",
    restaurantName: "Nawabi Dastarkhwan Biryani",
    items: [
      {
        id: "biryani-1",
        name: "Royal Hyderabadi Dum Chicken Biryani",
        quantity: 2,
        unitPrice: 14.99,
        selectedSize: { name: "Regular (Serves 1)" },
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "bev-4",
        name: "Royal Saffron Almond Thandai",
        quantity: 2,
        unitPrice: 6.49,
        selectedSize: { name: "Bottle (300ml)" },
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=300&q=80"
      }
    ],
    deliveryAddress: {
      fullName: "Alex Morgan",
      phone: "+1 (555) 234-5678",
      street: "742 Evergreen Terrace, Apt 4B",
      city: "Springfield",
      pincode: "97477"
    },
    paymentMethod: "UPI (Google Pay)",
    subtotal: 42.96,
    deliveryFee: 0.00,
    packagingFee: 1.49,
    tax: 2.15,
    discount: 10.00,
    grandTotal: 36.60,
    estimatedMinutes: 30,
    deliveryBoy: {
      name: "Michael Scott",
      phone: "+1 (555) 839-2041",
      vehicle: "Honda Activa (NY-42-A-9810)",
      rating: 4.9
    }
  },
  {
    orderId: "FH-74193",
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
    status: "Delivered",
    restaurantName: "La Piazza Gourmet Pizza",
    items: [
      {
        id: "pizza-1",
        name: "Margherita Supreme Pizza",
        quantity: 1,
        unitPrice: 17.49,
        selectedSize: { name: "Medium 10\"" },
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "dessert-1",
        name: "Warm Molten Belgian Chocolate Lava Cake",
        quantity: 1,
        unitPrice: 7.99,
        selectedSize: { name: "Single Cake with Scoop" },
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80"
      }
    ],
    deliveryAddress: {
      fullName: "Alex Morgan",
      phone: "+1 (555) 234-5678",
      street: "742 Evergreen Terrace, Apt 4B",
      city: "Springfield",
      pincode: "97477"
    },
    paymentMethod: "Credit Card (Ending 4242)",
    subtotal: 25.48,
    deliveryFee: 3.99,
    packagingFee: 1.49,
    tax: 1.27,
    discount: 5.00,
    grandTotal: 27.23,
    estimatedMinutes: 25,
    deliveryBoy: {
      name: "Robert Miller",
      phone: "+1 (555) 392-1102",
      vehicle: "Yamaha FZ (NY-12-K-3342)",
      rating: 4.8
    }
  }
];

export const OrderProvider = ({ children }) => {
  const { showToast } = useToast();

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('foodiehub_orders');
      return saved ? JSON.parse(saved) : initialMockOrders;
    } catch {
      return initialMockOrders;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('foodiehub_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const placeOrder = (orderData) => {
    const randomId = "FH-" + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      orderId: randomId,
      date: new Date().toISOString(),
      status: "Preparing", // Preparing -> On The Way -> Delivered
      deliveryBoy: {
        name: "David Miller",
        phone: "+1 (555) 449-0182",
        vehicle: "Hero Xpulse (NY-56-M-8821)",
        rating: 4.9
      },
      ...orderData
    };

    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order #${randomId} placed successfully! 🎉`, 'success');
    return newOrder;
  };

  const getOrderById = (id) => {
    return orders.find(o => o.orderId === id || o.orderId === `FH-${id}`);
  };

  const cancelOrder = (orderId) => {
    setOrders(prev =>
      prev.map(o => (o.orderId === orderId ? { ...o, status: "Cancelled" } : o))
    );
    showToast(`Order #${orderId} has been cancelled`, 'info');
  };

  return (
    <OrderContext.Provider value={{
      orders,
      placeOrder,
      getOrderById,
      cancelOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
