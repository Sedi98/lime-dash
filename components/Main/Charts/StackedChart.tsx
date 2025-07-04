'use client'
import React, { useState } from "react";
import Chart from "react-apexcharts";


const StackedChart = () => {
  const [state] = useState({
          
            series: [{
              name: 'Inflation',
              data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
            }],
            options: {
              chart: {
                height: 350,
                type: "bar" as "bar",
              },
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  dataLabels: {
                    position: 'top', // top, center, bottom
                  },
                }
              },
              dataLabels: {
                enabled: true,
                formatter: function (val: string) {
                  return val + "%";
                },
                offsetY: -20,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"]
                }
              },
              
              xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                position: 'top',
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false
                },
                crosshairs: {
                  fill: {
                    type: 'gradient',
                    gradient: {
                      colorFrom: '#D8E3F0',
                      colorTo: '#BED1E6',
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    }
                  }
                },
                tooltip: {
                  enabled: true,
                }
              },
              yaxis: {
                axisBorder: {
                  show: true
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                  formatter: function (val: number) {
                    return val + "%";
                  }
                }
              
              },
              title: {
                text: 'Monthly Inflation in Argentina, 2002',
                floating: true,
                offsetY: 330,
                align: "center" as "center",
                style: {
                  color: '#444'
                }
              }
            },
          
          
        });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default StackedChart;
