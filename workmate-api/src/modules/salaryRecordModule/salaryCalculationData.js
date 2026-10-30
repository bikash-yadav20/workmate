const SalaryPeriod = require("../salaryPeriodModule/salaryPeriodModel");
const Employee = require("../employeeModule/employeeModel");
const Salary = require("../salaryModule/salaryModel");
const DeductionRule = require("../deductionRulesModule/deductionRulesModel");
const EmployeeLeave = require("../leaveModule/employeeLeaveModel");
const AdvancePayment = require("../advancePaymentModule/advancePaymentModel");
const Attendance = require("../attendanceModule/attendanceModel");
const Company = require("../companyModule/companyModel");
const SalaryRecord = require("../salaryRecordModule/salaryRecordtModel");
const Holiday = require("../holidayModule/holidayModel");
const sequelize = require("../../config/db");
const { Op } = require("sequelize");

const salaryCalculation = async (employeeQuery) => {
  const { companyId, salaryPeriodId, employeeId } = employeeQuery;

  if (!companyId || !salaryPeriodId || !employeeId) {
    let error = new Error("employee query is required");
    error.status = 400;
    throw error;
  }

  const companyClockInAndOutTime = await Company.findOne({
    where: {
      id: companyId,
    },
  });

  const periods = await SalaryPeriod.findOne({
    where: { companyId, id: salaryPeriodId },
    attributes: ["startDate", "endDate"],
  });

  // Optional safety check: Ensure the period actually exists
  if (!periods) {
    let error = new Error("Salary period not found");
    error.status = 404;
    throw error;
  }

  const salaryDetails = await Salary.findOne({
    where: { employeeId },
  });

  const deductionRules = await DeductionRule.findAll({
    where: { companyId },
  });

  const leaves = await EmployeeLeave.findAll({
    where: {
      companyId,
      employeeId,
      fromDate: { [Op.gte]: periods.startDate },
      toDate: { [Op.lte]: periods.endDate },
    },
  });

  const advancePays = await AdvancePayment.findAll({
    where: {
      companyId,
      employeeId,
      paymentDate: { [Op.gte]: periods.startDate, [Op.lte]: periods.endDate },
    },
  });

  const attendances = await Attendance.findAll({
    where: {
      companyId,
      employeeId,
      workDate: {
        [Op.gte]: periods.startDate,
        [Op.lte]: periods.endDate,
      },
    },
  });

  const holidays = await Holiday.findAll({
    where: {
      companyId,
      fromDate: {
        [Op.gte]: periods.startDate,
        [Op.lte]: periods.endDate,
      },
    },
  });

  return {
    companyClockInAndOutTime,
    salaryDetails,
    periods,
    deductionRules,
    advancePays,
    leaves,
    attendances,
    holidays,
  };
};

module.exports = salaryCalculation;
