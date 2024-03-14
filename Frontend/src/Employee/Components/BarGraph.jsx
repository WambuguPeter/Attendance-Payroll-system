import React from 'react'
// import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';


const BarGraph = () => {
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [
          {
            label: 'Attendance',
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: [8, 7, 8.5, 9, 7.5], // Number of hours attended for each day
          },
        ],
      };
    
      // Chart options
      const options = {
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Number of Hours',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Weekdays',
              },
            },
          ],
        },
      };
    
      return (
        <div>
          <Bar data={data} options={options} />
        </div>
      );
}

export default BarGraph