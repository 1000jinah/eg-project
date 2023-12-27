import React, { useState } from "react";
import Header from "components/Header";
import Chart from "components/pyline/PyramidLine";
import PyramidAndLineChart from "components/pyline/PyramidDemo";
import PyramidAndLineOneChart from "components/pyline/PyramidDemoUpOne";
import PyramidAndLineTwoChart from "components/pyline/PyramidDemoUpTwo";
import PyramidDemoUpThreeChart from "components/pyline/PyramidDemoUpThree";
import SolarEmploymentChart from "components/stackline/StackLineDemo";
const MarketsMonitor = () => {
  const tabs = [
    // SUMMARY
    { title: "Tab 1", content: <Chart/> },
    // EQUITIES
    { title: "Tab 2", content: <PyramidAndLineChart/> },
    // SECTORS
    { title: "Tab 3", content: <PyramidAndLineOneChart/> },
    // FACTORS
    { title: "Tab 4", content:<PyramidAndLineTwoChart/> },
    // GLOBAL MARKETS
    { title: "Tab 5", content:<PyramidDemoUpThreeChart/> },
    // FIXED INCOME
    { title: "Tab 6", content: <SolarEmploymentChart/> },
    // COMMODITIES
    { title: "Tab 7", content: "Content for Tab 7" },
    // MARKET MOVERS
    { title: "Tab 8", content: "Content for Tab 8" },
  ];

  const [activeTab, setActiveTab] = useState(3);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div>
      <Header />
      <div style={{ margin: 20 }}>
        {/* Market Monitor */}

        {/* Tabs */}
        <div>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              style={{
                padding: "10px",
                margin: "5px",
                backgroundColor: activeTab === index ? "#ddd" : "#fff",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div>
          {/* Content for the active tab */}
          <p>{tabs[activeTab].content}</p>
        </div>
      </div>
    </div>
  );
};

export default MarketsMonitor;
