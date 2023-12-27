import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import variwide from "highcharts/modules/variwide";
Highcharts.Templating.helpers.abs = (value) => Math.abs(value);
// Initialize the variwide module
variwide(Highcharts);
const PyramidAndLineChart = () => {
  const [chartDataPositive, setChartDataPositive] = useState([
    { name: "Category 1", y: 10, z: 30 }, // Category, Bar Value, Bar Width
    { name: "Category 2", y: 15, z: 25 },
    { name: "Category 3", y: 20, z: 20 },
  ]);

  useEffect(() => {
    // Declare combinedLineData with an initial empty array

    const chartDataNegative = chartDataPositive.map((data) => ({
      name: data.name,
      y: -data.y,
      z: data.z,
    }));
    const allData = [...chartDataPositive, ...chartDataNegative];

    // Sort data in ascending order based on the absolute y value
    allData.sort((a, b) => Math.abs(a.y) - Math.abs(b.y));

    let combinedLineData = [];

    // Combine positive and negative line data with cumulative values
    combinedLineData = chartDataPositive
      .map((point, index) => ({
        name: point.name,
        y:
          point.y +
          (combinedLineData[index - 1] ? combinedLineData[index - 1].y : 0), // Cumulative value
        z: point.z,
        id: `positive_${index}`, // Add a unique identifier for positive points
      }))
      .reverse()
      .concat(
        chartDataNegative.map((point, index) => ({
          name: point.name,
          y:
            point.y +
            (combinedLineData[index - 1] ? combinedLineData[index - 1].y : 0), // Cumulative value
          z: point.z,
          id: `negative_${index}`, // Add a unique identifier for negative points
        }))
      );
    console.log(combinedLineData);

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
          data: allData.filter((point) => point.y >= 0),
          dataLabels: {
            enabled: true,
            // formatter: function () {
            //   return Math.abs(this.point.y) + " year";
            // },
          },

          tooltip: {
            pointFormat:
              "Cash: <b>$ {abs point.z}</b><br> Year: <b>{abs point.y} year</b>",
          },
          borderRadius: 3,
          colorByPoint: true,
          pointPlacement: 0,
          stacking: "normal",
        },
        {
          name: "Bar (Negative)",
          data: allData.filter((point) => point.y < 0),
          dataLabels: {
            enabled: true,
            // formatter: function () {
            //   return Math.abs(this.point.y) + " year";
            // },
          },

          tooltip: {
            pointFormat:
              "Cash: <b>$ {abs point.z}</b><br> Year: <b>{abs point.y} year</b>",
          },
          borderRadius: 3,
          colorByPoint: true,
          pointPlacement: 0,
          stacking: "normal",
        },
        {
          name: "Points (Combined)",
          type: "line",
          data: combinedLineData
            .sort((a, b) => b.y - a.y)
            .map((point) => ({
              name: point.name,
              y: point.y,
              z: point.z,
              id: point.id,
            })),
          tooltip: {
            pointFormat:
              "Name: <b>{point.name}</b><br> Cash: <b>$ {abs point.z}</b><br> Year: <b>$ {abs point.y}</b>",
          },
        },
      ],
    };

    // Render the chart
    Highcharts.chart("combined-chart-container", options);
  }, [chartDataPositive]);

  const handleInputChange = (index, field, value) => {
    setChartDataPositive((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  const handleAddData = () => {
    setChartDataPositive((prevData) => {
      const newData = [
        ...prevData,
        {
          name: `Example${prevData.length + 1}`,
          y: 5,
          z: 10,
        },
      ];

      // Sort the newData array based on the y values
      newData.sort((a, b) => b - a);

      return newData;
    });
  };
  const handleRemoveData = (index) => {
    setChartDataPositive((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1); // Remove the data point at the specified index
      return newData;
    });
  };
  return (
    <div>
      <div id="combined-chart-container" style={{ height: "400px" }}>
        {/* The chart will be rendered inside this container */}
      </div>
      <div>
        {chartDataPositive.map((data, index) => (
          <div key={index} style={{ border: "1px solid #eee", padding: 20 }}>
            <label>수익유형:</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) =>
                handleInputChange(index, "name", e.target.value, true)
              }
            />
            <br />
            <label>기간:</label>
            <input
              type="number"
              value={data.y}
              onChange={(e) =>
                handleInputChange(index, "y", parseFloat(e.target.value), true)
              }
            />
            <br />
            <label>납입금액량:</label>
            <input
              type="number"
              value={data.z}
              onChange={(e) =>
                handleInputChange(index, "z", parseFloat(e.target.value), true)
              }
            />
            <br />
            <button onClick={() => handleRemoveData(index)}>
              Remove Data
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => handleAddData(true)}>Add Positive Data</button>
    </div>
  );
};

export default PyramidAndLineChart;
