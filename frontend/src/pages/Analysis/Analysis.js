import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Analysis = () => {
  const [categoryData, setCategoryData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/');
        const data = await response.json();
        console.log('Fetched data:', data); // Debug log

        // Pie chart data: Category spending
        setCategoryData({
          labels: Object.keys(data.categories),
          datasets: [{
            label: 'Spending by Category',
            data: Object.values(data.categories),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB', '#FF6384'],
            hoverOffset: 4
          }]
        });

        // Bar chart data: Monthly spending
        setMonthlyData({
          labels: Object.keys(data.monthly),
          datasets: [{
            label: 'Monthly Spending',
            data: Object.values(data.monthly),
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            borderWidth: 1
          }]
        });
      } catch (error) {
        console.error('Error fetching insights:', error);
      }
    };
    fetchData();
  }, []);

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Spending by Category' }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Spending Trend' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Analysis</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Category Breakdown</h2>
        {categoryData.labels && categoryData.labels.length > 0 ? (
          <Pie data={categoryData} options={pieOptions} />
        ) : (
          <p>Loading category data...</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Monthly Spending</h2>
        {monthlyData.labels && monthlyData.labels.length > 0 ? (
          <Bar data={monthlyData} options={barOptions} />
        ) : (
          <p>Loading monthly data...</p>
        )}
      </div>
    </div>
  );
};

export default Analysis;