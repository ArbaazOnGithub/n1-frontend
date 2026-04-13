import React, { useState, useRef, useEffect } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi there! Welcome to N1Solution. How can we help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const autoReplies = {
    "web development":
      "Great choice! Our Web Development service covers both static and dynamic websites. Click the 'Services' section on our homepage to apply!",
    seo: "We offer professional SEO services to boost your search rankings. Visit the Services section to get started!",
    price:
      "Pricing depends on the service and scope. Please fill out the service form and our team will contact you with a custom quote.",
    contact:
      "You can reach us at +91 93992 85780, or use the Contact section on the homepage.",
    "google ads":
      "We manage Google Ads campaigns to maximize your ROI. Apply via the Services section!",
    "logo design":
      "Our designers create stunning logos that represent your brand. Check out the Services section to apply.",
    hosting:
      "We offer reliable web hosting solutions. Visit the Services section to learn more.",
    "data entry":
      "We provide accurate and fast data entry services. Browse our Services section for details.",
    default:
      "Thanks for your message! Our team will get back to you shortly. For urgent queries, call us at +91 93992 85780.",
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Auto-reply logic
    setTimeout(() => {
      const lower = trimmed.toLowerCase();
      let reply = autoReplies.default;
      for (const key of Object.keys(autoReplies)) {
        if (lower.includes(key)) {
          reply = autoReplies[key];
          break;
        }
      }
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 bg-white"
          style={{ height: "430px" }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                N1
              </div>
              <div>
                <p className="font-semibold text-sm">N1Solution Support</p>
                <p className="text-xs text-white/70">Typically replies instantly</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition text-xl">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-br-sm"
                      : "bg-white text-slate-700 border border-slate-100 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-blue-400 transition"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full flex items-center justify-center hover:opacity-90 transition disabled:opacity-40"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        title="Chat with us"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default ChatWidget;
