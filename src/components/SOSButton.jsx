

import React from "react";

function SOSButton() {

  const handleSOS = () => {

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const message = `🚨 SOS! I need help. My location: https://maps.google.com/?q=${lat},${lng}`;

        alert("SOS Sent!\n" + message);

        console.log("SOS Location:", lat, lng);

        // 👉 future: send to backend / WhatsApp / SMS

      },
      (error) => {
        console.error(error);
        alert("Location access denied!");
      }
    );
  };

  return (
    <button
      onClick={handleSOS}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      🚨 SOS Emergency
    </button>
  );
}

export default SOSButton;

 