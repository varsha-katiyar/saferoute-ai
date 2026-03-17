

import React, { useState } from "react";

function SafetyAssistant() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_OPENAI_KEY;
  //console.log("My key:", apiKey);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":  `Bearer  ${apiKey}` // Replace with your API key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a safety assistant for women, giving safe travel advice, emergency tips, and guidance in risky situations."
            },
            { role: "user", content: message }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();

      // Safety check for undefined or empty response
      if (data?.choices && data.choices.length > 0) {
        setReply(data.choices[0]?.message?.content || "Sorry, I couldn't generate a reply.");
      } else {
        setReply("Sorry, I cannot answer right now. Try again later.");
      }
    } catch (error) {
      console.error(error);
      setReply("Oops! Something went wrong. Please try again later.");
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div className={`fixed bottom-6 right-6 w-80 shadow-lg rounded-xl transition-all duration-300 ${isOpen ? "h-auto" : "h-14"}`}>
      {/* Header */}
      <div
        className="bg-purple-600 text-white rounded-t-xl p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold">🛡 Safety Assistant</h3>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </div>

      {/* Body */}
      {isOpen && (
        <div className="bg-white rounded-b-xl p-4">
          <input
            type="text"
            className="border p-2 w-full mb-2 rounded"
            placeholder="Ask any safety question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={handleSend}
            className="bg-purple-600 text-white px-3 py-2 rounded w-full hover:bg-purple-700 transition"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>

          {reply && (
            <div className="mt-3 p-2 bg-gray-100 rounded text-gray-700 text-sm shadow-inner whitespace-pre-line">
              {reply}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SafetyAssistant;