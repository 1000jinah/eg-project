import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PolynomialRootFinder = () => {
  const [initialInvestment, setInitialInvestment] = useState(100);
  const [monthlyInvestment, setMonthlyInvestment] = useState(10);
  const [investmentPeriod, setInvestmentPeriod] = useState(2);
  const [targetMoney, setTargetMoney] = useState(550);
  const [roots, setRoots] = useState([]);
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [balance, setBalance] = useState([]);

  const findRoots = (coefficients) => {
    // Bisection method for finding roots
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
          calculatedRoots.push(Number(c.toFixed(8))); // Round to 8 decimal places
          break;
        }

        iteration++;
      }
    }

    return calculatedRoots;
  };

  const handleFindRoots = () => {
    // Calculate the monthlyInvestmentPeriod
    const monthlyInvestmentPeriod = investmentPeriod * 12;

    // Create the coefficients array based on inputs
    const coefficients = [];
    coefficients.push(initialInvestment);

    for (let i = 0; i < monthlyInvestmentPeriod; i++) {
      coefficients.push(monthlyInvestment);
    }

    coefficients.push(-targetMoney);

    const calculatedRoots = findRoots(coefficients);
    setRoots(calculatedRoots);

    // Calculate the desired value
    if (calculatedRoots.length > 0) {
      const firstRoot = calculatedRoots[0];
      const calculatedValue = 1 / firstRoot - 1;
      setCalculatedValue(calculatedValue);

      // Create balance array
      const balanceArray = [...coefficients];

      // Calculate balance values
      for (let i = 1; i <= monthlyInvestmentPeriod; i++) {
        balanceArray[i] =
          balanceArray[i - 1] * (1.0 + calculatedValue) + balanceArray[i];
      }

      setBalance(balanceArray);
    } else {
      setCalculatedValue(null);
      setBalance([]);
    }
  };
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "Balance Over Time",
    },
    xAxis: {
      title: {
        text: "Month",
      },
    },
    yAxis: {
      title: {
        text: "Balance",
      },
    },
    series: [
      {
        name: "Balance",
        data: [],
      },
    ],
  });

  useEffect(() => {
    // Update chart data when balance is updated
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [{ name: "Balance", data: balance }],
    }));
  }, [balance]);
  return (
    <div>
      <label>
        Initial Investment:
        <input
          type="number"
          value={initialInvestment}
          onChange={(e) =>
            setInitialInvestment(parseFloat(e.target.value) || 0)
          }
        />
      </label>
      <br />
      <label>
        Monthly Investment:
        <input
          type="number"
          value={monthlyInvestment}
          onChange={(e) =>
            setMonthlyInvestment(parseFloat(e.target.value) || 0)
          }
        />
      </label>
      <br />
      <label>
        Investment Period (years):
        <input
          type="number"
          value={investmentPeriod}
          onChange={(e) => setInvestmentPeriod(parseFloat(e.target.value) || 0)}
        />
      </label>
      <br />
      <label>
        Target Money:
        <input
          type="number"
          value={targetMoney}
          onChange={(e) => setTargetMoney(parseFloat(e.target.value) || 0)}
        />
      </label>
      <br />
      <button onClick={handleFindRoots}>Find Roots</button>
      <p>Roots: {roots.join(", ")}</p>
      {calculatedValue !== null && (
        <div>
          <div>
            <p>Calculated Value: {calculatedValue}</p>
            <p>Balance:</p>
            <ul>
              {balance.map((value, index) => (
                <li key={index}>
                  {index}개월차:{value}
                </li>
              ))}
            </ul>
          </div>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default PolynomialRootFinder;