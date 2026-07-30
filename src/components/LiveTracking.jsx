import React, { useState } from "react";

function LiveTracking() {
  const [trackingLink, setTrackingLink] = useState("");
  const [copied, setCopied] = useState(false);

  const startTracking = () => {
    const id = Date.now();
    const link = `${window.location.origin}/track/${id}`;
    setTrackingLink(link);
    setCopied(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(trackingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed — select and copy the link manually.");
    }
  };

  return (
    <div className="bg-paper-raised border border-line rounded-2xl p-6 text-center max-w-md mx-auto">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="h-2 w-2 rounded-full bg-safe live-dot" />
        <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">Live tracking</span>
      </div>
      <h3 className="font-display text-lg text-ink mb-4">Let someone follow your trip</h3>

      <button
        onClick={startTracking}
        className="w-full py-3 rounded-xl bg-safe text-white font-medium text-sm hover:bg-safe/90 active:scale-[0.99] transition-all"
      >
        Start live tracking
      </button>

      {trackingLink && (
        <div className="mt-4 flex items-center gap-2 bg-paper border border-line rounded-lg p-2.5">
          <span className="font-mono text-xs text-ink-soft truncate flex-1 text-left">
            {trackingLink}
          </span>
          <button
            onClick={copyLink}
            className="text-xs font-semibold text-beacon shrink-0 px-2 py-1 rounded-md hover:bg-beacon-dim transition-colors"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

export default LiveTracking;
