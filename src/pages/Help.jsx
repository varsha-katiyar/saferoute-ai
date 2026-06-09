import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const steps = [
  {
    icon: "📍",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
    title: "Enter Your Locations",
    desc: "Type your start point and destination, or tap 'My Location' to auto-detect your position.",
  },
  {
    icon: "🛡️",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    title: "Search Safe Route",
    desc: "Click 'Search Safe Route'. Our AI analyzes multiple paths and picks the safest one highlighted in green.",
  },
  {
    icon: "📊",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    title: "Check Safety Score",
    desc: "Each route is scored 0–100% based on lighting, area activity, and proximity to help centers.",
  },
  {
    icon: "📡",
    color: "bg-teal-50 border-teal-200",
    iconBg: "bg-teal-100",
    title: "Share Live Location",
    desc: "Start live tracking and copy the link to share with family or trusted contacts before you travel.",
  },
  {
    icon: "💬",
    color: "bg-pink-50 border-pink-200",
    iconBg: "bg-pink-100",
    title: "Ask the AI Assistant",
    desc: "Tap the 💬 button (bottom right) to ask our AI for route-specific safety advice, emergency tips, and more.",
  },
  {
    icon: "🚨",
    color: "bg-red-50 border-red-200",
    iconBg: "bg-red-100",
    title: "Use SOS in Emergencies",
    desc: "Press the SOS button to instantly generate an alert with your GPS location to share with contacts or call for help.",
  },
];

const faqs = [
  {
    q: "Does the app need location permission?",
    a: "Yes — for the map, SOS, and live tracking features. Location is never stored on servers.",
  },
  {
    q: "How does the safety score work?",
    a: "It's calculated using simulated area data including lighting levels, crowd density, and proximity to help centers.",
  },
  {
    q: "Is the AI assistant free to use?",
    a: "The AI assistant requires a Gemini API key (VITE_GEMINI_API_KEY). You can get one free from Google AI Studio.",
  },
];

function Help() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">❓</div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Learn how to use SafeRoute AI to travel safely. Follow the steps below to get started.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 rounded-2xl border ${step.color} transition-shadow hover:shadow-md`}
            >
              <div className={`w-11 h-11 ${step.iconBg} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                {step.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 bg-white/60 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200">{i + 1}</span>
                  <h2 className="font-bold text-gray-800 text-sm">{step.title}</h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
            <span>🙋</span> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <p className="font-semibold text-gray-800 text-sm mb-1">Q: {faq.q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
          <p className="text-gray-600 text-sm mb-4">Need emergency help right now?</p>
          <Link
            to="/emergency"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md"
          >
            🆘 Go to Emergency Page
          </Link>
          <p className="mt-4 text-gray-400 text-xs">
            Questions? Email us at{" "}
            <a href="mailto:support@saferoute.ai" className="text-purple-600 underline">
              support@saferoute.ai
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Help;
