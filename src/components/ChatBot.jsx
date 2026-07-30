import React, { useState, useRef, useEffect } from "react";

function ChatBot({ route }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [chat, loading]);

  const getAIReply = async (msg) => {
    setLoading(true);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      setLoading(false);
      console.error(
        "VITE_OPENROUTER_API_KEY is missing. Add it to a .env file in the project root " +
          "(e.g. VITE_OPENROUTER_API_KEY=sk-or-v1-...) and restart `npm run dev`."
      );
      return "AI assistant isn't configured yet — the OpenRouter API key is missing. (Check console for setup steps.)";
    }

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          // OpenRouter asks for these on the free tier — without them some requests get silently rejected
          "HTTP-Referer": window.location.origin,
          "X-Title": "SafeRoute AI",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a women safety assistant. Give short, practical safety advice.",
            },
            {
              role: "user",
              content: `User question: ${msg}\nRoute: ${JSON.stringify(route)}`,
            },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const apiMessage = data?.error?.message || res.statusText;
        console.error("OpenRouter API error:", res.status, data);
        return `Assistant error (${res.status}): ${apiMessage}`;
      }

      return data?.choices?.[0]?.message?.content || "No response from the model.";
    } catch (err) {
      console.error("Network/fetch error calling OpenRouter:", err);
      return "Couldn't reach the AI assistant — check your internet connection and try again.";
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg = message;
    setChat((prev) => [...prev, { sender: "user", text: userMsg }]);
    setMessage("");
    const reply = await getAIReply(userMsg);
    setChat((prev) => [...prev, { sender: "bot", text: reply }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event) => setMessage(event.results[0][0].transcript);
    recognition.start();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open safety assistant"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-ink text-paper shadow-xl hover:bg-ink/90 active:scale-95 transition-all flex items-center justify-center"
      >
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8-1.17 0-2.29-.2-3.31-.56L3 21l1.67-4.17C3.61 15.5 3 13.82 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" /></svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm bg-paper-raised border border-line shadow-2xl rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-ink text-paper px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="font-display text-sm">AI Safety Assistant</h3>
              <p className="text-[11px] text-paper/60">Ask anything about your route</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-safe live-dot" />
          </div>

          <div ref={scrollRef} className="h-64 overflow-y-auto px-3 py-3 space-y-2 bg-paper">
            {chat.length === 0 && (
              <p className="text-xs text-ink-faint text-center mt-8">
                Try: "Is it safe to travel alone at night here?"
              </p>
            )}
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <span
                  className={`inline-block px-3 py-2 rounded-2xl text-sm max-w-[85%] ${
                    msg.sender === "user"
                      ? "bg-ink text-paper rounded-br-sm"
                      : "bg-white border border-line text-ink rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <p className="text-xs text-ink-faint px-1">Typing…</p>}
          </div>

          <div className="p-2.5 border-t border-line flex gap-2 bg-paper-raised">
            <button
              onClick={startVoice}
              aria-label="Voice input"
              className="h-10 w-10 shrink-0 rounded-xl border border-line hover:bg-paper transition-colors flex items-center justify-center"
            >
              🎤
            </button>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a safety question…"
              className="flex-1 min-w-0 border border-line rounded-xl px-3 text-sm outline-none focus:border-beacon transition-colors"
            />
            <button
              onClick={handleSend}
              className="h-10 shrink-0 px-4 rounded-xl bg-beacon text-white text-sm font-semibold hover:bg-beacon/90 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;