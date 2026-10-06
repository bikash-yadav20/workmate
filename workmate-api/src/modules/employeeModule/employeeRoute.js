const express = require("express");
const { selfInfo } = require("./employeeController");
const { protectAuth } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/self-data", protectAuth, selfInfo);

module.exports = router;
