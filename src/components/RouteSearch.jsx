import React, { useState } from "react";

function RouteSearch({ setRoute }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  const getCoordinates = async (place) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      if (!data || data.length === 0) {
        alert("Location not found: " + place);
        return null;
      }
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Failed to fetch location");
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
    setLoading(false);
    if (!startCoords || !endCoords) return;
    setRoute({ start: startCoords, end: endCoords });
  };

  return (
    <div className="bg-paper-raised border border-line shadow-sm rounded-2xl p-5 md:p-6">
      <h2 className="font-display text-lg text-ink mb-4">Find your safest route</h2>

      <div className="space-y-3">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-safe" />
          <input
            type="text"
            className="w-full pl-9 pr-3 py-3 rounded-xl border border-line bg-paper focus:bg-white focus:border-beacon outline-none text-sm transition-colors"
            placeholder="Starting point — e.g. Connaught Place, Delhi"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-alert" />
          <input
            type="text"
            className="w-full pl-9 pr-3 py-3 rounded-xl border border-line bg-paper focus:bg-white focus:border-beacon outline-none text-sm transition-colors"
            placeholder="Destination — e.g. Sector 62, Noida"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className="mt-4 w-full py-3 rounded-xl bg-ink text-paper font-medium text-sm hover:bg-ink/90 active:scale-[0.99] transition-all disabled:opacity-60"
      >
        {loading ? "Searching…" : "Search safe route"}
      </button>
    </div>
  );
}

export default RouteSearch;
