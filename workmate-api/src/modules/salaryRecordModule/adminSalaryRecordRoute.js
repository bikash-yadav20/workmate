const express = require("express");
const {
  generateMonthlySalaryReport,
} = require("./adminSalaryRecordController");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/generate-monthly-salary-report",
  protectAuth,
  authorize("admin"),
  generateMonthlySalaryReport,
);

module.exports = router;
