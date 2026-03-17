
import React from "react";

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">SafeRoute AI</h1>

      <p className="mt-4">
        Find the safest route for your journey using AI-based safety scoring.
      </p>

      <ul className="mt-4 list-disc ml-6">
        <li>🗺️ Smart route selection</li>
        <li>📍 Live location tracking</li>
        <li>🔥 Danger zone heatmap</li>
        <li>🚨 Emergency SOS</li>
      </ul>
    </div>
  );
}

export default Home;