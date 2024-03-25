import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const EmployeeAttendanceChart = () => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const attendanceData = {
            Monday: 8,
            Tuesday: 7,
            Wednesday: 8,
            Thursday: 6,
            Friday: 7,
            Saturday: 0,
            Sunday: 0
        };

        const days = Object.keys(attendanceData);
        const hours = Object.values(attendanceData);

        if (chartContainer && chartContainer.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Destroy previous instance
            }
            const ctx = chartContainer.current.getContext('2d');

            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: days,
                    datasets: [{
                        label: 'Attendance Hours',
                        data: hours,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Hours'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Weekdays'
                            }
                        }
                    }
                }
            });
        }

        // Cleanup function
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Destroy the chart instance on unmount
            }
        };
    }, []);

    return (
        
        <div style={{ width: '80%', margin: '20px auto', height: '500px'}}>
            <canvas ref={chartContainer}></canvas>
        </div>
    );
};

export default EmployeeAttendanceChart;
