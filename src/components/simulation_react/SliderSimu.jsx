import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input"; // 추가된 부분
//
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
//
const SliderSimu = () => {
  const [initialInvestment, setInitialInvestment] = useState(100);
  const [monthlyInvestment, setMonthlyInvestment] = useState(10);
  const [investmentPeriod, setInvestmentPeriod] = useState(2);
  const [targetMoney, setTargetMoney] = useState(1000);
  const [roots, setRoots] = useState([]);
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [balance, setBalance] = useState([]);
  const [balanceLow, setBalanceLow] = useState([]);
  const [balanceHigh, setBalanceHigh] = useState([]);
  const [editMode, setEditMode] = useState(""); // 추가된 부분
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper": {
      transform: "rotate(-90deg)",
    },
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));
  //
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

    return calculatedRoots;
  };

  const handleFindRoots = () => {
    const monthlyInvestmentPeriod = investmentPeriod * 12;

    const coefficients = [];
    coefficients.push(initialInvestment);

    for (let i = 0; i < monthlyInvestmentPeriod; i++) {
      coefficients.push(monthlyInvestment);
    }

    coefficients.push(-targetMoney);

    const calculatedRoots = findRoots(coefficients);
    setRoots(calculatedRoots);

    if (calculatedRoots.length > 0) {
      const firstRoot = calculatedRoots[0];
      const calculatedValue = 1 / firstRoot - 1;
      setCalculatedValue(calculatedValue);
      const sharpe_ratio = 1.0;
      const z = 0.1;
      const sigma = calculatedValue * sharpe_ratio;
      const balanceArray = [...coefficients];
      const balanceLowArray = [...coefficients];
      const balanceHighArray = [...coefficients];

      for (let i = 1; i <= monthlyInvestmentPeriod; i++) {
        balanceArray[i] =
          balanceArray[i - 1] * (1.0 + calculatedValue) + balanceArray[i];
        balanceLowArray[i] =
          balanceLowArray[i - 1] * (1.0 + calculatedValue - z * sigma) +
          balanceLowArray[i];
        balanceHighArray[i] =
          balanceHighArray[i - 1] * (1.0 + calculatedValue + z * sigma) +
          balanceHighArray[i];
      }

      setBalance(balanceArray);
      setBalanceLow(balanceLowArray);
      setBalanceHigh(balanceHighArray);
    } else {
      setCalculatedValue(null);
      setBalance([]);
      setBalanceLow([]);
      setBalanceHigh([]);
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
      case "targetMoney":
        setTargetMoney(value);
        break;
      default:
        break;
    }

    // Call handleFindRoots whenever input changes
    handleFindRoots();
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
        case "targetMoney":
          setTargetMoney(numericValue);
          break;
        default:
          break;
      }

      // Call handleFindRoots whenever input changes
      handleFindRoots();
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
        name: "Balance",
        data: [],
      },
      {
        name: "Balance_Low",
        data: [],
      },
      {
        name: "Balance_High",
        data: [],
      },
    ],
  });

  useEffect(() => {
    // Call handleFindRoots whenever any of the relevant state values change
    handleFindRoots();
  }, [initialInvestment, monthlyInvestment, investmentPeriod, targetMoney]);

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,

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
        marker: false,
        useHTML: true,
        labelFormatter: function () {
          const seriesColor = this.userOptions.color;
          return `<span style="display:flex; place-items: center; gap: 3px;">
                  <div style="background-color: ${seriesColor}; width:15px; height:15px; border-radius: 50%; float:left; margin-right:5px;"></div>
                  <span>${this.name}</span></span>`;
        },
      },
      series: [
        {
          type: "area",
          fillColor: "transparent",
          color: "#ffcebf",
          name: "Balance_High",
          data: balanceHigh,
          marker: {
            enabled: false,
            radius: 4,
            lineWidth: 0.5,
            lineColor: "transparent",
            fillColor: "#6ab9fd",
            symbol: "circle",
          },
        },
        {
          type: "area",
          color: "#ff754b",
          fillColor: "transparent",
          name: "Balance",
          data: balance,
          marker: {
            enabled: false,
            radius: 4,
            lineWidth: 0.5,
            lineColor: "transparent",
            fillColor: "#ff754b",
            symbol: "circle",
          },
        },
        {
          type: "area",
          fillColor: "transparent",
          color: "#6ab9fd",
          name: "Balance_Low",
          data: balanceLow,
          marker: {
            enabled: false,
            radius: 4,
            lineWidth: 0.5,
            lineColor: "transparent",
            fillColor: "#ffcebf",
            symbol: "circle",
          },
        },
      ],
      tooltip: {
        shared: true,
        crosshairs: true,
        borderColor: "#000",
        backgroundColor: "#fff",
        xDateFormat: "%b %e, %Y",
        useHTML: true,
        headerFormat:
          '<table style="border:0px;"><tr><td colspan="2" style="border:0px; height:20px;"><span style="color:#808080; font-size:14px;">{point.key}</span></td></tr>',
        pointFormat:
          '<tr><td style="border:0px; height:20px;"><div style="width:11px; height:11px; background-color:{series.color}; border:1px solid #000; border-radius:50%; float:left; margin-top:8px;"></div>' +
          '<span style="font-size:18px; color:{series.color}; padding-left:10px;">{series.name}</span></td>' +
          '<td style="border:0px; height:20px;"><span style="font-size:18px; font-weight:bold; padding-left:100px;">${point.y}</span></td></tr>',
        footerFormat: "</table>",
        valueDecimals: 2,
      },
      credits: {
        enabled: false, // Hide the Highcharts credits
      },
    }));
  }, [initialInvestment, targetMoney, balance, balanceLow, balanceHigh]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .highcharts-area {
      fill-opacity: 1
    }
    .highcharts-background {
      fill: #eee;
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
    <Box sx={{ m: 5 }}>
      <Typography
        sx={{ color: "#211d1d", fontSize: "1.6rem", fontWeight: "bold", mb: 5 }}
      >
        About You
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "30%", mr: 3 }}>
          {/* Investment Period (Year) */}
          <Box sx={{ backgroundColor: "#eee", p: 3, mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography
                sx={{
                  color: "#211d1d",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Investment Period
              </Typography>
              {editMode === "investmentPeriod" ? (
                renderInputField("investmentPeriod", investmentPeriod)
              ) : (
                <Typography
                  sx={{
                    color: "#211d1d",
                    fontSize: "1.2rem",
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
              sx={{ color: "#211d1d" }}
              value={investmentPeriod}
              onChange={(event, value) =>
                handleSliderChange(event, value, "investmentPeriod")
              }
              min={0}
              max={10}
            />
          </Box>
          {/* Monthly Investment ($) */}
          <Box sx={{ backgroundColor: "#eee", p: 3, mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography
                sx={{
                  color: "#211d1d",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Monthly Investment
              </Typography>
              {editMode === "monthlyInvestment" ? (
                renderInputField("monthlyInvestment", monthlyInvestment)
              ) : (
                <Typography
                  sx={{
                    color: "#211d1d",
                    fontSize: "1.2rem",
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
              sx={{ color: "#211d1d" }}
              value={monthlyInvestment}
              onChange={(event, value) =>
                handleSliderChange(event, value, "monthlyInvestment")
              }
              min={0}
              max={50}
            />
          </Box>
          {/* Initial Investment ($) */}
          <Box sx={{ backgroundColor: "#eee", p: 3, mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography
                sx={{
                  color: "#211d1d",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Initial Investment
              </Typography>
              {editMode === "initialInvestment" ? (
                renderInputField("initialInvestment", initialInvestment)
              ) : (
                <Typography
                  sx={{
                    color: "#211d1d",
                    fontSize: "1.2rem",
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
              sx={{ color: "#211d1d" }}
              value={initialInvestment}
              onChange={(event, value) =>
                handleSliderChange(event, value, "initialInvestment")
              }
              min={0}
              max={500}
            />
          </Box>
          {/* Target Money ($) */}
          <Box sx={{ backgroundColor: "#eee", p: 3, mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography
                sx={{
                  color: "#211d1d",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Target Money
              </Typography>
              {editMode === "targetMoney" ? (
                renderInputField("targetMoney", targetMoney)
              ) : (
                <Typography
                  sx={{
                    color: "#211d1d",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit("targetMoney")}
                >
                  $ {targetMoney}
                </Typography>
              )}
            </Box>
            <Slider
              sx={{ color: "#211d1d" }}
              value={targetMoney}
              onChange={(event, value) =>
                handleSliderChange(event, value, "targetMoney")
              }
              min={0}
              max={1000}
            />
          </Box>
          {/* Add Filter */}
          <Box sx={{ backgroundColor: "#eee", p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  color: "#211d1d",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Add Filter
              </Typography>
              <Typography
                sx={{
                  color: "#211d1d",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                +
              </Typography>
            </Box>
            아직 준비중...
          </Box>
        </Box>

        {/* <p>Roots: {roots.join(", ")}</p> */}
        <Box sx={{ width: "70%" }}>
          {calculatedValue !== null && (
            <div style={{ marginBottom: 20 }}>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              mb: 3,
            }}
          >
            <Typography sx={{ color: "#666", fontSize: "0.87rem" }}>
              버튼 사용 가능 (슬라이더, 인풋으로도 가능)
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", ml: 3 }}>
              <Button
                sx={{
                  minWidth: 300,

                  textAlign: "center",
                  backgroundColor: "#211d1d",
                  color: "#fff",
                  textTransform: "capitalize",
                }}
                onClick={handleFindRoots}
              >
                Calculate
              </Button>
            </Box>
          </Box>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Calculated Value: {calculatedValue}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Balance:</Typography>
              <Box>
                {balance.map((value, index) => (
                  <p style={{ margin: 0 }} key={index}>
                    {value}
                  </p>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default SliderSimu;
