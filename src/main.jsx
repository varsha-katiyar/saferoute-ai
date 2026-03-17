import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import "leaflet/dist/leaflet.css";
import TrackPage from "./pages/TrackPage";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Emergency from "./pages/Emergency";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
       <Route path="/" element={<Home />} />
      <Route path="/help" element={<Help />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/track/:id" element={<TrackPage />} />
    </Routes>
  </BrowserRouter>
);
