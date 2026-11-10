const express = require("express");
const {
  generateMonthlySalaryReport,
  getIndividualPayroll,
} = require("./adminSalaryRecordController");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");
const {
  generateSalaryPeriod,
} = require("../salaryPeriodModule/adminSalaryPeriodController");

const router = express.Router();

router.post(
  "/generate-monthly-salary-report",
  protectAuth,
  authorize("admin"),
  generateMonthlySalaryReport,
);

router.get(
  "/employee-payroll",
  protectAuth,
  authorize("admin"),
  getIndividualPayroll,
);
module.exports = router;
