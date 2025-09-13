# ML Module for Subscription Management System

This README is for the backend team. It explains the ML part (Python Flask app) that provides AI features like plan recommendations, churn prediction, and analytics. The backend (Node.js) can call these APIs to integrate them into the app.

## Overview

* **Purpose**: Handles AI-based features from the hackathon project.
   * Must-have: Personalized plan recommendations based on simulated usage.
   * Optional: Churn risk prediction and basic subscription analytics.
* **Tech**: Python 3 with Flask. Runs as a separate microservice on port 5001.
* **Data Source**: Loads from `data/SubscriptionUseCase_Dataset.xlsx` (place in `ml/data/`).

## Requirements for Local Machine

You need Python 3 installed. No other tools required, but use a virtual environment for cleanliness.

1. **Install Python**: Download from python.org (version 3.8+).
2. **Install Libraries**: Open terminal in `ml/` folder and run:
```text
pip install flask pandas numpy scikit-learn
```
3. **Folder Structure**: Ensure `ml/` has:
   * `app.py` (the code).
   * `data/SubscriptionUseCase_Dataset.xlsx` (the dataset file).

## How to Run Locally

1. Go to `ml/` folder in terminal: `cd path/to/ml`.
2. Run the app: `python app.py`.
3. It starts on `http://localhost:5001`. Keep the terminal open.
4. Test: Use curl or Postman (see below).

To stop: Press Ctrl+C in terminal.

## Endpoints

All endpoints are at `http://localhost:5001` (or your deployed URL). Backend can call them with axios (e.g., `axios.post('http://localhost:5001/recommend', { userId: 1 })`).

### 1. Recommendations (Must-Have)

* **Endpoint**: `/recommend`
* **Method**: POST
* **Input Data** (JSON body):
   * `userId`: Integer (e.g., 1) - The user's ID from User_Data.
* **Output Data** (JSON response):
   * `recommendations`: Array of 3 strings (e.g., `["Plan1", "Plan35", "Plan96"]`) - Suggested plan names based on usage clusters.
   * If error: `{"error": "userId required"}`
* **How It Works**: Uses clustering on simulated usage_gb and price. For new users, random plans.
* **Example Call in Backend**:
```javascript
const axios = require('axios');
axios.post('http://localhost:5001/recommend', { userId: 1 })
  .then(res => console.log(res.data.recommendations));
```

### 2. Churn Prediction (Optional)

* **Endpoint**: `/churn`
* **Method**: POST
* **Input Data** (JSON body):
   * `subscriptionId`: Integer (e.g., 1) - Subscription ID from Subscriptions/Logs.
* **Output Data** (JSON response):
   * `churn_risk`: Float (0.0 to 1.0, e.g., 0.75) - Probability of churn (pause or failure).
   * If new: Default 0.5.
   * If error: `{"error": "subscriptionId required"}`
* **How It Works**: Logistic regression on action and payment_status from Logs/Billing.
* **Example Call in Backend**:
```javascript
axios.post('http://localhost:5001/churn', { subscriptionId: 1 })
  .then(res => console.log(res.data.churn_risk));
```

### 3. Analytics (Optional)

* **Endpoint**: `/analytics`
* **Method**: GET (no body)
* **Input Data**: None.
* **Output Data** (JSON response):
   * `active_vs_paused`: Object (e.g., `{"2024-01": {"active": 10, "paused": 5}, ...}`) - Counts by month.
   * `total_active`: Integer (total active subs).
   * `total_paused`: Integer (total paused subs).
* **How It Works**: Groups subscriptions by month and status.
* **Example Call in Backend**:
```javascript
axios.get('http://localhost:5001/analytics')
  .then(res => console.log(res.data));
```

## Testing

* Run `python app.py`.
* Use curl:
   * Recommendations: `curl -X POST -H "Content-Type: application/json" -d "{\"userId\": 1}" http://localhost:5001/recommend`
   * Churn: `curl -X POST -H "Content-Type: application/json" -d "{\"subscriptionId\": 1}" http://localhost:5001/churn`
   * Analytics: `curl http://localhost:5001/analytics`
* Or use Postman for GUI testing.

## Integration Tips

* In backend (Node.js), use axios to call these.
* Handle errors (e.g., if ML server down, fallback to no recs).
* For production: Deploy to Render/Heroku, update URL in backend env.

If issues, check terminal for errors (e.g., missing Excel file). Contact me for help!