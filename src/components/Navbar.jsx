import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/help", label: "Help", icon: "❓" },
    { to: "/emergency", label: "Emergency", icon: "🆘" },
  ];

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

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
            className="ml-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
          >
            🚨 SOS
          </Link>

          {/* Profile dropdown */}
          <div className="relative ml-2" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl px-3 py-2 transition-colors"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {initials}
              </div>
              <span className="text-white text-sm font-medium hidden lg:block max-w-[120px] truncate">
                {user?.name || "Profile"}
              </span>
              <span className="text-white/60 text-xs">{profileOpen ? "▲" : "▼"}</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 w-56 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                  <p className="font-semibold text-gray-800 text-sm truncate">{user?.name}</p>
                  <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                  >
                    <span>🚪</span> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-700 px-4 py-3 border-t border-white/10">
          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl mb-3">
            <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
              {initials}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{user?.name}</p>
              <p className="text-white/60 text-xs">{user?.email}</p>
            </div>
          </div>

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
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm mt-1 mb-2"
          >
            🚨 SOS Emergency
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-red-300 hover:bg-white/10 text-sm font-medium transition-colors"
          >
            🚪 Sign out
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
