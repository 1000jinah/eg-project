import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import Slider from "@mui/material/Slider";
import SliderComponent from "components/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CachedIcon from "@mui/icons-material/Cached";

const PolynomialRootFinder = () => {
  const [initialInvestment, setInitialInvestment] = useState(100);
  const [monthlyInvestment, setMonthlyInvestment] = useState(10);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [outvalue, setOutValue] = useState(2000);
  const [outvaluetime, setOutValueTime] = useState(1);
  const [roots, setRoots] = useState([]);
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [calculatedValueYearly, setCalculatedValueYearly] = useState(null);
  const [balance, setBalance] = useState([]);
  const [balanceLow, setBalanceLow] = useState([]);
  const [balanceHigh, setBalanceHigh] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coefficients, setCoefficients] = useState([]);
  const [firstRoots, setFirstRoots] = useState(false);
  const [calculatedRoots, setCalculatedRoots] = useState(null);

  const findRoots = (coefficients) => {
    const tolerance = 1e-10;
    const maxIterations = 1000;
    const degree = coefficients.length - 1;

    const polyFunction = (x) =>
      coefficients.reduce((acc, c, i) => acc + c * Math.pow(x, i), 0);

    const calculatedRoots = [];

    for (let i = 0; i <= degree; i++) {
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
          console.log(calculatedRoots, "calculatedRoots");
          break;
        }

        iteration++;
      }
    }

    if (calculatedRoots.length === 0) {
      console.error("Roots not found. Check the input coefficients.");
    }
    return calculatedRoots.reverse();
  };

  const handleFindRoots = () => {
    setLoading(true);

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
    setCalculatedRoots(calculatedRoots, "calculatedRootscalculatedRoots");
    setRoots(calculatedRoots);
    console.log(calculatedRoots, "calculatedRoots");
    if (calculatedRoots.length > 0) {
      const firstRoot = calculatedRoots[0];
      setFirstRoots(firstRoots, "firstRoot");
      const calculatedValue = 1 / firstRoot - 1;
      const calculatedValueYearly = (1 + calculatedValue) ** 12 - 1;
      console.log(
        calculatedValueYearly,
        "calculatedValueYearlycalculatedValueYearlycalculatedValueYearly"
      );
      setCalculatedValue(calculatedValue);
      setCalculatedValueYearly(calculatedValueYearly);
      console.log(calculatedValue, "calculatedValuecalculatedValue");
      if (calculatedValueYearly < 0 || calculatedValueYearly > 0.15) {
        // Alert based on the condition
        if (calculatedValueYearly < 0) {
          alert("calculatedValueYearly is less than 0");
        } else {
          alert("calculatedValueYearly is greater than 0.15");
        }

        // Reset chart data to empty array
        setBalance([]);
      } else {
        const sharpe_ratio = 1.0;
        const z = 0.1;
        const layer = 5;
        const sigma = calculatedValue * sharpe_ratio;
        const balanceArray = [];

        for (let i = 0; i < layer; i++) {
          balanceArray.push([...coefficients]);
          for (let j = 1; j <= monthlyInvestmentPeriod + outvaluetime; j++) {
            const n = -layer + 2 * i + 1;
            console.log(n, "v");
            balanceArray[i][j] =
              balanceArray[i][j - 1] * (1.0 + calculatedValue + n * z * sigma) +
              balanceArray[i][j];
          }
          console.log(
            balanceArray,
            "balanceArraybalanceArraybalanceArraybalanceArray"
          );
        }

        setBalance(balanceArray);
      }
    } else {
      setCalculatedValue(null);
      setBalance([]);
    }
    setLoading(false);
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
  const handleTypographyClick = (field) => {
    // Define a function to handle Typography click
    const inputValue = prompt(`Enter new value for ${field}`);
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      switch (field) {
        case "initialInvestment":
          setInitialInvestment(numericValue);
          break;
        case "monthlyInvestment":
          setMonthlyInvestment(numericValue);
          break;
        case "investmentPeriod":
          setInvestmentPeriod(numericValue);
          break;
        case "outvalue":
          setOutValue(numericValue);
          break;
        case "outvaluetime":
          setOutValueTime(numericValue);
          break;
        default:
          break;
      }
    } else {
      alert("Invalid input. Please enter a numeric value.");
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
        type: "area",
        color: "#ff754b",
        lineColor: "#ff754b",
        fillColor: "transparent",
        name: "Balance",
        data: [],
        marker: {
          enabled: false,
          radius: 4,
          lineWidth: 0.3,
          lineColor: "transparent",
          fillColor: "#ff754b",
          symbol: "circle",
        },
      },
    ],
  });

  useEffect(() => {
    const highestPositiveBalance = Math.max(
      ...balance.flat().filter((value) => value > 0)
    );

    setChartOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        width: 950,
        height: 450,
        margin: [120, 30, 60, 70],
      },
      subtitle: {
        text: "Investment Value",

        align: "left", // Center align the subtitle
        verticalAlign: "top", // Place the subtitle at the top
        y: 35, // Adjust vertical position if needed
        x: 10,
        style: {
          fontSize: 24, // 변경된 부분
          fontWeight: "700", // 변경된 부분
          color: "#202225",
        },
      },
      title: {
        text: `$${highestPositiveBalance.toFixed(2)}`,
        align: "left", // Center align the title
        verticalAlign: "top", // Place the title at the bottom
        y: 75, // Adjust vertical position if needed
        x: 10,
        style: {
          fontSize: 22, // 변경된 부분
          fontWeight: "bold", // 변경된 부분
          color: "#3d2b80",
        },
      },
      xAxis: {
        labels: {
          enabled: true, // Hide the category labels on the x-axis
          style: {
            color: "#b3b3b3",
          },
        },

        crosshair: true,
      },
      yAxis: {
        labels: {
          formatter: function () {
            return Highcharts.numberFormat(this.value, 0, "", ",");
          },
          style: {
            color: "#b3b3b3",
          },
        },
        title: false,
        crosshair: true,
      },
      legend: {
        layout: "horizontal",
        align: "right",
        x: -10,
        y: -10,
        itemMarginBottom: 20,
        verticalAlign: "top",
        symbolHeight: 0.001,
        symbolWidth: 0.001,
        symbolRadius: 0.001,
        symbol: false,
        marker: false,
        useHTML: true,
        labelFormatter: function () {
          const seriesLineColor = this.userOptions.color;
          return `<span style="display:flex; place-items: center; gap: 3px;">
                  <div style=" background-color: ${seriesLineColor}; width:15px; height:15px; border-radius: 50%; float:left; margin-right:5px;"></div>
                  <span>${this.name}</span></span>`;
        },
      },
      series: [
        // {
        //   type: "area",
        //   color: "#ff754b",
        //   lineColor: "#ff754b",
        //   fillColor: "transparent",
        //   name: "Balance",
        //   data: balance.flat(),
        //   marker: {
        //     enabled: false,
        //     radius: 4,
        //     lineWidth: 0.3,
        //     lineColor: "transparent",
        //     fillColor: "#ff754b",
        //     symbol: "circle",
        //   },
        // },
        // Add additional series for each layer
        ...balance.map((layerData, index) => ({
          type: "area",
          color: `rgba(255, 117, 75, 0.${index + 2})`, // Adjust the color based on your preference
          lineColor: `rgba(255, 117, 75, 0.${index + 2})`,
          fillColor: "transparent",
          name: `Balance Layer ${index + 1}`,
          data: layerData,
          marker: {
            enabled: false,
            radius: 4,
            lineWidth: 0.3,
            lineColor: "transparent",
            fillColor: `rgba(255, 117, 75, 0.${index + 2})`,
            symbol: "circle",
          },
        })),
      ],
      credits: {
        enabled: false, // Hide the Highcharts credits
      },
    }));
  }, [balance]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .highcharts-area {
      fill-opacity: 1
    }
    .highcharts-background {
      fill: #fff;
    }
      .highcharts-tick { display: none; }
      .highcharts-point[fill="transparent"] { fill: #ff754b; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: 540,
            height: "auto",
            // mr: 3,
            position: "relative",
            border: "1px solid #e6e4e2",
          }}
        >
          {/*  padding: "20px", */}
          <Typography
            sx={{
              fontSize: 22,
              color: "#202225",
              fontWeight: "bold",
              padding: "20px",
              paddingBottom: 0,
            }}
          >
            Filter
          </Typography>
          <button
            onClick={handleFindRoots}
            style={{
              color: "#202225",
              position: "absolute",
              right: 15,
              top: 20,
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <CachedIcon />
          </button>
          {/* Investment Period (Year) */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #e2e4e6",
              padding: "15px 20px",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                sx={{
                  color: "#636973",
                  fontSize: 16,
                }}
              >
                Investment Period ($)
              </Typography>

              <Typography
                sx={{
                  color: "#202225",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => handleTypographyClick("investmentPeriod")}
              >
                {investmentPeriod} Year
              </Typography>
            </Box>
            <SliderComponent
              label="Investment Period ($)"
              value={investmentPeriod}
              onChange={(event, value) =>
                handleSliderChange(event, value, "investmentPeriod")
              }
              min={0}
              max={10}
              displayValue={`${investmentPeriod} Year`}
            />
          </Box>
          {/* Monthly Investment ($) */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #e2e4e6",
              padding: "15px 20px",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                sx={{
                  color: "#636973",
                  fontSize: 16,
                }}
              >
                Monthly Investment ($)
              </Typography>
              <Typography
                sx={{
                  color: "#202225",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => handleTypographyClick("monthlyInvestment")}
              >
                $ {monthlyInvestment}
              </Typography>
            </Box>
            <SliderComponent
              label="Monthly Investment ($)"
              value={monthlyInvestment}
              onChange={(event, value) =>
                handleSliderChange(event, value, "monthlyInvestment")
              }
              min={0}
              max={50}
              displayValue={`$ ${monthlyInvestment}`}
            />
          </Box>
          {/* Initial Investment ($) */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #e2e4e6",
              padding: "15px 20px",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                sx={{
                  color: "#636973",
                  fontSize: 16,
                }}
              >
                Initial Investment ($)
              </Typography>

              <Typography
                sx={{
                  color: "#202225",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => handleTypographyClick("initialInvestment")}
              >
                $ {initialInvestment}
              </Typography>
            </Box>
            <SliderComponent
              label="Initial Investment ($)"
              value={initialInvestment}
              onChange={(event, value) =>
                handleSliderChange(event, value, "initialInvestment")
              }
              min={0}
              max={500}
              displayValue={`$ ${initialInvestment}`}
            />
          </Box>
          {/* Out Allowance ($) */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #e2e4e6",
              padding: "15px 20px",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                sx={{
                  color: "#636973",
                  fontSize: 16,
                }}
              >
                Out Allowance ($)
              </Typography>
              <Typography
                sx={{
                  color: "#202225",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => handleTypographyClick("outvalue")}
              >
                $ {outvalue}
              </Typography>
            </Box>
            <SliderComponent
              label="Out Allowance ($)"
              value={outvalue}
              onChange={(event, value) =>
                handleSliderChange(event, value, "outvalue")
              }
              min={1}
              max={2000}
              displayValue={`$ ${outvalue}`}
            />
          </Box>
          {/* Out Allowance Period  (month) */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #e2e4e6",
              padding: "15px 20px",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                sx={{
                  color: "#636973",
                  fontSize: 16,
                }}
              >
                Out Allowance Period (month)
              </Typography>
              <Typography
                sx={{
                  color: "#202225",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => handleTypographyClick("outvaluetime")}
              >
                {outvaluetime} month
              </Typography>
            </Box>
            <SliderComponent
              label="Out Allowance Period (month)"
              value={outvaluetime}
              onChange={(event, value) =>
                handleSliderChange(event, value, "outvaluetime")
              }
              min={1}
              max={120}
              // displayValue={`${outvaluetime} month`}
            />
          </Box>
          {/* Add Filter */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #e2e4e6",
              padding: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  color: "#202225",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Add Filter
              </Typography>
              <Typography
                sx={{
                  color: "#202225",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                +
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: 950, height: 500 }}>
          {calculatedValue !== null && (
            <div style={{ border: "1px solid #e6e4e2" }}>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
          )}
          {calculatedValue === null && (
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  height: 450,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  border: "1px solid #e6e4e2",
                }}
              >
                Slider 값 설정 후, 'Calculate' 버튼을 클릭해주세요.
              </div>
            </div>
          )}
          {/* <Button
            sx={{ fontSize: "4px" }}
            onClick={async () => {
              // 클릭 후 1초 후에 계산 시작
              setLoading(true);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              handleFindRoots();
            }}
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate"}
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default PolynomialRootFinder;
