const express = require("express");
const router = express.Router();
const SubController = require("../controllers/subscription.controller");
const verifyAdminAuth = require("../middleware/user.middleware");

// Public routes
router.post("/", SubController.createSubscription);       // Create subscription
router.get("/:id", SubController.getSubscriptionById);    // Get subscription by ID
router.put("/:id", SubController.updateSubscription);     // Update subscription

// Admin-only routes
router.get("/", verifyAdminAuth, SubController.getSubscriptions);  // Get all subscriptions
router.delete("/:id", verifyAdminAuth, SubController.deleteSubscription); // Delete subscription

module.exports = router;
