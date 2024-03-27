import React, { memo, useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const useApexChart = (chartData) => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      if (chartData) {
        const chart = new ApexCharts(chartRef.current, chartData.options);
        chart.render();
  
        return () => {
          chart.destroy();
        };
      }
    }, [chartData]);
  
    return chartRef;
  };
  
const ChartComponent = ({ chartData }) => {
//   const chartRef = useRef(null);
//   useEffect(() => {
//     if (chartData) {
//       const chart = new ApexCharts(chartRef.current, chartData.options);
//       chart.render();

//       // Clean up the chart when the component is unmounted
//       return () => {
//         chart.destroy();
//       };
//     }
//   }, [chartData]);
const chartRef = useApexChart(chartData);

return <div ref={chartRef} />;
//   return <div ref={chartRef} />;
};

export default memo(ChartComponent);
