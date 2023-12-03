import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const PolynomialRootFinder = () => {
  const [initialInvestment, setInitialInvestment] = useState(100);
  const [monthlyInvestment, setMonthlyInvestment] = useState(10);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [outvalue, setOutValue] = useState(2000); // Default outvalue
  const [outvaluetime, setOutValueTime] = useState(1); // Default outvaluetime
  const [roots, setRoots] = useState([]);
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [balance, setBalance] = useState([]);

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
          calculatedRoots.push(Number(c.toFixed(8))); // Round to 8 decimal places
          break;
        }

        iteration++;
      }
    }

    return calculatedRoots.reverse();
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
  });
  const handleFindRoots = () => {
    const monthlyInvestmentPeriod = investmentPeriod * 12;

    const coefficients = [];
    coefficients.push(initialInvestment);

    for (let i = 0; i < monthlyInvestmentPeriod; i++) {
      coefficients.push(monthlyInvestment);
    }

    // Push outvalue for outvaluetime
    for (let i = 0; i < outvaluetime; i++) {
      coefficients.push(-outvalue);
    }

    const calculatedRoots = findRoots(coefficients);
    setRoots(calculatedRoots);

    if (calculatedRoots.length > 0) {
      const firstRoot = calculatedRoots[0];
      const calculatedValue = 1 / firstRoot - 1;
      setCalculatedValue(calculatedValue);

    //   if (calculatedValue < 0) {
    //     // Show an alert if calculatedValue is negative
    //     alert("Return value is negative: " + calculatedValue);
    //     return;
    //   }

      const sharpe_ratio = 1.0;
      const z = 0.1;
      const sigma = calculatedValue * sharpe_ratio;
      //   const balanceArray = [...coefficients];

      // Implementing the provided code for multiple layers
      const layer = 5;
      const newBalance = [];

      for (let i = 0; i < layer; i++) {
        newBalance.push([...coefficients]);

        // for (let j = 0; j < monthlyInvestmentPeriod + outvaluetime; j++) {
        //   const n = -layer + 2 * i + 1;

        //   newBalance[i][j + 1] =
        //     newBalance[i][j] * (1.0 + calculatedValue + n * z * sigma) +
        //     newBalance[i][j + 1];
        // }
        for (let j = 0; j < monthlyInvestmentPeriod + outvaluetime; j++) {
          const n = -layer + 2 * i + 1;

          if (j >= monthlyInvestmentPeriod) {
            // Decrease balance after reaching outvaluetime
            newBalance[i][j + 1] =
              newBalance[i][j] * (1.0 - calculatedValue - n * z * sigma) +
              newBalance[i][j + 1];
          } else {
            // Increase balance before outvaluetime
            newBalance[i][j + 1] =
              newBalance[i][j] * (1.0 + calculatedValue + n * z * sigma) +
              newBalance[i][j + 1];
          }
        }
        // const lastIndex = monthlyInvestmentPeriod + outvaluetime;
        // newBalance[i][lastIndex] = Math.abs(newBalance[i][lastIndex]) < -100 ? 0 : newBalance[i][lastIndex]
      }

      setBalance(newBalance);
      const newChartOptions = {
        title: {
          text: "Balance Over Time",
        },
        series: newBalance.map((b, index) => ({
          name: `Layer ${index} Balance`,
          data: b,
        })),
      };
      setChartOptions(newChartOptions);
    } else {
      setCalculatedValue(null);
      setBalance([]);
    }
  };

  const handleSliderChange = (event, value, field) => {
    switch (field) {
      case "initialInvestment":
        setInitialInvestment(value);
        break;
      case "monthlyInvestment":
        setMonthlyInvestment(value);
        break;
      case "investmentPeriod":
        setInvestmentPeriod(value);
        break;
      case "outvalue":
        setOutValue(value);
        break;
      case "outvaluetime":
        setOutValueTime(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Box>
        <Typography gutterBottom>
          Initial Investment: {initialInvestment}
        </Typography>
        <Slider
          value={initialInvestment}
          onChange={(event, value) =>
            handleSliderChange(event, value, "initialInvestment")
          }
          min={0}
          max={500}
        />
      </Box>
      <Box>
        <Typography gutterBottom>
          Monthly Investment: {monthlyInvestment}
        </Typography>
        <Slider
          value={monthlyInvestment}
          onChange={(event, value) =>
            handleSliderChange(event, value, "monthlyInvestment")
          }
          min={0}
          max={50}
        />
      </Box>
      <Box>
        <Typography gutterBottom>
          Investment Period: {investmentPeriod}
        </Typography>
        <Slider
          value={investmentPeriod}
          onChange={(event, value) =>
            handleSliderChange(event, value, "investmentPeriod")
          }
          min={0}
          max={10}
        />
      </Box>
      <Box>
        <Typography gutterBottom>Out Value: {outvalue}</Typography>
        <Slider
          value={outvalue}
          onChange={(event, value) =>
            handleSliderChange(event, value, "outvalue")
          }
          min={1}
          max={2000}
        />
      </Box>
      <Box>
        <Typography gutterBottom>Out Value Time: {outvaluetime}</Typography>
        <Slider
          value={outvaluetime}
          onChange={(event, value) =>
            handleSliderChange(event, value, "outvaluetime")
          }
          min={1}
          max={120}
        />
      </Box>
      <Button variant="contained" onClick={handleFindRoots}>
        Find Roots
      </Button>
      <p>Roots: {roots.join(", ")}</p>
      {calculatedValue !== null && (
        <div>
          <div>
            <p>Calculated Value: {calculatedValue}</p>
            <p>Balance:</p>

            {balance.map((value, index) => (
              <p key={index}>{value},</p>
            ))}
          </div>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default PolynomialRootFinder;
