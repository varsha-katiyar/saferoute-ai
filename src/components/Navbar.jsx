import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/help", label: "Help", icon: "❓" },
    { to: "/emergency", label: "Emergency", icon: "🆘" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-purple-700 shadow-lg" : "bg-purple-600"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg group-hover:bg-white/30 transition-colors">
            🛡️
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">SafeRoute AI</p>
            <p className="text-white/60 text-xs leading-tight hidden sm:block">Safe Navigation for Women</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname === to
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{icon}</span>
              {label}
            </Link>
          ))}
          <Link
            to="/emergency"
            className="ml-3 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
          >
            🚨 SOS
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-700 px-4 py-3 border-t border-white/10">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-colors ${
                location.pathname === to ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10"
              }`}
            >
              <span>{icon}</span> {label}
            </Link>
          ))}
          <Link
            to="/emergency"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm mt-2"
          >
            🚨 SOS Emergency
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
