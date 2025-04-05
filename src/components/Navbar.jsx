import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, User, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Function to get current page name from pathname
  const getPageName = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    return path.charAt(1).toUpperCase() + path.slice(2);
  };

  return (
    <section className="w-full h-13 flex items-center justify-between border-b border-primary-gray relative">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex w-full max-w-60 h-full items-center justify-between border-r border-primary-gray">
        <div className="w-13 h-full flex items-center justify-center">
          <Link
            to="/"
            className="w-logo aspect-square rounded-full bg-white flex items-center justify-center cursor-pointer"
          >
            <img
              src="/assets/img/vertex-logo.png"
              alt="Logo"
              className="w-4 h-4 object-cover"
            />
          </Link>
        </div>
        <div className="w-47 h-full flex items-center justify-start ps-6">
          <h1 className="text-white font-manrope-bold font-bold textlg tracking-title">
            Vertxlabs, Inc
          </h1>
        </div>
      </div>
      <div className="hidden lg:flex w-full h-full items-center justify-between px-4">
        <span className="w-full h-full flex items-center justify-start">
          <p className="font-manrope-semi-bold font-semibold text-white">
            {getPageName()}
          </p>
        </span>
        <span className="w-31 h-full flex items-center justify-center border border-primary-gray border-t-0">
          <p className="font-manrope-semi-bold font-semibold text-white cursor-pointer">
            Activity
          </p>
        </span>
      </div>
      <div className="hidden lg:flex w-31 h-full items-center justify-center">
        <p className="font-manrope-semi-bold font-semibold text-white cursor-pointer">
          Log out
        </p>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex w-full h-full items-center justify-between px-4">
        <button className="text-white" onClick={() => setIsMenuOpen(true)}>
          <User size={24} />
        </button>

        <Link
          to="/"
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer"
        >
          <img
            src="/assets/img/vertex-logo.png"
            alt="Logo"
            className="w-5 h-5 object-cover"
          />
        </Link>

        <button className="text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-80 z-50 flex items-start justify-end">
          <div className="w-3/4 h-full bg-primary-black border-l border-primary-gray p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-manrope-bold text-lg">Menu</h2>
              <button
                className="text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-white font-manrope-semi-bold">
                Dashboard
              </Link>
              <Link
                to="/analytics"
                className="text-white font-manrope-semi-bold"
              >
                Analytics
              </Link>
              <Link to="/connect" className="text-white font-manrope-semi-bold">
                Connect
              </Link>
              <Link
                to="/dealroom"
                className="text-white font-manrope-semi-bold"
              >
                Dealroom
              </Link>
              <Link to="/profile" className="text-white font-manrope-semi-bold">
                Profile
              </Link>
              <Link
                to="/settings"
                className="text-white font-manrope-semi-bold"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
