import React from "react";
import Navbar from "../components/Navbar";

const STEPS = [
  { n: "01", title: "Enter locations", body: "Add your starting point and destination to get the safest route." },
  { n: "02", title: "Search safe route", body: "Tap \"Search safe route\" to generate your path and alternatives." },
  { n: "03", title: "Review the map", body: "The safest option is highlighted in green on the live map." },
  { n: "04", title: "Check the safety score", body: "Every route carries a live-scored dial so you know before you go." },
];

function Help() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-14">
        <h1 className="font-display text-3xl text-ink text-center mb-3">
          Help &amp; support
        </h1>
        <p className="text-ink-soft text-center mb-10">
          A quick walkthrough of how SafeRoute AI keeps your trips safer.
        </p>

        <div className="space-y-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="flex items-start gap-4 p-4 bg-paper-raised border border-line rounded-xl"
            >
              <span className="font-mono text-xs text-beacon pt-0.5">{s.n}</span>
              <div>
                <h2 className="font-semibold text-sm text-ink">{s.title}</h2>
                <p className="text-sm text-ink-soft mt-0.5">{s.body}</p>
              </div>
            </div>
          ))}

          <div className="flex items-start gap-4 p-4 bg-alert-dim border border-alert/20 rounded-xl">
            <span className="font-mono text-xs text-alert pt-0.5">SOS</span>
            <div>
              <h2 className="font-semibold text-sm text-alert">Emergency SOS</h2>
              <p className="text-sm text-ink-soft mt-0.5">
                In an emergency, tap the SOS button to alert your contacts with your live location instantly.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-ink-soft">
          Still need help? Write to{" "}
          <a href="mailto:support@saferoute.ai" className="text-beacon font-medium underline underline-offset-2">
            support@saferoute.ai
          </a>
        </p>
      </div>
    </div>
  );
}

export default Help;
