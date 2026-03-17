
import React from "react";

function HelpCenters({ destination }) {
  // Mock data for help centers
  const centersData = {
    delhi: [
      { name: "Delhi Police HQ", distance: "2.5 km away", type: "Police Station" },
      { name: "AIIMS Hospital", distance: "4.1 km away", type: "Hospital" },
      { name: "Women Help Desk - CP", distance: "1.2 km away", type: "Help Desk" },
    ],
    noida: [
      { name: "Noida Sector 20 Police Station", distance: "1.8 km away", type: "Police Station" },
      { name: "Kailash Hospital", distance: "3.5 km away", type: "Hospital" },
      { name: "Women Power Line 1090", distance: "Always Active", type: "Help Desk" },
    ],
    default: [
      { name: "Local Police Station", distance: "Nearby", type: "Police Station" },
      { name: "City Hospital", distance: "2 km away", type: "Hospital" },
      { name: "Women Help Desk", distance: "1.5 km away", type: "Help Desk" },
    ]
  };

  // User ne kya search kiya uske basis par data filter karna
  const query = destination?.toLowerCase() || "default";
  const activeCenters = centersData[query] || centersData["default"];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Nearby Help Centers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeCenters.map((center, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-purple-600 hover:shadow-lg transition-all">
            <h4 className="font-bold text-lg text-gray-800">{center.name}</h4>
            <p className="text-purple-600 text-sm font-medium">{center.type}</p>
            <p className="text-gray-500 text-xs mt-1">{center.distance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpCenters;