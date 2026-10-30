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

//Method to get weekend in a month
const getWeekendDaysCount = (startDate, endDate) => {
  let count = 0;
  const current = new Date(startDate);
  const end = new Date(endDate);
  while (current <= end) {
    const daysOfWeek = current.getDay();
    if (daysOfWeek === 0) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  return count;
};

// generating monthly salary for all Employees
const generateMonthlySalaryService = async (companyId, salaryPeriodId) => {
  console.log("company id", companyId);

  if (!companyId || !salaryPeriodId) {
    const error = new Error("company id and salaryPeriodId required");
    error.statusCode = 400;
    throw error;
  }
  return await sequelize.transaction(async (transaction) => {
    const companyClockInAndOutTime = await Company.findOne({
      where: {
        id: companyId,
      },
      transaction,
    });
    //check if there is any salary period available
    const activeSalaryPeriod = await SalaryPeriod.findOne({
      where: {
        companyId,
        id: salaryPeriodId,
        status: "draft",
      },
      transaction,
    });

    if (!activeSalaryPeriod) {
      const error = new Error("No salary period found");
      error.statusCode = 400;
      throw error;
    }

    //update salary period status to processing
    await activeSalaryPeriod.update(
      {
        status: "processing",
      },
      { transaction },
    );

    //fetch Employees
    const employees = await Employee.findAll({
      where: {
        companyId,
        status: "active",
      },
      transaction,
    });

    if (!employees.length) {
      await activeSalaryPeriod.update(
        {
          status: "draft",
        },
        { transaction },
      );
      return {
        success: true,
        message: "No active employees found to generate salary for.",
        recordsGenerated: 0,
      };
    }

    //fetch company's deduction rules
    const deductionRules = await DeductionRule.findAll({
      where: { companyId },
      transaction,
    });

    if (!deductionRules.length) {
      const error = new Error(
        "You must have deduction rules for late and absent",
      );
      throw error;
    }

    const recordsToInsert = [];

    for (const employee of employees) {
      //Base salary and allowances
      const salaryStructure = await Salary.findOne({
        where: {
          employeeId: employee.id,
        },
        transaction,
      });

      const baseSalary = salaryStructure
        ? Number(salaryStructure.basicSalary)
        : 0;

      const allowance = salaryStructure ? Number(salaryStructure.allowance) : 0;
      const providendFund = salaryStructure
        ? Number(salaryStructure.providendFund)
        : 0;
      const grossSalary = baseSalary + allowance;

      //working days and per day rate calculaion
      const workingdays = companyClockInAndOutTime.workingdays || 30;

      const perDayRate = baseSalary / workingdays;

      //fetch all holidays of the company
      const holidays = await Holiday.findAll({
        where: {
          companyId,
          fromDate: {
            [Op.gte]: activeSalaryPeriod.startDate,
          },

          toDate: {
            [Op.lte]: activeSalaryPeriod.endDate,
          },
        },
        transaction,
      });

      //calculate the total holidays between a salary period
      let totalHolidays = 0;
      for (const holiday of holidays) {
        const start = new Date(holiday.fromDate);
        const end = new Date(holiday.toDate);
        const diffInMs = end.getTime() - start.getTime();
        const daysInRecord = Math.round(diffInMs / (1000 * 60 * 60 * 24)) + 1;
        totalHolidays += daysInRecord;
      }

      //Fetch approved paid leave records for this employee within the period
      const paidLeaves = await EmployeeLeave.findAll({
        where: {
          companyId,
          employeeId: employee.id,
          type: "paid",
          status: "approved",
          fromDate: {
            [Op.gte]: activeSalaryPeriod.startDate,
          },
          toDate: {
            [Op.lte]: activeSalaryPeriod.endDate,
          },
        },
        transaction,
      });

      // Calculate the actual total days across all approved paid leave records
      let totalPaidLeaveDays = 0;

      for (const leave of paidLeaves) {
        const start = new Date(leave.fromDate);
        const end = new Date(leave.toDate);

        // Calculate day count inclusively (e.g., March 10 to March 12 = 3 days)
        const diffInMs = end.getTime() - start.getTime();
        const daysInRecord = Math.round(diffInMs / (1000 * 60 * 60 * 24)) + 1;

        totalPaidLeaveDays += daysInRecord;
      }

      //calculaion presentDays
      const presentDays = await Attendance.count({
        where: {
          companyId,
          employeeId: employee.id,
          workDate: {
            [Op.gte]: activeSalaryPeriod.startDate,
            [Op.lte]: activeSalaryPeriod.endDate,
          },
        },
        transaction,
      });

      const weekends = getWeekendDaysCount(
        activeSalaryPeriod.startDate,
        activeSalaryPeriod.endDate,
      );
      const totalPayableDays =
        totalPaidLeaveDays + presentDays + totalHolidays + weekends;
      const unpaidDays = Math.max(0, workingdays - totalPayableDays);

      //calculate total late days

      //find all attendance
      const attendances = await Attendance.findAll({
        where: {
          companyId,
          employeeId: employee.id,
          workDate: {
            [Op.gte]: activeSalaryPeriod.startDate,
            [Op.lte]: activeSalaryPeriod.endDate,
          },
        },
        transaction,
      });

      let lateDays = 0;
      const companyClockInStr = companyClockInAndOutTime.clockInTime; // e.g., "09:00:00"
      const graceMinutes = companyClockInAndOutTime.gracePeriodMinutes || 0;

      for (const attendance of attendances) {
        if (!attendance.clockIn) continue;

        // 1. Build the expected threshold date for this specific workDate
        const expectedClockIn = new Date(
          `${attendance.workDate}T${companyClockInStr}`,
        );

        // 2. Add grace period if applicable
        if (graceMinutes > 0) {
          expectedClockIn.setMinutes(
            expectedClockIn.getMinutes() + graceMinutes,
          );
        }

        // 3. Compare actual clockIn date against the expected threshold date
        const actualClockIn = new Date(attendance.clockIn);
        if (actualClockIn > expectedClockIn) {
          lateDays++;
        }
      }

      // --- Late Days Deduction Logic ---
      let lateDeduction = 0;

      if (lateDays > 0) {
        for (const rule of deductionRules) {
          if (rule.type === "late") {
            const percentageFactor = Number(rule.percentage) / 100;

            if (rule.mode === "daily") {
              // Daily Mode: % of perDayRate per late day
              lateDeduction += perDayRate * percentageFactor * lateDays;
            } else if (rule.mode === "monthly") {
              // Monthly Mode: Flat % of baseSalary if late at least once
              lateDeduction += baseSalary * percentageFactor;
            }
          }
        }
      }

      lateDeduction = Number(lateDeduction.toFixed(2));

      // --- Absent Deduction Logic with Fallback ---
      let absentDeduction = 0;

      if (unpaidDays > 0) {
        const absentRules = deductionRules.filter((r) => r.type === "absent");
        if (absentRules.length > 0) {
          for (const rule of absentRules) {
            const percentageFactor = Number(rule.percentage) / 100;

            if (rule.mode === "daily") {
              absentDeduction += perDayRate * percentageFactor * unpaidDays;
            } else if (rule.mode === "monthly") {
              absentDeduction += baseSalary * percentageFactor;
            }
          }
        } else {
          // Standard default fallback: 100% of daily rate for unpaid days
          absentDeduction = perDayRate * unpaidDays;
        }
      }
      absentDeduction = Number(absentDeduction.toFixed(2));

      //fetch all advance payments for the employee
      const advancePayments = await AdvancePayment.findAll({
        where: {
          companyId,
          employeeId: employee.id,
          paymentDate: {
            [Op.gte]: activeSalaryPeriod.startDate,
            [Op.lte]: activeSalaryPeriod.endDate,
          },
        },
        transaction,
      });

      let totalAdvanceAmount = 0;
      for (const advance of advancePayments) {
        totalAdvanceAmount += Number(advance.advanceAmount || 0);
      }

      //calculaion net salary
      const totalDeductions = Number(
        (
          absentDeduction +
          lateDeduction +
          totalAdvanceAmount +
          providendFund
        ).toFixed(2),
      );

      const netSalary = Math.max(
        0,
        Number((grossSalary - totalDeductions).toFixed(2)),
      );

      recordsToInsert.push({
        companyId,
        salaryPeriodId: activeSalaryPeriod.id,
        employeeId: employee.id,
        basicSalary: baseSalary,
        allowance: allowance,
        paidLeaveDays: totalPaidLeaveDays,
        unpaidLeaveDays: unpaidDays,
        lateDays: lateDays,
        lateDeduction: lateDeduction,
        advanceDeduction: totalAdvanceAmount,
        absentDeduction: absentDeduction,
        providendFund: providendFund,
        totalDeductions: totalDeductions,
        netSalary: netSalary,
        paymentDate: activeSalaryPeriod.endDate,
        isPaid: true,
      });
    }

    const generatedReport = await SalaryRecord.bulkCreate(recordsToInsert, {
      transaction,
      updateOnDuplicate: [
        "basicSalary",
        "paidLeaveDays",
        "unpaidLeaveDays",
        "lateDays",
        "lateDeduction",
        "advanceDeduction",
        "absentDeduction",
        "netSalary",
        "paymentDate",
        "isPaid",
      ],
    });

    await activeSalaryPeriod.update({ status: "paid" }, { transaction });

    return {
      success: true,
      message: "Monthly salary generated successfully.",
      recordsGenerated: generatedReport.length,
      data: generatedReport,
    };
  });
};

module.exports = { generateMonthlySalaryService };
