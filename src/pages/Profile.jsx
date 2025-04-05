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
      <div className="bg-black border border-primary-gray rounded-lg w-full h-48 mt-6"></div>
      <div className="w-full h-auto min-h-70 grid grid-cols-2 gap-4 mt-6">
        <div className="bg-black border border-primary-gray rounded-lg w-full min-h-90"></div>
        <div className="bg-black border border-primary-gray rounded-lg w-full min-h-90"></div>
      </div>
    </div>
  );
};

function Profile() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-full h-auto flex flex-col items-start">
      <div className="w-full h-13 flex items-center justify-between">
        <ul className="flex justify-start items-center w-full grow h-full border border-t-0 border-primary-gray">
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
