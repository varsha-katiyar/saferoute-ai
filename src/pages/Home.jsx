import React from "react";
import { Navigate } from "react-router-dom";

// The dashboard experience now lives in App.jsx (route "/").
// This file is kept as a safe redirect in case anything still links here.
function Home() {
  return <Navigate to="/" replace />;
}

export default Home;
