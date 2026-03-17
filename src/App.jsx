import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RouteSearch from "./components/RouteSearch";
import MapView from "./components/MapView";
import SafetyScore from "./components/SafetyScore";
import SOSButton from "./components/SOSButton";
import ChatBot from "./components/ChatBot";
import HelpCenters from "./components/HelpCenters";
import ChatBot from "./components/ChatBot";
import RouteSearch from "./components/RouteSearch";
import SafetyScore from "./components/SafetyScore";

function App() {
  const [score, setScore] = useState(70); 
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState(null); // Added state for map routing

  const handleSearchUpdate = (newScore, destName) => {
    setScore(newScore);
    setDestination(destName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-purple-700 pb-28 shadow-inner">
         <HeroSection /> 
      </div>

      <div className="max-w-4xl mx-auto -mt-16 px-4 relative z-20">
        <RouteSearch onSearchUpdate={handleSearchUpdate} setRoute={setRoute} />
      </div>

      <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          
          {/* 1. Map View */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white h-[450px]">
            <MapView route={route} />
          </div>

          {/* 2. Advanced Features (Side-by-Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <SafetyScore score={score} route={destination} />
            <CameraScanner /> 
          </div>

          {/* 3. Emergency & Help */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <HelpCenters destination={destination} />
            
            <div className="flex flex-col items-center justify-center mt-12 border-t border-dashed pt-10">
              <div className="bg-red-50 p-6 rounded-2xl text-center w-full max-w-md border border-red-100">
                <h3 className="text-red-600 font-black mb-4 uppercase tracking-tighter text-xl">
                  🚨 Emergency SOS
                </h3>
                <SOSButton />
                <p className="text-sm text-gray-500 mt-6 font-medium">
                  Instant alert to local police & emergency contacts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. AI Chatbot Side Panel */}
        <aside className="lg:w-96">
          <div className="sticky top-6">
            <ChatBot />
          </div>
        </aside>
      </div>

      {/* Help Centers */}
      <HelpCenters />

      {/* Chatbot */}
      <ChatBot />

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600">
        © 2026 SafeRoute AI Project
      </footer>
    </div>
  );
}

export default App;