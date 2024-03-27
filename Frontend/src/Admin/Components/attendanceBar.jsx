import React from 'react';
import { Bar } from 'react-chartjs-2';

const EmployeeChart = () => {
  // Data for the bar chart
  const barData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Assuming 4 weeks in a month
    datasets: [
      {
        label: 'Managers',
        backgroundColor: 'rgba(54, 162, 235, 1)', // blue with density 0.5
        borderColor: 'rgba(54, 162, 235, 1)', // blue
        borderWidth: 1,
        barThickness: 30,
        data: [10, 12, 11, 13] // Example data for Managers, replace with actual data
      },
      {
        label: 'Trainers',
        backgroundColor: 'rgba(75, 192, 192, 0.9)', // green with density 0.7
        borderColor: 'rgba(75, 192, 192, 1)', // green
        borderWidth: 1,
        barThickness: 30,
        data: [8, 9, 7, 10] // Example data for Trainers, replace with actual data
      },
      {
        label: 'Developers',
        backgroundColor: 'rgba(54, 162, 235, 1)', // blue with density 0.8
        borderColor: 'rgba(54, 162, 235, 1)', // blue
        borderWidth: 1,
        barThickness: 30,
        data: [20, 18, 22, 19] // Example data for Developers, replace with actual data
      },
      {
        label: 'Workers',
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // green with density 0.6
        borderColor: 'rgba(75, 192, 192, 1)', // green
        borderWidth: 1,
        barThickness: 30,
        data: [15, 14, 16, 17] // Example data for Workers, replace with actual data
      },
      {
        label: 'Social Media Managers',
        backgroundColor: 'rgba(54, 162, 235, 0.9)', // blue with density 0.9
        borderColor: 'rgba(54, 162, 235, 1)', // blue
        borderWidth: 1,
        barThickness: 30,
        data: [5, 6, 4, 7] // Example data for Social Media Managers, replace with actual data
      }
    ]
  };

  return (
    <div>
      <div>
        <h2>Attendance (Hours/Week/Month)</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default EmployeeChart;
