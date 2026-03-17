
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

function SafetyHeatmap() {

  const map = useMap();

  useEffect(() => {

    const heatPoints = [
      [28.7041, 77.1025, 0.9],
      [28.5355, 77.3910, 0.8],
      [28.4595, 77.0266, 0.7],
      [28.6139, 77.2090, 0.6],
    ];

    const heatLayer = L.heatLayer(heatPoints, {
      radius: 25,
      blur: 20,
      maxZoom: 10
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };

  }, [map]);

  return null;
}

export default SafetyHeatmap;