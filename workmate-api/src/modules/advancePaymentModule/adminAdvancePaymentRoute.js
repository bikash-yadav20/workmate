const express = require("express");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");
const { advancePay } = require("./adminAdvancePaymentController");

const router = express.Router();

router.post("/advance-payment", protectAuth, authorize("admin"), advancePay);

module.exports = router;
