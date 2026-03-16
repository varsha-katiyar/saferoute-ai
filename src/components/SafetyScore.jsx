
import React, { useEffect, useState } from "react";

function SafetyScore({ route }) {

  const [score, setScore] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {

    if (!route) return;

    // Fake AI scoring logic for demo
    const randomScore = Math.floor(Math.random() * 40) + 60;

    setScore(randomScore);

    if (randomScore >= 85) {
      setStatus("Very Safe");
    } 
    else if (randomScore >= 70) {
      setStatus("Moderately Safe");
    } 
    else {
      setStatus("Caution");
    }

  }, [route]);

  if (!score) return null;

  const getColor = () => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-yellow-400";
    return "bg-red-500";
  };

  return (

    <div className="bg-white shadow p-6 rounded text-center max-w-md mx-auto mt-6">

      <h2 className="text-xl font-bold mb-3">
        Route Safety Score
      </h2>

      <div className={`text-white text-3xl font-bold p-4 rounded ${getColor()}`}>
        {score}%
      </div>

      <p className="mt-3 text-gray-700">
        Status: <span className="font-semibold">{status}</span>
      </p>

      <p className="text-sm text-gray-500 mt-2">
        Based on simulated crime data, lighting, and crowd density.
      </p>

    </div>

  );
}

export default SafetyScore;