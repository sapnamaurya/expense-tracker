import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Analysis = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setCategoryData({
          labels: Object.keys(data.categories),
          datasets: [
            {
              label: "Spending by Category",
              data: Object.values(data.categories),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        });

        setMonthlyData({
          labels: Object.keys(data.monthly),
          datasets: [
            {
              label: "Monthly Spending",
              data: Object.values(data.monthly),
              backgroundColor: "#36A2EB",
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };

    fetchData();
  }, []);

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Spending by Category" },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Spending Trend" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Analysis</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Category Breakdown</h2>
        {categoryData ? (
          <Pie data={categoryData} options={pieOptions} />
        ) : (
          <p>Loading category data...</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Monthly Spending</h2>
        {monthlyData ? (
          <Bar data={monthlyData} options={barOptions} />
        ) : (
          <p>Loading monthly data...</p>
        )}
      </div>
    </div>
  );
};

export default Analysis;
