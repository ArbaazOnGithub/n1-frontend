import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import config from "@/config";
import AuthContext from "../Components/AuthContext";

import StatusTimeline from "../Components/StatusTimeline";

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
            <p className="text-slate-500 mt-2">Track the live progress of your service requests.</p>
          </div>
          <div className="mt-4 md:mt-0 px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold border border-blue-100 shadow-sm">
            Total Orders: {orders.length}
          </div>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.length === 0 ? (
            <div className="col-span-full text-center py-20 glass-card rounded-2xl">
              <div className="text-6xl mb-4 text-slate-200">📦</div>
              <h3 className="text-xl font-medium text-slate-600">You haven't requested any services yet.</h3>
              <a href="/#services" className="inline-block mt-6 premium-button">Browse Services</a>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="glass-card rounded-2xl p-6 service-hover-card flex flex-col h-full border border-slate-100 hover:border-blue-200 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{order.serviceType}</h3>
                </div>
                
                <p className="text-xs text-slate-400 mb-6 font-medium">
                  ORDER ID: #{order.id} | {order.date ? new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Pending'}
                </p>

                {/* Tracking Timeline */}
                <div className="mb-10 px-2">
                   <StatusTimeline currentStatus={order.status} />
                </div>

                <div className="space-y-3 bg-slate-50/80 p-5 rounded-2xl border border-slate-100 flex-grow">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Service Details</h4>
                  {order.details && order.details.slice(0, 4).map((detail, index) => (
                    <div key={index} className="flex justify-between text-sm py-1 border-b border-slate-100/50 last:border-0">
                      <span className="text-slate-500">{detail.name}</span>
                      <span className="text-slate-800 font-semibold text-right ml-4 underline decoration-blue-200 decoration-2 underline-offset-4">{detail.value}</span>
                    </div>
                  ))}
                  {order.details && order.details.length > 4 && (
                    <div className="text-[10px] text-center text-blue-500 font-bold uppercase tracking-wider pt-2">
                      + {order.details.length - 4} Additional Requirements
                    </div>
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
