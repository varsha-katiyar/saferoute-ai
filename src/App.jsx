import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import SOSButton from "./components/SOSButton";
import HelpCenters from "./components/HelpCenters";
import ChatBot from "./components/ChatBot";
import RouteSearch from "./components/RouteSearch";
import SafetyScore from "./components/SafetyScore";
import LiveTracking from "./components/LiveTracking";
import CameraScanner from "./components/CameraScanner";
import TrustedContacts from "./components/TrustedContacts";

const FEATURES = [
  { icon: "🛡️", label: "Safe Routes", desc: "AI-ranked by safety score" },
  { icon: "🚨", label: "SOS Alerts", desc: "One tap emergency alert" },
  { icon: "📡", label: "Live Tracking", desc: "Share location instantly" },
  { icon: "💬", label: "AI Assistant", desc: "24/7 safety guidance" },
];

function App() {
  const [route, setRoute] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            AI-Powered Safety Platform
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">
            SafeRoute AI
            <span className="block text-white/80 text-2xl sm:text-3xl font-semibold mt-1">Smart Navigation for Women</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Travel safer with real-time route safety scoring, emergency alerts, live location sharing, and an AI safety assistant.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-sm">
                <span>{f.icon}</span>
                <div className="text-left">
                  <p className="font-semibold text-white leading-none">{f.label}</p>
                  <p className="text-white/60 text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Route Search + Safety Score row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <RouteSearch setRoute={setRoute} />
          </div>
          <div>
            {route ? (
              <SafetyScore route={route} />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center justify-center text-center gap-3 h-full min-h-[160px]">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl">📊</div>
                <div>
                  <p className="font-semibold text-gray-700 text-sm">Safety Score</p>
                  <p className="text-gray-400 text-xs mt-1">Enter a route to see your safety analysis</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-base">🗺️</div>
            <div>
              <h2 className="text-base font-bold text-gray-800">Safe Route Map</h2>
              <p className="text-xs text-gray-400">Green line = safest route • Gray lines = alternatives</p>
            </div>
            {route && (
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                Route found ✓
              </span>
            )}
          </div>
          <MapView route={route} />
        </div>

        {/* SOS + Live Tracking + Help Centers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SOS */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl shadow-lg border border-red-100 p-6 flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">🚨</div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Emergency SOS</h3>
              <p className="text-xs text-gray-500 mb-4">Send your location to emergency contacts instantly</p>
            </div>
            <SOSButton />
          </div>

          {/* Live Tracking */}
          <div className="md:col-span-2">
            <LiveTracking />
          </div>
        </div>

        {/* Trusted Contacts + Help Centers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrustedContacts />
          <HelpCenters />
        </div>

        {/* Camera Scanner */}
        <CameraScanner />

      </div>

      {/* Chatbot */}
      <ChatBot route={route} />

      {/* Footer */}
      <footer className="text-center py-8 mt-8 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-xl">🛡️</span>
          <span className="font-bold text-gray-700">SafeRoute AI</span>
        </div>
        <p className="text-sm text-gray-400">© 2026 SafeRoute AI · Empowering Women's Safety</p>
      </footer>
    </div>
  );
}

export default App;
