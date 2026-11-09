const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { swaggerUI, specs } = require("../swagger/swagger");

const companyRoute = require("./modules/companyModule/companyRoute");
const authRoute = require("./modules/authModule/authRoute");

const adminEmployeeRoute = require("./modules/employeeModule/adminEmployeeRoute");
const adminSalaryPeriodRoute = require("./modules/salaryPeriodModule/adminSalaryPeriodRoute");
const adminLeaveRoute = require("./modules/leaveModule/adminLeaveRoutes");
const adminHolidayRoute = require("./modules/holidayModule/adminHolidayRoute");
const deductionRulesRoute = require("./modules/deductionRulesModule/deductionRulesRoute");
const adminAdvancePaymentRoute = require("./modules/advancePaymentModule/adminAdvancePaymentRoute");
const adminSalaryRecordsRoute = require("./modules/salaryRecordModule/adminSalaryRecordRoute");
const adminAttendanceRoute = require("./modules/attendanceModule/adminAttendanceRoute");

const employeeRoute = require("./modules/employeeModule/employeeRoute");
const employeeLeaveRoute = require("./modules/leaveModule/employeeLeaveRoute");
const employeeAttendanceRoute = require("./modules/attendanceModule/employeeAttendanceRoute");
const employeeSalaryRecordsRoute = require("./modules/salaryRecordModule/employeeSalaryRecordRoute");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://192.168.1.6:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by cors"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("health status ok");
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Specific employee routes (placed above broad prefixes)
app.use("/workmate/employee", employeeSalaryRecordsRoute);
app.use("/workmate/employee", employeeLeaveRoute);
app.use("/workmate/employee/attendance", employeeAttendanceRoute);
app.use("/workmate/employee-profile", employeeRoute);

// Core and admin routes
app.use("/company", companyRoute);
app.use("/workmate", authRoute);
app.use("/workmate", adminEmployeeRoute);
app.use("/workmate", adminSalaryPeriodRoute);

app.use("/workmate/admin", adminHolidayRoute);
app.use("/workmate/admin", adminLeaveRoute);
app.use("/workmate/admin", deductionRulesRoute);
app.use("/workmate/admin", adminAdvancePaymentRoute);
app.use("/workmate/admin", adminSalaryRecordsRoute);
app.use("/workmate/admin", adminAttendanceRoute);

app.use(errorHandler);

module.exports = app;
