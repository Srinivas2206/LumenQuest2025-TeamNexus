const express = require("express");
const router = express.Router();
const planController = require("../controllers/plan.controller");
const authMiddleware = require("../middleware/user.middleware");

// Apply authentication middleware to all routes
router.use(authMiddleware);

router.post("/", planController.createPlan);
router.get("/", planController.getPlans);
router.get("/:id", planController.getPlanById);
router.put("/:id", planController.updatePlan);
router.delete("/:id", planController.deletePlan);

module.exports = router;
