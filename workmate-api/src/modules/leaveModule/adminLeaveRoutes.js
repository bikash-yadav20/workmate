const express = require("express");
const { leaveStatusUpdate } = require("./adminLeaveController");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.put("/leave-status", protectAuth, authorize("admin"), leaveStatusUpdate);

module.exports = router;
