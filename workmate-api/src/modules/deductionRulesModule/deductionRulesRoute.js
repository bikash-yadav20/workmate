const express = require("express");
const { createDeductionRule } = require("./deductionRulesController");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/create-deduction-rule",
  protectAuth,
  authorize("admin"),
  createDeductionRule,
);

module.exports = router;
