const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { swaggerUI, specs } = require("../swagger/swagger");

const companyRoute = require("./modules/companyModule/companyRoute");
const adminEmployeeRoute = require("./modules/employeeModule/adminEmployeeRoute");
const loginRoute = require("./modules/authModule/loginRoute");
const adminSalaryPeriodRoute = require("./modules/salaryPeriodModule/adminSalaryPeriodRoute");
const employeeLeaveRoute = require("./modules/leaveModule/employeeLeaveRoute");
const employeAttandanceRoute = require("./modules/attendanceModule/employeeAttendanceRoute");
const adminLeaveRoute = require("./modules/leaveModule/adminLeaveRoutes");
const adminHolidayRoute = require("./modules/holidayModule/adminHolidayRoute");
const deductionRulesRoute = require("./modules/deductionRulesModule/deductionRulesRoute");
const adminAdvancePaymentRoute = require("./modules/advancePaymentModule/adminAdvancePaymentRoute");
const adminSalaryRecordsRoute = require("./modules/salaryRecordModule/adminSalaryRecordRoute");

const app = express();
app.use(cookieParser());
app.use(express.json());
//check health status
app.get("/health", (req, res) => {
  res.send("health status ok");
});
//swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//create company
app.use("/company", companyRoute);
//create employee
app.use("/workmate", adminEmployeeRoute);
//login
app.use("/workmate", loginRoute);
//create salary perids
app.use("/workmate", adminSalaryPeriodRoute);

//employee leave routes for employee
app.use("/workmate/employee/", employeeLeaveRoute);

//admin leave route
app.use("/workmate/admin/", adminHolidayRoute);

//holiday routes (admin)
app.use("/workmate/admin/", adminLeaveRoute);

//deduction rules routes
app.use("/workmate/admin/", deductionRulesRoute);

//advance payment route
app.use("/workmate/admin/", adminAdvancePaymentRoute);

//generate monthly salary report
app.use("/workmate/admin/", adminSalaryRecordsRoute);

//employee attendance routes
app.use("/workmate/employee/attendance/", employeAttandanceRoute);
module.exports = app;
