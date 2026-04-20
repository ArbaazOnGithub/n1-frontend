import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "../config";
import { useAuth } from "./AuthContext";
import { FaQuoteLeft } from "react-icons/fa";

const StarRating = ({ value, onChange, readOnly = false }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          className={`transition-all duration-300 ${!readOnly ? "hover:scale-125 cursor-pointer" : "cursor-default text-sm"}`}
        >
          <span className={`text-2xl ${(hovered || value) >= star ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" : "text-gray-200"}`}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

const ReviewSection = () => {
  const { isLoggedIn } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ rating: 5, comment: "", serviceName: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/api/reviews`);
      if (!res.ok) throw new Error("Failed to load reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.comment.trim() || !formData.serviceName.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${config.apiUrl}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      toast.success("Review submitted! Admin will approve it soon 🎉");
      setShowForm(false);
      setFormData({ rating: 5, comment: "", serviceName: "" });
      fetchReviews();
    } catch (err) {
      toast.error("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    "Web Development", "SEO", "Logo Design", "Google Ads",
    "Google Map Listing", "Web Hosting", "Data Entry", "Tele Calling",
  ];

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-8 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <span className="relative text-blue-600 font-bold text-sm uppercase tracking-[0.3em]">Testimonials</span>
          <h2 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Visionary Leaders</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover why businesses choose N1Solution for their growth. Real stories from real people.
          </p>
          {isLoggedIn && (
            <button
              onClick={() => setShowForm((p) => !p)}
              className="mt-10 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-2xl shadow-gray-200 hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2 mx-auto"
            >
              {showForm ? "✕ Cancel" : "✍️ Write a Review"}
            </button>
          )}
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="flex justify-center mb-20">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-2xl bg-white rounded-[2.5rem] p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 relative">Share Your Experience</h3>

              <div className="space-y-6 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Select Service</label>
                    <select
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900 cursor-pointer"
                      value={formData.serviceName}
                      onChange={(e) => setFormData((f) => ({ ...f, serviceName: e.target.value }))}
                      required
                    >
                      <option value="">Choose a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Rating</label>
                    <div className="h-[56px] flex items-center px-5 rounded-2xl bg-gray-50">
                      <StarRating value={formData.rating} onChange={(r) => setFormData((f) => ({ ...f, rating: r }))} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Your Thoughts</label>
                  <textarea
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-900 placeholder-gray-400 resize-none"
                    rows={4}
                    placeholder="What was your experience like?"
                    value={formData.comment}
                    onChange={(e) => setFormData((f) => ({ ...f, comment: e.target.value }))}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg shadow-xl shadow-blue-500/20 transform transition active:scale-95 disabled:opacity-70"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl border border-gray-50">
            <p className="text-gray-400 font-medium">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
              {reviews.slice(0, showAll ? reviews.length : 6).map((review) => (
                <div
                  key={review.id}
                  className="group bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-50 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 text-blue-50 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FaQuoteLeft size={80} />
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-8">
                      <StarRating value={review.rating} readOnly />
                      <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
                        {review.serviceName}
                      </span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed font-medium mb-10 italic">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-5 pt-8 border-t border-gray-50">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-200">
                      {review.user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{review.user?.name || "Premium Client"}</h4>
                      <p className="text-sm text-gray-400 font-medium tracking-tight">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
                          : "Verified Customer"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {reviews.length > 6 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-16 px-10 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-lg shadow-gray-100"
              >
                {showAll ? "Show Less" : "Show More (" + (reviews.length - 6) + ")"}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
