// src/models/Subscription.js
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "CANCELLED", "PENDING", "PAUSED"],
      default: "ACTIVE",
    },
    autoRenew: { type: Boolean, default: true },
    currentPeriodStart: { type: Date, default: Date.now },
    currentPeriodEnd: { type: Date },
    history: [
      {
        fromPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
        toPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
        at: { type: Date, default: Date.now },
        reason: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
