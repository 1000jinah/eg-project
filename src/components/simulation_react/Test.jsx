import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";

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
  const [editMode, setEditMode] = useState(""); // 추가된 부분

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

  const handleEdit = (field) => {
    setEditMode(field);
  };

  const handleInputEnter = (field) => (event) => {
    if (event.key === "Enter") {
      setEditMode("");
      const numericValue = parseFloat(event.target.value);
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
    }
    
  };

  const handleInputBlur = () => {
    setEditMode("");
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
        text:`$${highestPositiveBalance.toFixed(2)}`,
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

  const renderInputField = (field, value) => {
    return (
      <Input
        type="number"
        value={value}
        onChange={(event) =>
          handleSliderChange(event, event.target.value, field)
        }
        onKeyDown={handleInputEnter(field)}
        onBlur={handleInputBlur}
        autoFocus
      />
    );
  };

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
            width: 550,
            height: "auto",
            mr: 3,

            border: "1px solid #e6e4e2",
          }}
        >
          {/*  padding: "20px", */}
          <Typography
            sx={{
              fontSize: 24,
              color: "#202225",
              fontWeight: "bold",
              padding: "20px",
              paddingBottom: 0,
            }}
          >
            Filter
          </Typography>
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
              {editMode === "investmentPeriod" ? (
                renderInputField("investmentPeriod", investmentPeriod)
              ) : (
                <Typography
                  sx={{
                    color: "#202225",
                    fontSize: 16,
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit("investmentPeriod")}
                >
                  {investmentPeriod} Year
                </Typography>
              )}
            </Box>
            <Slider
              sx={{ color: "#666" }}
              value={investmentPeriod}
              onChange={(event, value) =>
                handleSliderChange(event, value, "investmentPeriod")
              }
              min={0}
              max={10}
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
              {editMode === "monthlyInvestment" ? (
                renderInputField("monthlyInvestment", monthlyInvestment)
              ) : (
                <Typography
                  sx={{
                    color: "#202225",
                    fontSize: 16,
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit("monthlyInvestment")}
                >
                  $ {monthlyInvestment}
                </Typography>
              )}
            </Box>
            <Slider
              sx={{ color: "#666" }}
              value={monthlyInvestment}
              onChange={(event, value) =>
                handleSliderChange(event, value, "monthlyInvestment")
              }
              min={0}
              max={50}
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

              {editMode === "initialInvestment" ? (
                renderInputField("initialInvestment", initialInvestment)
              ) : (
                <Typography
                  sx={{
                    color: "#202225",
                    fontSize: 16,
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit("initialInvestment")}
                >
                  $ {initialInvestment}
                </Typography>
              )}
            </Box>
            <Slider
              sx={{ color: "#666" }}
              value={initialInvestment}
              onChange={(event, value) =>
                handleSliderChange(event, value, "initialInvestment")
              }
              min={0}
              max={500}
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

              {editMode === "outvalue" ? (
                renderInputField("outvalue", outvalue)
              ) : (
                <Typography
                  sx={{
                    color: "#202225",
                    fontSize: 16,
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit("outvalue")}
                >
                  $ {outvalue}
                </Typography>
              )}
            </Box>
            <Slider
              sx={{ color: "#666" }}
              value={outvalue}
              onChange={(event, value) =>
                handleSliderChange(event, value, "outvalue")
              }
              min={1}
              max={2000}
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
              {editMode === "outvaluetime" ? (
                renderInputField("outvaluetime", outvaluetime)
              ) : (
                <Typography
                  sx={{
                    color: "#202225",
                    fontSize: 16,
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit("outvaluetime")}
                >
                  {outvaluetime} month
                </Typography>
              )}
            </Box>
            <Slider
              sx={{ color: "#666" }}
              value={outvaluetime}
              onChange={(event, value) =>
                handleSliderChange(event, value, "outvaluetime")
              }
              min={1}
              max={120}
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
              >
                +
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* <p>Roots: {roots.join(", ")}</p> */}
        <Box sx={{ width: 950, height:500 }}>
          {calculatedValue !== null && (
            <div style={{ border: "1px solid #e6e4e2" }}>
              {/* <div>
              <p>Calculated Value: {calculatedValue}</p>
              <p>Balance:</p>
              <ul>
                {balance.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div> */}
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
          <Button
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
          </Button>
          
          {/* <Box>
          
            root:{calculatedRoots} <br />
            first_root:{firstRoots} <br />
            irr: {calculatedValue}
            <br />
            irr_yearly: {calculatedValueYearly}
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default PolynomialRootFinder;
