const express = require("express");
const getIndividualPayroll = require("./employeeSalaryRecordController");
const { protectAuth } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/salary-slip", protectAuth, getIndividualPayroll);

module.exports = router;
