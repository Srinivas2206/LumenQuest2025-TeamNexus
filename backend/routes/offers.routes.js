const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offers.controller");
const authMiddleware = require("../middleware/user.middleware");

// Apply authentication middleware to all routes
router.use(authMiddleware);

router.post("/", offerController.createOffer);
router.get("/", offerController.getAllOffers);
router.get("/:id", offerController.getOfferById);
router.put("/:id", offerController.updateOffer);
router.delete("/:id", offerController.deleteOffer);

module.exports = router;
