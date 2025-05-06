import React from "react";

const Analysis = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Analysis</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Expense Distribution by Category</h2>
        <img
          src="/expense_pie_chart.png"
          alt="Pie chart showing expense distribution by category"
          className="max-w-full h-auto"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Monthly Spending by Category</h2>
        <img
          src="/monthly_spending_bar_chart.png"
          alt="Bar chart showing monthly spending by category"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Analysis;