const express = require("express");
const { generateSalaryPeriod } = require("./adminSalaryPeriodController");
const { fetchSalaryPeriods } = require("./fetchSalaryPeriod");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");

const router = express.Router();

//start a new salary period
router.post(
  "/salary-period",
  protectAuth,
  authorize("admin"),
  generateSalaryPeriod,
);

// get all salary periods of a company
router.get("/fetch-salaryPeriods", protectAuth, fetchSalaryPeriods);

module.exports = router;
