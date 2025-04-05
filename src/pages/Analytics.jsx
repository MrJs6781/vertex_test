import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import WorldMapComponent from "../components/WorldMapComponent";
import RechartsLineChart from "../components/LineChartRecharts";
import Footer from "../components/Footer";

const AnalyticsTab = [
  { id: 1, name: "Overview" },
  { id: 2, name: "Demographics" },
];
const InsightBoxes = [
  { id: 1, title: "Founders", Score: "7.4K", Rate: "+000%", number: "(000)" },
  { id: 2, title: "Investors", Score: "6.09K", Rate: "+000%", number: "(000)" },
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

const InsightTabs = ({ box }) => {
  return (
    <li className="flex flex-col items-start">
      <h4 className="text-white font-manrope-bold tracking-title">
        {box.title}
      </h4>
      <span className="w-full flex items-start justify-start gap-5">
        <p className="text-white font-manrope-extra-bold font-extrabold tracking-title text-primary-extra-large">
          {box.Score}
        </p>
        <span className="flex flex-col items-start gap-1">
          <p className="text-primary-green text-xs font-manrope-semi-bold">
            {box.Rate}
          </p>
          <p className="text-secondary-gray text-xs font-manrope-semi-bold ps-1">
            {box.number}
          </p>
        </span>
      </span>
    </li>
  );
};

const ShowOverviewTab = () => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start px-4 lg:px-13 pt-6 lg:pt-8 pb-24 lg:pb-8 bg-primary-black">
      <h2 className="text-white font-manrope-bold font-extrabold text-xl lg:text-primary-large tracking-title mb-4">
        Overview
      </h2>

      {/* Responsive Layout for Charts and Insights */}
      <div className="w-full h-auto flex flex-col lg:flex-row items-start justify-start gap-4 mb-4 lg:mb-6">
        {/* Line Chart */}
        <div className="bg-black border border-primary-gray rounded-lg w-full lg:grow h-auto lg:h-70">
          <div className="h-60 lg:h-full">
            <RechartsLineChart />
          </div>
        </div>

        {/* Insights Box */}
        <div className="bg-black border border-primary-gray rounded-lg w-full lg:w-70 p-4 tracking-title flex flex-col items-start">
          <h3 className="text-white font-manrope-bold text-lg lg:text-primary-medium">
            Insights
          </h3>
          <ul className="w-full flex flex-col items-start gap-3 mt-3">
            {InsightBoxes?.map((box) => (
              <InsightTabs box={box} key={box.id} />
            ))}
          </ul>
          <small className="w-full h-0.5 bg-primary-gray mt-2"></small>
          <Link
            to="/"
            className="w-full flex items-center justify-end pt-4 gap-3"
          >
            <p className="text-white font-manrope-medium text-xss">
              View detailed insights
            </p>
            <ArrowRight className="text-white w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* World Map Component */}
      <div className="bg-black border border-primary-gray rounded-lg w-full lg:h-70">
        <WorldMapComponent />
      </div>
    </div>
  );
};

function Analytics() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-full h-auto flex flex-col items-start">
      <div className="w-full h-13 flex items-center justify-between overflow-x-auto">
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
        <button className="whitespace-nowrap text-white font-manrope-semi-bold font-semibold w-31 h-full flex items-center justify-center cursor-pointer border-l border-b border-primary-gray">
          More
        </button>
      </div>
      {activeTab == "Overview" && <ShowOverviewTab />}

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
export default Analytics;
