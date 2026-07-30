import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function TrackPage() {
  const [position, setPosition] = useState([28.6139, 77.209]);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
      setLastUpdate(new Date());
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-ink text-paper px-4 py-2 rounded-full flex items-center gap-2 shadow-lg text-sm">
        <span className="h-2 w-2 rounded-full bg-safe live-dot" />
        Live — updated {lastUpdate ? lastUpdate.toLocaleTimeString() : "just now"}
      </div>

      <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
}

export default TrackPage;
