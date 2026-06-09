
import React from "react";

function Emergency() {
  return (
    <div className="p-8 bg-gradient-to-b from-red-50 to-white min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow-2xl rounded-3xl p-8 text-center">
        <h1 className="text-4xl font-extrabold text-red-600 mb-6 animate-pulse">
          🆘 Emergency Alert
        </h1>

        <p className="text-gray-700 text-lg mb-8">
          If you are in danger or need immediate assistance, use the options below to alert your trusted contacts or emergency services instantly.
        </p>

        <div className="space-y-6">
          {/* SOS Button */}
          <button className="w-full py-4 bg-red-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-red-700 transition duration-300 animate-pulse">
            🚨 Send SOS
          </button>

          {/* Call Police */}
          <a href="tel:100" className="w-full block py-4 bg-blue-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-blue-700 transition duration-300">
            📞 Call Police
          </a>

          {/* Call Trusted Contact */}
          <a href="tel:+911234567890" className="w-full block py-4 bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-green-700 transition duration-300">
            👩‍👧 Call Trusted Contact
          </a>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          Make sure your location services are enabled for accurate tracking.
        </p>
      </div>
    </div>
  );
}

export default Emergency;