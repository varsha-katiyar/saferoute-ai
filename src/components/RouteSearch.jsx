import React, { useState } from "react";

function RouteSearch({ setRoute }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCoordinates = async (place) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    if (!data || data.length === 0) throw new Error(`Location not found: "${place}"`);
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  };

  const handleSearch = async () => {
    if (!start.trim() || !end.trim()) {
      setError("Please enter both a start location and destination.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const [startCoords, endCoords] = await Promise.all([
        getCoordinates(start),
        getCoordinates(end),
      ]);
      setRoute({ start: startCoords, end: endCoords });
    } catch (err) {
      setError(err.message || "Failed to find location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStart(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      },
      () => setError("Location access denied. Please enable location permissions.")
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-base">🗺️</div>
        <h2 className="text-lg font-bold text-gray-800">Find Safe Route</h2>
      </div>

      <div className="space-y-3">
        {/* Start input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 text-base">📍</span>
          <input
            type="text"
            className="w-full pl-10 pr-24 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all placeholder-gray-400"
            placeholder="Start location (e.g. Delhi)"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={useMyLocation}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-purple-600 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded-lg transition-colors font-medium"
            title="Use my current location"
          >
            📡 My Location
          </button>
        </div>

        {/* Swap indicator */}
        <div className="flex items-center gap-2 px-3">
          <div className="flex-1 h-px bg-gray-100"></div>
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-400">↕</div>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* End input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-base">🏁</span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all placeholder-gray-400"
            placeholder="Destination (e.g. Noida)"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-600 bg-red-50 rounded-xl px-3 py-2 text-sm">
          <span>⚠️</span> {error}
        </div>
      )}

      <button
        onClick={handleSearch}
        disabled={loading}
        className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Finding safest route…
          </>
        ) : (
          <>🛡️ Search Safe Route</>
        )}
      </button>
    </div>
  );
}

export default RouteSearch;
