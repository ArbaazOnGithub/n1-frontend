import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import config from "@/config";
import AuthContext from "../Components/AuthContext";
import StatusTimeline from "../Components/StatusTimeline";

const CustomerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useContext(AuthContext);

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

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

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this service request?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${config.apiUrl}/api/orders/${orderId}/cancel`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        toast.success("Order cancelled successfully!");
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "cancelled" } : o));
      } else {
        const errorText = await res.text();
        toast.error(`Cancellation failed: ${errorText}`);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a review comment.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${config.apiUrl}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          rating,
          comment,
          serviceName: selectedOrderForReview.serviceType
        })
      });
      if (res.ok) {
        toast.success("Review submitted! It will appear on the site once approved by an admin.");
        setShowReviewModal(false);
        setComment("");
        setRating(5);
      } else {
        const errText = await res.text();
        toast.error(`Failed to submit review: ${errText}`);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
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

                {/* Cancel Action */}
                {order.status && order.status.toLowerCase() === "pending" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="mt-5 w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl border border-red-200 transition-colors"
                  >
                    Cancel Service Request
                  </button>
                )}

                {/* Leave Review Action */}
                {order.status && order.status.toLowerCase() === "completed" && (
                  <button
                    onClick={() => {
                      setSelectedOrderForReview(order);
                      setShowReviewModal(true);
                    }}
                    className="mt-5 w-full py-2.5 bg-green-50 hover:bg-green-100 text-green-600 font-semibold rounded-xl border border-green-200 transition-colors"
                  >
                    Submit a Review
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review Dialog/Modal */}
      {showReviewModal && selectedOrderForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 transform transition-all p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Write a Review</h3>
            <p className="text-sm text-slate-500 mb-6">Share your feedback about our <strong>{selectedOrderForReview.serviceType}</strong> service.</p>

            {/* Rating Selector */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
              <div className="flex gap-2 text-3xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`transition-transform hover:scale-110 ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Area */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Your Comments</label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 transition min-h-[100px] resize-none"
                placeholder="How was your experience working with us?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setComment("");
                  setRating(5);
                }}
                className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
