
/*import React, { useState } from "react";

function RouteSearch({ setRoute }) {

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSearch = () => {
    setRoute({
      start: { lat: 28.6139, lng: 77.2090 },   // Delhi
      end: { lat: 28.5355, lng: 77.3910 }      // Noida
    });

  
  };

  return (
    <div className="bg-white shadow p-4 rounded mb-4">

      <h2 className="text-lg font-semibold mb-2">
        Find Safe Route
      </h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Start Location"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Destination"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Search Safe Route
      </button>

    </div>
  );
}

export default RouteSearch;*/


import React, { useState } from "react";

function RouteSearch({ onSearchUpdate, setRoute }) { // Added onSearchUpdate prop
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  const getCoordinates = async (place) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
      const res = await fetch(url, { headers: { "Accept": "application/json" } });
      const data = await res.json();
      if (!data || data.length === 0) {
        alert("Location not found: " + place);
        return null;
      }
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!start || !end) {
      alert("Please enter both locations");
      return;
    }

    setLoading(true);
    const startCoords = await getCoordinates(start);
    const endCoords = await getCoordinates(end);

    if (startCoords && endCoords) {
      // --- AI RISK PREDICTION LOGIC ---
      let predictedScore = 85; 
      if (end.toLowerCase().includes("noida")) {
        predictedScore = 45; // Simulated High Risk for Noida
      } else if (end.toLowerCase().includes("delhi")) {
        predictedScore = 65; // Simulated Moderate Risk
      }

      // Updating App.jsx state
      onSearchUpdate(predictedScore, end);
      
      // Updating Map if setRoute exists
      if(setRoute) setRoute({ start: startCoords, end: endCoords });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-2xl p-6 rounded-2xl mb-4 border border-purple-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        🔍 Find Safe Route
      </h2>
      <div className="space-y-3">
        <input
          type="text"
          className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          placeholder="Start Location (e.g. Delhi)"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          placeholder="Destination (e.g. Noida)"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl w-full transition-all shadow-lg active:scale-95"
        >
          {loading ? "AI Analyzing Route..." : "Search Safe Route"}
        </button>
      </div>
    </div>
  );
}

export default RouteSearch;