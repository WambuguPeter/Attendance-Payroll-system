import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const EmployeeAttendanceChart = () => {
  const chartContainer = useRef(null);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    let chartInstance = null;

    if (myChart) {
      myChart.destroy(); // Destroy the previous chart instance
    }

    const data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      datasets: [{
        label: 'Employee Attendance',
        data: [8, 9, 7, 8, 9], // Sample attendance hours for the employee for each weekday
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            title: {
              display: true,
              text: 'Hours'
            },
            beginAtZero: true
          },
          y: {
            title: {
              display: true,
              text: 'Weekdays'
            }
          }
        }
      },
    };

    chartInstance = new Chart(chartContainer.current, config);
    setMyChart(chartInstance);

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Cleanup the chart instance when component unmounts
      }
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  return <canvas ref={chartContainer} />;
};

export default EmployeeAttendanceChart;
