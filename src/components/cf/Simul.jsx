//// version1

// import React, { Component } from "react";
// import * as financial from "financial";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// class InvestmentCalculator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       initialInvestment: 100, // 초기 투자액
//       monthlyInvestment: 10, // 월간 투자액
//       investmentPeriod: 3, // 투자 기간 (년)
//       targetMoney: 550, // 목표 금액
//       resultIRR: null, // 내부 수익률
//       resultIRRYear: null, // 연간 수익률
//       balance: [], // 잔고
//     };
//   }

//   calculateIRR = (values) => {
//     const cashFlows = values.slice(); // 배열 복사
//     console.log(cashFlows, "cashFlows");

//     cashFlows[0] *= -1; // 순현재가치(NPV) 계산을 위해 초기 투자액 음수로 변경
//     console.log(cashFlows[0], "cashFlows[0]");

//     // 내부 수익률 계산
//     const irr = financial.irr(cashFlows);
//     console.log(financial.irr(cashFlows), "irr, 내부 수익률");
//     return irr;
//   };

//   calculateInvestment = () => {
//     const {
//       initialInvestment,
//       monthlyInvestment,
//       investmentPeriod,
//       targetMoney,
//     } = this.state;

//     const cashFlows = [initialInvestment];
//     console.log(cashFlows, "a123");
//     const monthlyInvestmentPeriod = investmentPeriod * 12;
//     console.log(monthlyInvestmentPeriod, "monthlyInvestmentPeriod");

//     let balance = []; // 빈 배열 선언

//     for (let i = 0; i < monthlyInvestmentPeriod - 1; i++) {
//       cashFlows.push(monthlyInvestment);
//       // console.log(cashFlows, "cashFlows");
//     }

//     cashFlows.push(targetMoney);

//     // 내부 수익률 계산
//     const irr = this.calculateIRR(cashFlows);
//     console.log(this.calculateIRR)
//     console.log(irr, "irr");

//     // 연간 수익률 계산
//     const irrYearly = (1.0 + irr) ** 12.0 - 1.0;
//     console.log(irrYearly, "irrYearly");

//     // 잔고 계산
//     for (let index = 0; index < cashFlows.length; index++) {
//       if (index === 0) {
//         balance.push(cashFlows[index]); // 초기 투자액 부분은 음수로 변경
//       } else {
//         balance.push(balance[index - 1] * (1.0 + irr));
//         console.log(index, cashFlows[index], "cashFlows");
//         console.log(balance[index - 1] * (1.0 + irr));
//       }
//       // console.log(financial.irr(cashFlows))
//     }

//     this.setState({
//       resultIRR: irr,
//       resultIRRYear: irrYearly,
//       balance: balance,
//     });
//   };

//   render() {
//     const { resultIRR, resultIRRYear, balance } = this.state;

//     const options = {
//       title: {
//         text: "시간에 따른 잔고",
//       },
//       xAxis: {
//         categories: balance.map((_, index) => index.toString()),
//       },
//       yAxis: {
//         title: {
//           text: "잔고",
//         },
//       },
//       series: [
//         {
//           name: "잔고",
//           data: balance,
//         },
//       ],
//     };

//     return (
//       <div>
//         <button onClick={this.calculateInvestment}>계산하기</button>
//         <span>
//           내부 수익률(irr): {resultIRR !== null ? resultIRR.toFixed(6) : "N/A"},
//         </span>
//         <span>
//           연간 수익률(irrYear):
//           {resultIRRYear !== null ? resultIRRYear.toFixed(6) : "N/A"}
//         </span>
//         <span></span>
//         <HighchartsReact highcharts={Highcharts} options={options} />
//       </div>
//     );
//   }
// }

// export default InvestmentCalculator;

//// version2
// import React, { Component } from "react";
// import * as financial from "financial";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// class InvestmentCalculator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       initialInvestment: 100,
//       monthlyInvestment: 10,
//       investmentPeriod: 3,
//       targetMoney: 550,
//       resultIRR: null,
//       balance: [],
//     };
//   }

//   handleInputChange = (event) => {
//     this.setState({ [event.target.name]: parseFloat(event.target.value) || 0 });
//   };

//   calculateIRR = (values) => {
//     const cashFlows = values.slice();
//     cashFlows[0] *= -1;

//     const irr = financial.irr(cashFlows);

//     return irr;
//   };

//   calculateInvestment = () => {
//     const {
//       initialInvestment,
//       monthlyInvestment,
//       investmentPeriod,
//       targetMoney,
//     } = this.state;

//     const cashFlows = [initialInvestment];
//     const monthlyInvestmentPeriod = investmentPeriod * 12;

//     let balance = [];

//     for (let i = 0; i < monthlyInvestmentPeriod; i++) {
//       cashFlows.push(monthlyInvestment);
//     }

//     cashFlows.push(targetMoney);

//     const irr = this.calculateIRR(cashFlows);
//     const irrYearly = (1.0 + irr) ** 12.0 - 1.0;

//     for (let index = 0; index < cashFlows.length; index++) {
//       if (index === 0) {
//         balance.push(cashFlows[index]);
//       } else {
//         balance.push(balance[index - 1] * (1.0 + irr) + cashFlows[index]);
//       }
//     }

//     this.setState({
//       resultIRR: irrYearly,
//       balance: balance,
//     });
//   };

//   render() {
//     const { resultIRR, balance, initialInvestment, monthlyInvestment, investmentPeriod, targetMoney } = this.state;

//     const options = {
//       title: {
//         text: "시간에 따른 잔고",
//       },
//       xAxis: {
//         categories: balance.map((_, index) => index.toString()),
//       },
//       yAxis: {
//         title: {
//           text: "잔고",
//         },
//       },
//       series: [
//         {
//           name: "잔고",
//           data: balance,
//         },
//       ],
//     };

//     return (
//       <div>
//         <label>
//           초기 투자액:
//           <input
//             type="number"
//             name="initialInvestment"
//             value={initialInvestment}
//             onChange={this.handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           월간 투자액:
//           <input
//             type="number"
//             name="monthlyInvestment"
//             value={monthlyInvestment}
//             onChange={this.handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           투자 기간 (년):
//           <input
//             type="number"
//             name="investmentPeriod"
//             value={investmentPeriod}
//             onChange={this.handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           목표 금액:
//           <input
//             type="number"
//             name="targetMoney"
//             value={targetMoney}
//             onChange={this.handleInputChange}
//           />
//         </label>
//         <br />
//         <button onClick={this.calculateInvestment}>계산하기</button>
//         <p>
//           내부 수익률:{" "}
//           {resultIRR !== null ? resultIRR.toFixed(4) : "N/A"}
//         </p>
//         <HighchartsReact highcharts={Highcharts} options={options} />
//       </div>
//     );
//   }
// }

// export default InvestmentCalculator;

////

////  version3
// import React, { useState } from "react";
// import { irr as calculateIRR } from "financial";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const InvestmentCalculator = () => {
//   const [initialInvestment, setInitialInvestment] = useState(100);
//   const [monthlyInvestment, setMonthlyInvestment] = useState(10);
//   const [investmentPeriod, setInvestmentPeriod] = useState(3);
//   const [targetMoney, setTargetMoney] = useState(550);
//   const [resultIRR, setResultIRR] = useState(null);
//   const [balance, setBalance] = useState([]);

//   const calculateInvestment = () => {
//     const monthlyInvestmentPeriod = investmentPeriod * 12;
//     const cashFlows = [initialInvestment];

//     for (let i = 0; i < monthlyInvestmentPeriod; i++) {
//       cashFlows.push(monthlyInvestment);
//     }

//     cashFlows.push(-targetMoney);

//     const irr = calculateIRR(cashFlows);
//     console.log(cashFlows);
//     const irrYearly = (1.0 + irr) ** 12.0 - 1.0;
//     setResultIRR(irrYearly);

//     let newBalance = [...cashFlows];
//     for (let i = 1; i <= monthlyInvestmentPeriod; i++) {
//       newBalance[i] = newBalance[i - 1] * (1.0 + irr) + newBalance[i];
//     }
//     setBalance(newBalance);
//   };

//   const chartOptions = {
//     title: {
//       text: "Balance Over Time"
//     },
//     xAxis: {
//       categories: Array.from({ length: balance.length }, (_, i) => i.toString())
//     },
//     yAxis: {
//       title: {
//         text: "Balance"
//       }
//     },
//     series: [
//       {
//         name: "Balance",
//         data: balance
//       }
//     ]
//   };

//   return (
//     <div>
//       <label>
//         Initial Investment:
//         <input
//           type="number"
//           value={initialInvestment}
//           onChange={(e) =>
//             setInitialInvestment(parseFloat(e.target.value) || 0)
//           }
//         />
//       </label>
//       <br />
//       <label>
//         Monthly Investment:
//         <input
//           type="number"
//           value={monthlyInvestment}
//           onChange={(e) =>
//             setMonthlyInvestment(parseFloat(e.target.value) || 0)
//           }
//         />
//       </label>
//       <br />
//       <label>
//         Investment Period (years):
//         <input
//           type="number"
//           value={investmentPeriod}
//           onChange={(e) => setInvestmentPeriod(parseFloat(e.target.value) || 0)}
//         />
//       </label>
//       <br />
//       <label>
//         Target Money:
//         <input
//           type="number"
//           value={targetMoney}
//           onChange={(e) => setTargetMoney(parseFloat(e.target.value) || 0)}
//         />
//       </label>
//       <br />
//       <button onClick={calculateInvestment}>Calculate</button>
//       <p>
//         Internal Rate of Return (Yearly):{" "}
//         {resultIRR !== null ? resultIRR : "N/A"}
//       </p>
//       <p>Balance:</p>
//       <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//     </div>
//   );
// };

// export default InvestmentCalculator;

//// YourReactComponent.js

// import React, { useState } from "react";
// import { fv, pmt, irr, npv, mirr } from "financial";

// const YourReactComponent = () => {
//   const [result, setResult] = useState(null);

//   // Example usage
//   const calculateValues = () => {
//     const futureValue = fv(0.05 / 12, 10 * 12, -100, -100);
//     const monthlyPayment = pmt(0.075 / 12, 12 * 15, 200000);
//     const irrResult = irr([
//       100, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10,

//     ]);
//     const npvResult = npv(0.08, [-40_000, 5000, 8000, 12000, 30000]);
//     const mirrResult = mirr([-100, 39, 59, 55, 20], 0.05, 0.06);

//     setResult({
//       futureValue,
//       monthlyPayment,
//       irrResult,
//       npvResult,
//       mirrResult,
//     });
//   };

//   return (
//     <div>
//       <button onClick={calculateValues}>Calculate</button>
//       {result && (
//         <div>
//           <p>Future Value: {result.futureValue}</p>
//           <p>Monthly Payment: {result.monthlyPayment}</p>
//           <p>IRR Result: {result.irrResult}</p>
//           <p>NPV Result: {result.npvResult}</p>
//           <p>MIRR Result: {result.mirrResult}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YourReactComponent;
////
// import React, { useState } from "react";
// import { irr } from "financial";

// const YourReactComponent = () => {
//   const [result, setResult] = useState(null);
//   const [first, setFirst] = useState(100);
//   const [other, setOther] = useState(10);
//   const [year, setYear] = useState(5);

//   // Example usage
//   const calculateValues = () => {
//     const irrData = [first, ...Array(year*12).fill(-other)];
//     const irrResult = irr(irrData);

//     setResult({
//       irrResult,
//     });
//   };

//   return (
//     <div>
//       <div>
//         <label>
//           First Value:
//           <input
//             type="number"
//             value={first}
//             onChange={(e) => setFirst(parseFloat(e.target.value))}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Other Value:
//           <input
//             type="number"
//             value={other}
//             onChange={(e) => setOther(parseFloat(e.target.value))}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Number of Years:
//           <input
//             type="number"
//             value={year}
//             onChange={(e) => setYear(parseInt(e.target.value))}
//           />
//         </label>
//       </div>
//       <button onClick={calculateValues}>Calculate</button>
//       {result && (
//         <div>
//           <p>IRR Result: {result.irrResult}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YourReactComponent;
////
// import React, { useState } from "react";

// function calculateIRR(cashflows) {
//   const maxIterations = 1000;
//   const tolerance = 0.00001;

//   // 함수 정의: 현재가치 계산
//   function presentValue(r) {
//     return cashflows.reduce((pv, cashflow, t) => pv + cashflow / Math.pow(1 + r, t), 0);
//   }

//   // 함수 정의: 현재가치의 미분
//   function presentValueDerivative(r) {
//     return cashflows.reduce((derivative, cashflow, t) => derivative - (t * cashflow) / Math.pow(1 + r, t + 1), 0);
//   }

//   let guess = 0.1;

//   for (let i = 0; i < maxIterations; i++) {
//     const npv = presentValue(guess);
//     const derivative = presentValueDerivative(guess);

//     guess = guess - npv / derivative;

//     if (Math.abs(npv) < tolerance) {
//       return guess;
//     }
//   }

//   // throw new Error("IRR calculation did not converge");
// }

// // 예제 사용
// // const cashflows = [100, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
// //   10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,

// // -550,];
// // const irr = calculateIRR(cashflows);
// // console.log("IRR:", irr);

// const IrrCalculator = () => {
//   // 초기 현금흐름 데이터와 결과값 상태 관리
//   const [cashflows, setCashflows] = useState([
// 100, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
// 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
// 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
// -550,
//   ]);
//   const [irr, setIRR] = useState(null);

//   // IRR 계산 이벤트 핸들러
//   const handleCalculateIRR = () => {
//     try {
//       const calculatedIRR = calculateIRR(cashflows);
//       // Infinity를 표시할 수 있도록 처리
//       setIRR(calculatedIRR);
//     } catch (error) {
//       console.error(error.message);
//       setIRR(null);
//     }
//   };

//   // 컴포넌트 렌더링
//   return (
//     <div>
//       <h2>Internal Rate of Return (IRR) Calculator</h2>
//       <p>현금흐름: {JSON.stringify(cashflows)}</p>
//       <button onClick={handleCalculateIRR}>IRR 계산</button>
//       {irr !== null && <p>IRR: {irr}</p>}
//     </div>
//   );
// };

// export default IrrCalculator;
//// irr 찾기

// import React, { useEffect } from "react";

// const IRRCalculator = () => {
//   useEffect(() => {
//     // Function to calculate the resulting amount
//     var irrResult = function (values, dates, rate) {
//       var r = rate + 1;
//       var result = values[0];
//       for (var i = 1; i < values.length; i++) {
//         result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
//       }
//       return result;
//     };

//     // Function to calculate the first derivation
//     const irrResultDeriv = (values, dates, rate) => {
//       let r = rate + 1;
//       let result = 0;
//       for (let i = 1; i < values.length; i++) {
//         let frac = (dates[i] - dates[0]) / 365;
//         result -= (frac * values[i]) / Math.pow(r, frac + 1);
//       }
//       return result;
//     };

//     // Function to calculate IRR
//     const calculateIRR = (values, guess = 0.1) => {
//       // Initialize dates and check that values contains at least one positive value and one negative value
//       let dates = [];
//       let positive = false;
//       let negative = false;
//       for (let i = 0; i < values.length; i++) {
//         dates[i] = i === 0 ? 0 : dates[i - 1] + 365;
//         if (values[i] > 0) positive = true;
//         if (values[i] < 0) negative = true;
//       }

//       // Return error if values does not contain at least one positive value and one negative value
//       if (!positive || !negative) return 0;

//       // Set maximum epsilon for the end of iteration
//       let epsMax = 1e-10;

//       // Set the maximum number of iterations to values.length
//       let iterMax = values.length;

//       // Implement Newton's method
//       let resultRate = guess;
//       let newRate, epsRate, resultValue;
//       let iteration = 0;
//       let contLoop = true;

//       do {
//         resultValue = irrResult(values, dates, resultRate);
//         newRate =
//           resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
//         epsRate = Math.abs(newRate - resultRate);
//         resultRate = newRate;
//         contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
//       } while (contLoop && ++iteration < iterMax);

//       if (contLoop) return 0;

//       // Return internal rate of return
//       return resultRate;
//     };

//     // Example usage
//     const values = [100, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, -550]

//     values.push(-550);
//     console.log(values);
//     const result = calculateIRR(values);
//     console.log(result);
//     const resultDiv = document.getElementById("result");
//     if (resultDiv) {
//       resultDiv.textContent = `Internal Rate of Return: ${Math.abs(result)}`;
//     }
//   }, []);
//   return <div id="result">Check the console for results</div>;
// };

// export default IRRCalculator;

// https://stackoverflow.com/questions/67476581/irr-calculation-with-javascript

// 이거야이거야 1
// import React, { useState } from "react";

// const PolynomialRootFinder = () => {
//   const [coefficients, setCoefficients] = useState([100, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, -550]);
//   const [roots, setRoots] = useState([]);
//   const [calculatedValue, setCalculatedValue] = useState(null);

//   const findRoots = (coefficients) => {
//     const tolerance = 1e-10;
//     const maxIterations = 1000;
//     const degree = coefficients.length - 1;

//     const polyFunction = (x) => coefficients.reduce((acc, c, i) => acc + c * Math.pow(x, i), 0);

//     const calculatedRoots = [];

//     for (let i = 0; i < degree; i++) {
//       let a = i - 10;
//       let b = i + 11;
//       let iteration = 0;

//       while (iteration < maxIterations) {
//         const c = (a + b) / 2;

//         if (polyFunction(a) * polyFunction(c) < 0) {
//           b = c;
//         } else {
//           a = c;
//         }

//         if (Math.abs(polyFunction(c)) < tolerance) {
//           calculatedRoots.push(Number(c.toFixed(8))); // Round to 9 decimal places
//           break;
//         }

//         iteration++;
//       }
//     }

//     return calculatedRoots;
//   };

//   const handleFindRoots = () => {
//     const calculatedRoots = findRoots(coefficients);
//     setRoots(calculatedRoots);

//     // Calculate the desired value
//     if (calculatedRoots.length > 0) {
//       const firstRoot = calculatedRoots[0];
//       const calculatedValue = (1 / firstRoot) - 1;
//       setCalculatedValue(calculatedValue);
//     } else {
//       setCalculatedValue(null);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleFindRoots}>Find Roots</button>
//       <p>Roots: {roots.join(", ")}</p>
//       {calculatedValue !== null && (
//         <p>Calculated Value: {calculatedValue}</p>
//       )}
//     </div>
//   );
// };

// export default PolynomialRootFinder;

//❗ 이거야이거야

// import React, { useState, useEffect } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const PolynomialRootFinder = () => {
//   const [initialInvestment, setInitialInvestment] = useState(100);
//   const [monthlyInvestment, setMonthlyInvestment] = useState(10);
//   const [investmentPeriod, setInvestmentPeriod] = useState(2);
//   const [targetMoney, setTargetMoney] = useState(550);
//   const [roots, setRoots] = useState([]);
//   const [calculatedValue, setCalculatedValue] = useState(null);
//   const [balance, setBalance] = useState([]);

//   const findRoots = (coefficients) => {
//     // Bisection method for finding roots
//     const tolerance = 1e-10;
//     const maxIterations = 1000;
//     const degree = coefficients.length - 1;

//     const polyFunction = (x) =>
//       coefficients.reduce((acc, c, i) => acc + c * Math.pow(x, i), 0);

//     const calculatedRoots = [];

//     for (let i = 0; i < degree; i++) {
//       let a = i - 10;
//       let b = i + 11;
//       let iteration = 0;

//       while (iteration < maxIterations) {
//         const c = (a + b) / 2;

//         if (polyFunction(a) * polyFunction(c) < 0) {
//           b = c;
//         } else {
//           a = c;
//         }

//         if (Math.abs(polyFunction(c)) < tolerance) {
//           calculatedRoots.push(Number(c.toFixed(8))); // Round to 8 decimal places
//           break;
//         }

//         iteration++;
//       }
//     }

//     return calculatedRoots;
//   };

//   const handleFindRoots = () => {
//     // Calculate the monthlyInvestmentPeriod
//     const monthlyInvestmentPeriod = investmentPeriod * 12;

//     // Create the coefficients array based on inputs
//     const coefficients = [];
//     coefficients.push(initialInvestment);

//     for (let i = 0; i < monthlyInvestmentPeriod; i++) {
//       coefficients.push(monthlyInvestment);
//     }

//     coefficients.push(-targetMoney);

//     const calculatedRoots = findRoots(coefficients);
//     setRoots(calculatedRoots);

//     // Calculate the desired value
//     if (calculatedRoots.length > 0) {
//       const firstRoot = calculatedRoots[0];
//       const calculatedValue = 1 / firstRoot - 1;
//       setCalculatedValue(calculatedValue);

//       // Create balance array
//       const balanceArray = [...coefficients];

//       // Calculate balance values
//       for (let i = 1; i <= monthlyInvestmentPeriod; i++) {
//         balanceArray[i] =
//           balanceArray[i - 1] * (1.0 + calculatedValue) + balanceArray[i];
//       }

//       setBalance(balanceArray);
//     } else {
//       setCalculatedValue(null);
//       setBalance([]);
//     }
//   };
//   const [chartOptions, setChartOptions] = useState({
//     title: {
//       text: "Balance Over Time",
//     },
//     xAxis: {
//       title: {
//         text: "Month",
//       },
//     },
//     yAxis: {
//       title: {
//         text: "Balance",
//       },
//     },
//     series: [
//       {
//         name: "Balance",
//         data: [],
//       },
//     ],
//   });

//   useEffect(() => {
//     // Update chart data when balance is updated
//     setChartOptions((prevOptions) => ({
//       ...prevOptions,
//       series: [{ name: "Balance", data: balance }],
//     }));
//   }, [balance]);
//   return (
//     <div>
//       <label>
//         Initial Investment:
//         <input
//           type="number"
//           value={initialInvestment}
//           onChange={(e) =>
//             setInitialInvestment(parseFloat(e.target.value) || 0)
//           }
//         />
//       </label>
//       <br />
//       <label>
//         Monthly Investment:
//         <input
//           type="number"
//           value={monthlyInvestment}
//           onChange={(e) =>
//             setMonthlyInvestment(parseFloat(e.target.value) || 0)
//           }
//         />
//       </label>
//       <br />
//       <label>
//         Investment Period (years):
//         <input
//           type="number"
//           value={investmentPeriod}
//           onChange={(e) => setInvestmentPeriod(parseFloat(e.target.value) || 0)}
//         />
//       </label>
//       <br />
//       <label>
//         Target Money:
//         <input
//           type="number"
//           value={targetMoney}
//           onChange={(e) => setTargetMoney(parseFloat(e.target.value) || 0)}
//         />
//       </label>
//       <br />
//       <button onClick={handleFindRoots}>Find Roots</button>
//       <p>Roots: {roots.join(", ")}</p>
//       {calculatedValue !== null && (
//         <div>
//           <div>
//             <p>Calculated Value: {calculatedValue}</p>
//             <p>Balance:</p>
//             <ul>
//               {balance.map((value, index) => (
//                 <li key={index}>
//                   {index}개월차:{value}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <HighchartsReact highcharts={Highcharts} options={chartOptions} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PolynomialRootFinder;

//
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
  const [investmentPeriod, setInvestmentPeriod] = useState(2);
  const [targetMoney, setTargetMoney] = useState(550);
  const [roots, setRoots] = useState([]);
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [balance, setBalance] = useState([]);
  const [balanceLow, setBalanceLow] = useState([]);
  const [balanceHigh, setBalanceHigh] = useState([]);

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
      const z = 0.2;
      const sigma = calculatedValue * sharpe_ratio;
      const balanceArray = [...coefficients];
      const balanceLowArray = [...coefficients];
      const balanceHightArray = [...coefficients];

      for (let i = 1; i <= monthlyInvestmentPeriod; i++) {
        balanceArray[i] =
          balanceArray[i - 1] * (1.0 + calculatedValue) + balanceArray[i];
        balanceLowArray[i] =
          balanceLowArray[i - 1] * (1.0 + calculatedValue - z * sigma) +
          balanceLowArray[i];
        balanceHightArray[i] =
          balanceHightArray[i - 1] * (1.0 + calculatedValue + z * sigma) +
          balanceHightArray[i];
      }

      setBalance(balanceArray);
      setBalanceLow(balanceLowArray);
      setBalanceHigh(balanceHightArray);
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
          const seriesLineColor = this.userOptions.lineColor;
          return `<span style="display:flex; place-items: center; gap: 3px;">
                  <div style="background-color: ${seriesLineColor}; width:15px; height:15px; border-radius: 50%; float:left; margin-right:5px;"></div>
                  <span>${this.name}</span></span>`;
        },
      },
      series: [
        {
          type: "line",
          color: "#6ab9fd",
          name: "Balance_Low",
          data: balanceLow,
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
          type: "line",
          color: "#ff754b",
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
          type: "line",
          color: "#ffcebf",
          name: "Balance_High",
          data: balanceHigh,
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
  }, [balance, balanceLow, balanceHigh]);

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
          max={30}
        />
      </Box>
      <Box>
        <Typography gutterBottom>Target Money: {targetMoney}</Typography>
        <Slider
          value={targetMoney}
          onChange={(event, value) =>
            handleSliderChange(event, value, "targetMoney")
          }
          min={0}
          max={100000}
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
            {/* <p>Balance:</p>
            <ul>
              {balance.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul> */}
          </div>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default PolynomialRootFinder;
