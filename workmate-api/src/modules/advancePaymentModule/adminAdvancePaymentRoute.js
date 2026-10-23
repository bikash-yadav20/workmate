const express = require("express");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");
const {
  advancePay,
  advanceHistory,
} = require("./adminAdvancePaymentController");

const router = express.Router();

// make a advance payment
router.post("/advance-payment", protectAuth, authorize("admin"), advancePay);

// get advance history salary period wise
router.get("/advance-history", protectAuth, authorize("admin"), advanceHistory);

module.exports = router;
