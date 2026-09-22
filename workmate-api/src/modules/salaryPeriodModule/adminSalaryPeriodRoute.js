const express = require("express");
const { generateSalaryPeriod } = require("./adminSalaryPeriodController");

const router = express.Router();

//start a new salary period
router.post("/salary-periods", generateSalaryPeriod);

module.exports = router;
