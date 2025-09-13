const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyAdminAuth = require("../middleware/user.middleware");

// Public routes
router.post("/", userController.createUser);            // Create user
router.put("/:id", userController.updateUser);          // Update user
router.get("/:id", userController.getUserById);         // Get by ID

// Admin-only routes
router.get("/", verifyAdminAuth, userController.getAllUsers);    // Get all users
router.delete("/:id", verifyAdminAuth, userController.deleteUser); // Delete user

module.exports = router;
