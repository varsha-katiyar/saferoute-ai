
import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

function UserLocation() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setPosition(coords);
      map.setView(coords, 14);
    });
  }, [map]);

  if (!position) return null;

  return (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default UserLocation;