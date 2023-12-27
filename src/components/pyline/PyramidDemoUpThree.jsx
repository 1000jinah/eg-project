import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import variwide from "highcharts/modules/variwide";

// Initialize the variwide module
variwide(Highcharts);

const PyramidDemoUpThreeChart = () => {
  const [chartDataPositive, setChartDataPositive] = useState([
    ["Category 1", 10, 30], // Category, Bar Value, Bar Width
    ["Category 2", 15, 25],
    ["Category 3", 20, 20],
    ["Category 4", 25, 15],
    ["Category 5", 30, 10],
    ["Category 6", 35, 15],
    ["Category 7", 40, 20],
    ["Category 8", 45, 25],
    ["Category 9", 50, 30],
  ]);

  const [chartDataNegative, setChartDataNegative] = useState([
    ["Category 1", -10, 30], // Category, Bar Value, Bar Width
    ["Category 2", -15, 25],
    ["Category 3", -20, 20],
    ["Category 4", -25, 15],
    ["Category 5", -30, 10],
    ["Category 6", -35, 15],
    ["Category 7", -40, 20],
    ["Category 8", -45, 25],
    ["Category 9", -50, 30],
  ]);

  useEffect(() => {
    // Declare combinedLineData with an initial empty array
    let combinedLineData = [];

    // Combine positive and negative line data with cumulative values
    combinedLineData = chartDataPositive
      .map((point, index) => ({
        name: point[0],
        y:
          point[1] +
          (combinedLineData[index - 1] ? combinedLineData[index - 1].y : 0), // Cumulative value
        z: point[2],
        id: `positive_${index}`, // Add a unique identifier for positive points
      }))
      .reverse()
      .concat(
        chartDataNegative.map((point, index) => ({
          name: point[0],
          y:
            point[1] +
            (combinedLineData[index - 1] ? combinedLineData[index - 1].y : 0), // Cumulative value
          z: point[2],
          id: `negative_${index}`, // Add a unique identifier for negative points
        }))
      );

    console.log(combinedLineData, "combinedLineData");

    // Create the combined chart
    const options = {
      chart: {
        type: "variwide", // Use variwide series type
        inverted: true,
      },
      title: {
        text: "Combined Pyramid Bar and Line Chart",
      },
      plotOptions: {
        variwide: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return (
                "$" +
                Highcharts.numberFormat(
                  this.point.z * Math.abs(this.point.y),
                  0,
                  ".",
                  ","
                )
              );
            },
          },
        },
      },

      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: null,
        },
        labels: {
          formatter: function () {
            return Math.abs(this.value) + " year";
          },
        },
        reversed: true,
      },
      series: [
        {
          name: "Bar (Positive)",
          data: chartDataPositive.map((point) => ({
            name: point[0],
            y: point[1],
            z: point[2], // Bar width specified for each point
          })),
          dataLabels: {
            enabled: true,
          },

          borderRadius: 3,
          colorByPoint: true,
          pointPlacement: 0,
          stacking: "normal",
        },
        {
          name: "Bar (Negative)",
          data: chartDataNegative.map((point) => ({
            name: point[0],
            y: point[1],
            z: point[2], // Bar width specified for each point
          })),
          dataLabels: {
            enabled: true,
          },

          borderRadius: 3,
          colorByPoint: true,
          pointPlacement: 0,
          stacking: "normal",
        },
        {
          name: "Points (Combined)",
          type: "line", // Use scatter type for points
          data: combinedLineData,
          zIndex: 2,
        },
      ],
    };
    console.log(combinedLineData, "asdasdasdasdas");

    // Render the chart
    Highcharts.chart("combined-chart-container", options);
  }, [chartDataPositive, chartDataNegative]);

  return (
    <div id="combined-chart-container" style={{ height: "400px" }}>
      {/* The chart will be rendered inside this container */}
    </div>
  );
};

export default PyramidDemoUpThreeChart;
