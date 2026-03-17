

import React, { useState } from "react";

function RouteSearch({ setRoute }) {

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  const getCoordinates = async (place) => {

    try {

      const url =
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

      const res = await fetch(url, {
        headers: {
          "Accept": "application/json"
        }
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      if (!data || data.length === 0) {
        alert("Location not found: " + place);
        return null;
      }

      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };

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

    setRoute({
      start: startCoords,
      end: endCoords
    });

  };

  return (
    <div className="bg-white shadow p-4 rounded mb-4">

      <h2 className="text-lg font-semibold mb-3">
        Find Safe Route
      </h2>

      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Start Location (e.g. Delhi)"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <input
        type="text"
        className="border p-2 w-full mb-3"
        placeholder="Destination (e.g. Noida)"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Searching..." : "Search Safe Route"}
      </button>

    </div>
  );
}

export default RouteSearch;