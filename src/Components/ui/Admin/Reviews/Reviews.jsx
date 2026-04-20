import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import config from '../../../../config';
import { FaCheck, FaTrash, FaStar, FaUser } from 'react-icons/fa';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${config.apiUrl}/api/reviews/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      toast.error("Error loading reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${config.apiUrl}/api/reviews/admin/${id}/approve`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to approve");
      toast.success("Review approved!");
      fetchReviews();
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${config.apiUrl}/api/reviews/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Review deleted");
      fetchReviews();
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading reviews...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Manage Testimonials</h2>
      
      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-5 font-bold uppercase text-xs tracking-wider">User</th>
              <th className="p-5 font-bold uppercase text-xs tracking-wider">Service</th>
              <th className="p-5 font-bold uppercase text-xs tracking-wider">Rating</th>
              <th className="p-5 font-bold uppercase text-xs tracking-wider">Review</th>
              <th className="p-5 font-bold uppercase text-xs tracking-wider">Status</th>
              <th className="p-5 font-bold uppercase text-xs tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {review.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{review.user?.name}</p>
                    <p className="text-xs text-gray-400">{review.user?.email}</p>
                  </div>
                </td>
                <td className="p-5">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
                    {review.serviceName}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={12} className={i < review.rating ? "opacity-100" : "opacity-20"} />
                    ))}
                  </div>
                </td>
                <td className="p-5 max-w-xs">
                  <p className="text-sm text-gray-600 line-clamp-2 italic">"{review.comment}"</p>
                </td>
                <td className="p-5">
                  {review.approved ? (
                    <span className="text-emerald-500 flex items-center gap-1 font-bold text-xs">
                      <FaCheck size={10} /> Published
                    </span>
                  ) : (
                    <span className="text-amber-500 font-bold text-xs px-2 py-1 bg-amber-50 rounded-lg">Pending</span>
                  )}
                </td>
                <td className="p-5">
                  <div className="flex gap-2">
                    {!review.approved && (
                      <button 
                        onClick={() => handleApprove(review.id)}
                        className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                        title="Approve"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reviews.length === 0 && (
          <div className="p-20 text-center text-gray-400 font-medium">No reviews found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
