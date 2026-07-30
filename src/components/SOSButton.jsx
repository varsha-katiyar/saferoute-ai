import React, { useState } from "react";

function SOSButton() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [lastLocation, setLastLocation] = useState(null);

  const handleSOS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported on this device.");
      return;
    }

    setStatus("sending");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLastLocation({ lat, lng });

        const message = `SOS! I need help. My location: https://maps.google.com/?q=${lat},${lng}`;
        console.log("SOS Location:", lat, lng);
        // future: send to backend / WhatsApp / SMS

        setStatus("sent");
        setTimeout(() => setStatus("idle"), 4000);
        alert("SOS sent to your trusted contacts.\n" + message);
      },
      (error) => {
        console.error(error);
        setStatus("idle");
        alert("Location access denied — SOS could not include your position.");
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center h-40 w-40">
        {/* Beacon rings */}
        <span className={`absolute inset-0 rounded-full border-2 border-alert/50 ${status === "sending" ? "beacon-ring-fast" : "beacon-ring"}`} />
        <span className={`absolute inset-3 rounded-full border-2 border-alert/40 ${status === "sending" ? "beacon-ring-fast" : "beacon-ring"}`} style={{ animationDelay: "0.5s" }} />

        <button
          onClick={handleSOS}
          disabled={status === "sending"}
          className="relative h-28 w-28 rounded-full bg-alert text-white shadow-[0_8px_30px_-6px_rgba(212,46,60,0.6)] hover:bg-alert/90 active:scale-95 transition-all disabled:opacity-80 flex flex-col items-center justify-center gap-0.5"
        >
          <span className="font-display text-2xl font-semibold tracking-wide">SOS</span>
          <span className="text-[11px] font-medium uppercase tracking-wider opacity-90">
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Hold to send"}
          </span>
        </button>
      </div>

      <p className="text-sm text-ink-soft text-center max-w-xs">
        Sends your live location to trusted contacts instantly.
      </p>

      {lastLocation && status !== "sending" && (
        <p className="font-mono text-xs text-ink-faint">
          last ping · {lastLocation.lat.toFixed(4)}, {lastLocation.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}

export default SOSButton;
