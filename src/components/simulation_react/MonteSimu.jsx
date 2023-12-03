import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MonteCarlo = () => {
  const [numSimulations, setNumSimulations] = useState(100);
  const [numYears, setNumYears] = useState(20);
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [goal, setGoal] = useState(20000);
  const [numSuccesses, setNumSuccesses] = useState(0);
  const [simulationRuns, setSimulationRuns] = useState([]);

  const runSimulation = () => {
    let successes = 0;
    let newSimulationRuns = [];
    for (let i = 0; i < numSimulations; i++) {
      let value = initialInvestment;
      let yearlyValues = [initialInvestment];
      for (let j = 0; j < numYears; j++) {
        const rateOfReturn = -0.05 + Math.random() * 0.2;
        const inflationRate = Math.random() * 0.04;
        value = (value * (1 + rateOfReturn)) / (1 + inflationRate);
        yearlyValues.push(value);
      }
      if (value > goal) {
        successes += 1;
      }
      newSimulationRuns.push({
        initialInvestment,
        goal,
        numYears,
        finalValue: value,
        yearlyValues,
        success: value > goal,
      });
    }
    setNumSuccesses(successes);
    setSimulationRuns(newSimulationRuns);
  };

  const chartOptions = {
    title: {
      text: "Monte Carlo Simulation - Investment Portfolio",
    },
    xAxis: {
      title: {
        text: "Year",
      },
    },
    yAxis: {
      title: {
        text: "Portfolio Value",
      },
    },
    chart: {
      height: 600,
      type: "scatter", // Change to "scatter" for dot chart
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 4,
          symbol: "circle",
        },
      },
    },
    series: simulationRuns.map((run, index) => ({
      name: `Simulation ${index + 1}`,
      color: run.success ? "green" : "yellow",
      marker: {
        enabled: true,
        symbol: "circle",
      },
      data: run.yearlyValues.map((value, year) => ({
        x: year,
        y: value,
        color: run.success ? "green" : "yellow",
      })),
    })),
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Monte Carlo Simulation - Investment Portfolio
      </Typography>
      <Box component="form" sx={{ "& > :not(style)": { mt: 2 } }}>
        <TextField
          label="Initial Investment"
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
        />
        <TextField
          label="Goal"
          type="number"
          value={goal}
          onChange={(e) => setGoal(parseFloat(e.target.value))}
        />
        <TextField
          label="Number of Years"
          type="number"
          value={numYears}
          onChange={(e) => setNumYears(parseInt(e.target.value, 10))}
        />
        <TextField
          label="Number of Simulations"
          type="number"
          value={numSimulations}
          onChange={(e) => setNumSimulations(parseInt(e.target.value))}
        />
        <Button variant="contained" onClick={runSimulation} sx={{ mt: 2 }}>
          Run Simulation
        </Button>
      </Box>
      {numSuccesses > 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Successful simulations: {numSuccesses}
        </Typography>
      )}
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default MonteCarlo;
