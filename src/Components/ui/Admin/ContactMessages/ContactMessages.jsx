import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import config from '../../../../config';
import { FaTrash, FaEnvelope, FaPhone, FaUser, FaClock } from 'react-icons/fa';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${config.apiUrl}/api/contact/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      toast.error("Error loading inquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${config.apiUrl}/api/contact/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Inquiry deleted");
      fetchMessages();
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-400">Loading inquiries...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Customer Inquiries</h2>
        <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl text-sm font-bold border border-blue-100">
           Total: {messages.length}
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-50 flex flex-col relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 group-hover:w-2 transition-all"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <FaUser size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{msg.fullName}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1 font-medium">
                    <span className="flex items-center gap-1"><FaEnvelope className="text-blue-400" /> {msg.email}</span>
                    <span className="flex items-center gap-1"><FaPhone className="text-indigo-400" /> {msg.phone}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(msg.id)}
                className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                title="Delete"
              >
                <FaTrash size={14} />
              </button>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-6 mb-6 flex-1 border border-gray-50">
              <p className="text-gray-700 leading-relaxed font-medium whitespace-pre-wrap italic">
                "{msg.message}"
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest pl-1">
              <FaClock className="text-blue-300" />
              {msg.createdAt ? new Date(msg.createdAt).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short'
              }) : 'N/A'}
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="p-24 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <FaEnvelope size={32} />
            </div>
            <p className="text-gray-400 font-bold text-lg">No inquiries received yet.</p>
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;
