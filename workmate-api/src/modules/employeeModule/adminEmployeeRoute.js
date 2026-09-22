const express = require("express");
const { createEmployee } = require("./adminEmployeeController");
const { protectAuth } = require("../../middlewares/authMiddleware");
const { authorize } = require("../../middlewares/roleMiddleware");
const {
  fetchEmployees,
  fetchSingleEmployee,
} = require("./adminEmployeeController");

const router = express.Router();

/* Company Control Routes */
// make a employee admin or manager
// router.patch("/permissions");

/* -------------------------------------------------------- */
// Self service routes

// get self data
// router.get("/me");
// //update employee details: employee
// router.patch("/update-profile");
// //update profile picture: employee
// router.patch("/change-picture");
// //logout: employee
// router.post("/logout");
/* -------------------------------------------------------- */

/* ---------------------------------------------------------- */
//admin/manager routes
/* ------------------------------------------------------------ */

//create employee
router.post(
  "/create-employee",
  protectAuth,
  authorize("admin"),
  createEmployee,
);
//get all employees data
router.get("/employees", protectAuth, authorize("admin"), fetchEmployees);
//get single employee data by id
router.get(
  "/employee/:id",
  protectAuth,
  authorize("admin"),
  fetchSingleEmployee,
);
// //update employee data: admin
// router.put("/update-employee/:id");
// //delete employee: admin
// router.patch("/remove/:id");
/* ----------------------------------------------------------- */

module.exports = router;
