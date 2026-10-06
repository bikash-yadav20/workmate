const express = require("express");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");

const {
  dailyPresentCount,
  attendanceLeaveLogs,
} = require("./adminAttendanceController");

const router = express.Router();

router.get(
  "/attendeesCount",
  protectAuth,
  authorize("admin"),
  dailyPresentCount,
);

router.get(
  "/attendance-logs",
  protectAuth,
  authorize("admin"),
  attendanceLeaveLogs,
);

module.exports = router;
