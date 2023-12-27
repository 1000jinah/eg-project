import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import variwide from "highcharts/modules/variwide";

// Initialize the variwide module
variwide(Highcharts);

const Chart = () => {
  const [positiveData, setPositiveData] = useState([
    { name: "부동산", y: 5.5, z: 15 },
    { name: "국민연금", y: 8.6, z: 20 },
    { name: "투자수익금", y: 10.2, z: 25 },
  ]);

  useEffect(() => {
    // Modify negativeData to share name and z values with positiveData
    const negativeData = positiveData.map((data) => ({
      name: data.name,
      y: -data.y,
      z: data.z,
    }));

    const allData = [...positiveData, ...negativeData];

    // Sort data in ascending order based on the absolute y value
    allData.sort((a, b) => Math.abs(a.y) - Math.abs(b.y));

    // Set yAxis max based on the maximum absolute y value
    const yAxisMax = Math.ceil(Math.abs(allData[allData.length - 1].y));

    // Set zAxis min and max based on the sorted data
    const zAxisMin = Math.min(...allData.map((point) => point.z));
    const zAxisMax = Math.max(...allData.map((point) => point.z));

    // Find the maximum x-axis value
    const xAxisMax = Math.max(...allData.map((point) => Math.abs(point.y)));
    const lineChartData = allData.map((point) => ({
      type: "scatter",
      name: `${point.name} - Y`,
      data: [{ x: 0, y: point.y }],
      marker: {
        symbol: "circle",
        radius: 4,
      },
      tooltip: {
        pointFormat: `Y: ${point.y}`,
      },
    }));
    console.log("lineChartData:", lineChartData);
    // Collect the y values into a new array
    const yValuesArray = lineChartData.map((data) => data.data[0].y);

    // Sort the y values array in descending order
    yValuesArray.sort((a, b) => b - a);

    // Log the sorted y values array to the console
    console.log("Sorted Y Values:", yValuesArray);
    const lineChartSortedData = yValuesArray.map((yValue, index) => ({
      type: "line",
      name: `Line Chart ${index + 1}`,
      data: [
        { x: 0, y: yValue },
        { x: yAxisMax, y: yValue },
      ],
      marker: {
        enabled: false,
      },
    }));
    // Highcharts 설정
    const options = {
      chart: {
        type: "variwide",
        inverted: true,
      },
      title: {
        text: "Labor Costs in Europe, 2016",
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
      zAxis: {
        min: zAxisMin,
        max: zAxisMax,
      },
      legend: {},
      series: [
        {
          name: "Positive Labor Costs",
          data: allData.filter((point) => point.y >= 0),
          dataLabels: {
            enabled: true,
            formatter: function () {
              return Math.abs(this.point.y) + " year";
            },
          },
          tooltip: {
            pointFormat: "GDP: <b>$ {point.z}</b><br>",
          },
          borderRadius: 3,
          colorByPoint: true,
          pointPlacement: 0,
        },
        {
          name: "Negative Labor Costs",
          data: allData.filter((point) => point.y < 0),
          dataLabels: {
            enabled: true,
            formatter: function () {
              return Math.abs(this.point.y) + " year";
            },
          },
          tooltip: {
            pointFormat: "GDP: <b>$ {point.z}</b><br>",
          },
          borderRadius: 3,
          colorByPoint: true,
          pointPlacement: 0,
        },

        // ...lineChartData,
        // ...lineChartSortedData,
      ],
      plotOptions: {
        series: {
          stacking: "normal",
          borderRadius: 0,
          pointPadding: 0,
          groupPadding: 0,
        },
      },
    };

    // Highcharts 그래프 생성
    Highcharts.chart("container", options);

    // Highcharts 그래프 생성
    const chart = Highcharts.chart("container", options);

    // 같은 name을 가진 데이터 묶어서 콘솔에 출력
    const dataGroupedByName = {};
    chart.series.forEach((series) => {
      series.data.forEach((point) => {
        const name = point.name;
        if (!dataGroupedByName[name]) {
          dataGroupedByName[name] = [];
        }
        dataGroupedByName[name].push(Math.abs(point.y));
      });
    });

    // Convert object to array, sort, and convert back to object

    console.log("Data Grouped by Name:", dataGroupedByName);
  }, [positiveData]); // useEffect를 positiveData가 업데이트 될 때마다 실행

  const handleInputChange = (index, field, value) => {
    setPositiveData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  const handleAddData = () => {
    setPositiveData((prevData) => [
      ...prevData,
      { name: "Example", y: 1, z: 1 }, // Add new data with default values
    ]);
  };

  return (
    <div>
      <div id="container"></div>
      <div>
        {positiveData.map((data, index) => (
          <div key={index} style={{ border: "1px solid #eee", padding: 20 }}>
            <label>수익유형:</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
            />
            <br />
            <label>기간:</label>
            <input
              type="number"
              value={data.y}
              onChange={(e) =>
                handleInputChange(index, "y", parseFloat(e.target.value))
              }
            />
            <br />
            <label>납입금액량:</label>
            <input
              type="number"
              value={data.z}
              onChange={(e) =>
                handleInputChange(index, "z", parseFloat(e.target.value))
              }
            />
            <br />
          </div>
        ))}
      </div>
      <button onClick={handleAddData}>Add Data</button>
    </div>
  );
};

export default Chart;
