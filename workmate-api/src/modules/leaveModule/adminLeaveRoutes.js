const express = require("express");
const { leaveStatusUpdate, fetchAllLeaves } = require("./adminLeaveController");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.put("/leave-status", protectAuth, authorize("admin"), leaveStatusUpdate);
router.get("/leaves", protectAuth, authorize("admin"), fetchAllLeaves);

module.exports = router;
