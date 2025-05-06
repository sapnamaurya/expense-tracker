import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Analysis = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/static/results.json")
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((err) => {
        console.error("Error fetching results:", err);
        setError("Failed to load analysis results");
      });
  }, []);

  return (
    <AnalysisStyled>
      <div className="bg-gray-100 min-h-screen font-sans">
        <main className="container mx-auto py-10 px-4">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <>
              {/* Aim 1 */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Expense Distribution by Category (INR)
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-102 hover:shadow-lg section-1">
                  <img
                    src="/static/expense_pie_chart.png"
                    alt="Expense Distribution by Category"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </section>

              {/* Aim 2 */}
              <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Spending Patterns Analysis
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-102 hover:shadow-lg mb-6 section-2">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                    Monthly Spending by Category (INR)
                  </h3>
                  <img
                    src="/static/monthly_spending_bar_chart.png"
                    alt="Monthly Spending by Category"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                {results?.clusters && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                      K-means Clustering Insights
                    </h3>
                    <p className="text-lg text-gray-600 text-center">
                      Number of transactions per cluster:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 text-center mt-2">
                      <li>
                        Cluster 0: {results.clusters["Cluster 0"]} transactions
                      </li>
                      <li>
                        Cluster 1: {results.clusters["Cluster 1"]} transactions
                      </li>
                      <li>
                        Cluster 2: {results.clusters["Cluster 2"]} transactions
                      </li>
                    </ul>
                  </div>
                )}
              </section>

              {/* Aim 3 */}
              <section className="bg-white rounded-lg shadow-md p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Prediction for{" "}
                  {results ? results.prediction_month : "Loading..."}
                </h2>
                {results ? (
                  <>
                    <p className="text-lg text-gray-700 mb-2 p">
                      Predicted Total Expenses: ₹{results.prediction.toFixed(2)}
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
      </div>
    </AnalysisStyled>
  );
};

const AnalysisStyled = styled.div`
  display: flex;

  main {
    display: flex;
    width: 106%;
    padding: 2%;

    h2 {
      font-size: 22px;
    }

    .section-1 {
      height: 74vh;

      img {
        margin-top: 8%;
        height: 64vh;
        width: 93%;
      }
    }

    .section-2 {
      width: 76%;

      h3 {
        margin-bottom: 2%;
        margin-top: 2%;
        font-size: 19px;
      }

      img {
        height: 61vh;
        width: 123%;
      }
    }

    .p {
      margin-bottom: 6%;
      margin-top: 11%;
    }
  }
`;

export default Analysis;
