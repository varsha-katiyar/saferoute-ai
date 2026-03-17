
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function TrackPage() {

  const [position, setPosition] = useState([28.6139, 77.2090]);

  useEffect(() => {

    const watchId = navigator.geolocation.watchPosition((pos) => {

      setPosition([
        pos.coords.latitude,
        pos.coords.longitude
      ]);

    });

    return () => navigator.geolocation.clearWatch(watchId);

  }, []);

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} />

    </MapContainer>
  );
}

export default TrackPage;