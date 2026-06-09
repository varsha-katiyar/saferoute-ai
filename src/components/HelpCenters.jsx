import React from "react";

const centers = [
  { icon: "👮", name: "Police Station", location: "Nearby • ~0.8 km", color: "bg-blue-50 border-blue-200", iconBg: "bg-blue-100", badge: "bg-blue-100 text-blue-700", badgeLabel: "Emergency" },
  { icon: "🏥", name: "City Hospital", location: "~2 km away", color: "bg-green-50 border-green-200", iconBg: "bg-green-100", badge: "bg-green-100 text-green-700", badgeLabel: "Medical" },
  { icon: "🤝", name: "Women Help Desk", location: "~1.5 km away", color: "bg-purple-50 border-purple-200", iconBg: "bg-purple-100", badge: "bg-purple-100 text-purple-700", badgeLabel: "Support" },
  { icon: "🔦", name: "Safe Zone Area", location: "~0.5 km away", color: "bg-yellow-50 border-yellow-200", iconBg: "bg-yellow-100", badge: "bg-yellow-100 text-yellow-700", badgeLabel: "Refuge" },
];

function HelpCenters() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-base">📌</div>
        <h2 className="text-base font-bold text-gray-800">Nearby Help Centers</h2>
        <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Simulated</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {centers.map((c, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-xl border ${c.color} transition-shadow hover:shadow-md cursor-pointer`}
          >
            <div className={`w-10 h-10 ${c.iconBg} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
              {c.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>{c.badgeLabel}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{c.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpCenters;
