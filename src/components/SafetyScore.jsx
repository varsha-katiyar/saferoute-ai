import React, { useEffect, useState } from "react";

function SafetyScore({ route }) {
  const [score, setScore] = useState(null);
  const [status, setStatus] = useState("");
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (!route) return;
    const base = Math.abs(
      Math.floor((route.start.lat + route.end.lat + route.start.lng + route.end.lng) * 10)
    );
    const calculated = 60 + (base % 40);
    setScore(calculated);
    if (calculated >= 85) setStatus("Very Safe");
    else if (calculated >= 70) setStatus("Moderately Safe");
    else setStatus("Use Caution");

    let current = 0;
    const step = calculated / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= calculated) {
        setAnimatedScore(calculated);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [route]);

  if (!score) return null;

  const getColor = () => {
    if (score >= 85) return { ring: "#22c55e", bg: "bg-green-50", text: "text-green-700", badge: "bg-green-100 text-green-700", icon: "✅" };
    if (score >= 70) return { ring: "#eab308", bg: "bg-yellow-50", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-700", icon: "⚠️" };
    return { ring: "#ef4444", bg: "bg-red-50", text: "text-red-700", badge: "bg-red-100 text-red-700", icon: "🚨" };
  };

  const colors = getColor();
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-base">📊</div>
        <h2 className="text-base font-bold text-gray-800">Route Safety Score</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Circular progress */}
        <div className="relative flex-shrink-0">
          <svg width="110" height="110" className="-rotate-90">
            <circle cx="55" cy="55" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle
              cx="55" cy="55" r="45" fill="none"
              stroke={colors.ring} strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.1s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-extrabold ${colors.text}`}>{animatedScore}%</span>
            <span className="text-gray-400 text-xs">safe</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${colors.badge} mb-3`}>
            <span>{colors.icon}</span> {status}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
              Street lighting level
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
              Area activity index
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
              Proximity to help centers
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center border-t border-gray-50 pt-3">
        Based on simulated crime risk, lighting, and area conditions.
      </p>
    </div>
  );
}

export default SafetyScore;
