
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import UserLocation from "./UserLocation";
import SafetyHeatmap from "./SafetyHeatmap";

function MapView({ route }) {

  const [routes, setRoutes] = useState([]);
  const [bestRoute, setBestRoute] = useState([]);

  useEffect(() => {

    if (!route) return;

    const fetchRoute = async () => {

      const { start, end } = route;

      // 🔹 Base route from OSRM
      const url =
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        const baseRoute = data.routes[0].geometry.coordinates.map(coord => [
          coord[1],
          coord[0]
        ]);

        // 🔹 Create 3 variations (simulate multiple routes)
        const route1 = baseRoute;

        const route2 = baseRoute.map(([lat, lng], i) =>
          i % 5 === 0 ? [lat + 0.01, lng] : [lat, lng]
        );

        const route3 = baseRoute.map(([lat, lng], i) =>
          i % 7 === 0 ? [lat, lng + 0.01] : [lat, lng]
        );

        const allRoutes = [route1, route2, route3];

        // 🔹 Safety score logic (consistent)
        const scores = allRoutes.map((r) => {
          const mid = r[Math.floor(r.length / 2)];
          const base = Math.abs(Math.floor((mid[0] + mid[1]) * 10));
          return 60 + (base % 40);
        });

        const bestIndex = scores.indexOf(Math.max(...scores));

        console.log("All Routes:", allRoutes)
        console.log("Scores:", scores)
        console.log("Best Route Index:", bestIndex);

        setRoutes(allRoutes);
        setBestRoute(allRoutes[bestIndex]);

      } catch (err) {
        console.error("Route fetch error:", err);
      }
    };

    fetchRoute();

  }, [route]);

  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🔹 All routes (gray) */}
      {routes.map((r, index) => (
        <Polyline
          key={index}
          positions={r}
          pathOptions={{ color: "gray", weight: 3 }}
        />
      ))}

      {/* 🔹 Best route (green highlight) */}
      {bestRoute.length > 0 && (
        <Polyline
          positions={bestRoute}
          pathOptions={{ color: "green", weight: 6 }}
        />
      )}

      {/* 🔹 Markers */}
      {bestRoute.length > 0 && (
        <>
          <Marker position={bestRoute[0]} />
          <Marker position={bestRoute[bestRoute.length - 1]} />
        </>
      )}

      {/* 🔹 Extra Features */}
      <UserLocation />
      <SafetyHeatmap />

    </MapContainer>
  );
}

export default MapView;
