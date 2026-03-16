
import React from "react";

function SOSButton() {

  const handleSOS = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      alert(`Emergency! Location sent: ${lat}, ${lng}`);
    });
  };

  return (
    <button
      onClick={handleSOS}
      className="bg-red-600 text-white px-6 py-3 rounded-full text-lg hover:bg-red-700"
    >
      🚨 SOS Emergency
    </button>
  );
}

export default SOSButton;

 /* import React from "react";

function SOSButton() {

  const sendSOS = () => {

    if (!navigator.geolocation) {
      alert("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {

      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const message =
        `🚨 Emergency! I need help.\nLocation: https://maps.google.com/?q=${lat},${lng}`;

      alert(message);

    });
  };

  return (
    <button
      onClick={sendSOS}
      className="bg-red-600 text-white px-6 py-3 rounded-full text-lg"
    >
      🚨 SOS
    </button>
  );
}

export default SOSButton;*/