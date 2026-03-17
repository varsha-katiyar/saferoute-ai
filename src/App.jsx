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

function App() {
  
  const [route, setRoute] = useState(null);
  const [score, setScore] = useState(70); // Default score
  const [destination, setDestination] = useState("");


  const handleSearchUpdate = (newScore, destName) => {
    setScore(newScore);
    setDestination(destName);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-4">
          SafeRoute AI – Smart Navigation for Women
        </h1>
        <p className="text-lg max-w-xl mx-auto opacity-90">
          A smart safety platform helping women travel safely with real-time
          location, emergency alerts, and nearby help centers.
        </p>
      </section>

      {/* Route Search */}
      <div className="p-8 max-w-4xl mx-auto">
        {/* Added onSearchUpdate to fix the real-time score issue */}
        <RouteSearch setRoute={setRoute} onSearchUpdate={handleSearchUpdate} />
      </div>

      {/* Map Section */}
      <div className="p-8">
        <div className="bg-white p-4 rounded-3xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 px-2">Find Safe Routes</h2>
          <div className="rounded-2xl overflow-hidden h-[400px]">
             <MapView route={route} />
          </div>
        </div>
      </div>

      {/* Advanced Features: Safety Score & AI Scanner Side-by-Side */}
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Pass state to SafetyScore to make it dynamic */}
        <SafetyScore score={score} route={destination || (route ? "Your Route" : "")} />
        
        {/* 2. Camera Scanner Added Here */}
        <CameraScanner />
      </div>

      {/* SOS Button */}
      <div className="flex flex-col items-center justify-center my-12 bg-red-50 py-10 rounded-3xl mx-8 border border-red-100">
        <h3 className="text-red-600 font-bold mb-4 uppercase tracking-widest text-sm">Emergency SOS</h3>
        <SOSButton />
        <p className="text-xs text-gray-400 mt-4 italic">Press to alert authorities and share live location.</p>
      </div>

      {/* Additional Features */}
      <div className="px-8 space-y-8">
        <HelpCenters destination={destination} />
        <LiveTracking />
      </div>

      {/* Floating Chatbot */}
      <ChatBot />

      {/* Footer */}
      <footer className="text-center py-10 text-gray-400 border-t mt-12">
        © 2026 SafeRoute AI Project • Secure Navigation
      </footer>
    </div>
  );
}

export default App;