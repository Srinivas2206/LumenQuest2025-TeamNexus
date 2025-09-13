from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import os

app = Flask(__name__)

# Path to Excel file
EXCEL_PATH = os.path.join(os.path.dirname(__file__), 'data', 'SubscriptionUseCase_Dataset.xlsx')

# Load data and make model
def load_and_prepare_data():
    users = pd.read_excel(EXCEL_PATH, sheet_name='User_Data')
    subs = pd.read_excel(EXCEL_PATH, sheet_name='Subscriptions')
    plans = pd.read_excel(EXCEL_PATH, sheet_name='Subscription_Plans')

    df = subs.merge(users, on='User Id', how='left').merge(plans, left_on='Product Id', right_on='Product Id', how='left')

    df['usage_gb'] = df['Price'] * 1.5 + np.random.randint(10, 100, len(df))
    df.loc[df['Status_y'] == 'inactive', 'usage_gb'] *= 0.5

    features = df[['usage_gb', 'Price']].fillna(0)
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)

    kmeans = KMeans(n_clusters=5, random_state=42)
    df['cluster'] = kmeans.fit_predict(scaled_features)

    return df, plans

df, plans = load_and_prepare_data()

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_id = data.get('userId')
    if not user_id:
        return jsonify({'error': 'userId required'}), 400

    user_data = df[df['User Id'] == user_id]
    if user_data.empty:
        recs = plans.sample(3)['Name'].tolist()
    else:
        cluster = user_data['cluster'].iloc[0]
        cluster_plans = df[df['cluster'] == cluster]['Name'].unique()
        recs = list(cluster_plans[:3]) if len(cluster_plans) >= 3 else list(cluster_plans) + plans.sample(3 - len(cluster_plans))['Name'].tolist()

    return jsonify({'recommendations': recs})

logs = pd.read_excel(EXCEL_PATH, sheet_name='Subscription_Logs')
billing = pd.read_excel(EXCEL_PATH, sheet_name='Billing_Information')
churn_df = logs.merge(billing, left_on='Subscription id', right_on='subscription_id', how='left')

churn_df['churn'] = churn_df['next status'].apply(lambda x: 1 if x == 'paused' else 0)
churn_df['churn'] = churn_df.apply(lambda row: 1 if row['payment_status'] == 'failed' else row['churn'], axis=1)

from sklearn.preprocessing import LabelEncoder
le_action = LabelEncoder()
le_payment = LabelEncoder()
churn_df['action_encoded'] = le_action.fit_transform(churn_df['action'].fillna('unknown'))
churn_df['payment_status_encoded'] = le_payment.fit_transform(churn_df['payment_status'].fillna('unknown'))

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
X = churn_df[['action_encoded', 'payment_status_encoded']]
y = churn_df['churn']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
churn_model = LogisticRegression()
churn_model.fit(X_train, y_train)

@app.route('/churn', methods=['POST'])
def predict_churn():
    data = request.json
    sub_id = data.get('subscriptionId')
    if not sub_id:
        return jsonify({'error': 'subscriptionId required'}), 400

    sub_data = churn_df[churn_df['Subscription id'] == sub_id]
    if sub_data.empty:
        return jsonify({'churn_risk': 0.5})

    features = sub_data[['action_encoded', 'payment_status_encoded']].iloc[0].values.reshape(1, -1)
    risk = churn_model.predict_proba(features)[0][1]
    return jsonify({'churn_risk': float(risk)})

from datetime import datetime

df['Start Date'] = pd.to_datetime(df['Start Date'])
df['month'] = df['Start Date'].dt.strftime('%Y-%m')
stats = df.groupby(['month', 'Status_x']).size().unstack(fill_value=0)

@app.route('/analytics', methods=['GET'])
def get_analytics():
    return jsonify({
        'active_vs_paused': stats.to_dict(),
        'total_active': int(df[df['Status_x'] == 'active'].shape[0]),
        'total_paused': int(df[df['Status_x'] == 'paused'].shape[0])
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)