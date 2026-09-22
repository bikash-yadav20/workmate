const express = require("express");
const {
  applyLeave,
  changeLeavetype,
  withdrawLeave,
} = require("./employeeLeaveController");
const { protectAuth } = require("../../middlewares/authMiddleware");

const router = express.Router();

//apply for fresh leave
router.post("/apply-leave", protectAuth, applyLeave);

//update a existing leave type
router.patch("/update-leave", protectAuth, changeLeavetype);

//withdraw a leave
router.delete("/withdraw-leave/:leaveId", protectAuth, withdrawLeave);

module.exports = router;
