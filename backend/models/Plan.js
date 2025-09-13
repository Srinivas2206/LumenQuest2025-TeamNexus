// src/models/Plan.js
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    productType: {
      type: String,
      enum: ["FIBERNET", "COPPER", "OTHER"],
      required: true,
    },
    monthlyPrice: { type: Number, required: true },
    monthlyQuotaGB: { type: Number, required: true },
    speedMbps: { type: Number, required: true },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
