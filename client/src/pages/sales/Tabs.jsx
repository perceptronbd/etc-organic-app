import React, { useState } from "react";

const Tab = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`${
        isActive ? "bg-white hover:bg-white" : " "
      } text-accent-secondary rounded-t-md px-4 py-2 font-semibold transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const TabPanel = ({ children, isActive }) => {
  return isActive ? <>{children}</> : null;
};

export const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="w-full ">
      <div className="flex ">
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            label={tab.label}
            isActive={tab.label === activeTab}
            onClick={() => handleTabClick(tab.label)}
          />
        ))}
      </div>
      <div>
        {tabs.map((tab) => (
          <TabPanel key={tab.label} isActive={tab.label === activeTab}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};
