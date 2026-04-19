import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "@/config";

import { useAuth } from "./AuthContext";

const StarRating = ({ value, onChange, readOnly = false }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          className={`text-2xl transition-transform ${!readOnly ? "hover:scale-125 cursor-pointer" : "cursor-default"}`}
        >
          <span className={(hovered || value) >= star ? "text-amber-400" : "text-slate-300"}>★</span>
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
      toast.success("Review submitted! Thank you 🎉");
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
    <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900">What Our Clients Say</h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Real feedback from real clients who trusted N1Solution with their business growth.
          </p>
          {isLoggedIn && (
            <button
              onClick={() => setShowForm((p) => !p)}
              className="mt-6 premium-button"
            >
              {showForm ? "Cancel" : "✍️ Write a Review"}
            </button>
          )}
        </div>

        {/* Review Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 mb-10 max-w-xl mx-auto space-y-5"
          >
            <h3 className="text-xl font-bold text-slate-800">Share Your Experience</h3>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Service</label>
              <select
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm"
                value={formData.serviceName}
                onChange={(e) => setFormData((f) => ({ ...f, serviceName: e.target.value }))}
                required
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Your Rating</label>
              <StarRating value={formData.rating} onChange={(r) => setFormData((f) => ({ ...f, rating: r }))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Your Review</label>
              <textarea
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm resize-none"
                rows={4}
                placeholder="Tell us about your experience..."
                value={formData.comment}
                onChange={(e) => setFormData((f) => ({ ...f, comment: e.target.value }))}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="premium-button w-full"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-slate-400 py-12">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {reviews.slice(0, showAll ? reviews.length : 9).map((review) => (
                <div
                  key={review.id}
                  className="glass-card rounded-2xl p-6 service-hover-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <StarRating value={review.rating} readOnly />
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                        {review.serviceName}
                      </span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed italic">"{review.comment}"</p>
                  </div>
                  <div className="mt-4 flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                      {review.user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{review.user?.name || "Customer"}</p>
                      <p className="text-xs text-slate-400">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {reviews.length > 9 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-10 premium-button-outline"
              >
                {showAll ? "Show Less" : "Show More (" + (reviews.length - 9) + ")"}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
