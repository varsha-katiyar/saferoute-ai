
import React, { useState } from "react";

function ChatBot({ route }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 AI API call
  const getAIReply = async (msg) => {
    setLoading(true);
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a women safety assistant. Give short, practical safety advice.",
            },
            {
              role: "user",
              content: `User question: ${msg}
Route: ${JSON.stringify(route)}`,
            },
          ],
        }),
      });

      const data = await res.json();
      return data?.choices?.[0]?.message?.content || "No response";
    } catch (err) {
      console.error(err);
      return "Error getting response";
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Send message
  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = message;

    setChat((prev) => [...prev, { sender: "user", text: userMsg }]);
    setMessage("");

    const reply = await getAIReply(userMsg);

    setChat((prev) => [...prev, { sender: "bot", text: reply }]);
  };

  // 🔹 Voice input
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setMessage(text);
    };

    recognition.start();
  };

  return (
    <>
      {/* 🔹 Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white px-4 py-3 rounded-full shadow-lg"
      >
        💬
      </button>

      {/* 🔹 Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white shadow-xl rounded-lg w-80 p-4">

          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">AI Safety Assistant</h3>
            <button onClick={() => setIsOpen(false)}>❌</button>
          </div>

          {/* Messages */}
          <div className="h-52 overflow-y-auto border p-2 mb-2 rounded">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`px-2 py-1 rounded ${
                    msg.sender === "user"
                      ? "bg-purple-200"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <p className="text-sm">Typing...</p>}
          </div>

          {/* Input */}
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask safety question..."
            className="border p-2 w-full mb-2 rounded"
          />

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={startVoice}
              className="bg-gray-200 px-3 py-2 rounded w-1/3"
            >
              🎤
            </button>

            <button
              onClick={handleSend}
              className="bg-purple-600 text-white px-3 py-2 rounded w-2/3"
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