const Plan = require("../models/Plan");

// ✅ Helper function to validate numbers
const isValidNumber = (value) => typeof value === "number" && !isNaN(value);

exports.createPlan = async (req, res) => {
  try {
    const { name, productType, monthlyPrice, monthlyQuotaGB, speedMbps, features, isActive } = req.body;

    // Basic null/type checks
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Name is required and must be a string" });
    }
    if (!productType || !["FIBERNET", "COPPER", "OTHER"].includes(productType)) {
      return res.status(400).json({ message: "Invalid or missing productType" });
    }
    if (!isValidNumber(monthlyPrice)) {
      return res.status(400).json({ message: "monthlyPrice must be a number" });
    }
    if (!isValidNumber(monthlyQuotaGB)) {
      return res.status(400).json({ message: "monthlyQuotaGB must be a number" });
    }
    if (!isValidNumber(speedMbps)) {
      return res.status(400).json({ message: "speedMbps must be a number" });
    }
    if (features && !Array.isArray(features)) {
      return res.status(400).json({ message: "features must be an array of strings" });
    }

    const plan = new Plan({
      name,
      productType,
      monthlyPrice,
      monthlyQuotaGB,
      speedMbps,
      features,
      isActive,
    });

    const savedPlan = await plan.save();
    res.status(201).json(savedPlan);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format", error: err.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const updates = req.body;

    // Optional: Validate only if fields exist
    if (updates.name && typeof updates.name !== "string") {
      return res.status(400).json({ message: "Name must be a string" });
    }
    if (updates.productType && !["FIBERNET", "COPPER", "OTHER"].includes(updates.productType)) {
      return res.status(400).json({ message: "Invalid productType" });
    }
    if (updates.monthlyPrice && !isValidNumber(updates.monthlyPrice)) {
      return res.status(400).json({ message: "monthlyPrice must be a number" });
    }
    if (updates.monthlyQuotaGB && !isValidNumber(updates.monthlyQuotaGB)) {
      return res.status(400).json({ message: "monthlyQuotaGB must be a number" });
    }
    if (updates.speedMbps && !isValidNumber(updates.speedMbps)) {
      return res.status(400).json({ message: "speedMbps must be a number" });
    }
    if (updates.features && !Array.isArray(updates.features)) {
      return res.status(400).json({ message: "features must be an array" });
    }

    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedPlan) return res.status(404).json({ message: "Plan not found" });
    res.json(updatedPlan);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format", error: err.message });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) return res.status(404).json({ message: "Plan not found" });
    res.json({ message: "Plan deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format", error: err.message });
  }
};
