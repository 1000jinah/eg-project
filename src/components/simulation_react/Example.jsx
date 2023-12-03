import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Button from "@mui/material/Button";

const initialState = {
  initialAmount: 100,
  contributionPeriod: 120,
  monthlyContribution: 10,
  withdrawalAmount: 2000,
  withdrawalFrequency: 1,
};

// const generateRandomScenario = (baseArray, count) => {
//   const scenarios = [baseArray];
//   for (let i = 0; i < count; i++) {
//     const randomFactor = Math.random() * 0.5 + 0.99; // Random factor between 0.99 and 1.01
//     const newScenario = baseArray.map((value) => value * randomFactor);
//     scenarios.push(newScenario);
//   }
//   return scenarios;
// };

const generateRandomScenario = (baseArray, count) => {
    const scenarios = [baseArray];
    for (let i = 0; i < count; i++) {
      const randomFactor = Math.random() * 1.5 - 1; // Random factor between -1 and 1
      const newScenario = baseArray.map((value) => value * (1 + randomFactor));
      scenarios.push(newScenario);
    }
    return scenarios;
  };

const App = () => {
  const [state, setState] = useState(initialState);
  const [currentGoal, setCurrentGoal] = useState(0);
  const [wishGoal, setWishGoal] = useState(0);
  const [roots, setRoots] = useState([]);
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState([]);
  const [maxContribution, setMaxContribution] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [options, setOptions] = useState({
    chart: {
      type: "line",
    },
  });
  const [options2, setOptions2] = useState({
    chart: {
      type: "line",
    },
    series: [
      {
        name: "Balance",
        data: [],
      },
    ],
    legend: {
        // layout: "horizontal",
        // align: "right",
        // x: -10,
        // y: -10,
        // itemMarginBottom: 20,
        // verticalAlign: "top",
        // symbolHeight: 0.001,
        // symbolWidth: 0.001,
        // symbolRadius: 0.001,
        // symbol: false,
        // marker: false
        enabled: false
      }
  });

  const findRoots = (coefficients) => {
    const tolerance = 1e-10;
    const maxIterations = 1000;
    const degree = coefficients.length - 1;

    const polyFunction = (x) =>
      coefficients.reduce((acc, c, i) => acc + c * Math.pow(x, i), 0);

    const calculatedRoots = [];

    for (let i = 0; i < degree; i++) {
      let a = i - 10;
      let b = i + 11;
      let iteration = 0;

      while (iteration < maxIterations) {
        const c = (a + b) / 2;

        if (polyFunction(a) * polyFunction(c) < 0) {
          b = c;
        } else {
          a = c;
        }

        if (Math.abs(polyFunction(c)) < tolerance) {
          calculatedRoots.push(Number(c.toFixed(8)));
          break;
        }

        iteration++;
      }
    }

    return calculatedRoots.reverse();
  };

  const handleFindRoots = () => {
    setLoading(true);

    const monthlyInvestmentPeriod = state.contributionPeriod;

    const coefficients = [];
    coefficients.push(state.initialAmount);

    let maxContribution = 0;
    let totalWithdrawal = 0;

    for (let i = 0; i < monthlyInvestmentPeriod; i++) {
      const contribution = state.monthlyContribution;
      coefficients.push(contribution);
      maxContribution = Math.max(maxContribution, contribution);
    }

    for (let i = 0; i < state.withdrawalFrequency; i++) {
      const withdrawal = -state.withdrawalAmount;
      coefficients.push(withdrawal);
      totalWithdrawal += withdrawal;
    }

    setMaxContribution(maxContribution);
    setTotalWithdrawal(totalWithdrawal);

    const calculatedRoots = findRoots(coefficients);
    setRoots(calculatedRoots);

    if (calculatedRoots.length > 0) {
      const firstRoot = calculatedRoots[0];
      const calculatedValue = 1 / firstRoot - 1;
      setCalculatedValue(calculatedValue);

      if (calculatedValue >= 0) {
        const balanceArray = [...coefficients];
        const scenarios = generateRandomScenario(balanceArray, 5);

        const updatedScenarios = scenarios.map((scenario) => {
          for (
            let i = 1;
            i <= monthlyInvestmentPeriod + state.withdrawalFrequency;
            i++
          ) {
            scenario[i] =
              scenario[i - 1] * (1.0 + calculatedValue) + scenario[i];
          }
          return scenario;
        });

        setBalance(updatedScenarios);
        setOptions2((prevOptions) => ({
          ...prevOptions,
          series: updatedScenarios.map((scenario, index) => ({
            name: `Scenario ${index + 1}`,
            data: scenario,
            marker: {
              enabled: false,
              radius: 4,
              symbol: "circle",
            },
          })),
        }));
      } else {
        setOptions2({
          chart: {
            type: "line",
          },
          series: [
            {
              name: "Balance",
              data: [],
            },
          ],
        });
        setBalance([]);
      }
    } else {
      setCalculatedValue(null);
      setBalance([]);
      setOptions2({
        chart: {
          type: "line",
        },
        series: [
          {
            name: "Balance",
            data: [],
          },
        ],
      });
    }

    setLoading(false);
  };

  const handleSliderChange = (key) => (event, value) => {
    setState({ ...state, [key]: value });
  };

  const updateChart = () => {
    const {
      initialAmount,
      contributionPeriod,
      monthlyContribution,
      withdrawalAmount,
      withdrawalFrequency,
    } = state;

    const data = [];
    let total = initialAmount;
    for (let i = 0; i < contributionPeriod; i++) {
      data.push(total);
      total += monthlyContribution;
    }

    for (
      let i = contributionPeriod + 1;
      i < contributionPeriod + 1 + withdrawalFrequency;
      i++
    ) {
      data.push(total);
      total -= withdrawalAmount;
      data[i] = total;
    }

    const calculatedRoots = findRoots(data);
    setRoots(calculatedRoots);

    setOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        type: "line",
      },
      series: [
        {
          name: "Total Value",
          data,
        },
      ],
    }));

    setCurrentGoal(data[contributionPeriod]);

    const wishGoalValue = withdrawalAmount * withdrawalFrequency;
    setWishGoal(wishGoalValue);

    // if (currentGoal - wishGoalValue < 0) {
    //   alert("Wish Goal should be a non-negative value.");
    // }
  };

  useEffect(() => {
    updateChart();
  }, [state]);

  return (
    <div>
      <div>
        <label>Initial Amount: {state.initialAmount}</label>
        <Slider
          value={state.initialAmount}
          min={1}
          max={5000}
          step={100}
          onChange={handleSliderChange("initialAmount")}
        />
      </div>
      <div>
        <label>Contribution Period (Months): {state.contributionPeriod}</label>
        <Slider
          value={state.contributionPeriod}
          min={1}
          max={30}
          step={1}
          onChange={handleSliderChange("contributionPeriod")}
        />
      </div>
      <div>
        <label>Monthly Contribution: {state.monthlyContribution}</label>
        <Slider
          value={state.monthlyContribution}
          min={1}
          max={20000}
          step={10}
          onChange={handleSliderChange("monthlyContribution")}
        />
      </div>
      <div>
        <label>Withdrawal Amount: {state.withdrawalAmount}</label>
        <Slider
          value={state.withdrawalAmount}
          min={0}
          max={2000}
          step={10}
          onChange={handleSliderChange("withdrawalAmount")}
        />
      </div>
      <div>
        <label>
          Withdrawal Frequency (Months): {state.withdrawalFrequency}
        </label>
        <Slider
          value={state.withdrawalFrequency}
          min={1}
          max={30}
          step={1}
          onChange={handleSliderChange("withdrawalFrequency")}
        />
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />

      {currentGoal >= 0 && wishGoal >= 0 && (
        <div>
          <label>Current Goal:</label> {currentGoal}
          <br />
          <label>Wish Goal:</label> {wishGoal}
          <br />
          <label>Goal:</label> {currentGoal - wishGoal}
        </div>
      )}

      {calculatedValue !== null && calculatedValue >= 0 && (
        <HighchartsReact highcharts={Highcharts} options={options2} />
      )}

      <Button
        sx={{
          minWidth: 300,
          p: 1.35,
          fontSize: 18,
          textAlign: "center",
          backgroundColor: "#666",
          color: "#fff",
          textTransform: "capitalize",
          ":hover": {
            backgroundColor: "#211d1d",
          },
          ":disabled": {
            color: "#f3f3f3",
          },
        }}
        onClick={async () => {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          handleFindRoots();
        }}
        disabled={loading}
      >
        {loading ? "Calculating..." : "Calculate"}
      </Button>

      {currentGoal >= 0 && wishGoal >= 0 && (
        <div>
          Calculated Value: {calculatedValue}
          <br />
          <label>Roots:</label> {roots.join(", ")}
          {balance.map((scenario, scenarioIndex) => (
            <div key={scenarioIndex}>
              <p>Scenario {scenarioIndex + 1}</p>
              {scenario.map((value, index) => (
                <p style={{ margin: 0 }} key={index}>
                  {value}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
