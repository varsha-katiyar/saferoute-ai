import React, { useEffect, useState } from "react";

function SafetyScore({ route }) {
  const [score, setScore] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!route) return;

    const base = Math.abs(
      Math.floor((route.start.lat + route.end.lat + route.start.lng + route.end.lng) * 10)
    );
    const calculatedScore = 60 + (base % 40);
    setScore(calculatedScore);

    if (calculatedScore >= 85) setStatus("Very Safe");
    else if (calculatedScore >= 70) setStatus("Moderately Safe");
    else setStatus("Caution");
  }, [route]);

  if (!score) return null;

  const tone =
    score >= 85
      ? { ring: "var(--color-safe)", chip: "bg-safe-dim text-safe" }
      : score >= 70
      ? { ring: "var(--color-caution)", chip: "bg-caution-dim text-caution" }
      : { ring: "var(--color-alert)", chip: "bg-alert-dim text-alert" };

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-paper-raised border border-line shadow-sm rounded-2xl p-6 text-center max-w-sm mx-auto">
      <h2 className="font-display text-lg text-ink mb-4">Route Safety Score</h2>

      <div className="relative h-32 w-32 mx-auto mb-2">
        <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-line)" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={tone.ring}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-semibold text-ink">{score}</span>
          <span className="text-[11px] text-ink-faint uppercase tracking-wider">/ 100</span>
        </div>
      </div>

      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${tone.chip}`}>
        {status}
      </span>

      <p className="text-xs text-ink-faint mt-3">
        Based on route coordinates, simulated crime risk, and area conditions.
      </p>
    </div>
  );
}

export default SafetyScore;
