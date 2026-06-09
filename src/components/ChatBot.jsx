import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const QUICK_PROMPTS = [
  "Is this route safe at night?",
  "What should I carry for safety?",
  "How to share my location?",
  "Tips for solo travel",
];

function ChatBot({ route }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hi! I'm your AI Safety Assistant 🛡️ Ask me anything about travel safety, your route, or emergency tips.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const getAIReply = async (msg) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return "⚠️ AI assistant is not configured yet. Please add your VITE_GEMINI_API_KEY to the environment variables to enable this feature.";
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const routeContext = route
        ? `The user is planning a route from coordinates (${route.start.lat.toFixed(4)}, ${route.start.lng.toFixed(4)}) to (${route.end.lat.toFixed(4)}, ${route.end.lng.toFixed(4)}).`
        : "No specific route has been selected yet.";

      const systemPrompt = `You are SafeRoute AI's women's safety assistant. You provide concise, practical, and empathetic safety advice for women travelers. ${routeContext} Keep responses short (2-4 sentences max), actionable, and warm. Focus on: route safety, emergency tips, self-defense awareness, trusted contacts, and safe travel practices.`;

      const result = await model.generateContent(`${systemPrompt}\n\nUser: ${msg}`);
      return result.response.text();
    } catch (err) {
      console.error("AI error:", err);
      if (err.message?.includes("API_KEY")) {
        return "⚠️ Invalid API key. Please check your VITE_GEMINI_API_KEY configuration.";
      }
      return "Sorry, I couldn't get a response right now. Please try again in a moment.";
    }
  };

  const handleSend = async (text) => {
    const msgToSend = text || message;
    if (!msgToSend.trim() || loading) return;

    setChat((prev) => [...prev, { sender: "user", text: msgToSend }]);
    setMessage("");
    setLoading(true);

    const reply = await getAIReply(msgToSend);

    setChat((prev) => [...prev, { sender: "bot", text: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in your browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    setIsListening(true);
    recognition.onresult = (event) => {
      setMessage(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-purple-600 to-pink-500 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-200"
        title="AI Safety Assistant"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl flex flex-col w-80 sm:w-96 overflow-hidden border border-purple-100"
          style={{ maxHeight: "520px" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-lg">🛡️</div>
            <div>
              <p className="text-white font-semibold text-sm">AI Safety Assistant</p>
              <p className="text-white/70 text-xs">Powered by Gemini AI</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/70 text-xs">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ minHeight: "220px", maxHeight: "300px" }}>
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1">🛡️</div>
                )}
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-tr-none"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-sm">🛡️</div>
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {chat.length <= 1 && (
            <div className="px-3 py-2 flex gap-2 flex-wrap bg-white border-t border-gray-100">
              {QUICK_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p)}
                  className="text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 hover:bg-purple-100 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <button
              onClick={startVoice}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 transition-colors ${
                isListening ? "bg-red-100 text-red-500 animate-pulse" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
              title="Voice input"
            >
              🎤
            </button>
            <input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a safety question…"
              className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
              disabled={loading}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !message.trim()}
              className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:scale-105 transition-transform"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
