import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  // Data for the pie chart
  const data = {
    labels: ['Managers', 'Trainers', 'Developers', 'Workers', 'Social Media Managers'],
    datasets: [
      {
        data: [5, 10, 25, 5, 5], // Example data, you can replace with your actual data
        backgroundColor: [
          'rgba(54, 162, 235, 126)',
          'rgba(75, 192, 192, 106)',
          'rgba(46, 204, 113, 106)',
          'rgba(52, 152, 219, 106)',
          'rgba(39, 174, 96, 100)'
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(46, 204, 113, 0.8)',
          'rgba(52, 152, 219, 0.8)',
          'rgba(39, 174, 96, 0.8)'
        ]
      }
    ]
  };

  return (
    <div>
      <h2>Number of Employees</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
