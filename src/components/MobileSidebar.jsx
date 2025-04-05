import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for sidebar sections
const sidebarSections = [
  {
    id: 1,
    title: "Main Navigation",
    items: [
      { id: 1, name: "Dashboard", link: "/" },
      { id: 2, name: "Analytics", link: "/analytics" },
      { id: 3, name: "Connect", link: "/connect" },
    ],
  },
  {
    id: 2,
    title: "Business",
    items: [
      { id: 1, name: "Dealroom", link: "/dealroom" },
      { id: 2, name: "Projects", link: "/projects" },
      { id: 3, name: "Network", link: "/network" },
    ],
  },
  {
    id: 3,
    title: "Account",
    items: [
      { id: 1, name: "Profile", link: "/profile" },
      { id: 2, name: "Settings", link: "/settings" },
      { id: 3, name: "Help", link: "/help" },
    ],
  },
];

export default function MobileSidebar() {
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState(0);

  const nextSection = () => {
    setCurrentSection((prev) =>
      prev === sidebarSections.length - 1 ? 0 : prev + 1
    );
  };

  const prevSection = () => {
    setCurrentSection((prev) =>
      prev === 0 ? sidebarSections.length - 1 : prev - 1
    );
  };

  return (
    <div className="lg:hidden w-full bg-black border-b border-primary-gray py-4 px-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevSection} className="text-white p-1">
          <ChevronLeft size={20} />
        </button>

        <h3 className="text-white font-manrope-semi-bold text-base">
          {sidebarSections[currentSection].title}
        </h3>

        <button onClick={nextSection} className="text-white p-1">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex justify-between gap-2">
        {sidebarSections[currentSection].items.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className={`flex-1 py-2 px-1 text-center rounded-md ${
              location.pathname === item.link
                ? "bg-primary-gray text-white"
                : "text-secondary-gray"
            }`}
          >
            <span className="text-sm font-manrope-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
