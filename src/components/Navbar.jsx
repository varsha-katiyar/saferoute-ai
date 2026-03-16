
import React from "react";

function Navbar() {
  return (
    <div className="bg-purple-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">SafeRoute–AI-Based Safe Navigation for Women</h1>
      <div className="space-x-6">
        <button>Home</button>
        <button>Map</button>
        <button>Emergency</button>
      </div>
    </div>
  );
}

export default Navbar;