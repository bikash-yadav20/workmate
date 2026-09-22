const express = require("express");
const { createHoliday } = require("./adminHolidayController");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.post("/create-holiday", protectAuth, authorize("admin"), createHoliday);

module.exports = router;
