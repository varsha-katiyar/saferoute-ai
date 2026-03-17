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

      // AI Analysis Simulation (3 seconds)
      setTimeout(() => {
        stopScan(stream);

        // --- DYNAMIC LOGIC ADDED HERE ---
        // 50-50 chance to show High or Low risk
        const isSafe = Math.random() > 0.5; 

        if (isSafe) {
          setReport({
            lighting: "Optimal Lighting Detected",
            crowd: "Normal Activity",
            risk: "LOW",
            advice: "The area appears safe. Proceed with caution."
          });
        } else {
          setReport({
            lighting: "Low Light / Shadows",
            crowd: "Isolated Area",
            risk: "HIGH",
            advice: "Risk detected! Move to a well-lit area and inform a contact."
          });
        }
      }, 3000);
    } catch (err) {
      alert("Camera Permission Denied!");
    }
  };

  const stopScan = (stream) => {
    stream.getTracks().forEach(track => track.stop());
    setIsScanning(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-purple-100 mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        📷 AI Environment Scanner <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">BETA</span>
      </h3>

      <div className="relative bg-slate-900 rounded-xl h-64 overflow-hidden shadow-inner flex items-center justify-center">
        {isScanning ? (
          <>
            <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-[3px] border-purple-500 animate-pulse"></div>
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span> AI ANALYZING
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            <p className="text-gray-400 text-sm mb-4">Click to scan surroundings for safety risks</p>
            <button 
              onClick={startScan}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg"
            >
              Start AI Scan
            </button>
          </div>
        )}
      </div>

      {report && (
        <div className={`mt-4 p-4 rounded-xl border-l-4 transition-all duration-500 ${
          report.risk === 'HIGH' ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'
        }`}>
          <div>
            <p className={`font-bold ${report.risk === 'HIGH' ? 'text-red-700' : 'text-green-700'}`}>
              {report.risk === 'HIGH' ? '⚠️ Risk Level: HIGH' : '✅ Risk Level: LOW'}
            </p>
            <p className="text-sm text-gray-700 mt-1"><b>Lighting:</b> {report.lighting}</p>
            <p className="text-sm text-gray-700"><b>Crowd:</b> {report.crowd}</p>
            <p className="text-sm text-gray-600 mt-2 italic">"{report.advice}"</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraScanner;