// import React, { useState, useEffect } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const ChartComponent = () => {
//   const initialLineValues = [10, 20, 30, 40, 50];
//   const initialDateValues = [1, 2, 3, 4, 5]; // Example initial date values
//   const [sliderValues, setSliderValues] = useState([...initialLineValues]);
//   const [dateValues, setDateValues] = useState([...initialDateValues]);
//   const [startDateValues, setStartDateValues] = useState([10, 15, 20, 25, 30]); // Example initial start dates
//   const [series, setSeries] = useState([]);
//   const [totalYValues, setTotalYValues] = useState([]);

//   useEffect(() => {
//     // Log the sum of y-axis values for each x-axis value
//     console.log("Total Y Values:", totalYValues);
//   }, [totalYValues]);

//   useEffect(() => {
//     // Log series data to console whenever it changes
//     console.log("Series Data:", series);
//   }, [series]);

//   useEffect(() => {
//     // Update series whenever sliderValues, dateValues, or startDateValues change
//     const newSeries = initialLineValues.map((_, index) => {
//       const areaData = [];
//       const cumulativeSumArray = [];
//       let cumulativeSum = 0;

//       for (let i = 0; i < dateValues[index]; i++) {
//         cumulativeSum = sliderValues[index];
//         areaData.push({
//           x: i + startDateValues[index],
//           y: cumulativeSum,
//         });
//         cumulativeSumArray.push(cumulativeSum);
//       }

//       return {
//         type: "area",
//         name: `Area Chart ${index + 1}`,
//         data: areaData,
//         cumulativeSumArray,
//       };
//     });

//     setSeries(newSeries);
//   }, [sliderValues, dateValues, startDateValues]);

//   const allDataPoints = series.flatMap((areaSeries) => {
//     const { data, cumulativeSumArray } = areaSeries;
//     const startIndex = data.length > 0 ? data[0].x : 0;
//     const endIndex = data.length > 0 ? data[data.length - 1].x : 0;

//     const allXValues = Array.from(
//       { length: endIndex - startIndex + 1 },
//       (_, i) => startIndex + i,
//     );

//     return allXValues.map((x) => ({
//       x,
//       y:
//         cumulativeSumArray[x - startIndex] !== undefined
//           ? cumulativeSumArray[x - startIndex]
//           : 0,
//     }));
//   });

//   const aggregatedData = allDataPoints.reduce((result, point) => {
//     const existingPoint = result.find((p) => p.x === point.x);

//     if (existingPoint) {
//       existingPoint.y += point.y;
//     } else {
//       result.push({ x: point.x, y: point.y });
//     }

//     return result;
//   }, []);

//   const lineoptions = {
//     title: {
//       text: "Highcharts React Example",
//     },
//     xAxis: {
//       labels: {
//         enabled: true,
//         style: {
//           color: "#b3b3b3",
//         },
//       },
//       crosshair: true,
//     },
//     yAxis: {
//       title: {
//         text: "Value",
//       },
//     },
//     series: [
//       ...series,
//       {
//         type: "line",
//         name: "Aggregated Line Chart",
//         data: aggregatedData,
//       },
//     ],
//     tooltip: {
//       pointFormat:
//         '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f} billion Gt)<br/>',
//       split: true,
//     },
//     plotOptions: {
//       area: {
//         stacking: "normal",
//         lineWidth: 0,
//         marker: {
//           enabled: false,
//         },
//       },
//     },
//   };

//   const handleSliderChange = (index, value) => {
//     const newSliderValues = [...sliderValues];
//     newSliderValues[index] = value;
//     setSliderValues(newSliderValues);
//   };

//   const handleDateChange = (index, value) => {
//     const newDateValues = [...dateValues];
//     newDateValues[index] = value;
//     setDateValues(newDateValues);
//   };

//   const handleStartDateChange = (index, value) => {
//     const newStartDateValues = [...startDateValues];
//     newStartDateValues[index] = value;
//     setStartDateValues(newStartDateValues);
//   };

//   return (
//     <div>
//       <HighchartsReact highcharts={Highcharts} options={lineoptions} />
//       <div>
//         {initialLineValues.map((_, index) => (
//           <div key={index}>
//             <input
//               type="number"
//               value={sliderValues[index]}
//               onChange={(e) =>
//                 handleSliderChange(index, parseFloat(e.target.value))
//               }
//             />
//             <input
//               type="range"
//               min={0}
//               max={100}
//               value={sliderValues[index]}
//               onChange={(e) =>
//                 handleSliderChange(index, parseInt(e.target.value))
//               }
//             />
//             <input
//               type="number"
//               value={dateValues[index]}
//               onChange={(e) =>
//                 handleDateChange(index, parseFloat(e.target.value))
//               }
//             />
//             <input
//               type="range"
//               min={0}
//               max={100}
//               value={dateValues[index]}
//               onChange={(e) =>
//                 handleDateChange(index, parseInt(e.target.value))
//               }
//             />
//             <input
//               type="number"
//               value={startDateValues[index]}
//               onChange={(e) =>
//                 handleStartDateChange(index, parseFloat(e.target.value))
//               }
//             />
//             <input
//               type="range"
//               min={0}
//               max={100}
//               value={startDateValues[index]}
//               onChange={(e) =>
//                 handleStartDateChange(index, parseInt(e.target.value))
//               }
//             />
//           </div>
//         ))}
//       </div>
//       <div>
//         <h3>All Series Data</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>X</th>
//               <th>Y</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allDataPoints.map((point, index) => (
//               <tr key={index}>
//                 <td>{point.x}</td>
//                 <td>{point.y}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div>
//         <h3>Aggregated Series Data</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>X</th>
//               <th>Y</th>
//             </tr>
//           </thead>
//           <tbody>
//             {aggregatedData.map((point, index) => (
//               <tr key={index}>
//                 <td>{point.x}</td>
//                 <td>{point.y}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ChartComponent;

////

import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import SliderComponent from "components/Slider";
//
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box, Typography, TextField } from "@mui/material";

const ChartComponent = () => {
  const initialLineValues = [10, 20, 30, 40, 50];
  const initialDateValues = [1, 2, 3, 4, 5]; // Example initial date values
  const [sliderValues, setSliderValues] = useState([...initialLineValues]);
  const [dateValues, setDateValues] = useState([...initialDateValues]);
  const [startDateValues, setStartDateValues] = useState([10, 15, 20, 25, 30]); // Example initial start dates
  const [series, setSeries] = useState([]);
  const [expanded, setExpanded] = useState("");
  const [editMode, setEditMode] = useState(null);

  const [customTitles, setCustomTitles] = useState(
    initialLineValues.map((_, index) => `Area Chart ${index + 1}`)
  );

  const handleTitleChange = (index, value) => {
    const newCustomTitles = [...customTitles];
    newCustomTitles[index] = value;
    setCustomTitles(newCustomTitles);

    // Step 3: Update series names based on custom titles
    const newSeries = [...series];
    newSeries[index].name = value;
    setSeries(newSeries);
  };

  // const handleAccordChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };


  const handleAccordChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  
    if (panel === "panel1" || panel === "panel2") {
      // Step 1: Combine allDataPoints and aggregatedData
      const combinedData = [...allDataPoints, ...aggregatedData];
  
      // Step 2: Sort the combinedData based on x values
      combinedData.sort((a, b) => a.x - b.x);
  
      // Step 3: Deduplicate based on x values
      const deduplicatedData = combinedData.reduce((uniqueData, point) => {
        const existingPoint = uniqueData.find((p) => p.x === point.x);
        if (!existingPoint) {
          uniqueData.push(point);
        }
        return uniqueData;
      }, []);
  
      // Step 4: Update the series state with deduplicatedData
      const newSeries = initialLineValues.map((_, index) => {
        const areaData = deduplicatedData
          .filter((point) => point.x >= startDateValues[index])
          .map((point) => ({
            x: point.x,
            y: point.y,
          }));
  
        return {
          type: "area",
          name: customTitles[index],
          data: areaData,
          cumulativeSumArray: areaData.map((point) => point.y),
        };
      });
  
      setSeries(newSeries);
    }
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

  useEffect(() => {
    // Log series data to console whenever it changes
    console.log("Series Data:", series);
  }, [series]);

  useEffect(() => {
    // Update series whenever sliderValues, dateValues, or startDateValues change
    const newSeries = initialLineValues.map((_, index) => {
      const areaData = [];
      const cumulativeSumArray = [];
      let cumulativeSum = 0;

      for (let i = 0; i < dateValues[index]; i++) {
        cumulativeSum = sliderValues[index];
        areaData.push({
          x: i + startDateValues[index],
          y: cumulativeSum,
        });
        cumulativeSumArray.push(cumulativeSum);
      }

      return {
        type: "area",
        name: `Area Chart ${index + 1}`,
        data: areaData,
        cumulativeSumArray,
      };
    });

    setSeries(newSeries);
  }, [sliderValues, dateValues, startDateValues]);

  const allDataPoints = series.flatMap((areaSeries) => {
    const { data, cumulativeSumArray } = areaSeries;
    const startIndex = data.length > 0 ? data[0].x : 0;
    const endIndex = data.length > 0 ? data[data.length - 1].x : 0;

    const allXValues = Array.from(
      { length: endIndex - startIndex + 1 },
      (_, i) => startIndex + i
    );

    return allXValues.map((x) => ({
      x,
      y:
        cumulativeSumArray[x - startIndex] !== undefined
          ? cumulativeSumArray[x - startIndex]
          : 0,
    }));
  });

  const aggregatedData = allDataPoints.reduce((result, point) => {
    const existingPoint = result.find((p) => p.x === point.x);

    if (existingPoint) {
      existingPoint.y += point.y;
    } else {
      result.push({ x: point.x, y: point.y });
    }

    return result;
  }, []);

  const lineoptions = {
    title: {
      text: "Highcharts React Example",
    },
    xAxis: {
      labels: {
        enabled: true,
        style: {
          color: "#b3b3b3",
        },
      },
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "Value",
      },
    },
    series: [
      ...series,
      {
        type: "line",
        name: "Aggregated Line Chart",
        data: aggregatedData,
      },
    ],
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>:{point.y}<br/>',
      split: true,
    },
    plotOptions: {
      area: {
        stacking: "normal",
        lineWidth: 0,
        marker: {
          enabled: false,
        },
      },
    },
  };

  const handleSliderChange = (index, value) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = value;
    setSliderValues(newSliderValues);
  };

  const handleDateChange = (index, value) => {
    const newDateValues = [...dateValues];
    newDateValues[index] = value;
    setDateValues(newDateValues);
  };

  const handleStartDateChange = (index, value) => {
    const newStartDateValues = [...startDateValues];
    newStartDateValues[index] = value;
    setStartDateValues(newStartDateValues);
  };

  const handleEditClick = (field) => {
    setEditMode(field);
  };

  const handleStopEditing = () => {
    setEditMode(null);
  };

  const handleTextFieldChange = (index, field, value) => {
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      // If value is a valid number, update the state
      switch (field) {
        case "sliderValues":
          const newSliderValues = [...sliderValues];
          newSliderValues[index] = numericValue;
          setSliderValues(newSliderValues);
          break;
        case "dateValues":
          const newDateValues = [...dateValues];
          newDateValues[index] = numericValue;
          setDateValues(newDateValues);
          break;
        case "startDateValues":
          const newStartDateValues = [...startDateValues];
          newStartDateValues[index] = numericValue;
          setStartDateValues(newStartDateValues);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={lineoptions} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
         
          marginBottom: 20,
        }}
      >
        {initialLineValues.map((_, index) => (
          <div key={index}>
            <TextField
              sx={{
                minWidth: 450,
                ".MuiOutlinedInput-input": {
                  padding: 0,
                  ml: 0.5,
                  mr: 0.5,
                  color: "#202225",
                  fontSize: 16,
                  fontWeight: "bold",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "none",
                  p: 0,
                },
              }}
              placeholder="Please enter the custom name"
              value={customTitles[index]}
              onChange={(e) => handleTitleChange(index, e.target.value)}
            />
            <Box sx={{ p: 2, border: "1px solid #eee", minWidth: 450, mr: 3 }}>
              {/* 차트 데이터 적용 값 */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>데이터</Typography>
                {editMode === `sliderValues${index}` ? (
                  <TextField
                    sx={{
                      ".MuiOutlinedInput-input": {
                        padding: 0,
                        ml: 0.5,
                        mr: 0.5,
                        color: "#202225",
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                      ".MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        p: 0,
                      },
                    }}
                    value={sliderValues[index]}
                    onChange={(e) =>
                      handleTextFieldChange(
                        index,
                        "sliderValues",
                        e.target.value
                      )
                    }
                    onBlur={handleStopEditing}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleStopEditing();
                      }
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      color: "#202225",
                      fontSize: 16,
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEditClick(`sliderValues${index}`)}
                  >
                    {sliderValues[index]}
                  </Typography>
                )}
              </Box>
              <SliderComponent
                onChange={(e) =>
                  handleSliderChange(index, parseInt(e.target.value))
                }
              />
              {/* 적용 기간 */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>적용 기간</Typography>
                {editMode === `dateValues${index}` ? (
                  <TextField
                    sx={{
                      ".MuiOutlinedInput-input": {
                        padding: 0,

                        color: "#202225",
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                      ".MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        p: 0,
                      },
                    }}
                    value={dateValues[index]}
                    onFocus={(e) => e.target.select()} // 이 부분 추가
                    onChange={(e) =>
                      handleTextFieldChange(index, "dateValues", e.target.value)
                    }
                    onBlur={handleStopEditing}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleStopEditing();
                      }
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      color: "#202225",
                      fontSize: 16,
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEditClick(`dateValues${index}`)}
                  >
                    {dateValues[index]}
                  </Typography>
                )}
              </Box>
              <SliderComponent
                value={dateValues[index]}
                onChange={(e) =>
                  handleDateChange(index, parseInt(e.target.value))
                }
              />
              {/* 시작 시점 */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>시작 시점</Typography>

                {editMode === `startDateValues${index}` ? (
                  <TextField
                    sx={{
                      ".MuiOutlinedInput-input": {
                        padding: 0,
                        ml: 0.5,
                        mr: 0.5,
                        color: "#202225",
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                      ".MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        p: 0,
                      },
                    }}
                    value={startDateValues[index]}
                    onChange={(e) =>
                      handleTextFieldChange(
                        index,
                        "startDateValues",
                        e.target.value
                      )
                    }
                    onFocus={(e) => e.target.select()} // 이 부분 추가
                    onBlur={handleStopEditing}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleStopEditing();
                      }
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      color: "#202225",
                      fontSize: 16,
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEditClick(`startDateValues${index}`)}
                  >
                    {startDateValues[index]}
                  </Typography>
                )}
              </Box>
              <SliderComponent
                value={startDateValues[index]}
                onChange={(e) =>
                  handleStartDateChange(index, parseInt(e.target.value))
                }
              />
            </Box>
          </div>
        ))}
      </div>
      <div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleAccordChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>All Series Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <tr>
                <td style={{ fontWeight: "bold" }}>X</td>
                <td style={{ fontWeight: "bold" }}>Y</td>
              </tr>
              {allDataPoints.map((point, index) => (
                <tr key={index}>
                  <td>{point.x}</td>
                  <td>{point.y}</td>
                </tr>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleAccordChange("panel2")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Aggregated Series Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <tr>
                <td style={{ fontWeight: "bold" }}>X</td>
                <td style={{ fontWeight: "bold" }}>Y</td>
              </tr>
              {aggregatedData.map((point, index) => (
                <tr key={index}>
                  <td>{point.x}</td>
                  <td>{point.y}</td>
                </tr>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default ChartComponent;
