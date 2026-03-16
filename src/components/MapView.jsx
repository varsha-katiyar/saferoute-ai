

/*import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const center = {
  lat: 28.6139,
  lng: 77.2090
};

function MapView({ route }) {

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (!route) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: route.start,
        destination: route.end,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        }
      }
    );
  }, [route]);

  return (
    <LoadScript googleMapsApiKey="{import.meta.env.VITE_GOOGLE_MAPS_API_KEY}">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;*/

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

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

    </MapContainer>
  );
}

export default MapView;