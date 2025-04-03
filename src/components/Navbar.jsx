import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section className="w-full h-navbar flex items-center justify-between px-2 border-b border-navbar-gray">
      <div className="w-full max-w-60 h-full flex items-center justify-between border-r border-navbar-gray">
        <div className="w-navbar h-full flex items-center justify-center">
          <Link
            hrefLang="'/"
            className="w-logo aspect-square rounded-full bg-white flex items-center justify-center cursor-pointer"
          >
            Logo
          </Link>
        </div>
        <div className="w-47 h-full flex items-center justify-center">
          <h1 className="text-white font-manrope-bold font-bold textlg tracking-title">
            Vertxlabs, Inc
          </h1>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-between px-4">
        <span className="w-full h-full flex items-center justify-start">
          <p className="font-manrope-semi-bold font-semibold text-white">
            Analytics
          </p>
        </span>
        <span className="w-31 h-full flex items-center justify-center border border-navbar-gray border-t-0">
          <p className="font-manrope-semi-bold font-semibold text-white cursor-pointer">
            Activity
          </p>
        </span>
      </div>
      <div className="w-31 h-full flex items-center justify-center">
        <p className="font-manrope-semi-bold font-semibold text-white cursor-pointer">
          Log out
        </p>
      </div>
    </section>
  );
}
