import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useContacts } from "../hooks/useContacts";
import { Link } from "react-router-dom";

function Emergency() {
  const [sosStatus, setSosStatus] = useState("idle");
  const { contacts } = useContacts();

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

        let msg = `🚨 SOS ALERT! I need help!\n\nMy location: ${link}\n\n`;
        if (contacts.length > 0) {
          msg += "Share this with your trusted contacts:\n";
          contacts.forEach((c) => { msg += `• ${c.name} (${c.phone})\n`; });
        }

        setSosStatus("sent");
        alert(msg);
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
            If you're in danger or need immediate assistance, use the options below.
          </p>
        </div>

        <div className="space-y-4">
          {/* SOS */}
          <button
            onClick={handleSOS}
            disabled={sosStatus === "locating" || sosStatus === "sent"}
            className={`w-full py-5 rounded-2xl text-white text-lg font-bold shadow-lg transition-all duration-300 flex flex-col items-center gap-1 ${
              sosStatus === "sent"
                ? "bg-green-600 shadow-green-200"
                : sosStatus === "locating"
                ? "bg-orange-500 shadow-orange-200 cursor-wait"
                : "bg-red-600 hover:bg-red-700 shadow-red-200 hover:scale-[1.02] active:scale-95 animate-pulse"
            }`}
          >
            {sosStatus === "locating" ? (
              <><span className="animate-spin text-xl">⏳</span><span>Getting your location…</span></>
            ) : sosStatus === "sent" ? (
              <><span>✅ Alert Prepared!</span><span className="text-sm font-normal opacity-80">Check the alert popup to share it</span></>
            ) : (
              <>
                <span>🚨 Send SOS Alert</span>
                <span className="text-sm font-normal opacity-80">
                  {contacts.length > 0
                    ? `Includes ${contacts.length} trusted contact${contacts.length > 1 ? "s" : ""}`
                    : "Add contacts below for personalised alerts"}
                </span>
              </>
            )}
          </button>

          {/* Police */}
          <a href="tel:100"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-blue-200 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-4 active:scale-95"
          >
            <span className="text-2xl">📞</span>
            <div className="text-left">
              <p className="font-bold leading-none">Call Police</p>
              <p className="text-white/70 text-sm font-normal">Emergency: 100</p>
            </div>
          </a>

          {/* Women helpline */}
          <a href="tel:1091"
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white text-base font-bold rounded-2xl shadow-lg hover:shadow-purple-200 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-4 active:scale-95"
          >
            <span className="text-2xl">🛡️</span>
            <div className="text-left">
              <p className="font-bold leading-none">Women Helpline</p>
              <p className="text-white/70 text-sm font-normal">Dial 1091 · 24/7 Support</p>
            </div>
          </a>

          {/* Trusted contacts */}
          {contacts.length > 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-green-50 border-b border-green-100 flex items-center gap-2">
                <span>👥</span>
                <p className="text-sm font-bold text-green-800">Your Trusted Contacts</p>
                <span className="ml-auto text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{contacts.length} saved</span>
              </div>
              {contacts.map((c) => (
                <a
                  key={c.id}
                  href={`tel:${c.phone}`}
                  className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {c.relation === "Mother" ? "👩" : c.relation === "Father" ? "👨" : c.relation === "Sister" ? "👧" : c.relation === "Brother" ? "👦" : c.relation === "Partner" ? "💑" : "🤝"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.relation} · {c.phone}</p>
                  </div>
                  <div className="w-9 h-9 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center text-green-700 transition-colors flex-shrink-0">
                    📞
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-xl mt-0.5">💡</span>
              <div>
                <p className="text-sm font-semibold text-amber-800">No trusted contacts added</p>
                <p className="text-xs text-amber-600 mt-1">Add contacts on the home page so they appear here for quick dialing during emergencies.</p>
                <Link to="/" className="inline-block mt-2 text-xs text-amber-700 underline font-medium">Add contacts →</Link>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>💡</span> Safety Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="text-purple-400 font-bold">•</span> Stay in a well-lit, crowded area if possible.</li>
            <li className="flex items-start gap-2"><span className="text-purple-400 font-bold">•</span> Keep your phone charged and location enabled.</li>
            <li className="flex items-start gap-2"><span className="text-purple-400 font-bold">•</span> Share your live location with a trusted person.</li>
            <li className="flex items-start gap-2"><span className="text-purple-400 font-bold">•</span> Trust your instincts — if it feels wrong, leave.</li>
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
