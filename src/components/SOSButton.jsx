
// import React from "react";

// function SOSButton() {

//   const handleSOS = () => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const lat = position.coords.latitude;
//       const lng = position.coords.longitude;

//       alert(`Emergency! Location sent: ${lat}, ${lng}`);
//     });
//   };

//   return (
//     <button
//       onClick={handleSOS}
//       className="bg-red-600 text-white px-6 py-3 rounded-full text-lg hover:bg-red-700"
//     >
//       🚨 SOS Emergency
//     </button>
//   );
// }

// export default SOSButton;
import React from "react";

function SOSButton() {
  const handleSOS = () => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        // Abhi ke liye alert, par real app mein yahan Firebase call aayega
        alert(`🚨 EMERGENCY! \nLocation: ${latitude}, ${longitude}\nGoogle Maps Link: ${mapsLink}`);
        
        console.log("Sending to Backend...", { latitude, longitude, time: new Date() });
      },
      (error) => {
        alert("Unable to retrieve your location. Please enable location services.");
      },
      { enableHighAccuracy: true } // Accuracy behtar karne ke liye
    );
  };

  return (
    <div className="flex justify-center my-6">
      <button
        onClick={handleSOS}
        className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-red-700 transition-all active:scale-95 flex items-center gap-2"
      >
        <span>🚨</span> SOS Emergency
      </button>
    </div>
  );
}

export default SOSButton;