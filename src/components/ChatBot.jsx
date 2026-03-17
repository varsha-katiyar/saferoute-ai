import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! I am SafeRoute AI Assistant. How can I help you?", isBot: true }
  ]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- Voice Recognition ---
  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // --- Handle Send (FIXED LOGIC) ---
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    const userMsg = { text: userText, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      // Check if API Key is actually loading
      if (!apiKey || apiKey === "") {
        throw new Error("API_KEY_MISSING");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      
      // 404 FIX: Use 'gemini-1.5-flash' which is the current standard for v1beta
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash-latest",
      });

      const prompt = `User safety concern: ${userText}. 
      As a safety assistant for women, give a very short 2-line helpful advice. 
      Mention 112 helpline only if it sounds like an emergency.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { text: text, isBot: true }]);
    } catch (error) {
      console.error("Gemini Error Detail:", error);
      
      let errorMsg = "Connection issue. Please try again.";
      
      if (error.message === "API_KEY_MISSING") {
        errorMsg = "API Key nahi mil rahi. Please check your .env file.";
      } else if (error.message.includes("404")) {
        errorMsg = "Model 'gemini-1.5-flash' not responding. Checking server...";
      }

      setMessages((prev) => [...prev, { text: errorMsg, isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:bg-purple-700 transition-all flex items-center gap-2 animate-bounce"
        >
          <span className="text-xl">🛡️</span> <span className="font-bold">AI Assistant</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 h-[450px] rounded-2xl shadow-2xl flex flex-col border border-purple-200 overflow-hidden">
          <div className="bg-purple-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isListening ? "bg-red-400 animate-pulse" : "bg-green-400 animate-ping"}`}></div>
              <span className="font-bold">SafeRoute AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-2xl">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.isBot ? "bg-white text-gray-800 border" : "bg-purple-600 text-white"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-purple-500 italic ml-2">Analyzing safety...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t flex items-center gap-2">
            <button 
              onClick={startVoiceRecognition}
              className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              🎙️
            </button>
            <input 
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
              placeholder={isListening ? "Listening..." : "Ask about safety..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              disabled={loading}
              onClick={handleSend} 
              className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-purple-700"
            >
              🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;