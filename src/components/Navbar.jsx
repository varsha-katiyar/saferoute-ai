
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-purple-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          SafeRoute – AI-Based Safe Navigation for Women
        </h1>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/help" className="hover:text-gray-200 transition">Help</Link>
          <Link to="/emergency" className="hover:text-gray-200 transition">Emergency</Link>
        </nav>

        {/* Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden mt-4 flex flex-col gap-4 text-white">
          <Link to="/" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/help" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>Help</Link>
          <Link to="/emergency" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>Emergency</Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;