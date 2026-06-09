import React, { useState } from "react";

function LiveTracking() {
  const [trackingLink, setTrackingLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(false);

  const startTracking = () => {
    const id = Date.now();
    const link = `${window.location.origin}/track/${id}`;
    setTrackingLink(link);
    setActive(true);
  };

  const stopTracking = () => {
    setTrackingLink("");
    setActive(false);
    setCopied(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(trackingLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-base">📡</div>
        <div>
          <h2 className="text-base font-bold text-gray-800">Live Location Sharing</h2>
          <p className="text-xs text-gray-400">Share your real-time location with trusted contacts</p>
        </div>
        {active && (
          <div className="ml-auto flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium">Live</span>
          </div>
        )}
      </div>

      {!active ? (
        <button
          onClick={startTracking}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          📡 Start Live Tracking
        </button>
      ) : (
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Share this link with family or trusted contacts:</p>
            <p className="text-xs text-purple-700 font-mono break-all">{trackingLink}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyLink}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                copied
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100"
              }`}
            >
              {copied ? "✅ Copied!" : "📋 Copy Link"}
            </button>
            <button
              onClick={stopTracking}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
            >
              ⏹ Stop Tracking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveTracking;
