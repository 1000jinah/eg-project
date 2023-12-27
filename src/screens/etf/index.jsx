import React, { useState } from "react";
import Header from "components/Header";
const MarketsMonitor = () => {
  const tabs = [
    // SUMMARY
    { title: "Tab 1", content: <div>asdasdasdasdasd</div> },
    // EQUITIES
    { title: "Tab 2", content: "Content for Tab 2" },
    // SECTORS
    { title: "Tab 3", content: "Content for Tab 3" },
    // FACTORS
    { title: "Tab 4", content: "Content for Tab 4" },
    // GLOBAL MARKETS
    { title: "Tab 5", content: "Content for Tab 5" },
    // FIXED INCOME
    { title: "Tab 6", content: "Content for Tab 6" },
    // COMMODITIES
    { title: "Tab 7", content: "Content for Tab 7" },
    // MARKET MOVERS
    { title: "Tab 8", content: "Content for Tab 8" },
  ];

  const [activeTab, setActiveTab] = useState(0);

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
