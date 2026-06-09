
import React, { useState } from "react";

function LiveTracking() {

  const [trackingLink, setTrackingLink] = useState("");

  const startTracking = () => {

    const id = Date.now(); // unique trip id

    const link = `${window.location.origin}/track/${id}`;

    setTrackingLink(link);

    alert("Tracking Started!\nShare this link with family:\n" + link);
  };

  return (
    <div className="text-center my-6">

      <button
        onClick={startTracking}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Start Live Tracking
      </button>

      {trackingLink && (
        <p className="mt-3 text-sm text-gray-600">
          Share this link: {trackingLink}
        </p>
      )}

    </div>
  );
}

export default LiveTracking;