import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import config from "@/config";
import AuthContext from "../Components/AuthContext";

const CustomerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMyOrders();
    }
  }, [isLoggedIn]);

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${config.apiUrl}/api/orders/my`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching my orders:", error);
      toast.error("Could not load your orders.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
            <p className="text-slate-500 mt-2">Track and manage your service requests.</p>
          </div>
          <div className="mt-4 md:mt-0 px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold border border-blue-100">
            Total Orders: {orders.length}
          </div>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.length === 0 ? (
            <div className="col-span-full text-center py-12 glass-card rounded-2xl">
              <h3 className="text-xl font-medium text-slate-600">You haven't requested any services yet.</h3>
              <a href="/#services" className="inline-block mt-4 premium-button">Browse Services</a>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="glass-card rounded-2xl p-6 service-hover-card flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{order.serviceType}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(order.status)}`}>
                    {order.status || 'Pending'}
                  </span>
                </div>
                
                <p className="text-sm text-slate-500 mb-6 flex-grow">
                  Requested on: <span className="font-medium text-slate-700">{order.date ? new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown Date'}</span>
                </p>

                <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Order Details</h4>
                  {order.details && order.details.slice(0, 3).map((detail, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-slate-500">{detail.name}:</span>
                      <span className="text-slate-800 font-medium text-right ml-2">{detail.value}</span>
                    </div>
                  ))}
                  {order.details && order.details.length > 3 && (
                    <div className="text-xs text-blue-500 font-medium italic">+{order.details.length - 3} more details...</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
