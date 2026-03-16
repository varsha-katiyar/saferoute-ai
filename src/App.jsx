
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import SOSButton from "./components/SOSButton";
import HelpCenters from "./components/HelpCenters";
import ChatBot from "./components/ChatBot";
import RouteSearch from "./components/RouteSearch";
import SafetyScore from "./components/SafetyScore";

function App() {

  // store route data
  const [route, setRoute] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <h1 className="text-4xl font-bold mb-4">
          SafeRoute AI – Smart Navigation for Women
        </h1>
        <p className="text-lg max-w-xl mx-auto">
          A smart safety platform helping women travel safely with real-time
          location, emergency alerts, and nearby help centers.
        </p>
      </section>

      {/* Route Search */}
      <div className="p-8">
        <RouteSearch setRoute={setRoute} />
      </div>

      {/* Map */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Find Safe Routes
        </h2>
        <MapView route={route} />
      </div>

      {/* Safety Score */}
      <div className="flex justify-center">
        <SafetyScore route={route} />

      </div>

      {/* SOS Button */}
      <div className="flex justify-center my-8">
        <SOSButton />
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