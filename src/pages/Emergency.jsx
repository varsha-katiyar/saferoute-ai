import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Emergency() {
  const [sosStatus, setSosStatus] = useState("idle");

  const handleSOS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }
    setSosStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const link = `https://maps.google.com/?q=${lat},${lng}`;
        setSosStatus("sent");
        alert(`🚨 SOS Alert Ready!\n\nSend this to your contacts:\nI need help! My location: ${link}`);
        setTimeout(() => setSosStatus("idle"), 5000);
      },
      () => {
        setSosStatus("idle");
        alert("Location access denied. Please enable location permissions.");
      }
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse">
            🆘
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Emergency Help</h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            If you are in danger or need immediate assistance, use the options below.
          </p>
        </div>

        <div className="space-y-4">
          {/* SOS */}
          <button
            onClick={handleSOS}
            disabled={sosStatus === "locating" || sosStatus === "sent"}
            className={`w-full py-5 rounded-2xl text-white text-lg font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              sosStatus === "sent"
                ? "bg-green-600 shadow-green-200"
                : sosStatus === "locating"
                ? "bg-orange-500 shadow-orange-200 cursor-wait"
                : "bg-red-600 hover:bg-red-700 shadow-red-200 hover:scale-[1.02] active:scale-95 animate-pulse"
            }`}
          >
            {sosStatus === "locating" ? (
              <><span className="animate-spin">⏳</span> Getting your location…</>
            ) : sosStatus === "sent" ? (
              <>✅ Alert Prepared — Check your clipboard</>
            ) : (
              <>🚨 Send SOS Alert</>
            )}
          </button>

          {/* Police */}
          <a
            href="tel:100"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-blue-200 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3 active:scale-95"
          >
            <span className="text-2xl">📞</span>
            <div className="text-left">
              <p className="font-bold leading-none">Call Police</p>
              <p className="text-white/70 text-sm font-normal">Emergency: 100</p>
            </div>
          </a>

          {/* Women helpline */}
          <a
            href="tel:1091"
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-purple-200 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3 active:scale-95"
          >
            <span className="text-2xl">🛡️</span>
            <div className="text-left">
              <p className="font-bold leading-none">Women Helpline</p>
              <p className="text-white/70 text-sm font-normal">Dial 1091 · 24/7 Support</p>
            </div>
          </a>

          {/* Trusted Contact */}
          <a
            href="tel:+911234567890"
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-green-200 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3 active:scale-95"
          >
            <span className="text-2xl">👩‍👧</span>
            <div className="text-left">
              <p className="font-bold leading-none">Call Trusted Contact</p>
              <p className="text-white/70 text-sm font-normal">Preset emergency contact</p>
            </div>
          </a>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
            <span>💡</span> Safety Tips
          </h3>
          <ul className="space-y-2 text-sm text-amber-700">
            <li className="flex items-start gap-2"><span>•</span> Stay in a well-lit, crowded area if possible.</li>
            <li className="flex items-start gap-2"><span>•</span> Keep your phone charged and location enabled.</li>
            <li className="flex items-start gap-2"><span>•</span> Share your live location with a trusted person.</li>
            <li className="flex items-start gap-2"><span>•</span> Trust your instincts — if it feels wrong, leave.</li>
          </ul>
        </div>

        <p className="mt-6 text-center text-gray-400 text-xs">
          Make sure location services are enabled for accurate tracking.
        </p>
      </div>
    </div>
  );
}

export default Emergency;
