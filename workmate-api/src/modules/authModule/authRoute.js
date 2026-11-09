const express = require("express");
const { login, authMe, logout } = require("./authController");
const { protectAuth } = require("../../middlewares/authMiddleware");

const router = express.Router();

//allow login employee and admin both
router.post("/login", login);

// logout
router.post("/logout", protectAuth, logout);

//get self data for frontend route validation
router.get("/auth-me", protectAuth, authMe);

module.exports = router;
