"use client";
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const StackedChart = ({ data }: any) => {
  const [state, setState] = useState<{
    series: {
      name: string;
      data: number[];
    }[];
    options: ApexOptions;
  }>(() => {
    if (!data || !data.totals || !data.months) {
      console.error("Invalid data provided to StackedChart");
      return {
        series: [],
        options: {},
      };
    }

    return {
      series: [
        {
          name: "Satış",
          data: data.totals,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar" as const,
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            horizontal: false,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val: string) {
            return val + "₼";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        xaxis: {
          categories: data.months,
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: true,
          },
          labels: {
            show: false,
            formatter: function (val: number) {
              return val + "₼";
            },
          },
        },
        title: {
          text: "Monthly Inflation in Argentina, 2002",
          floating: true,
          offsetY: 330,
          align: "center" as const,
          style: {
            color: "#444",
          },
        },
      },
    };
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {state.series.length > 0 ? (
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"
              style={{ width: "500px" }}
            />
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StackedChart;
