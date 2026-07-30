import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/help", label: "Help" },
  { to: "/emergency", label: "Emergency" },
];

function BeaconMark() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center shrink-0">
      <span className="absolute h-8 w-8 rounded-full border border-beacon/40" />
      <span className="absolute h-5 w-5 rounded-full border border-beacon/70" />
      <span className="h-2 w-2 rounded-full bg-beacon" />
    </span>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3.5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <BeaconMark />
          <span className="font-display text-lg tracking-tight leading-none">
            SafeRoute <span className="text-beacon italic">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "bg-paper text-ink"
                    : "text-paper/75 hover:text-paper hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="tel:100"
            className="ml-2 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-alert text-white hover:bg-alert/90 transition-colors"
          >
            Call Police
          </a>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden border-t border-white/10 px-5 py-3 flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                pathname === l.to ? "bg-paper text-ink" : "text-paper/80 hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:100"
            className="mt-1 px-3 py-2.5 rounded-lg text-sm font-semibold bg-alert text-white text-center"
          >
            Call Police — 100
          </a>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
