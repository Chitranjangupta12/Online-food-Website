import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShoppingBag, ArrowRight, Filter, Sparkles } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { OrderCard } from '../components/OrderCard';
import { EmptyState } from '../components/EmptyState';

export const MyOrders = () => {
  const { orders } = useOrders();
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'active' | 'completed'

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (filterTab === 'active') return order.status === 'Preparing' || order.status === 'On The Way';
      if (filterTab === 'completed') return order.status === 'Delivered';
      return true;
    });
  }, [orders, filterTab]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Order History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            My Orders ({orders.length})
          </h1>
        </div>

        <Link
          to="/menu"
          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Order More Food</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      {orders.length > 0 && (
        <div className="flex rounded-2xl bg-gray-100 dark:bg-slate-800 p-1 max-w-sm">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'active', label: 'In Progress' },
            { id: 'completed', label: 'Past Delivered' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                filterTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState
          type="orders"
          title={filterTab === 'active' ? "No active orders in progress" : "No orders found"}
          message={filterTab === 'active' ? "You have no food currently being prepared or on the way." : "You have not placed any food orders yet. Satisfy your cravings today!"}
          actionText="Browse Popular Food"
          actionLink="/menu"
        />
      )}

    </div>
  );
};
