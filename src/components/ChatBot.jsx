import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// ── Smart safety knowledge base ───────────────────────────────────────────────
const SAFETY_KB = [
  {
    keys: ["night", "dark", "late", "evening", "midnight", "after dark"],
    response: "🌙 **Night travel tips:** Stick to well-lit main roads and avoid shortcuts through alleys. Share your live location with a trusted contact before you leave. Keep your phone charged and stay aware of your surroundings. Consider using SafeRoute's Live Tracking so someone knows your route.",
  },
  {
    keys: ["safe route", "safest", "route safety", "which route", "best route"],
    response: "🗺️ **Route safety:** The green highlighted route on the map is calculated as the safest option based on area activity, lighting, and proximity to help centers. Always prefer well-trafficked roads and avoid isolated paths — especially after dark.",
  },
  {
    keys: ["sos", "emergency", "help", "danger", "attack", "unsafe", "scared", "afraid", "fear"],
    response: "🚨 **Emergency action:** Press the red SOS button immediately — it captures your GPS location and prepares an alert message to share with contacts. You can also call Police (100) or Women's Helpline (1091) from the Emergency page. Trust your instincts and move toward a crowded, well-lit area.",
  },
  {
    keys: ["share location", "live tracking", "track", "tracking link", "contact", "family"],
    response: "📡 **Live location sharing:** Use the 'Start Live Tracking' button to generate a unique link. Share this link with a trusted family member or friend before your trip. They can monitor your real-time position throughout your journey.",
  },
  {
    keys: ["public transport", "bus", "metro", "auto", "taxi", "cab", "ride", "uber", "ola"],
    response: "🚌 **Safe transport tips:** Always note down the vehicle registration number and share it with a contact. Sit near other passengers in public transport. For cabs, verify the driver name and photo matches the app. Share your ride details with someone before boarding.",
  },
  {
    keys: ["carry", "pack", "bring", "items", "safety kit", "travel kit", "essentials"],
    response: "🎒 **Safety essentials:** Carry a personal alarm (whistle or app-based), keep your phone fully charged, have emergency numbers saved, carry a power bank, and keep your ID handy. A small pepper spray (where legal) is also recommended.",
  },
  {
    keys: ["self defense", "protect", "defend", "attack", "fight back"],
    response: "🥋 **Self-defense basics:** The best defense is awareness — stay alert and avoid isolated areas. If threatened, shout loudly to draw attention. Use your elbows, knees, or keys as a deterrent. Take a self-defense class for confidence. Always run to a populated area if possible.",
  },
  {
    keys: ["pepper spray", "whistle", "alarm", "panic button"],
    response: "🔔 **Personal safety tools:** A personal alarm (120dB+) is highly effective — the sound deters attackers and draws attention. Pepper spray is legal in most Indian states for personal use. This app's SOS button acts as a digital panic button.",
  },
  {
    keys: ["hotel", "stay", "accommodation", "hostel", "lodge"],
    response: "🏨 **Accommodation safety:** Research the area before booking — check reviews for safety mentions. Lock your room door and windows. Share your hotel address with someone back home. Avoid sharing your room number with strangers.",
  },
  {
    keys: ["score", "safety score", "percentage", "rating", "risk"],
    response: "📊 **Safety score explained:** The score (60–100%) is calculated using simulated area data — including street lighting levels, crowd density index, and distance to the nearest police station or help center. A score above 85% is Very Safe; 70–85% is Moderately Safe; below 70% means use extra caution.",
  },
  {
    keys: ["helpline", "police", "number", "call", "100", "1091", "112"],
    response: "📞 **Emergency numbers (India):** Police: 100 | Women's Helpline: 1091 | Emergency: 112 | Ambulance: 108. Save all of these in your phone now, before you need them.",
  },
  {
    keys: ["alone", "solo", "single", "by myself", "travelling alone"],
    response: "👤 **Solo travel safety:** Always tell someone your complete travel plan — destination, route, and expected return time. Check in regularly via messages. Use the Live Tracking feature so a contact can monitor your journey. Trust your gut — if a situation feels off, leave.",
  },
  {
    keys: ["stalked", "stalker", "followed", "being followed", "suspicious person"],
    response: "👁️ **If you're being followed:** Don't go home — instead walk into a busy shop, restaurant, or police station. Call someone and talk loudly so the person knows you're in contact. Note any identifying features. If danger is imminent, press SOS and call 100.",
  },
  {
    keys: ["phone", "battery", "charged", "offline", "no internet"],
    response: "📱 **Phone safety tips:** Keep your phone charged above 30% before travel. Download offline maps (Google Maps offers this). Save emergency contacts with special prefixes like '!Police' so they appear first in a search. Enable location sharing before leaving.",
  },
  {
    keys: ["hi", "hello", "hey", "hii", "helo", "namaste", "start", "begin"],
    response: "👋 **Hello! I'm your AI Safety Assistant.** I can help you with:\n• Route safety advice\n• Emergency tips & helpline numbers\n• Solo travel guidance\n• What to carry for safety\n• Live tracking & SOS features\n\nWhat would you like to know?",
  },
  {
    keys: ["thank", "thanks", "great", "helpful", "good", "awesome", "perfect"],
    response: "😊 You're welcome! Stay safe out there. Remember — you can always press the SOS button or visit the Emergency page if you need immediate help. SafeRoute AI is here for you 24/7. 🛡️",
  },
];

const QUICK_PROMPTS = [
  "Is this route safe at night?",
  "Emergency contacts to save",
  "What to carry for safety?",
  "Tips for solo travel",
];

function getSmartReply(msg, route) {
  const lower = msg.toLowerCase();
  for (const item of SAFETY_KB) {
    if (item.keys.some((k) => lower.includes(k))) {
      let reply = item.response;
      if (route && lower.includes("route")) {
        reply += `\n\n📍 Your current route goes from (${route.start.lat.toFixed(3)}°N, ${route.start.lng.toFixed(3)}°E) to (${route.end.lat.toFixed(3)}°N, ${route.end.lng.toFixed(3)}°E). Check the Safety Score panel for a detailed analysis.`;
      }
      return reply;
    }
  }
  return `🛡️ Great question! Here's some general safety advice: Always stay aware of your surroundings, keep emergency contacts saved (Police: 100, Women's Helpline: 1091), and use the Live Tracking feature to share your journey with trusted contacts. If you feel unsafe at any point, press the SOS button immediately.\n\nFor more specific advice, try asking about: night travel, SOS, live tracking, what to carry, or solo travel tips.`;
}

// Renders bold markdown like **text**
function FormattedMessage({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((p, i) =>
        i % 2 === 1 ? <strong key={i}>{p}</strong> : p.split("\n").map((line, j, arr) => (
          <React.Fragment key={j}>{line}{j < arr.length - 1 && <br />}</React.Fragment>
        ))
      )}
    </span>
  );
}

function ChatBot({ route }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: `Hi ${user?.name?.split(" ")[0] || "there"}! 👋 I'm your AI Safety Assistant. Ask me anything about route safety, emergencies, or safe travel tips.`,
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
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const handleSend = async (text) => {
    const msgToSend = (text || message).trim();
    if (!msgToSend || loading) return;

    setChat((prev) => [...prev, { sender: "user", text: msgToSend }]);
    setMessage("");
    setLoading(true);

    // Simulate a short thinking delay for realism
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 500));

    const reply = getSmartReply(msgToSend, route);
    setChat((prev) => [...prev, { sender: "bot", text: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Voice input is not supported in your browser."); return; }
    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    setIsListening(true);
    recognition.onresult = (e) => { setMessage(e.results[0][0].transcript); setIsListening(false); };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const showQuickPrompts = chat.length <= 1;

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
        <div
          className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-purple-100"
          style={{ width: "min(22rem, calc(100vw - 2rem))", maxHeight: "520px" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-lg">🛡️</div>
            <div>
              <p className="text-white font-semibold text-sm">AI Safety Assistant</p>
              <p className="text-white/70 text-xs">Always here to help · No internet needed</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/70 text-xs">Active</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">🛡️</div>
                )}
                <div
                  className={`max-w-[78%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.sender === "bot" ? <FormattedMessage text={msg.text} /> : msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-sm">🛡️</div>
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {showQuickPrompts && (
            <div className="px-3 py-2 flex gap-1.5 flex-wrap bg-white border-t border-gray-100 flex-shrink-0">
              {QUICK_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p)}
                  className="text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1.5 hover:bg-purple-100 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center flex-shrink-0">
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
              className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 min-w-0"
              disabled={loading}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !message.trim()}
              className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:scale-105 transition-transform text-sm"
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
