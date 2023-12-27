import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PyramidAndLineChart = () => {
  const [chartDataPositive, setChartDataPositive] = useState([
    ["Category 1", 10, 10], // Category, Bar Value, Line Value
    ["Category 2", 15, 15],
    ["Category 3", 20, 20],
    ["Category 4", 25, 25],
   
  ]);

  const [chartDataNegative, setChartDataNegative] = useState([
    ["Category 1", -10, -10], // Category, Bar Value, Line Value
    ["Category 2", -15, -15],
    ["Category 3", -20, -20],
    ["Category 4", -25, -25],
    
  ]);

  useEffect(() => {
    // Combine positive and negative line data
    const combinedLineData = chartDataPositive
      .map((point, index) => ({
        name: point[0],
        y: point[2], // Use only the positive line values
      }))
      .reverse()
      .concat(
        chartDataNegative.map((point, index) => ({
          name: point[0],
          y: point[2], // Use only the negative line values
        }))
      );

    console.log(combinedLineData, "combinedLineData");

    // Create the combined chart
    const options = {
      chart: {
        type: "bar",
      },
      title: {
        text: "Combined Pyramid Bar and Line Chart",
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: "{point.y}",
          },
          pointPlacement: 0, // Center the bars and lines on the category axis
        },
      },
      xAxis: {
        type: "category",
      },
      series: [
        {
          name: "Bar (Positive)",
          data: chartDataPositive.map((point) => ({
            name: point[0],
            y: point[1],
          })),
          pointPlacement: -0.3,
        },
        {
          name: "Bar (Negative)",
          data: chartDataNegative.map((point) => ({
            name: point[0],
            y: point[1],
          })),
          pointPlacement: 0,
        },
        {
          name: "Line (Combined)",
          type: "line",
          data: combinedLineData,
        },
      ],
    };

    // Render the chart
    Highcharts.chart("combined-chart-container", options);
  }, [chartDataPositive, chartDataNegative]);

  return (
    <div id="combined-chart-container" style={{ height: "400px" }}>
      {/* The chart will be rendered inside this container */}
    </div>
  );
};

export default PyramidAndLineChart;
