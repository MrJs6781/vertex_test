import React from "react";

export default function Navbar() {
  return (
    <section className="w-full h-navbar flex items-center justify-between p-2">
      <div className="w-full max-w-60 flex items-center justify-between">
        <div className="w-navbar h-full flex items-center justify-center">
          <span className="w-logo aspect-square rounded-full bg-white flex items-center justify-center cursor-pointer">
            Logo
          </span>
        </div>
        <div className=""></div>
      </div>
      <div className=""></div>
      <div className=""></div>
    </section>
  );
}
