import React, { useState } from "react";
const InputWithButton = ({
  label,
  showInput,
  options,
  selectedOption,
  onOptionClick,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      width: 500,
      marginBottom: 15,
    }}
  >
    <span style={{ marginRight: 15, fontWeight: "bold", textAlign: "right" }}>
      {" "}
      {label}
    </span>
    {showInput ? (
      <input type="text" value={options} readOnly />
    ) : (
      <div style={{ display: "flex" }}>
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => onOptionClick(option)}
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              padding: 4,
              minWidth: 120,
              border:
                selectedOption && selectedOption.value === option.value
                  ? "1px solid lightblue"
                  : "1px solid #eee",
              backgroundColor:
                selectedOption && selectedOption.value === option.value
                  ? "lightblue"
                  : "inherit",
            }}
          >
            {option.text}
            <br />${option.value}
          </div>
        ))}
      </div>
    )}
  </div>
);
const Panel = ({ title, isOpen, onClick, children }) => (
  <div className={`panel ${isOpen ? "collapse" : "collapsing"}`}>
    <div className="panel-header" onClick={onClick}>
      {title}
    </div>
    <div className={`panel-body ${isOpen ? "collapse" : "collapsing"}`}>
      {children}
    </div>
  </div>
);

const Calculate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("tab1");
  const [hasCalculated, setHasCalculated] = useState(false);
  // Function to handle the "Calculate" button click
  const handleCalculateClick = () => {
    // Perform calculations here and update calculationResults state
    // You can replace the following with your actual calculations

    setCalculationResults({
      essentialsResult:
        selectedOptions.fooddrink.value +
        selectedOptions.clothing.value +
        selectedOptions.householdbills.value +
        selectedOptions.healthcare.value +
        selectedOptions.publicTransport.value,
      desirablesResult:
        selectedOptions.homeImprovements.value +
        selectedOptions.carMaintenance.value +
        selectedOptions.leisureHobbies.value,

      luxuriesResult:
        selectedOptions.treats.value +
        selectedOptions.restaurants.value +
        selectedOptions.holidays.value +
        selectedOptions.gifts.value,

      targetResult:
        selectedOptions.fooddrink.value +
        selectedOptions.clothing.value +
        selectedOptions.householdbills.value +
        selectedOptions.healthcare.value +
        selectedOptions.publicTransport.value +
        selectedOptions.homeImprovements.value +
        selectedOptions.carMaintenance.value +
        selectedOptions.leisureHobbies.value +
        selectedOptions.treats.value +
        selectedOptions.restaurants.value +
        selectedOptions.holidays.value +
        selectedOptions.gifts.value,
    });

    // Set the flag to true after calculations
    setHasCalculated(true);
  };
  // State object to manage multiple dropdowns
  const [dropdownStates, setDropdownStates] = useState({
    tab1: {
      dropdown1: true,
      dropdown2: true,
      dropdown3: true,
    },
    tab2: {
      dropdown1: false,
    },
    tab3: false,
    tab4: false,
    tab5: false,
  });

  const [inputValues, setInputValues] = useState({
    initialAmount: 15000,
    monthlyAmount: 200,
    savings: "",
  });
  console.log(inputValues, "inputValuesF");

  const [selectedOptions, setSelectedOptions] = useState({
    fooddrink: { value: 3895, text: "Mid" },
    clothing: { value: 1085, text: "Mid" },
    householdbills: { value: 5934, text: "Mid" },
    healthcare: { value: 1340, text: "Mid" },
    publicTransport: { value: 652, text: "Mid" },
    homeImprovements: { value: 2143, text: "Mid" },
    carMaintenance: { value: 1257, text: "Mid" },
    leisureHobbies: { value: 2800, text: "Mid" },
    treats: { value: 1251, text: "Mid" },
    restaurants: { value: 1517, text: "Mid" },
    holidays: { value: 3295, text: "Mid" },
    gifts: { value: 667, text: "Mid" },
  });

  console.log(selectedOptions, "selectedOptions");
  const [calculationResults, setCalculationResults] = useState({
    essentialsResult: "",
    desirablesResult: "",
    luxuriesResult: "",
    targetResult: "",
  });
  // Handler to update input values
  const handleInputChange = (field, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Handler to update selected options (for Yes/No options)
  const handleOptionSelect = (field, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [field]: option,
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    // Close all dropdowns when changing tabs
    setDropdownStates((prevStates) => {
      const updatedStates = { ...prevStates };
      Object.keys(updatedStates).forEach((key) => {
        updatedStates[key] = { dropdown1: false };
      });
      return updatedStates;
    });
  };
  const togglePanel = (tab, panel) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [tab]: { ...prevStates[tab], [panel]: !prevStates[tab][panel] },
    }));
  };

  // Define content for each tab
  const tabContents = {
    tab1: (
      <div>
        <h3>Budget Planner Retirement</h3>
        <div style={{ fontSize: 12, color: "#c3c3c3", marginBottom: 15 }}>
          This API calculates the total net target required to meet expenses in
          retirement and then provides the gross target that will be required to
          meet this target based on current income tax bands and rates.
          <br />
          The API includes sample living costs to help a user decide how much
          money they might need in retirement. The data is sourced from the
          office of national statistics and based on the amount people currently
          spend in retirement.
        </div>
        <div style={{ marginBottom: 15 }}>
          <span style={{ fontSize: 16 }}>Try it out</span>
          <br />
          <span style={{ fontSize: 14 }}>
            Use the inputs below and click ‘Calculate’ to demonstrate sample
            results from this API:
          </span>
        </div>
        {/* Essentials */}
        <Panel
          title="Essentials"
          isOpen={dropdownStates.tab1.dropdown1}
          onClick={() => togglePanel("tab1", "dropdown1")}
        >
          <InputWithButton
            label="Food & Drink"
            showInput={false}
            options={[
              { value: 3441, text: "Low" },
              { value: 3895, text: "Mid" },
              { value: 5319, text: "High" },
            ]}
            selectedOption={selectedOptions.fooddrink}
            onOptionClick={(option) => handleOptionSelect("fooddrink", option)}
          />

          <InputWithButton
            label="Clothing"
            showInput={false}
            selectedOption={selectedOptions.clothing}
            options={[
              { value: 673, text: "Low" },
              { value: 1085, text: "Mid" },
              { value: 2200, text: "High" },
            ]}
            onOptionClick={(option) => handleOptionSelect("clothing", option)}
          />
          <InputWithButton
            label="Household bills"
            showInput={false}
            selectedOption={selectedOptions.householdbills}
            options={[
              { value: 4422, text: "Low" },
              { value: 5934, text: "Mid" },
              { value: 11998, text: "High" },
            ]}
            onOptionClick={(option) =>
              handleOptionSelect("householdbills", option)
            }
          />
          <InputWithButton
            label="Healthcare"
            showInput={false}
            selectedOption={selectedOptions.healthcare}
            options={[
              { value: 464, text: "Low" },
              { value: 1340, text: "Mid" },
              { value: 2300, text: "High" },
            ]}
            onOptionClick={(option) => handleOptionSelect("healthcare", option)}
          />
          <InputWithButton
            label="Public transport"
            showInput={false}
            selectedOption={selectedOptions.publicTransport}
            options={[
              { value: 302, text: "Low" },
              { value: 652, text: "Mid" },
              { value: 1152, text: "High" },
            ]}
            onOptionClick={(option) =>
              handleOptionSelect("publicTransport", option)
            }
          />
        </Panel>
        {/* Desirables */}
        <Panel
          title="Desirables"
          isOpen={dropdownStates.tab1.dropdown2}
          onClick={() => togglePanel("tab1", "dropdown2")}
        >
          <InputWithButton
            label="Home improvements"
            showInput={false}
            selectedOption={selectedOptions.homeImprovements}
            options={[
              { value: 897, text: "Low" },
              { value: 2143, text: "Mid" },
              { value: 3358, text: "High" },
            ]}
            onOptionClick={(option) =>
              handleOptionSelect("homeImprovements", option)
            }
          />
          <InputWithButton
            label="Car maintenance"
            showInput={false}
            selectedOption={selectedOptions.carMaintenance}
            options={[
              { value: 579, text: "Low" },
              { value: 1257, text: "Mid" },
              { value: 2216, text: "High" },
            ]}
            onOptionClick={(option) =>
              handleOptionSelect("carMaintenance", option)
            }
          />
          <InputWithButton
            label="Leisure and hobbies"
            showInput={false}
            selectedOption={selectedOptions.leisureHobbies}
            options={[
              { value: 944, text: "Low" },
              { value: 2800, text: "Mid" },
              { value: 5579, text: "High" },
            ]}
            onOptionClick={(option) =>
              handleOptionSelect("leisureHobbies", option)
            }
          />
        </Panel>
        {/* Luxuries */}
        <Panel
          title="Luxuries"
          isOpen={dropdownStates.tab1.dropdown3}
          onClick={() => togglePanel("tab1", "dropdown3")}
        >
          <InputWithButton
            label="Treats"
            showInput={false}
            selectedOption={selectedOptions.treats}
            options={[
              { value: 574, text: "Low" },
              { value: 1251, text: "Mid" },
              { value: 2211, text: "High" },
            ]}
            onOptionClick={(option) => handleOptionSelect("treats", option)}
          />
          <InputWithButton
            label="Restaurants"
            showInput={false}
            selectedOption={selectedOptions.restaurants}
            options={[
              { value: 793, text: "Low" },
              { value: 1517, text: "Mid" },
              { value: 3306, text: "High" },
            ]}
            onOptionClick={(option) =>
              handleOptionSelect("restaurants", option)
            }
          />
          <InputWithButton
            label="Holidays"
            showInput={false}
            selectedOption={selectedOptions.holidays}
            options={[
              { value: 1205, text: "Low" },
              { value: 3295, text: "Mid" },
              { value: 6643, text: "High" },
            ]}
            onOptionClick={(option) => handleOptionSelect("holidays", option)}
          />
          <InputWithButton
            label="Gifts"
            showInput={false}
            selectedOption={selectedOptions.gifts}
            options={[
              { value: 245, text: "Low" },
              { value: 667, text: "Mid" },
              { value: 1627, text: "High" },
            ]}
            onOptionClick={(option) => handleOptionSelect("gifts", option)}
          />
        </Panel>
      </div>
    ),
    tab2: (
      <div>
        <h3>Life Expectancy </h3>
        <div
          className={`dropdown ${dropdownStates.tab2.dropdown1 ? "open" : ""}`}
        ></div>
      </div>
    ),
    tab3: (
      <div>
        <h3>LISA vs Pension </h3>
        <div
          className={`dropdown ${dropdownStates.tab3.dropdown1 ? "open" : ""}`}
        ></div>
      </div>
    ),
    tab4: (
      <div>
        <h3>Portfolio Optimisation </h3>
        <div
          className={`dropdown ${dropdownStates.tab4.dropdown1 ? "open" : ""}`}
        ></div>
      </div>
    ),
    tab5: (
      <div>
        <h3>State Benefit Age </h3>
        <div className={`dropdown ${dropdownStates.tab5 ? "open" : ""}`}></div>
      </div>
    ),
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="tab" onClick={() => handleTabClick("tab1")}>
          Affordability Calculator
        </div>
        <div className="tab" onClick={() => handleTabClick("tab2")}>
          Life Expectancy
        </div>
        <div className="tab" onClick={() => handleTabClick("tab3")}>
          Lisa Vs Pension
        </div>
        <div className="tab" onClick={() => handleTabClick("tab4")}>
          Portfolio Optimisation
        </div>
        <div className="tab" onClick={() => handleTabClick("tab5")}>
          State Benefit Age
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: isSidebarOpen === true ? 220 : 20,
          top: "50%",
        }}
      >
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
      </div>
      <div>
        <div className="content-box">
          {tabContents[selectedTab]}
          <button onClick={handleCalculateClick}>Calculate</button>
          {/* Results (display only if calculations have been performed) */}
          {hasCalculated && (
            <div className="result">
              <h2>Calculation Results</h2>
              <table>
                <thead>
                  <tr>
                    <th>Essentials</th>
                    <th>Desirables</th>
                    <th>Luxuries</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{Math.floor(calculationResults.essentialsResult)}</td>

                    <td>{Math.floor(calculationResults.desirablesResult)}</td>

                    <td>{Math.floor(calculationResults.luxuriesResult)}</td>

                    <td>{Math.floor(calculationResults.targetResult)}</td>
                  </tr>
                </tbody>
              </table>

              <h2>Calculation Results</h2>
              <table>
                <thead>
                  <tr>
                    <th>Essentials</th>
                    <th>Desirables</th>
                    <th>Luxuries</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {Math.floor(
                        calculationResults.essentialsResult *
                          0.00650860065086006508600650860065 +
                          calculationResults.essentialsResult
                      )}
                    </td>
                    <td>
                      {Math.floor(
                        calculationResults.desirablesResult * 0.25 +
                          calculationResults.desirablesResult
                      )}
                    </td>
                    <td>
                      {Math.floor(
                        calculationResults.luxuriesResult *
                          0.25007429420505200594353640416048 +
                          calculationResults.luxuriesResult
                      )}
                    </td>
                    <td>
                      {Math.floor(
                        calculationResults.essentialsResult *
                          0.00650860065086006508600650860065 +
                          calculationResults.essentialsResult +
                          (calculationResults.desirablesResult * 0.25 +
                            calculationResults.desirablesResult) +
                          (calculationResults.luxuriesResult *
                            0.25007429420505200594353640416048 +
                            calculationResults.luxuriesResult)
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculate;
// 0.00650860065086006508600650860065
// 0.25
// 0.25007429420505200594353640416048
// 0.12838674717448521442947824740672
