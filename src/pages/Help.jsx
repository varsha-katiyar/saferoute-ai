
import React from "react";

function Help() {
  return (
    <div className="p-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
          🆘 Help & Support
        </h1>

        <p className="text-gray-700 text-lg mb-6 text-center">
          SafeRoute AI ensures your travel is safe and stress-free. Follow the steps below to navigate securely.
        </p>

        <div className="space-y-4">
          <div className="flex items-start p-4 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <span className="text-2xl mr-4">1️⃣</span>
            <div>
              <h2 className="font-semibold text-blue-600">Enter Locations</h2>
              <p className="text-gray-600">Provide your starting point and destination to get the safest route.</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <span className="text-2xl mr-4">2️⃣</span>
            <div>
              <h2 className="font-semibold text-blue-600">Find Safe Route</h2>
              <p className="text-gray-600">Click the "Find Safe Route" button to generate your path.</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <span className="text-2xl mr-4">3️⃣</span>
            <div>
              <h2 className="font-semibold text-blue-600">View Route</h2>
              <p className="text-gray-600">The safest route will be displayed with a green line.</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <span className="text-2xl mr-4">4️⃣</span>
            <div>
              <h2 className="font-semibold text-blue-600">Check Safety Score</h2>
              <p className="text-gray-600">Each route has a safety score for your convenience.</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-red-50 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <span className="text-2xl mr-4">🆘</span>
            <div>
              <h2 className="font-semibold text-red-600">Emergency SOS</h2>
              <p className="text-gray-600">In emergencies, use the SOS button to alert your contacts immediately.</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-700">
          Still need help? Contact us at: <a href="mailto:support@saferoute.ai" className="text-blue-600 underline">support@saferoute.ai</a>
        </p>
      </div>
    </div>
  );
}

export default Help;