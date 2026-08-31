import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  Banknote, 
  QrCode, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  AlertCircle,
  Building,
  Smartphone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { AddressModal } from '../components/AddressModal';

export const Checkout = () => {
  const { cartItems, totals, clearCart, deliveryNotes } = useCart();
  const { user, savedAddresses } = useAuth();
  const { placeOrder } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Address State
  const [selectedAddressId, setSelectedAddressId] = useState(
    savedAddresses.length > 0 ? savedAddresses[0].id : 'custom'
  );
  const [fullName, setFullName] = useState(user?.name || 'Alex Morgan');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [street, setStreet] = useState(
    savedAddresses.length > 0 ? savedAddresses[0].street : '742 Evergreen Terrace, Apt 4B'
  );
  const [city, setCity] = useState(
    savedAddresses.length > 0 ? savedAddresses[0].city : 'Springfield'
  );
  const [pincode, setPincode] = useState(
    savedAddresses.length > 0 ? savedAddresses[0].pincode : '97477'
  );
  const [instructions, setInstructions] = useState(deliveryNotes || 'Please ring doorbell upon arrival');

  // Delivery slot
  const [deliverySpeed, setDeliverySpeed] = useState('standard'); // 'standard' | 'express'

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'cod' | 'upi' | 'card'
  const [upiId, setUpiId] = useState('alex@oksbi');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('789');

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle saved address switch
  const handleSelectSavedAddress = (addr) => {
    setSelectedAddressId(addr.id);
    setFullName(addr.fullName);
    setPhone(addr.phone);
    setStreet(addr.street);
    setCity(addr.city);
    setPincode(addr.pincode);
    if (addr.instructions) setInstructions(addr.instructions);
  };

  const validateForm = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!phone.trim() || phone.length < 8) errs.phone = 'Valid phone number is required';
    if (!street.trim()) errs.street = 'Street address is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!pincode.trim()) errs.pincode = 'Pincode is required';

    if (paymentMethod === 'upi' && !upiId.trim()) {
      errs.upiId = 'UPI ID or VPA is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      showToast('Your cart is empty!', 'error');
      navigate('/menu');
      return;
    }

    if (!validateForm()) {
      showToast('Please fix the errors before placing order', 'error');
      return;
    }

    setIsPlacingOrder(true);

    // Format payment string
    let formattedPayment = "Cash on Delivery";
    if (paymentMethod === 'upi') formattedPayment = `UPI (${upiId})`;
    if (paymentMethod === 'card') formattedPayment = `Credit Card (•••• 4242)`;

    setTimeout(() => {
      const newOrder = placeOrder({
        restaurantName: cartItems[0]?.restaurantName || 'FoodieHub Gourmet Kitchen',
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedAddOns: item.selectedAddOns,
          image: item.image
        })),
        deliveryAddress: {
          fullName,
          phone,
          street,
          city,
          pincode,
          instructions
        },
        paymentMethod: formattedPayment,
        subtotal: totals.subtotal,
        deliveryFee: deliverySpeed === 'express' ? 1.99 : totals.deliveryFee,
        packagingFee: totals.packagingFee,
        tax: totals.tax,
        discount: totals.discount,
        grandTotal: parseFloat((totals.grandTotal + (deliverySpeed === 'express' ? 1.99 : 0)).toFixed(2)),
        estimatedMinutes: deliverySpeed === 'express' ? 20 : 35
      });

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti triggered');
      }

      clearCart();
      setIsPlacingOrder(false);
      navigate(`/order-confirmation/${newOrder.orderId}`);
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
          No items to checkout!
        </h2>
        <Link
          to="/menu"
          className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm inline-flex items-center gap-2"
        >
          <span>Explore Menu First</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Checkout Title */}
      <div className="pb-4 border-b border-gray-100 dark:border-slate-800">
        <span className="text-xs font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-1">
          Final Step
        </span>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Checkout & Place Order
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Delivery Details & Payment */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Delivery Address Card */}
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-700/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-black text-sm">
                    1
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white">
                    Delivery Address
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(true)}
                  className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              </div>

              {/* Saved Addresses Pills */}
              {savedAddresses.length > 0 && (
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-slate-400 block mb-2">
                    Saved Addresses
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => handleSelectSavedAddress(addr)}
                        className={`p-3.5 rounded-2xl border text-left transition flex items-start justify-between ${
                          selectedAddressId === addr.id
                            ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-gray-900 dark:text-white ring-2 ring-brand-500/20'
                            : 'border-gray-200 dark:border-slate-700 hover:border-brand-300 text-gray-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <span className="px-2 py-0.5 rounded-md bg-brand-100 dark:bg-brand-900/60 text-[10px] font-black uppercase text-brand-700 dark:text-brand-300">
                            {addr.type}
                          </span>
                          <p className="text-xs font-bold mt-1 text-gray-900 dark:text-white truncate">{addr.fullName}</p>
                          <p className="text-[11px] text-gray-500 dark:text-slate-400 line-clamp-2 mt-0.5">{addr.street}, {addr.city}</p>
                        </div>
                        {selectedAddressId === addr.id && (
                          <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Address Form Inputs */}
              <div className="space-y-3.5 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Receiver's name"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                        errors.fullName ? 'border-rose-500' : 'border-gray-200 dark:border-slate-600'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                        errors.phone ? 'border-rose-500' : 'border-gray-200 dark:border-slate-600'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                    Street Address / Flat / Building *
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.street ? 'border-rose-500' : 'border-gray-200 dark:border-slate-600'
                    }`}
                  />
                  {errors.street && <p className="text-[11px] text-rose-500 mt-1">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                        errors.city ? 'border-rose-500' : 'border-gray-200 dark:border-slate-600'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-rose-500 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                      Pincode / Postal Code *
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Pincode"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                        errors.pincode ? 'border-rose-500' : 'border-gray-200 dark:border-slate-600'
                      }`}
                    />
                    {errors.pincode && <p className="text-[11px] text-rose-500 mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                    Delivery Instructions
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Leave at front door, ring bell twice"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

            </div>

            {/* 2. Delivery Speed Card */}
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-slate-700/60">
                <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-black text-sm">
                  2
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white">
                  Delivery Speed
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliverySpeed('standard')}
                  className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                    deliverySpeed === 'standard'
                      ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-gray-900 dark:text-white ring-2 ring-brand-500/20'
                      : 'border-gray-200 dark:border-slate-700 hover:border-brand-300 text-gray-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold">Standard Delivery</span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-1">30-40 Minutes • Regular</p>
                  </div>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {totals.deliveryFee === 0 ? 'FREE' : `$${totals.deliveryFee.toFixed(2)}`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliverySpeed('express')}
                  className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                    deliverySpeed === 'express'
                      ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-gray-900 dark:text-white ring-2 ring-brand-500/20'
                      : 'border-gray-200 dark:border-slate-700 hover:border-brand-300 text-gray-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brand-500" />
                      <span className="text-xs font-bold">Express Priority</span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-1">15-20 Minutes • Direct Valet</p>
                  </div>
                  <span className="text-xs font-black text-brand-600 dark:text-brand-400">
                    +$1.99
                  </span>
                </button>
              </div>
            </div>

            {/* 3. Payment Method Card */}
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-slate-700/60">
                <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-black text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white">
                    Select Payment Method
                  </h3>
                  <p className="text-[11px] text-gray-400">Mock payment for demonstration purposes</p>
                </div>
              </div>

              {/* Payment Type Tabs */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: <QrCode className="w-4 h-4" /> },
                  { id: 'card', label: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'cod', label: 'Cash On Delivery', icon: <Banknote className="w-4 h-4" /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPaymentMethod(tab.id)}
                    className={`py-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === tab.id
                        ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:border-brand-300'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* UPI Tab Content */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/50 space-y-3 animate-fade-in">
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block">
                    Enter UPI ID / VPA
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@oksbi / mobile@upi"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-bold text-gray-400">Supported:</span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-bold text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700">Google Pay</span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-bold text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700">PhonePe</span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-bold text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700">Paytm</span>
                  </div>
                </div>
              )}

              {/* Card Tab Content */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/50 space-y-3 animate-fade-in">
                  <div>
                    <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-xs font-mono text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-xs font-mono text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={4}
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-xs font-mono text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* COD Tab Content */}
              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs space-y-1 animate-fade-in">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pay with Cash upon delivery</span>
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                    Please keep exact cash handy to minimize contact. Digital payment upon delivery is also supported.
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Order Summary & CTA */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-7 rounded-3xl border border-gray-100 dark:border-slate-700/80 shadow-soft space-y-5">
              
              <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-slate-700/60">
                Order Review ({totals.itemCount} items)
              </h3>

              {/* Items preview list */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={item.isVeg ? "veg-indicator shrink-0" : "non-veg-indicator shrink-0"} />
                      <span className="font-bold text-brand-600 dark:text-brand-400 shrink-0">{item.quantity}x</span>
                      <span className="text-gray-800 dark:text-slate-200 font-medium truncate">
                        {item.name} {item.selectedSize ? `(${item.selectedSize.name})` : ''}
                      </span>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white shrink-0">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-slate-700/60 text-xs text-gray-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Speed</span>
                  <span>{deliverySpeed === 'express' ? '$1.99 (Priority)' : (totals.deliveryFee === 0 ? 'FREE' : `$${totals.deliveryFee.toFixed(2)}`)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging & Taxes (5%)</span>
                  <span>${(totals.packagingFee + totals.tax).toFixed(2)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Discount</span>
                    <span>-${totals.discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Final Amount */}
              <div className="pt-3 border-t border-gray-100 dark:border-slate-700/60 flex items-baseline justify-between">
                <span className="text-base font-black text-gray-900 dark:text-white">Amount to Pay</span>
                <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                  ${(totals.grandTotal + (deliverySpeed === 'express' ? 1.99 : 0)).toFixed(2)}
                </span>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base transition-all shadow-md hover:shadow-glow flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isPlacingOrder ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <>
                    <span>Place Order Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Guaranteed Safe & Fresh Mock Delivery</span>
              </div>

            </div>

          </div>

        </div>
      </form>

      {/* Add Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddressAdded={handleSelectSavedAddress}
      />

    </div>
  );
};
