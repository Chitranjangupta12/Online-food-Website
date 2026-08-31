import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Truck, 
  ChefHat, 
  XCircle,
  Receipt,
  Phone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { foodItems } from '../data/foodItems';

export const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleReorder = () => {
    // Re-add items to cart
    order.items.forEach(orderItem => {
      const originalFood = foodItems.find(f => f.id === orderItem.id);
      if (originalFood) {
        addToCart(
          originalFood,
          orderItem.quantity,
          orderItem.selectedSize,
          orderItem.selectedAddOns || []
        );
      }
    });
    navigate('/cart');
  };

  let statusBadge = (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
      <CheckCircle2 className="w-3.5 h-3.5" />
      <span>{order.status}</span>
    </span>
  );

  if (order.status === 'Preparing') {
    statusBadge = (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-500/20 animate-pulse">
        <ChefHat className="w-3.5 h-3.5" />
        <span>Preparing</span>
      </span>
    );
  } else if (order.status === 'On The Way') {
    statusBadge = (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-500/20 animate-pulse">
        <Truck className="w-3.5 h-3.5" />
        <span>On The Way</span>
      </span>
    );
  } else if (order.status === 'Cancelled') {
    statusBadge = (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-500/20">
        <XCircle className="w-3.5 h-3.5" />
        <span>Cancelled</span>
      </span>
    );
  }

  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 border border-gray-100 dark:border-slate-700/80 shadow-soft hover:shadow-card transition-all duration-300">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-slate-700/60">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg">
              Order #{order.orderId}
            </h3>
            {statusBadge}
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-gray-400 uppercase font-semibold block">Total Amount</span>
          <span className="text-xl font-black text-brand-600 dark:text-brand-400">
            ${order.grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Items Summary Preview */}
      <div className="py-4">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-3">
          Ordered Items ({order.items.length})
        </p>

        <div className="space-y-2.5">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-9 h-9 rounded-lg object-cover shrink-0"
                  />
                )}
                <span className="font-bold text-brand-600 dark:text-brand-400 text-xs px-1.5 py-0.5 rounded bg-brand-50 dark:bg-brand-950/50">
                  {item.quantity}x
                </span>
                <span className="text-gray-800 dark:text-slate-200 font-medium truncate">
                  {item.name} {item.selectedSize ? `(${item.selectedSize.name})` : ''}
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-xs shrink-0">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Details Section */}
      {isExpanded && (
        <div className="pt-4 mt-2 border-t border-gray-100 dark:border-slate-700/60 space-y-4 animate-slide-up text-xs sm:text-sm">
          
          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/40">
            <div>
              <h5 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Delivery Address</span>
              </h5>
              <p className="text-gray-600 dark:text-slate-300 text-xs leading-relaxed">
                {order.deliveryAddress.fullName}<br />
                {order.deliveryAddress.street}<br />
                {order.deliveryAddress.city}, {order.deliveryAddress.pincode}<br />
                Phone: {order.deliveryAddress.phone}
              </p>
            </div>

            <div>
              <h5 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-brand-500" />
                <span>Payment Summary</span>
              </h5>
              <p className="text-gray-600 dark:text-slate-300 text-xs">
                Method: <span className="font-bold text-gray-800 dark:text-slate-100">{order.paymentMethod}</span>
              </p>
              <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Item Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount:</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery & Tax:</span>
                  <span>${(order.deliveryFee + order.packagingFee + order.tax).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Boy Details */}
          {order.deliveryBoy && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50/60 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm">
                  {order.deliveryBoy.name.charAt(0)}
                </div>
                <div>
                  <h6 className="font-bold text-gray-900 dark:text-white text-xs">{order.deliveryBoy.name}</h6>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">{order.deliveryBoy.vehicle}</p>
                </div>
              </div>
              <a
                href={`tel:${order.deliveryBoy.phone}`}
                className="px-3 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-brand-700 transition"
              >
                <Phone className="w-3 h-3" />
                <span>Call Valet</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 mt-3 border-t border-gray-100 dark:border-slate-700/60">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold text-gray-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 transition"
        >
          <span>{isExpanded ? "Hide Details" : "View Full Details"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/order-confirmation/${order.orderId}`)}
            className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1"
          >
            <span>Live Status</span>
          </button>
          
          <button
            onClick={handleReorder}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow-sm hover:shadow-glow flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reorder</span>
          </button>
        </div>
      </div>

    </div>
  );
};
