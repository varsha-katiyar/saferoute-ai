import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    const newChat = [...chat, { user: message }, { bot: "Stay aware of your surroundings and keep emergency contacts ready." }];
    setChat(newChat);
    setMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded w-72">
      <h3 className="font-bold mb-2">Safety Assistant</h3>

      <div className="h-40 overflow-y-auto text-sm mb-2">
        {chat.map((c, i) => (
          <p key={i}>{c.user || c.bot}</p>
        ))}
      </div>

      <input
        className="border w-full p-2 text-sm"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about safety..."
      />

      <button
        onClick={sendMessage}
        className="bg-purple-600 text-white px-3 py-1 mt-2 rounded"
      >
        Send
      </button>
    </div>
  );
}

export default SafetyAssistant;