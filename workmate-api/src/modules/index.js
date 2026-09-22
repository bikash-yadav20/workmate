const Company = require("./companyModule/companyModel");
const Employee = require("./employeeModule/employeeModel");
const EmployeeAddress = require("./addressModule/employeeAddressModel");
const Salary = require("./salaryModule/salaryModel");
const Attendance = require("./attendanceModule/attendanceModel");
const DeductionRule = require("./deductionRulesModule/deductionRulesModel");
const EmployeeLeave = require("./leaveModule/employeeLeaveModel");
const AdvancePayment = require("./advancePaymentModule/advancePaymentModel");
const SalaryPeriod = require("./salaryPeriodModule/salaryPeriodModel");
const SalaryRecord = require("./salaryRecordModule/salaryRecordtModel");
const Holiday = require("./holidayModule/holidayModel");

const sequelize = require("../config/db");
const defineAssociations = require("./associations");

const models = {
  Company,
  Employee,
  EmployeeAddress,
  Salary,
  Attendance,
  DeductionRule,
  EmployeeLeave,
  AdvancePayment,
  SalaryPeriod,
  SalaryRecord,
  Holiday,
};

defineAssociations(models);

module.exports = {
  sequelize,
  ...models,
};
