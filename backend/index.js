// index.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

// Routes
const planRoutes = require("./routes/plan.routes");
const subscriptionRoutes = require("./routes/subscription.routes");
const userRoutes = require("./routes/user.routes");

// Swagger Docs
const planSwagger = require("./swagger/plan.swagger");
const subscriptionSwagger = require("./swagger/subscription.swagger");
const userSwagger = require("./swagger/user.swagger");

const app = express();


app.use(express.json());


// Connect DB
connectDB();

// Routes
app.use("/api/plans", planRoutes);

app.use("/api/users", userRoutes);

app.use("/api-docs/users", userSwagger);
app.use("/api-docs/plans", planSwagger);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api-docs/subscriptions", subscriptionSwagger);
app.use("/api/offers", require('./routes/offers.routes'));


// Root
app.get("/", (req, res) => {
    res.send("🚀 Subscription Management System API is running...");
});

// Global Error Handler
app.use((err, req, res, _next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
