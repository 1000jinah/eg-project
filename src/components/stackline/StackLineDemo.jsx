import React, { useState, useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SolarEmploymentChart = () => {
  const [seriesData, setSeriesData] = useState([
    {
      name: "Installation & Developers",
      periods: 9,
      value: 1000,
      minusPeriods: 12,
      minusValue: 500,
    },
    // {
    //   name: "Manufacturing",
    //   periods: 8,
    //   value: 21,
    //   minusPeriods: 4,
    //   minusValue: 5,
    // },
    // {
    //   name: "Sales & Distribution",
    //   periods: 6,
    //   value: 21,
    //   minusPeriods: 5,
    //   minusValue: 5,
    // },
    // {
    //   name: "Operations & Maintenance",
    //   periods: 7,
    //   value: 21,
    //   minusPeriods: 8,
    //   minusValue: 5,
    // },
    // { name: "Other", periods: 5, value: 21, minusPeriods: 2, minusValue: 5 },
  ]);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [investmentRate, setInvestmentRate] = useState(0.02);
  const [earlyInvestmentRate, setEarlyInvestmentRate] = useState(0.02);

  const [applyInvestment, setApplyInvestment] = useState(
    new Array(seriesData.length).fill(false)
  );
  const [applyEarlyInvestment, setApplyEarlyInvestment] = useState(
    new Array(seriesData.length).fill(false)
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef(null);
  const [iterations1, setIterations1] = useState([]);
  const [iterations2, setIterations2] = useState([]);

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "U.S Solar Employment Growth",
      align: "left",
    },
    subtitle: {
      text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
      align: "left",
    },
    yAxis: {
      title: {
        enabled: false,
      },
    },
    xAxis: {
      categories: Array.from(
        {
          length: Math.max(
            ...seriesData.map((series) => series.periods + series.minusPeriods)
          ),
        },
        (_, i) => i + 1
      ).map(String),
      accessibility: {
        rangeDescription: "Range: 1 to max period value",
      },
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: seriesData.map(
      ({ name, value, periods, minusPeriods, minusValue }, index) => {
        const seriesValues = [];

        // 임의의 투자수익률: 0.02
        // 투자수익률을 원금에 적용. 적용된 값을 원금 값과 합산한 후, value 합산.
        for (let i = 0; i < periods; i++) {
          const currentValue = value * (i + 1);
          const adjustedValue = applyEarlyInvestment[index]
            ? currentValue + currentValue * earlyInvestmentRate
            : currentValue;

          seriesValues.push(adjustedValue);
        }
        // 임의의 투자수익률: 0.02
        // 투자수익률을 원금에 적용. 적용된 값을 원금 값과 합산한 후, minusValue를 차감.
        for (let i = 0; i < minusPeriods; i++) {
          const currentValue = seriesValues[seriesValues.length - 1];
          const adjustedValue = applyInvestment[index]
            ? currentValue + currentValue * investmentRate
            : currentValue;

          seriesValues.push(adjustedValue - minusValue);
        }

        return { name, data: seriesValues };
      }
    ),
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
    credits: {
      enabled: false,
    },
  };

  const handleToggleEarlyInvestment = (index) => {
    setApplyEarlyInvestment((prev) => {
      const newApplyEarlyInvestment = [...prev];
      newApplyEarlyInvestment[index] = !prev[index];
      return newApplyEarlyInvestment;
    });
  };
  // Minus 데이터 투자의 유무(투자수익률 적용 여부)
  const handleToggleInvestment = (index) => {
    setApplyInvestment((prev) => {
      const newApplyInvestment = [...prev];
      newApplyInvestment[index] = !prev[index];
      return newApplyInvestment;
    });
  };

  // Input으로 데이터 변경 기능
  const handleInputChange = (index, key, value) => {
    setSeriesData((prevSeriesData) => {
      const newSeriesData = [...prevSeriesData];
      newSeriesData[index][key] = parseInt(value, 10) || 0;
      return newSeriesData;
    });
  };

  const handleNameClick = (index) => {
    setEditingIndex(index);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.select(); // Select the text in the input
    }, 0);
  };

  const handleNameBlur = () => {
    setEditingIndex(null);
  };

  const handleNameChange = (index, value) => {
    setSeriesData((prevSeriesData) => {
      const newSeriesData = [...prevSeriesData];
      newSeriesData[index].name = value;
      return newSeriesData;
    });
  };
  // 신규 생성
  const addNewSeries = () => {
    setSeriesData((prevSeriesData) => [
      ...prevSeriesData,
      {
        name: `New Series ${prevSeriesData.length + 1}`,
        periods: 5,
        value: 21,
        minusPeriods: 2,
        minusValue: 5,
      },
    ]);
  };
  // 기존 데이터 복제 추가
  const duplicateSeries = (index) => {
    setSeriesData((prevSeriesData) => {
      const seriesToDuplicate = prevSeriesData[index];
      const duplicatedSeries = {
        ...seriesToDuplicate,
        name: `${seriesToDuplicate.name}`,
      };

      // Duplicate the applyInvestment status along with the series
      const newApplyInvestment = [...applyInvestment];
      const applyInvestmentForDuplicatedSeries = applyInvestment[index];
      newApplyInvestment.push(applyInvestmentForDuplicatedSeries);

      return [
        ...prevSeriesData,
        {
          ...duplicatedSeries,
          applyInvestment: applyInvestmentForDuplicatedSeries,
        },
      ];
    });
  };
  // 기존 데이터 삭제
  const removeSeries = (index) => {
    setSeriesData((prevSeriesData) => [
      ...prevSeriesData.slice(0, index),
      ...prevSeriesData.slice(index + 1),
    ]);
  };
  useEffect(() => {
    const chart = chartRef.current.chart;

    // 첫 번째 useEffect
    const newChartData1 = chart.series.map((series, index) => {
      // ... existing code

      return {
        name: series.name,
        data: series.data.map((point) => point.y),
      };
    });

    // Set iterations1 state
    setIterations1(
      chart.series.map((series, index) => {
        const lastPoint = series.data[series.data.length - 1];
        let adjustedLastPoint1 = lastPoint.y;
        let iterations1 = 0;
        let currentMinusValue1 = seriesData[index].minusValue;

        while (adjustedLastPoint1 >= 0) {
          const morePointValue1 =
            adjustedLastPoint1 * investmentRate + adjustedLastPoint1;
          adjustedLastPoint1 = morePointValue1 - currentMinusValue1;
          iterations1++;

        //   if (adjustedLastPoint1 < 0) {
        //     console.log(
        //       `Series ${
        //         index + 1
        //       }: Adjusted last point became negative after ${iterations1} iterations with minusValue: ${currentMinusValue1}`
        //     );
        //   }

          // Increase the minusValue for the next iteration
          currentMinusValue1++;
        }

        // console.log(`Series ${index + 1} Last Data Point:`, adjustedLastPoint1);

        // // 추가적인 minusPeriods 값과 추가적인 minusValue 값을 console.warn 으로 보여줌
        // console.warn(
        //   `Series ${index + 1}: Additional minusValue - ${iterations1}`
        // );

        return iterations1;
      })
    );

    setChartData(newChartData1);

    // 두 번째 useEffect
    const newChartData2 = chart.series.map((series, index) => {
      // ... existing code

      return {
        name: series.name,
        data: series.data.map((point) => point.y),
      };
    });

    // Set iterations2 state
    setIterations2(
      chart.series.map((series, index) => {
        const lastPoint = series.data[series.data.length - 1];
        let morePointValue2 = lastPoint.y * investmentRate + lastPoint.y;
        let adjustedLastPoint2 = lastPoint.y;
        let iterations2 = 0;
        const maxIterations2 = 100; // 최대 반복 횟수

        while (adjustedLastPoint2 >= 0 && iterations2 < maxIterations2) {
          morePointValue2 =
            adjustedLastPoint2 * investmentRate + adjustedLastPoint2;
          adjustedLastPoint2 = morePointValue2 - seriesData[index].minusValue;
          iterations2++;
        }

        // if (adjustedLastPoint2 < 0) {
        //   console.warn(
        //     `Series ${
        //       index + 1
        //     }: Adjusted last point became negative after ${iterations2} iterations.`
        //   );
        // }

        // console.log(`Series ${index + 1} Last Data Point:`, adjustedLastPoint2);

        // // 추가적인 minusPeriods 값과 추가적인 minusValue 값을 console.warn 으로 보여줌
        // console.warn(
        //   `Series ${index + 1}: Additional minusPeriods - ${iterations2}`
        // );

        return iterations2;
      })
    );

    setChartData(newChartData2);

    // 차트 객체에서 series 데이터에 접근하여 콘솔에 출력합니다.
    // chart.series.forEach((series, index) => {
    //   console.log(
    //     `Series ${index + 1} Data:`,
    //     series.data.map((point) => point.y)
    //   );
    // });
  }, [seriesData, applyInvestment, investmentRate]);

  //   useEffect(() => {
  //     const chart = chartRef.current.chart;

  //     // 첫 번째 useEffect
  //     const newChartData1 = chart.series.map((series, index) => {
  //       const lastPoint = series.data[series.data.length - 1];
  //       let adjustedLastPoint1 = lastPoint.y;
  //       let iterations1 = 0;
  //       let currentMinusValue1 = seriesData[index].minusValue;

  //       while (adjustedLastPoint1 >= 0) {
  //         const morePointValue1 =
  //           adjustedLastPoint1 * investmentRate + adjustedLastPoint1;
  //         adjustedLastPoint1 = morePointValue1 - currentMinusValue1;
  //         iterations1++;

  //         if (adjustedLastPoint1 < 0) {
  //           console.log(
  //             `Series ${
  //               index + 1
  //             }: Adjusted last point became negative after ${iterations1} iterations with minusValue: ${currentMinusValue1}`
  //           );
  //         }

  //         // Increase the minusValue for the next iteration
  //         currentMinusValue1++;
  //       }

  //       console.log(`Series ${index + 1} Last Data Point:`, adjustedLastPoint1);

  //       // 추가적인 minusPeriods 값과 추가적인 minusValue 값을 console.warn 으로 보여줌
  //       console.warn(
  //         `Series ${index + 1}: Additional minusValue - ${iterations1}`
  //       );

  //       return {
  //         name: series.name,
  //         data: series.data.map((point) => point.y),
  //       };
  //     });
  //     setChartData(newChartData1);

  //     // 두 번째 useEffect
  //     const newChartData2 = chart.series.map((series, index) => {
  //       const lastPoint = series.data[series.data.length - 1];
  //       let morePointValue2 = lastPoint.y * investmentRate + lastPoint.y;
  //       let adjustedLastPoint2 = lastPoint.y;
  //       let iterations2 = 0;
  //       const maxIterations2 = 100; // 최대 반복 횟수

  //       while (adjustedLastPoint2 >= 0 && iterations2 < maxIterations2) {
  //         morePointValue2 =
  //           adjustedLastPoint2 * investmentRate + adjustedLastPoint2;
  //         adjustedLastPoint2 = morePointValue2 - seriesData[index].minusValue;
  //         iterations2++;
  //       }

  //       if (adjustedLastPoint2 < 0) {
  //         console.warn(
  //           `Series ${
  //             index + 1
  //           }: Adjusted last point became negative after ${iterations2} iterations.`
  //         );
  //       }

  //       console.log(`Series ${index + 1} Last Data Point:`, adjustedLastPoint2);

  //       // 추가적인 minusPeriods 값과 추가적인 minusValue 값을 console.warn 으로 보여줌
  //       console.warn(
  //         `Series ${index + 1}: Additional minusPeriods - ${iterations2}`
  //       );

  //       return {
  //         name: series.name,
  //         data: series.data.map((point) => point.y),
  //       };
  //     });
  //     setChartData(newChartData2);

  //     // 차트 객체에서 series 데이터에 접근하여 콘솔에 출력합니다.
  //     chart.series.forEach((series, index) => {
  //       console.log(
  //         `Series ${index + 1} Data:`,
  //         series.data.map((point) => point.y)
  //       );
  //     });
  //   }, [seriesData, applyInvestment, investmentRate]);

  //   useEffect(() => {
  //   const chart = chartRef.current.chart;

  //   // 차트 데이터 상태 업데이트
  //   const newChartData = chart.series.map((series, index) => {
  //     const lastPoint = series.data[series.data.length - 1];
  //     let adjustedLastPoint = lastPoint.y;
  //     let iterations = 0;
  //     let currentMinusValue = seriesData[index].minusValue;

  //     while (adjustedLastPoint >= 0) {
  //       const morePointValue =
  //         adjustedLastPoint * investmentRate + adjustedLastPoint;
  //       adjustedLastPoint = morePointValue - currentMinusValue;
  //       iterations++;

  //       if (adjustedLastPoint < 0) {
  //         console.log(
  //           `Series ${index + 1}: Adjusted last point became negative after ${iterations} iterations with minusValue: ${currentMinusValue}`
  //         );
  //       }

  //       // Increase the minusValue for the next iteration
  //       currentMinusValue++;
  //     }

  //     console.log(`Series ${index + 1} Last Data Point:`, adjustedLastPoint);

  //     return {
  //       name: series.name,
  //       data: series.data.map((point) => point.y),
  //     };
  //   });
  //   setChartData(newChartData);

  //   // 차트 객체에서 series 데이터에 접근하여 콘솔에 출력합니다.
  //   chart.series.forEach((series, index) => {
  //     console.log(
  //       `Series ${index + 1} Data:`,
  //       series.data.map((point) => point.y)
  //     );
  //   });
  // }, [seriesData, applyInvestment, investmentRate]);
  //   useEffect(() => {
  //     const chart = chartRef.current.chart;

  //     // 차트 데이터 상태 업데이트
  //     const newChartData = chart.series.map((series, index) => {
  //       const lastPoint = series.data[series.data.length - 1];
  //       let morePointValue = lastPoint.y * investmentRate + lastPoint.y;
  //       let adjustedLastPoint = lastPoint.y;
  //       let iterations = 0;
  //       const maxIterations = 100; // 최대 반복 횟수

  //       while (adjustedLastPoint >= 0 && iterations < maxIterations) {
  //         morePointValue = adjustedLastPoint * investmentRate + adjustedLastPoint;
  //         adjustedLastPoint = morePointValue - seriesData[index].minusValue;
  //         iterations++;
  //       }

  //       if (adjustedLastPoint < 0) {
  //         console.warn(
  //           `Series ${
  //             index + 1
  //           }: Adjusted last point became negative after ${iterations} iterations.`
  //         );
  //       }

  //       console.log(`Series ${index + 1} Last Data Point:`, adjustedLastPoint);

  //       return {
  //         name: series.name,
  //         data: series.data.map((point) => point.y),
  //       };
  //     });
  //     setChartData(newChartData);

  //     // 차트 객체에서 series 데이터에 접근하여 콘솔에 출력합니다.
  //     chart.series.forEach((series, index) => {
  //       console.log(
  //         `Series ${index + 1} Data:`,
  //         series.data.map((point) => point.y)
  //       );
  //     });
  //   }, [seriesData, applyInvestment, investmentRate]);

  return (
    <div>
      {chartData.map((series, index) => (
        <div key={index}>
          <h3>{series.name} Data:</h3>
          <p>{JSON.stringify(series.data)}</p>
          {/* Display iterations1 for newChartData1 */}
          {/* <p>Iterations for newChartData1: {iterations1[index]}</p>

          {/* Display iterations2 for newChartData2 */}
          {/* <p>Iterations for newChartData2: {iterations2[index]}</p> */}
        </div>
      ))}

      {seriesData.map((series, index) => (
        <div key={index}>
          <div>
            <label>Apply Investment:</label>{" "}
            <input
              type="checkbox"
              checked={applyInvestment[index]}
              onChange={() => handleToggleInvestment(index)}
            />
          </div>

          <div>
            <label>Apply Early Investment:</label>{" "}
            <input
              type="checkbox"
              checked={applyEarlyInvestment[index]}
              onChange={() => handleToggleEarlyInvestment(index)}
            />
          </div>
          {editingIndex === index ? (
            <div>
              <label>Name:</label>
              <input
                ref={inputRef}
                type="text"
                value={series.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                onBlur={handleNameBlur}
                onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
              />
            </div>
          ) : (
            <p onClick={() => handleNameClick(index)}>{series.name}</p>
          )}
          <div>
            <label>Periods:</label>
            <input
              type="text"
              value={series.periods}
              onChange={(e) =>
                handleInputChange(index, "periods", e.target.value)
              }
              onBlur={handleNameBlur}
              onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
            />
          </div>
          <div>
            <label>Initial Value:</label>
            <input
              type="text"
              value={series.value}
              onChange={(e) =>
                handleInputChange(index, "value", e.target.value)
              }
              onBlur={handleNameBlur}
              onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
            />
          </div>
          <div>
            <label>Minus Periods:</label>
            <input
              type="text"
              value={series.minusPeriods}
              onChange={(e) =>
                handleInputChange(index, "minusPeriods", e.target.value)
              }
              onBlur={handleNameBlur}
              onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
            />
            {applyInvestment[index] && iterations2[index] === 1 ? (
              <span>0에 최대한 수렴했습니다. 이상적인 값입니다.</span>
            ) : applyInvestment[index] &&
              iterations2[index] !== 1 &&
              iterations2[index] > 1 ? (
              <span>
                0에 최대한 수렴하지 않았습니다! 조금 더 기간을 늘려보세요!
              </span>
            ) : applyInvestment[index] &&
              iterations2[index] !== 1 &&
              iterations2[index] === 0 ? (
              <span>인출 금액 너무 많습니다! 조금 더 기간을 낮춰보세요!</span>
            ) : (
              <span>
                {(series.value * series.periods) / series.minusValue + "year"}
              </span>
            )}
          </div>
          <div>
            <label>Minus Value:</label>
            <input
              type="text"
              value={series.minusValue}
              onChange={(e) =>
                handleInputChange(index, "minusValue", e.target.value)
              }
              onBlur={handleNameBlur}
              onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
            />
            {applyInvestment[index] && iterations1[index] === 1 ? (
              <span>0에 최대한 수렴했습니다. 이상적인 값입니다.</span>
            ) : applyInvestment[index] &&
              iterations1[index] !== 1 &&
              iterations1[index] > 1 ? (
              <span>
                0에 최대한 수렴하지 않았습니다! 조금 더 금액을 늘려보세요!
              </span>
            ) : applyInvestment[index] &&
              iterations1[index] !== 1 &&
              iterations1[index] === 0 ? (
              <span>인출 금액 너무 많습니다! 조금 더 금액을 낮춰보세요!</span>
            ) : (
              <span>
                {"$ " + (series.value * series.periods) / series.minusPeriods}
              </span>
            )}
          </div>
          <button onClick={() => removeSeries(index)}>Remove Series</button>
          <button onClick={() => duplicateSeries(index)}>
            Duplicate Series
          </button>
        </div>
      ))}

      <button onClick={addNewSeries}>Add New Series</button>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};

export default SolarEmploymentChart;
