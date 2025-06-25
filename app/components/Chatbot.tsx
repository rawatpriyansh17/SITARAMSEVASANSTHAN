"use client";

import React, { useState, useRef, useEffect } from "react";
import { SendHorizonal, Bot, User, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage]);

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);
    setStreamingMessage("");

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                setMessages((msgs) => [...msgs, { role: "bot", text: accumulatedText }]);
                setStreamingMessage("");
                setLoading(false);
                return;
              }

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  accumulatedText += parsed.content;
                  setStreamingMessage(accumulatedText);
                }
              } catch (error) {
                console.error("Error parsing stream data:", error);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setMessages((msgs) => [
        ...msgs,
        { role: "bot", text: "Sorry, there was an error. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setStreamingMessage("");
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          aria-label="Open chat"
        >
         <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="#ffffff"  className="icon icon-tabler icons-tabler-filled icon-tabler-message md:h-30 md:w-30"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-4.724l-4.762 2.857a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2h-1a4 4 0 0 1 -3.995 -3.8l-.005 -.2v-8a4 4 0 0 1 4 -4zm-4 9h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m2 -4h-8a1 1 0 1 0 0 2h8a1 1 0 0 0 0 -2" /></svg>
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="bg-gradient-to-b from-pink-200 to-pink-300 border-2 border-pink-600 rounded-2xl shadow-2xl w-[300px] sm:w-[350px] md:w-[400px] flex flex-col motion-preset-rebound-up motion-delay-[200ms] max-h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 bg-gradient-to-r from-pink-600 to-pink-400 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Bot className="animate-bounce text-white shadow-xl" size={24} />
              <span className="font-bold text-sm sm:text-base text-white font-mono">
                Ask Sitaram Seva
              </span>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-pink-200 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-2 space-y-2 min-h-auto max-h-[300px]">
            {messages.length === 0 && !streamingMessage && (
              <div className="text-pink-700 font-mono animate-pulse text-sm md:text-base font-extrabold bg-white border-2 border-pink-700 rounded-lg p-2">
                 Hi!👋 How can I help you with Sitaramseva Sansthan today?
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-2",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "bot" && (
  <div className="bg-gradient-to-b from-pink-500 to-pink-600 rounded-full p-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bot-message-square-icon lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
  </div>
                )}
                <div
                  className={cn(
                    "rounded-xl px-3 py-2 max-w-[75%] text-xs sm:text-sm whitespace-pre-line motion-preset-fade",
                    msg.role === "user"
                      ? "bg-gradient-to-b from-pink-500 to-pink-600 text-white font-semibold ml-auto"
                      : "bg-gradient-to-b from-pink-50 to-pink-100 text-pink-800 font-mono"
                  )}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                 <div className="bg-gradient-to-b from-pink-500 to-pink-600 rounded-full p-1">
                   <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="#ffffff"  className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
                 </div>
                )}
              </div>
            ))}
            
            {/* Streaming Message */}
            {streamingMessage && (
              <div className="flex items-start gap-2 justify-start">
                <Bot className="text-pink-600 mt-1 flex-shrink-0 animate-pulse" size={18} />
                <div className="bg-gradient-to-b from-pink-50 to-pink-100 text-pink-800 font-mono rounded-xl px-3 py-2 max-w-[75%] text-xs sm:text-sm whitespace-pre-line">
                  {streamingMessage}
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            )}

            {loading && !streamingMessage && (
              <div className="flex items-start gap-2">
                <div className="bg-gradient-to-b from-pink-500 to-pink-600 rounded-full p-1">
                  <Bot className="text-white mt-1 animate-spin" size={18} />
                </div>
                <div className="bg-white text-pink-800 font-mono rounded-xl px-3 py-2 text-xs sm:text-sm">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 px-3 sm:px-4 py-3 border-t border-pink-200 bg-gradient-to-b from-pink-50 to-pink-100 rounded-b-2xl"
          >
            <input
              className="flex-1 rounded-lg border border-pink-300 px-2 sm:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 font-mono text-pink-800 bg-white text-xs sm:text-sm"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className={cn(
                "p-2 rounded-full bg-pink-500 hover:bg-pink-700 transition-colors text-white shadow-lg flex-shrink-0",
                loading && "opacity-50 cursor-not-allowed"
              )}
              disabled={loading}
              aria-label="Send"
            >
              <SendHorizonal size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}