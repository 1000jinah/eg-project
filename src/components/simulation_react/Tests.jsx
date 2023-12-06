// import React, { useEffect } from 'react';

// function complexAdd(a, b) {
//   return { real: a.real + b.real, imag: a.imag + b.imag };
// }

// function complexMultiply(a, b) {
//   return {
//     real: a.real * b.real - a.imag * b.imag,
//     imag: a.real * b.imag + a.imag * b.real,
//   };
// }

// function complexDivide(a, b) {
//   const denominator = b.real ** 2 + b.imag ** 2;
//   return {
//     real: (a.real * b.real + a.imag * b.imag) / denominator,
//     imag: (a.imag * b.real - a.real * b.imag) / denominator,
//   };
// }

// function complexConjugate(a) {
//   return { real: a.real, imag: -a.imag };
// }

// function findRoots(coefficients) {
//   const degree = coefficients.length - 1;

//   if (degree <= 0) {
//     return [];
//   }

//   const newtonMethod = (x0) => {
//     let x = x0;
//     let iteration = 0;

//     while (iteration < 1000) {
//       const f = coefficients.reduce((acc, coef, index) => acc + coef * x ** (degree - index), 0);
//       const fPrime = coefficients.slice(0, -1).reduce((acc, coef, index) => acc + (degree - index) * coef * x ** (degree - index - 1), 0);

//       const deltaX = -f / fPrime;
//       x += deltaX;

//       if (Math.abs(deltaX) < 1e-9) {
//         break;
//       }

//       iteration++;
//     }

//     return x;
//   };

//   const initialGuesses = Array.from({ length: degree }, (_, index) => Math.cos(((2 * index + 1) * Math.PI) / (2 * degree)));
//   const roots = initialGuesses.map((guess) => newtonMethod(guess));

//   return roots;
// }

// function calcIRR(values) {
//   const roots = findRoots(values.reverse());
//   const mask = roots.map((r) => r.imag === 0 && r.real > 0);
//   const realRates = roots.filter((r, i) => mask[i]).map((r) => r.real);

//   if (realRates.length === 0) {
//     return {
//       irr: NaN,
//       deltaX: NaN,
//       irrYearly: NaN,
//     };
//   }

//   const rate = 1 / realRates - 1;
//   const minRateIndex = rate.indexOf(Math.min(...rate.map((r) => Math.abs(r))));
//   return {
//     irr: realRates[minRateIndex],
//     deltaX: 1 / rate[minRateIndex],
//     irrYearly: Math.pow(1.0 + realRates[minRateIndex], 12.0) - 1.0,
//   };
// }

// function ProjectionGraph({
//   initialPayment,
//   monthlyPayment,
//   MonthlyPaymentPeriod,
//   monthlyAllowance,
//   MonthlyAllowancePeriod,
// }) {
//   useEffect(() => {
//     const sharpeRatio = 1.0;
//     const z = 0.05;
//     const layer = 5;
//     const cashFlows = [initialPayment];
//     for (let i = 0; i < MonthlyPaymentPeriod; i++) {
//       cashFlows.push(monthlyPayment);
//     }
//     for (let i = 0; i < MonthlyAllowancePeriod; i++) {
//       cashFlows.push(-monthlyAllowance);
//     }

//     // Calculate the IRR
//     const irr = calcIRR(cashFlows);
//     const sigma = irr.irr * sharpeRatio;

//     const balance = [];
//     for (let i = 0; i < layer; i++) {
//       balance.push([...cashFlows]);
//       for (let j = 0; j < MonthlyPaymentPeriod + MonthlyAllowancePeriod; j++) {
//         const n = -layer + 2 * i + 1;
//         const delta = complexMultiply({ real: n * z * sigma, imag: 0 }, irr.irr);
//         const updatedBalance = complexAdd(complexMultiply(balance[i][j], complexAdd({ real: 1.0, imag: 0 }, irr.irr)), balance[i][j + 1]);
//         balance[i][j + 1] = complexAdd(updatedBalance, delta).real;
//       }
//     }

//     console.table(balance);
//     // Plotting logic goes here (not provided as it depends on the environment)
//   }, [
//     initialPayment,
//     monthlyPayment,
//     MonthlyPaymentPeriod,
//     monthlyAllowance,
//     MonthlyAllowancePeriod,
//   ]);

//   return <div>{/* JSX component content */}</div>;
// }

// export default ProjectionGraph;


//////


import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const PolynomialRootFinder = () => {
  const [initialInvestment, setInitialInvestment] = useState(100);
  const [monthlyInvestment, setMonthlyInvestment] = useState(150);
  const [investmentPeriod, setInvestmentPeriod] = useState(15);
  const [outvalue, setOutValue] = useState(2000);
  const [outvaluetime, setOutValueTime] = useState(1);
  const [roots, setRoots] = useState([]);
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [calculatedValueYearly, setCalculatedValueYearly] = useState(null);
  const [balance, setBalance] = useState([]);
  const [balanceLow, setBalanceLow] = useState([]);
  const [balanceHigh, setBalanceHigh] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coefficients, setCoefficients]  = useState([]);
  const [firstRoots, setFirstRoots] = useState(false);
  const [calculatedRoots, setCalculatedRoots] = useState(null);
  const findRoots = (coefficients) => {
    // 0에 가까운 값을 root로 고려하는 허용 오차
    const tolerance = 1e-10;

    // 각 root를 찾기 위한 최대 반복 횟수
    const maxIterations = 1000;

    // 다항식의 차수. 계수 배열의 길이에서 1을 뺀 값
    const degree = coefficients.length - 1;

    // 주어진 x 값에 대해 다항식을 평가하는 함수
    const polyFunction = (x) =>
      coefficients.reduce((acc, c, i) => acc + c * Math.pow(x, i), 0);
      setCoefficients(coefficients)
    
    // 계산된 root를 저장할 배열
    const calculatedRoots = [];

    // 각 root 후보에 대해 반복
    for (let i = 0; i <= degree; i++) {
      // 이진 탐색을 위한 초기값 설정
      let a = i - 10;
      let b = i + 11;
      console.log(a, "a");
      console.log(b, "b");
      // 반복 횟수 카운터
      let iteration = 0;

      // 주어진 범위 내에서 root를 찾기 위한 이진 탐색
      while (iteration < maxIterations) {
        const c = (a + b) / 2; // 범위의 중간값
        console.log(c , "c");
        // 양 끝점에서의 함수 값의 부호에 따라 범위 조정
        if (polyFunction(a) * polyFunction(c) < 0) {
          b = c;
          console.log(b, "b");
        } else {
          a = c;
        //   console.log(a, "a");
        }

        // 중간값에서의 함수 값이 0에 충분히 가까우면
        if (Math.abs(polyFunction(c)) < tolerance) {
         
          // 해당 값은 root로 간주하고 배열에 추가
          calculatedRoots.push(Number(c.toFixed(8))); // 소수점 8자리까지 반올림
          break; // 반복문 종료
        }

        iteration++; // 반복 카운터 증가
        // console.log(iteration, "iteration");
      }
    }

    if (calculatedRoots.length === 0) {
      console.error("Roots not found. Check the input coefficients.");
    }
    return calculatedRoots.reverse(); // 반환 전 배열 뒤집기 (가독성을 위해)
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
        margin: [120, 30, 60, 70],
      },
      subtitle: {
        text: "Investment Value",
        fontSize: 18,
        align: "left", // Center align the subtitle
        verticalAlign: "top", // Place the subtitle at the top
        y: 30, // Adjust vertical position if needed
        x: 20,
        style: {
          fontSize: 16, // 변경된 부분
          fontWeight: "700", // 변경된 부분
          color: "#666",
        },
      },
      title: {
        text: `$ ${highestPositiveBalance}`,
        align: "left", // Center align the title
        verticalAlign: "top", // Place the title at the bottom
        y: 75, // Adjust vertical position if needed
        x: 20,
        style: {
          fontSize: 28, // 변경된 부분
          fontWeight: "normal", // 변경된 부분
          color: "#666",
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
    }));
  }, [balance]);

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
  return (
    <Box sx={{ m: 5 }}>
      <Typography
        sx={{ color: "#666", fontSize: "1.6rem", fontWeight: "bold", mb: 5 }}
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
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
              >
                Investment Period ($)
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
                onClick={() => handleTypographyClick("investmentPeriod")}
              >
                {investmentPeriod} Year
              </Typography>
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
          <Box sx={{ backgroundColor: "#eee", p: 3, mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
              >
                Monthly Investment ($)
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
                onClick={() => handleTypographyClick("monthlyInvestment")}
              >
                $ {monthlyInvestment}
              </Typography>
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
          <Box sx={{ backgroundColor: "#eee", p: 3, mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
              >
                Initial Investment ($)
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
                onClick={() => handleTypographyClick("initialInvestment")}
              >
                $ {initialInvestment}
              </Typography>
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
          <Box sx={{ backgroundColor: "#eee", p: 3, mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
              >
                Out Allowance ($)
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
                onClick={() => handleTypographyClick("outvalue")}
              >
                $ {outvalue}
              </Typography>
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
          <Box sx={{ backgroundColor: "#eee", p: 3, mb: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
              >
                Out Allowance Period (month)
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.94rem",
                  fontWeight: "bold",
                }}
                onClick={() => handleTypographyClick("outvaluetime")}
              >
                {outvaluetime} month
              </Typography>
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
          <Box sx={{ backgroundColor: "#eee", p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "0.94rem",
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
            아직 준비중...
          </Box>
        </Box>

        {/* <p>Roots: {roots.join(", ")}</p> */}
        <Box sx={{ width: "70%", textAlign: "right" }}>
          {calculatedValue !== null && (
            <div style={{ marginBottom: 20 }}>
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
                  backgroundColor: "#eee",
                  width: "100%",
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Slider 값 설정 후, 'Calculate' 버튼을 클릭해주세요.
              </div>
            </div>
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
              // 클릭 후 1초 후에 계산 시작
              setLoading(true);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              handleFindRoots();
            }}
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate"}
          </Button>
          <Box>
            {/* {coefficients} */}
            root:{calculatedRoots} <br />
            first_root:{firstRoots} <br />
            irr: {calculatedValue}
            <br />
            irr_yearly: {calculatedValueYearly}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PolynomialRootFinder;
