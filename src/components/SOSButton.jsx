

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

 