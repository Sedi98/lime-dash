import React, { useState } from "react";
import Chart from "react-apexcharts";

const StackedChart = () => {
  const [chartState] = useState({
    series: [
      {
        name: "Orders",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "Revenue",
        data: [13, 23, 20, 8, 13, 27],
      },
      //   {
      //     name: 'PRODUCT C',
      //     data: [11, 17, 15, 15, 21, 14]
      //   },
      //   {
      //     name: 'PRODUCT D',
      //     data: [21, 7, 25, 13, 22, 8]
      //   }
    ],
    options: {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43, 21, 49],
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27, 33, 12],
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21, 14, 15, 13],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: [
          "2011 Q1",
          "2011 Q2",
          "2011 Q3",
          "2011 Q4",
          "2012 Q1",
          "2012 Q2",
          
        ],
      },
      fill: {
        opacity: 1,
      },
    //   legend: {
    //     position: "none",
    //     offsetX: 0,
    //     offsetY: 50,
    //   },
    },
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartState.options}
            series={chartState.series}
            type="bar"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default StackedChart;
