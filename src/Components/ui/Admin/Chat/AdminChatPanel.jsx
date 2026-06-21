import React, { useState, useEffect, useRef } from 'react';
import config from '@/config';
import { toast } from 'react-toastify';

const AdminChatPanel = () => {
  const [activePartners, setActivePartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loadingPartners, setLoadingPartners] = useState(true);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch active chat partners
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`${config.apiUrl}/api/chat/active`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setActivePartners(data);
          // Auto-select first partner if none selected
          if (data.length > 0 && !selectedPartner) {
            setSelectedPartner(data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch active chat partners:', err);
      } finally {
        setLoadingPartners(false);
      }
    };

    fetchPartners();
    const interval = setInterval(fetchPartners, 4000);
    return () => clearInterval(interval);
  }, [selectedPartner]);

  // Poll messages for selected partner
  useEffect(() => {
    if (!selectedPartner) {
      setMessages([]);
      return;
    }

    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`${config.apiUrl}/api/chat/history?email=${selectedPartner}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error('Failed to fetch chat history:', err);
      }
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 3000);
    return () => clearInterval(interval);
  }, [selectedPartner]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || !selectedPartner) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${config.apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverEmail: selectedPartner,
          message: trimmed
        })
      });
      if (res.ok) {
        setInput('');
        const saved = await res.json();
        setMessages(prev => [...prev, saved]);
      } else {
        toast.error('Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Error sending message');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-150 h-[calc(100vh-140px)]">
      {/* Sidebar - Partners List */}
      <div className="w-80 border-r border-slate-200 bg-slate-50 flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="font-bold text-slate-800 text-lg">Customer Support Chats</h3>
          <p className="text-xs text-slate-500">Real-time support workspace</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loadingPartners ? (
            <div className="p-4 text-center text-sm text-slate-400">Loading conversations...</div>
          ) : activePartners.length === 0 ? (
            <div className="p-4 text-center text-sm text-slate-400">No active support inquiries</div>
          ) : (
            activePartners.map(partner => (
              <button
                key={partner}
                onClick={() => setSelectedPartner(partner)}
                className={`w-full p-4 text-left flex items-center gap-3 border-b border-slate-100 transition-colors ${
                  selectedPartner === partner
                    ? 'bg-blue-50 border-l-4 border-l-blue-600'
                    : 'hover:bg-slate-100 bg-white'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center font-semibold text-sm shadow-sm">
                  {partner.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">{partner}</p>
                  <p className="text-xs text-slate-400 truncate">Click to view thread</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Conversation Window */}
      <div className="flex-1 flex flex-col bg-slate-100">
        {selectedPartner ? (
          <>
            {/* Header */}
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {selectedPartner.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{selectedPartner}</h4>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span> Active Session
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => {
                const isAdminMessage = msg.senderEmail === 'mohd.arbaaz.job@gmail.com';
                return (
                  <div key={msg.id} className={`flex ${isAdminMessage ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        isAdminMessage
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'
                      }`}
                    >
                      <p>{msg.message}</p>
                      <span className={`text-[10px] block mt-1 text-right ${isAdminMessage ? 'text-white/70' : 'text-slate-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={scrollToBottom} />
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-slate-200 flex gap-3 shadow-md">
              <input
                type="text"
                className="flex-1 px-4 py-3 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-blue-400 transition"
                placeholder={`Reply to ${selectedPartner}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <span className="text-4xl mb-2">💬</span>
            <p className="text-sm">Select a support chat from the list to begin messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatPanel;
