import React, { useState, useEffect } from 'react';

const Analysis = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch results from results.json in public/static
    fetch('/static/results.json')
      .then(response => response.json())
      .then(data => {
        setResults(data);
      })
      .catch(err => {
        console.error('Error fetching results:', err);
        setError('Failed to load analysis results');
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Main Content */}
      <main className="container mx-auto py-10 px-4">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            {/* Aim 1: Pie Chart */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Aim 1: Expense Distribution by Category (USD)
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-102 hover:shadow-lg">
                <img
                  src="/static/expense_pie_chart.png"
                  alt="Expense Distribution by Category"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </section>

            {/* Aim 2: Spending Patterns and Clustering */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Aim 2: Spending Patterns Analysis
              </h2>
              {/* Monthly Spending Bar Chart */}
              <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-102 hover:shadow-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                  Monthly Spending by Category (USD)
                </h3>
                <img
                  src="/static/monthly_spending_bar_chart.png"
                  alt="Monthly Spending by Category"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              {/* Clustering Insights */}
              {results && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                    K-means Clustering Insights
                  </h3>
                  <p className="text-lg text-gray-600 text-center">
                    Number of transactions per cluster:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-center mt-2">
                    <li>Cluster 0: {results.clusters['Cluster 0']} transactions</li>
                    <li>Cluster 1: {results.clusters['Cluster 1']} transactions</li>
                    <li>Cluster 2: {results.clusters['Cluster 2']} transactions</li>
                  </ul>
                </div>
              )}
            </section>

            {/* Aim 3: Prediction */}
            <section className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Aim 3: Prediction for {results ? results.prediction_month : 'Loading...'}
              </h2>
              {results ? (
                <>
                  <p className="text-lg text-gray-700 mb-2">
                    Predicted Total Expenses: ${results.prediction.toFixed(2)}
                  </p>
                  <p className="text-lg text-gray-700">
                    Test RMSE: {results.rmse.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-lg text-gray-700">Loading prediction...</p>
              )}
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2025 Expense Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Analysis;