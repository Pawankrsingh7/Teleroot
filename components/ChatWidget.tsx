"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi there! 👋 How can I help you with TeleRoot today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: "Thanks for your message! Our AI is processing your request. One of our engineers will also be notified." 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-[#1F2C30] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#D4F84A] flex items-center justify-center text-black">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">TeleRoot Assistant</p>
                  <p className="text-[10px] text-slate-400">Online | AI Powered</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                    msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              <button 
                type="submit"
                className="bg-[#1F2C30] text-white p-2 rounded-xl hover:bg-[#2a3c42] transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full bg-[#1F2C30] shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#D4F84A] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <div className="relative z-10 transition-colors duration-300 group-hover:text-black text-white">
          {isOpen ? <X className="h-8 w-8" /> : (
            <div className="relative h-10 w-10 flex items-center justify-center">
               <Bot className="h-10 w-10" />
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
