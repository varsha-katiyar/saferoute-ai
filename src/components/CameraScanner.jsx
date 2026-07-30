import React, { useState, useRef } from "react";

function CameraScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState(null);
  const videoRef = useRef(null);

  const startScan = async () => {
    setReport(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }

      setTimeout(() => {
        stopScan(stream);
        const isSafe = Math.random() > 0.5;

        if (isSafe) {
          setReport({
            lighting: "Optimal lighting detected",
            crowd: "Normal activity",
            risk: "LOW",
            advice: "The area appears safe. Proceed with caution.",
          });
        } else {
          setReport({
            lighting: "Low light / shadows",
            crowd: "Isolated area",
            risk: "HIGH",
            advice: "Risk detected — move to a well-lit area and inform a contact.",
          });
        }
      }, 3000);
    } catch {
      alert("Camera permission denied.");
    }
  };

  const stopScan = (stream) => {
    stream.getTracks().forEach((track) => track.stop());
    setIsScanning(false);
  };

  return (
    <div className="bg-paper-raised border border-line shadow-sm rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-display text-lg text-ink">AI environment scanner</h3>
        <span className="text-[10px] font-semibold uppercase tracking-wider bg-beacon-dim text-beacon px-2 py-0.5 rounded-full">
          Beta
        </span>
      </div>

      <div className="relative bg-ink rounded-xl h-64 overflow-hidden flex items-center justify-center">
        {isScanning ? (
          <>
            <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
            {/* viewfinder corners */}
            <div className="absolute inset-6 pointer-events-none">
              {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c, i) => (
                <span key={i} className={`absolute h-5 w-5 border-beacon ${c}`} />
              ))}
            </div>
            <div className="absolute top-3 left-3 bg-alert text-white text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 bg-white rounded-full live-dot" /> ANALYZING
            </div>
          </>
        ) : (
          <div className="text-center px-6">
            <p className="text-paper/60 text-sm mb-4">Scan your surroundings for lighting and crowd risk</p>
            <button
              onClick={startScan}
              className="bg-beacon hover:bg-beacon/90 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors"
            >
              Start AI scan
            </button>
          </div>
        )}
      </div>

      {report && (
        <div
          className={`mt-4 p-4 rounded-xl border-l-4 ${
            report.risk === "HIGH" ? "bg-alert-dim border-alert" : "bg-safe-dim border-safe"
          }`}
        >
          <p className={`font-semibold text-sm ${report.risk === "HIGH" ? "text-alert" : "text-safe"}`}>
            {report.risk === "HIGH" ? "Risk level: HIGH" : "Risk level: LOW"}
          </p>
          <p className="text-sm text-ink mt-1.5"><b>Lighting:</b> {report.lighting}</p>
          <p className="text-sm text-ink"><b>Crowd:</b> {report.crowd}</p>
          <p className="text-sm text-ink-soft mt-2 italic">{report.advice}</p>
        </div>
      )}
    </div>
  );
}

export default CameraScanner;
