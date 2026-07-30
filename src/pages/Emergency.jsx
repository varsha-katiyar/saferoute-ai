import React from "react";
import Navbar from "../components/Navbar";
import SOSButton from "../components/SOSButton";

function Emergency() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-14 text-center">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-alert bg-alert-dim px-3 py-1 rounded-full mb-5">
          Emergency mode
        </span>
        <h1 className="font-display text-3xl text-ink mb-3">
          You're not alone. Help is one tap away.
        </h1>
        <p className="text-ink-soft text-sm mb-10">
          Use the options below to alert your trusted contacts or emergency
          services immediately.
        </p>

        <div className="flex justify-center mb-10">
          <SOSButton />
        </div>

        <div className="space-y-3">
          <a
            href="tel:100"
            className="w-full flex items-center justify-center gap-2 py-4 bg-ink text-paper text-base font-semibold rounded-xl hover:bg-ink/90 transition-colors"
          >
            📞 Call police — 100
          </a>
          <a
            href="tel:+911234567890"
            className="w-full flex items-center justify-center gap-2 py-4 bg-safe text-white text-base font-semibold rounded-xl hover:bg-safe/90 transition-colors"
          >
            👩‍👧 Call trusted contact
          </a>
        </div>

        <p className="mt-8 text-xs text-ink-faint">
          Turn on location services beforehand for the most accurate tracking.
        </p>
      </div>
    </div>
  );
}

export default Emergency;
