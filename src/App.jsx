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

const FEATURES = [
  { icon: "🗺", label: "Smart route selection" },
  { icon: "📍", label: "Live location tracking" },
  { icon: "🔥", label: "Danger zone heatmap" },
  { icon: "🚨", label: "One-tap SOS" },
];

function App() {
  const [route, setRoute] = useState(null);

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-ink text-paper overflow-hidden">
        <div className="grain-texture absolute inset-0 opacity-40" />
        <div className="relative max-w-3xl mx-auto text-center px-6 py-20">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-beacon mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-beacon live-dot" />
            Watching your route, always
          </span>
          <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-5">
            Get home safe, <span className="italic text-beacon">every time.</span>
          </h1>
          <p className="text-paper/70 text-base md:text-lg max-w-xl mx-auto">
            AI-scored safe routes, live tracking your people can follow, and an
            SOS that reaches help in one tap.
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-5 md:px-6 -mt-10 relative z-10 space-y-8 pb-16">
        <RouteSearch setRoute={setRoute} />

        <MapView route={route} />

        {route && (
          <div className="flex justify-center">
            <SafetyScore route={route} />
          </div>
        )}

        <div className="flex justify-center py-4">
          <SOSButton />
        </div>

        <HelpCenters />

        <LiveTracking />

        <CameraScanner />

        {!route && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="bg-paper-raised border border-line rounded-xl px-4 py-3 flex items-center gap-2.5 text-sm text-ink-soft"
              >
                <span className="text-lg">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        )}
      </main>

      <ChatBot route={route} />

      <footer className="text-center py-8 text-xs text-ink-faint border-t border-line">
        © 2026 SafeRoute AI — built to get you there and back, safely.
      </footer>
    </div>
  );
}

export default App;
