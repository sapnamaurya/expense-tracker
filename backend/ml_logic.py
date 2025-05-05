import pandas as pd
from sklearn.cluster import KMeans
from sqlalchemy import create_engine

def generate_insights():
    # Connect to PostgreSQL
    engine = create_engine("postgresql://postgres:Shafneet123@localhost:5432/expenseTrackerMinorProject")
    df = pd.read_sql("SELECT amount, category, date FROM expenses", engine)

    # Preprocess
    df['category_code'] = df['category'].astype('category').cat.codes
    X = df[['amount', 'category_code']]

    # KMeans clustering
    kmeans = KMeans(n_clusters=3, random_state=0, n_init='auto')
    df['cluster'] = kmeans.fit_predict(X)

    # Category-wise spending (for pie chart)
    category_spending = df.groupby('category')['amount'].sum().to_dict()

    # Monthly spending (for bar chart)
    df['month'] = pd.to_datetime(df['date']).dt.strftime('%b %Y')
    monthly_spending = df.groupby('month')['amount'].sum().to_dict()

    # Cluster summary (optional, for debugging or extended use)
    cluster_summary = df.groupby('cluster').agg({
        'amount': 'sum',
        'category': lambda x: x.mode()[0]
    }).reset_index().to_dict(orient='records')

    return {
        'categories': category_spending,
        'monthly': monthly_spending,
        'clusters': cluster_summary
    }