import pandas as pd
from sklearn.cluster import KMeans
from sqlalchemy import create_engine

def generate_insights():
    # Connect to PostgreSQL
    engine = create_engine('postgresql://username:password@localhost:5432/yourdbname')
    df = pd.read_sql("SELECT amount, category, date FROM expenses", engine)

    # Preprocess
    df['category_code'] = df['category'].astype('category').cat.codes
    X = df[['amount', 'category_code']]

    # KMeans clustering
    kmeans = KMeans(n_clusters=3, random_state=0)
    df['cluster'] = kmeans.fit_predict(X)

    # Summarize results
    summary = df.groupby('cluster').agg({
        'amount': 'sum',
        'category': lambda x: x.mode()[0]
    }).reset_index()

    return summary.to_dict(orient='records')
