import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import numpy as np
from datetime import datetime, timedelta
import os
import json

# Define the output directory as frontend/public/static
output_dir = os.path.join('..', 'frontend', 'public', 'static')
os.makedirs(output_dir, exist_ok=True)

# Load the dataset
try:
    data = pd.read_csv('spending_patterns_detailed.csv')  # Use original dataset in USD
except FileNotFoundError:
    print("Error: 'spending_patterns_detailed.csv' not found in 'ml_model' directory.")
    exit(1)

# Handle missing values
data = data.fillna({'Total Spent': 0, 'Category': 'Unknown', 'Transaction Date': data['Transaction Date'].mode()[0]})

# Convert Transaction Date to datetime
data['Transaction Date'] = pd.to_datetime(data['Transaction Date'], errors='coerce')

# Aim 1: Pie Chart for Expense Category Percentages
category_spending = data.groupby('Category')['Total Spent'].sum().reset_index()
total_spending = category_spending['Total Spent'].sum()
category_spending['Percentage'] = (category_spending['Total Spent'] / total_spending * 100).round(2)

# Generate Pie Chart
plt.figure(figsize=(10, 8))
plt.pie(category_spending['Percentage'], labels=category_spending['Category'], autopct='%1.1f%%', startangle=140)
plt.title('Expense Distribution by Category (USD)')
plt.savefig(os.path.join(output_dir, 'expense_pie_chart.png'))
plt.close()
print(f"Pie chart saved to {os.path.join(output_dir, 'expense_pie_chart.png')}")

# Aim 2: Spending Patterns Analysis with K-means Clustering
# Prepare features for clustering
features = ['Quantity', 'Price Per Unit', 'Total Spent']
X_cluster = data[features].copy()

# Standardize features
X_cluster = (X_cluster - X_cluster.mean()) / X_cluster.std()

# Apply K-means clustering (3 clusters)
kmeans = KMeans(n_clusters=3, random_state=42)
data['Cluster'] = kmeans.fit_predict(X_cluster)

# Count transactions per cluster for insights
cluster_counts = data['Cluster'].value_counts().to_dict()

# Visualize monthly spending by category
data['YearMonth'] = data['Transaction Date'].dt.to_period('M')
monthly_spending = data.groupby(['YearMonth', 'Category'])['Total Spent'].sum().unstack().fillna(0)

# Generate Bar Chart
plt.figure(figsize=(14, 8))
monthly_spending.plot(kind='bar', stacked=True)
plt.title('Monthly Spending by Category (USD)')
plt.xlabel('Year-Month')
plt.ylabel('Total Spent (USD)')
plt.legend(title='Category', bbox_to_anchor=(1.05, 1), loc='upper left')
plt.tight_layout()
plt.savefig(os.path.join(output_dir, 'monthly_spending_bar_chart.png'))
plt.close()
print(f"Bar chart saved to {os.path.join(output_dir, 'monthly_spending_bar_chart.png')}")

# Aim 3: Predict Next Month’s Total Expenses
# Aggregate monthly total expenses
monthly_totals = data.groupby('YearMonth')['Total Spent'].sum().reset_index()

# Convert Period to Timestamp
monthly_totals['YearMonth'] = monthly_totals['YearMonth'].apply(lambda x: x.to_timestamp())

# Create features: month number and sequential index
monthly_totals['MonthNum'] = monthly_totals['YearMonth'].apply(lambda x: x.month)
monthly_totals['Index'] = range(len(monthly_totals))

# Features and target
X = monthly_totals[['Index', 'MonthNum']]
y = monthly_totals['Total Spent']

# Split data: 80% train, 20% test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Linear Regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print(f"Test RMSE: {rmse:.2f}")

# Predict next month (June 2025)
last_month = monthly_totals['YearMonth'].max()
next_month = last_month + timedelta(days=31)
next_index = len(monthly_totals)
next_month_num = next_month.month
next_pred = model.predict([[next_index, next_month_num]])[0]

print(f"Predicted Total Expenses for {next_month.strftime('%Y-%m')}: ${next_pred:.2f}")

# Save all outputs to a JSON file for the frontend
results = {
    "prediction": float(next_pred),
    "prediction_month": next_month.strftime('%Y-%m'),
    "rmse": float(rmse),
    "clusters": {
        "Cluster 0": int(cluster_counts.get(0, 0)),
        "Cluster 1": int(cluster_counts.get(1, 0)),
        "Cluster 2": int(cluster_counts.get(2, 0))
    }
}
with open(os.path.join(output_dir, 'results.json'), 'w') as f:
    json.dump(results, f)