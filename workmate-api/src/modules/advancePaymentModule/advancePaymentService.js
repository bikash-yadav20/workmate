const { Op } = require("sequelize");
const SalaryPeriod = require("../salaryPeriodModule/salaryPeriodModel");
const AdvancePayment = require("./advancePaymentModel");
const Employee = require("../employeeModule/employeeModel");

const advancePayService = async (companyId, paymentInfo) => {
  // 1. Authenticate / Validate company ID
  if (!companyId) {
    const error = new Error("No companyId in token or Invalid/missing token");
    error.statusCode = 401;
    throw error;
  }

  // 2. Validate required request payload
  const { employeeId, amount, reason, paymentDate } = paymentInfo || {};

  if (!employeeId || !amount || !paymentDate) {
    const error = new Error(
      "Employee ID, amount, and payment date are required",
    );
    error.statusCode = 400;
    throw error;
  }

  if (typeof amount !== "number" || amount <= 0) {
    const error = new Error("Amount must be a positive number");
    error.statusCode = 400;
    throw error;
  }

  // 3. Validate and parse the payment date
  const payDate = new Date(paymentDate);
  if (isNaN(payDate.getTime())) {
    const error = new Error("Invalid payment date format");
    error.statusCode = 400;
    throw error;
  }

  // 4. Ensure payment date falls within the active salary period date range
  const runningSalaryPeriod = await SalaryPeriod.findOne({
    where: {
      companyId: companyId,
      status: "draft",
      startDate: { [Op.lte]: payDate },
      endDate: { [Op.gte]: payDate },
    },
  });

  if (!runningSalaryPeriod) {
    const error = new Error(
      "Payment date does not fall within any active salary period for this company",
    );
    error.statusCode = 400;
    throw error;
  }

  // 5. Create advance payment entry
  const advancePayment = await AdvancePayment.create({
    companyId,
    employeeId,
    advanceAmount: amount,
    reason,
    paymentDate: payDate,
  });

  return advancePayment;
};

// get advance history
const advanceHistoryService = async (salaryPeriod, companyId) => {
  if (!salaryPeriod.startDate || !salaryPeriod.endDate) {
    const error = new Error(
      "Salary period is required to fetch advance history",
    );
    error.statusCode = 400;
    throw error;
  }

  const response = await AdvancePayment.findAll({
    where: {
      companyId,
      paymentDate: {
        [Op.gte]: salaryPeriod.startDate,
        [Op.lte]: salaryPeriod.endDate,
      },
    },

    attributes: ["id", "advanceAmount", "reason", "paymentDate"],

    include: [
      {
        model: Employee,
        as: "employee",
        attributes: ["fullName", "employeeId"],
      },
    ],

    order: [["paymentDate", "DESC"]],
  });

  return response;
};

module.exports = { advancePayService, advanceHistoryService };
