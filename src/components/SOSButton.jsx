import React, { useState } from "react";

function SOSButton() {
  const [status, setStatus] = useState("idle"); // idle | locating | sent | error

  const handleSOS = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
        const message = `🚨 SOS! I need help. My location: ${mapsLink}`;
        console.log("SOS Location:", lat, lng);
        setStatus("sent");
        alert("✅ SOS Alert Prepared!\n\nCopy this message to send to your contacts:\n\n" + message);
        setTimeout(() => setStatus("idle"), 4000);
      },
      () => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    );
  };

  const states = {
    idle: {
      label: "🚨 SOS Emergency",
      sublabel: "Tap to send alert with your location",
      cls: "bg-red-600 hover:bg-red-700 shadow-red-200",
    },
    locating: {
      label: "📍 Getting Location…",
      sublabel: "Please wait",
      cls: "bg-orange-500 cursor-wait shadow-orange-200",
    },
    sent: {
      label: "✅ Alert Sent!",
      sublabel: "Stay calm. Help is on the way.",
      cls: "bg-green-600 shadow-green-200",
    },
    error: {
      label: "⚠️ Location Denied",
      sublabel: "Enable location access and try again.",
      cls: "bg-gray-600 shadow-gray-200",
    },
  };

  const current = states[status];

  return (
    <button
      onClick={handleSOS}
      disabled={status === "locating" || status === "sent"}
      className={`${current.cls} text-white rounded-2xl px-8 py-4 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-default disabled:hover:scale-100 flex flex-col items-center gap-1`}
    >
      <span className="text-lg font-bold">{current.label}</span>
      <span className="text-sm opacity-80">{current.sublabel}</span>
    </button>
  );
}

export default SOSButton;
