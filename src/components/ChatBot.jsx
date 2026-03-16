
import React, { useState } from "react";

function ChatBot() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSend = () => {

    const userMessage = message.toLowerCase();

    if (userMessage.includes("safe")) {
      setReply("Try to travel on well-lit roads and avoid isolated areas.");
    }
    else if (userMessage.includes("police")) {
      setReply("Nearest police stations will appear in the Help Centers section.");
    }
    else if (userMessage.includes("help")) {
      setReply("You can press the SOS button for emergency help.");
    }
    else {
      setReply("Stay alert and share your live location with trusted contacts.");
    }

    setMessage("");
  };

  return (

    <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-lg p-4 w-72">

      <h3 className="font-bold mb-2">
        Safety Assistant
      </h3>

      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Ask safety question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-purple-600 text-white px-3 py-2 rounded w-full"
      >
        Ask
      </button>

      {reply && (
        <p className="mt-3 text-sm text-gray-700">
          {reply}
        </p>
      )}

    </div>
  );
}

export default ChatBot;