import React, { useState } from 'react';
import { X, MapPin, Home, Briefcase, Plus, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AddressModal = ({ isOpen, onClose, onAddressAdded }) => {
  const { addAddress } = useAuth();
  const { showToast } = useToast();

  const [type, setType] = useState('Home'); // 'Home' | 'Work' | 'Other'
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Springfield');
  const [pincode, setPincode] = useState('97477');
  const [instructions, setInstructions] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !street || !city || !pincode) {
      showToast('Please fill all required address fields', 'error');
      return;
    }

    const newAddr = addAddress({
      type,
      fullName,
      phone,
      street,
      city,
      pincode,
      instructions,
      isDefault: false
    });

    if (onAddressAdded) {
      onAddressAdded(newAddr);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 p-6 sm:p-8 animate-slide-up">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Add Delivery Address</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">Save address for faster checkout</p>
          </div>
        </div>

        {/* Address Type Selector */}
        <div className="flex gap-2.5 mb-5">
          {['Home', 'Work', 'Other'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                type === t
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                  : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-brand-300'
              }`}
            >
              {t === 'Home' && <Home className="w-3.5 h-3.5" />}
              {t === 'Work' && <Briefcase className="w-3.5 h-3.5" />}
              <span>{t}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Receiver name"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
              Flat / House No. / Street Address *
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                City / Town *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
                Pincode / Zip Code *
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Pincode"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block mb-1">
              Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Ring bell, leave at reception, beware of dog"
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm transition shadow-md hover:shadow-glow flex items-center justify-center gap-2 mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Save Address</span>
          </button>
        </form>

      </div>
    </div>
  );
};
