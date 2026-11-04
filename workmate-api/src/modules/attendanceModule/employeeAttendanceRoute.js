const express = require("express");
const { protectAuth } = require("../../middlewares/authMiddleware");
const {
  clockInHandler,
  clockOutHandler,
  todayAttendanceStatus,
} = require("./employeAttandanceController");

const router = express.Router();
router.post("/clock-in", protectAuth, clockInHandler);
router.put("/clock-out", protectAuth, clockOutHandler);
router.get("/today-attendance", protectAuth, todayAttendanceStatus);

module.exports = router;
