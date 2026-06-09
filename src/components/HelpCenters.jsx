
import React from "react";

function HelpCenters() {

  const centers = [
    { name: "Police Station", location: "Nearby" },
    { name: "City Hospital", location: "2 km away" },
    { name: "Women Help Desk", location: "1.5 km away" }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Nearby Help Centers</h2>

      {centers.map((c, index) => (
        <div key={index} className="bg-white shadow p-4 mb-3 rounded">
          <h3 className="font-bold">{c.name}</h3>
          <p className="text-gray-600">{c.location}</p>
        </div>
      ))}
    </div>
  );
}

export default HelpCenters;