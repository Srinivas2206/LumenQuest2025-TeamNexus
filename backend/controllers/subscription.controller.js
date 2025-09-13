// src/controllers/subscription.controller.js
const Subscription = require("../models/Subscription");

exports.createSubscription = async (req, res) => {
  try {
    const sub = await Subscription.create(req.body);
    res.status(201).json(sub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getSubscriptions = async (_req, res) => {
  try {
    const subs = await Subscription.find().populate("user plan");
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSubscriptionById = async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id).populate("user plan");
    if (!sub) return res.status(404).json({ message: "Subscription not found" });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user plan");
    if (!sub) return res.status(404).json({ message: "Subscription not found" });
    res.json(sub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findByIdAndDelete(req.params.id);
    if (!sub) return res.status(404).json({ message: "Subscription not found" });
    res.json({ message: "Subscription deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
