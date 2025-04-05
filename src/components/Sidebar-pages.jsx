import React from "react";
import { Link, useLocation } from "react-router-dom";

const pageLists = [
  { id: 1, name: "Dashboard", address: "/" },
  { id: 2, name: "Analytics", address: "/analytics" },
  { id: 3, name: "Connect", address: "/connect" },
  { id: 4, name: "Dealroom", address: "/dealroom" },
  { id: 5, name: "Profile", address: "/profile" },
  { id: 6, name: "Settings", address: "/settings" },
];

export default function SidebarPages() {
  const location = useLocation();

  return (
    <div className="w-47 h-full min-h-screen flex items-start justify-start border-r border-primary-gray">
      <ul className="w-fit min-w-20 flex flex-col items-start justify-start gap-logo ps-6 pt-5">
        {pageLists?.map((page) => (
          <Link
            key={page.id}
            to={page.address}
            className={
              page.address == location.pathname
                ? "text-white font-manrope-bold font-bold tracking-title"
                : "text-secondary-gray font-manrope-bold font-bold tracking-title"
            }
          >
            {page.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
