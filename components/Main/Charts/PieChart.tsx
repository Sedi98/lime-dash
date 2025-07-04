import React from 'react'
import ReactApexChart from 'react-apexcharts';

import type { ApexOptions } from 'apexcharts';

const PieChart = () => {
        const [state] = React.useState<{
            series: number[];
            options: ApexOptions;
        }>({
            series: [44, 55, 13, 43, 22],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
        });

        

        return (
          <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="pie" width={480} />
              </div>
            
          </div>
        );
      }

export default PieChart