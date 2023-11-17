import React, { useEffect } from "react";
import Highcharts from "highcharts";

const LineRoundChart = ({
  chartData,
  secondChartData,
  xAxisStart,
  xAxisEnd,
  formattedTotalAmount, // 추가된 부분
}) => {
  useEffect(() => {
    const chart = Highcharts.chart("container", {
      subtitle: {
        text: "Investment Value",
        fontSize: 20,
        align: "left", // Center align the subtitle
        verticalAlign: "top", // Place the subtitle at the top
        y: 30, // Adjust vertical position if needed
        style: {
          fontSize: 16, // 변경된 부분
          fontWeight: "700", // 변경된 부분
          color: " #2d3142",
        },
      },
      title: {
        text: `$ ${formattedTotalAmount}`,
        align: "left", // Center align the title
        verticalAlign: "top", // Place the title at the bottom
        y: 75, // Adjust vertical position if needed
        style: {
          fontSize: 34, // 변경된 부분
          fontWeight: "normal", // 변경된 부분
          color: " #2d3142",
        },
      },
      xAxis: {
        min: xAxisStart,
        max: xAxisEnd,
        labels: {
          enabled: true, // Hide the category labels on the x-axis
          style: {
            color: "#b3b3b3",
          },
        },

        crosshair: true,
      },
      yAxis: {
        minorTickInterval: 0.1,
        min: 0,
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
          type: "areaspline",
          name: "Other Savings",
          data: chartData, // Use the prop data for the chart
          color: "#ffcebf",
          lineColor: "#ffcebf",
          marker: {
            enabled: false,
            radius: 4,
            lineWidth: 0.5,
            lineColor: "#211d1d",
            fillColor: "#fff",
            symbol: "circle",
          },
        },
        {
          type: "areaspline",
          name: "Retirement Savings",
          lineWidth: 3,
          data: secondChartData, // Use the prop data for the chart
          lineColor: "#ff754b",
          color: "#ff754b",
          marker: {
            enabled: false,
            radius: 4,
            lineWidth: 0.5,
            lineColor: "#211d1d",
            fillColor: "#fff",
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
    });

    return () => {
      chart.destroy(); // Clean up the chart on component unmount
    };
  });
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
    <div
      id="container"
      style={{ width: "100%", backgroundColor: "#eee" }}
    ></div>
  );
};

export default LineRoundChart;
