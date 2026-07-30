import React from "react";

const ICONS = {
  Police: "🛡",
  Hospital: "✚",
  "Women Help Desk": "☎",
};

function iconFor(name) {
  const key = Object.keys(ICONS).find((k) => name.includes(k));
  return ICONS[key] || "📍";
}

function HelpCenters() {
  const centers = [
    { name: "Police Station", location: "Nearby", eta: "3 min" },
    { name: "City Hospital", location: "2 km away", eta: "8 min" },
    { name: "Women Help Desk", location: "1.5 km away", eta: "6 min" },
  ];

  return (
    <div>
      <h2 className="font-display text-xl text-ink mb-4">Nearby help centers</h2>

      <div className="grid gap-3 sm:grid-cols-3">
        {centers.map((c, index) => (
          <div
            key={index}
            className="bg-paper-raised border border-line rounded-2xl p-4 flex items-start gap-3 hover:border-beacon/50 hover:shadow-sm transition-all"
          >
            <span className="h-9 w-9 shrink-0 rounded-full bg-safe-dim text-safe flex items-center justify-center text-base">
              {iconFor(c.name)}
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-ink truncate">{c.name}</h3>
              <p className="text-xs text-ink-soft mt-0.5">{c.location}</p>
              <p className="font-mono text-[11px] text-ink-faint mt-1">~{c.eta} away</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpCenters;
