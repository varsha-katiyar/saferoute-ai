
import React from "react";

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
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Nearby Help Centers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeCenters.map((center, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-purple-600 hover:shadow-lg transition-all">
            <h4 className="font-bold text-lg text-gray-800">{center.name}</h4>
            <p className="text-purple-600 text-sm font-medium">{center.type}</p>
            <p className="text-gray-500 text-xs mt-1">{center.distance}</p>
          </div>
        ))}
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

export default HelpCenters;