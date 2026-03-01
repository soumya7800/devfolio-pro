import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Sparkles } from 'lucide-react';
import { chatWithResume, isConfigured } from '../services/geminiService';
import { Message } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm Soumya's virtual assistant. Ask me about his projects, skills, or experience!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(isConfigured());
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithResume(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] bg-surface border border-borderSubtle rounded-2xl shadow-xl flex flex-col overflow-hidden origin-bottom-right transition-all">
          {/* Header */}
          <div className="bg-background border-b border-borderSubtle p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-surfaceSecondary text-primary">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-primary font-semibold text-sm">Portfolio Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-success' : 'bg-error'}`}></span>
                  <span className={`text-[10px] font-medium ${isOnline ? 'text-secondary' : 'text-error'}`}>
                    {isOnline ? 'Active' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-secondary hover:text-primary hover:bg-surfaceSecondary rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-accent text-primary rounded-br-[4px] shadow-[0_0_20px_rgba(91,95,255,0.2)]'
                    : 'bg-surface border border-borderSubtle text-secondary rounded-bl-[4px]'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-borderSubtle rounded-2xl rounded-bl-[4px] px-4 py-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-borderSubtle bg-surface">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message assistant..."
                className="w-full bg-background border border-borderSubtle rounded-full pl-4 pr-10 py-2.5 text-sm text-primary focus:outline-none focus:border-accent focus:shadow-[0_0_20px_rgba(91,95,255,0.2)] transition-all placeholder:text-secondary"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1 p-2 text-primary bg-background rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surfaceSecondary transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-borderSubtle shadow-lg hover:bg-surfaceSecondary hover:-translate-y-1 transition-all duration-300 group"
        >
          <MessageSquare className="text-primary group-hover:scale-110 transition-transform" size={20} />
          {!isOnline && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-background rounded-full"></span>
          )}
        </button>
      )}
    </div>
  );
};