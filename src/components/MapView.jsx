

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import UserLocation from "./UserLocation";
import SafetyHeatmap from "./SafetyHeatmap";

function MapView({ route }) {

  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {

    if (!route) return;

    const fetchRoute = async () => {

      const start = route.start;
      const end = route.end;

      const url =
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      const points = data.routes[0].geometry.coordinates.map(coord => [
        coord[1],
        coord[0]
      ]);

      setCoordinates(points);
    };

    fetchRoute();

  }, [route]);

  return (
    <MapContainer center={[28.6139, 77.2090]} zoom={12} style={{ height: "400px", width: "100%" }}>

      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {coordinates.length > 0 && (
        <>
          <Polyline positions={coordinates} />

          <Marker position={coordinates[0]} />

          <Marker position={coordinates[coordinates.length - 1]} />
        </>
      )}

      <UserLocation />
      <SafetyHeatmap />
    </MapContainer>
  );
}

export default MapView;