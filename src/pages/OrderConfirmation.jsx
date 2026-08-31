import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Truck, 
  ChefHat, 
  ShoppingBag, 
  Printer, 
  RotateCcw, 
  ArrowRight, 
  Sparkles,
  Receipt
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { EmptyState } from '../components/EmptyState';

export const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const navigate = useNavigate();

  const order = getOrderById(orderId);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          type="orders"
          title="Order Not Found"
          message="We couldn't locate this order ID in your order history."
          actionText="View My Orders"
          actionLink="/orders"
        />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { title: "Order Placed", desc: "Your order has been received by the kitchen", done: true, current: false },
    { title: "Preparing Food", desc: "Chef is handcrafting your delicious dish", done: true, current: true },
    { title: "Out for Delivery", desc: "Delivery valet on the way to your location", done: false, current: false },
    { title: "Delivered", desc: "Food arrives hot & fresh at your doorstep", done: false, current: false }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Celebration Banner */}
      <div className="text-center bg-gradient-to-br from-emerald-500/10 via-brand-500/5 to-transparent dark:from-emerald-950/40 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-8 sm:p-12 border border-emerald-500/20 shadow-soft relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
          Order Confirmed 🎉
        </span>

        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mt-3">
          Your delicious food is on its way!
        </h1>

        <p className="text-sm text-gray-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
          Thank you for ordering with FoodieHub. Order <span className="font-mono font-bold text-gray-900 dark:text-white">#{order.orderId}</span> is being prepared with top culinary care.
        </p>

        {/* Estimated Time Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-gray-100 dark:border-slate-700 mt-6 text-sm font-bold text-gray-900 dark:text-white">
          <Clock className="w-4 h-4 text-amber-500" />
          <span>Estimated Delivery: 25 - {order.estimatedMinutes || 35} Mins</span>
        </div>
      </div>

      {/* Live Delivery Status Timeline Tracker */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand-500" />
            <span>Live Delivery Status</span>
          </h3>
          <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20 animate-pulse">
            In Progress
          </span>
        </div>

        {/* Step-by-step progress bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                  step.current
                    ? 'bg-brand-600 text-white ring-4 ring-brand-500/20 animate-pulse'
                    : step.done
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500'
                }`}>
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className="text-xs font-extrabold text-gray-900 dark:text-white sm:hidden">
                  {step.title}
                </span>
              </div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white hidden sm:block">
                {step.title}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-0.5 leading-snug">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Delivery Driver Info */}
        {order.deliveryBoy && (
          <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-black text-lg shadow-md">
                {order.deliveryBoy.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-semibold">Your Delivery Valet</p>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{order.deliveryBoy.name}</h4>
                <p className="text-xs text-gray-600 dark:text-slate-300">{order.deliveryBoy.vehicle} • ★ {order.deliveryBoy.rating}</p>
              </div>
            </div>

            <a
              href={`tel:${order.deliveryBoy.phone}`}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Valet ({order.deliveryBoy.phone})</span>
            </a>
          </div>
        )}
      </div>

      {/* Order Details & Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Ordered Items */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-4">
          <h3 className="font-extrabold text-base text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-brand-500" />
            <span>Ordered Items</span>
          </h3>

          <div className="space-y-3 divide-y divide-gray-100 dark:divide-slate-700/60">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 pt-2.5 first:pt-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {item.quantity}x {item.name}
                    </p>
                    {item.selectedSize && (
                      <p className="text-[10px] text-gray-400">{item.selectedSize.name}</p>
                    )}
                  </div>
                </div>
                <span className="text-xs font-black text-gray-900 dark:text-white shrink-0">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-slate-700/60 space-y-1.5 text-xs text-gray-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Item Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Savings:</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery & Taxes:</span>
              <span>${(order.deliveryFee + order.packagingFee + order.tax).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-black text-sm text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-slate-700/60">
              <span>Total Paid:</span>
              <span className="text-brand-600 dark:text-brand-400">${order.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address & Receipt */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base text-gray-900 dark:text-white flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-brand-500" />
              <span>Delivery Address</span>
            </h3>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/40 text-xs leading-relaxed text-gray-700 dark:text-slate-300">
              <p className="font-bold text-gray-900 dark:text-white">{order.deliveryAddress.fullName}</p>
              <p>{order.deliveryAddress.street}</p>
              <p>{order.deliveryAddress.city}, {order.deliveryAddress.pincode}</p>
              <p className="mt-1 text-gray-500">Phone: {order.deliveryAddress.phone}</p>
            </div>

            <div className="mt-4 text-xs text-gray-500 dark:text-slate-400">
              <span className="font-bold text-gray-700 dark:text-slate-300">Payment: </span>
              <span>{order.paymentMethod}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
            <Link
              to="/orders"
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
