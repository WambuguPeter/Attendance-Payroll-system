import React from 'react';
import { Bar } from 'react-chartjs-2';

const GroupedBarGraph = () => {
  
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Developers',
        backgroundColor: 'rgba(28, 243, 32, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [150, 200, 180, 190, 210], 
      },
      {
        label: 'Tainers',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [120, 170, 150, 160, 180], },
      {
        label: 'Wokers',
        backgroundColor: 'rgba(28, 243, 32, 0.9)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        data: [130, 190, 160, 180, 200], 
      },
      {
        label: 'Executive',
        backgroundColor: 'rgba(75, 192, 192, 0.9)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [170, 160, 150, 100, 140],
      } 
    ],
  };

  // Chart options
  const options = {
    scales: {
      xAxes: [
        {
          type: Bar,
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Hours',
          },
        },
      ],
    },
    barThickness: 30, 
    
  };

  return (
    <div>
      <h2>Attendance by Month</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GroupedBarGraph;
