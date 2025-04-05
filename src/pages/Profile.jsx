import { useState } from "react";

const AnalyticsTab = [
  { id: 1, name: "Overview" },
  { id: 2, name: "Portfolio" },
  { id: 3, name: "Experience" },
  { id: 4, name: "Media" },
];

const TabList = ({ tab, activeTab, setActiveTab }) => {
  const changeActiveTab = () => {
    setActiveTab(tab.name);
  };

  return (
    <button
      className={
        tab.name == activeTab
          ? "text-white font-manrope-semi-bold font-semibold text-base px-4 min-w-31 h-full flex items-center justify-center cursor-pointer border border-r-0 border-primary-gray"
          : "text-secondary-gray font-manrope-semi-bold font-semibold text-base px-4 min-w-31 h-full flex items-center justify-center cursor-pointer border border-r-0 border-primary-gray"
      }
      onClick={changeActiveTab}
    >
      {tab.name}
    </button>
  );
};

const ShowOverviewTab = () => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start px-13 pt-8 bg-primary-black">
      <h2 className="text-white font-manrope-bold font-extrabold text-primary-large tracking-title">
        Overview
      </h2>
      <div className="bg-black border border-third-gray rounded-lg w-full h-48 mt-6 flex items-center justify-start px-12 gap-12">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 60C54.5 60 49.7917 58.0417 45.875 54.125C41.9583 50.2083 40 45.5 40 40C40 34.5 41.9583 29.7917 45.875 25.875C49.7917 21.9583 54.5 20 60 20C65.5 20 70.2083 21.9583 74.125 25.875C78.0417 29.7917 80 34.5 80 40C80 45.5 78.0417 50.2083 74.125 54.125C70.2083 58.0417 65.5 60 60 60ZM20 100V86C20 83.1667 20.7292 80.5625 22.1875 78.1875C23.6458 75.8125 25.5833 74 28 72.75C33.1667 70.1667 38.4167 68.2292 43.75 66.9375C49.0833 65.6458 54.5 65 60 65C65.5 65 70.9167 65.6458 76.25 66.9375C81.5833 68.2292 86.8333 70.1667 92 72.75C94.4167 74 96.3542 75.8125 97.8125 78.1875C99.2708 80.5625 100 83.1667 100 86V100H20Z"
            fill="white"
          />
          <path
            d="M60 60C54.5 60 49.7917 58.0417 45.875 54.125C41.9583 50.2083 40 45.5 40 40C40 34.5 41.9583 29.7917 45.875 25.875C49.7917 21.9583 54.5 20 60 20C65.5 20 70.2083 21.9583 74.125 25.875C78.0417 29.7917 80 34.5 80 40C80 45.5 78.0417 50.2083 74.125 54.125C70.2083 58.0417 65.5 60 60 60ZM20 100V86C20 83.1667 20.7292 80.5625 22.1875 78.1875C23.6458 75.8125 25.5833 74 28 72.75C33.1667 70.1667 38.4167 68.2292 43.75 66.9375C49.0833 65.6458 54.5 65 60 65C65.5 65 70.9167 65.6458 76.25 66.9375C81.5833 68.2292 86.8333 70.1667 92 72.75C94.4167 74 96.3542 75.8125 97.8125 78.1875C99.2708 80.5625 100 83.1667 100 86V100H20Z"
            fill="white"
          />
        </svg>
        <div className="w-full flex flex-col items-start gap-2 justify-start max-w-52">
          <span className="w-full flex items-center justify-between">
            <h2 className="text-white font-manrope-bold font-bold text-2xl">
              Mr A
            </h2>
            <img src="/assets/img/Twitter_Verified_Badge.svg" alt="" />
          </span>
          <span className="w-full flex items-center justify-start gap-2 max-w-52">
            <p className="text-white font-manrope-medium text-xs">
              Co-Founder & CEO @Vertx
            </p>
            <img
              src="/assets/img/vertex-logo.svg"
              alt=""
              className="object-cover w-3 h-3"
            />
          </span>
          <button className="bg-white rounded-xs font-jetBrainsMono-medium text-xss min-h-3 min-w-20 mt-1">
            Entrepreneur
          </button>
          <span className="w-full max-w-52 flex items-center justify-start gap-2 mt-4">
            <img src="/assets/img/linkedin.svg" alt="" />
            <img src="/assets/img/x-logo.svg" alt="" />
            <img src="/assets/img/gmail.svg" alt="" />
          </span>
        </div>
      </div>
      <div className="w-full h-auto min-h-70 grid grid-cols-2 gap-4 mt-6">
        <div className="bg-black border border-third-gray rounded-lg w-full min-h-90"></div>
        <div className="bg-black border border-third-gray rounded-lg w-full min-h-90"></div>
      </div>
    </div>
  );
};

function Profile() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-full h-auto flex flex-col items-start">
      <div className="w-full h-13 flex items-center justify-between">
        <ul className="flex justify-start items-center w-full grow h-full border border-t-0 border-third-gray">
          {AnalyticsTab.map((tab) => (
            <TabList
              tab={tab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              key={tab.id}
            />
          ))}
        </ul>
        <button className="text-white font-manrope-semi-bold font-semibold w-31 h-full flex items-center justify-center cursor-pointer border-l border-b border-primary-gray">
          More
        </button>
      </div>
      {activeTab == "Overview" && <ShowOverviewTab />}
    </div>
  );
}
export default Profile;
