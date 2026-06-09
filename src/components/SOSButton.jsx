import React, { useState } from "react";
import { useContacts } from "../hooks/useContacts";

function SOSButton() {
  const [status, setStatus] = useState("idle");
  const { contacts } = useContacts();

  const handleSOS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;

        let alertMsg = `🚨 SOS ALERT!\n\nI need help! My current location:\n${mapsLink}\n\n`;

        if (contacts.length > 0) {
          alertMsg += `Send this message to your trusted contacts:\n`;
          contacts.forEach((c) => {
            alertMsg += `• ${c.name} (${c.relation}): ${c.phone}\n`;
          });
        } else {
          alertMsg += `Tip: Add trusted contacts in the Trusted Contacts section so they auto-appear in SOS alerts!`;
        }

        setStatus("sent");
        alert(alertMsg);
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
      sublabel: contacts.length > 0
        ? `Alerts ${contacts.length} trusted contact${contacts.length > 1 ? "s" : ""}`
        : "Tap to send alert with your location",
      cls: "bg-red-600 hover:bg-red-700 shadow-red-200 hover:scale-105 active:scale-95",
    },
    locating: {
      label: "📍 Getting Location…",
      sublabel: "Please wait",
      cls: "bg-orange-500 shadow-orange-200 cursor-wait",
    },
    sent: {
      label: "✅ Alert Prepared!",
      sublabel: "Stay calm. Help is on the way.",
      cls: "bg-green-600 shadow-green-200",
    },
    error: {
      label: "⚠️ Location Denied",
      sublabel: "Enable location access and try again.",
      cls: "bg-gray-600 shadow-gray-200",
    },
  };

  const cur = states[status];

  return (
    <button
      onClick={handleSOS}
      disabled={status === "locating" || status === "sent"}
      className={`${cur.cls} text-white rounded-2xl px-8 py-4 shadow-xl transition-all duration-300 disabled:cursor-default disabled:hover:scale-100 flex flex-col items-center gap-1 w-full`}
    >
      <span className="text-base font-bold">{cur.label}</span>
      <span className="text-xs opacity-80">{cur.sublabel}</span>
    </button>
  );
}

export default SOSButton;
