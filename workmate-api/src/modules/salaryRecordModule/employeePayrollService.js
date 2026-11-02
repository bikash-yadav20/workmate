const salaryCalculation = require("./salaryCalculationData");

// Method to get weekend in a month
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

const employeePayrollService = async (employeeQuery) => {
  const calculationData = await salaryCalculation(employeeQuery);

  // Extract frequently used values safely
  const basicSalary = calculationData.salaryDetails.basicSalary;
  const allowance = calculationData.salaryDetails.allowance;

  // Working days
  const workingDays =
    calculationData.companyClockInAndOutTime.workingDays || 30;
  const perDayRate = basicSalary / workingDays;

  // Calculating total advance amount (FIXED: Added return)
  const totalAdvancePays = calculationData.advancePays.reduce(
    (sum, currentVal) => {
      return sum + currentVal.advanceAmount;
    },
    0,
  );

  // Late days calculation
  let lateDays = 0;
  const companyClockInStr =
    calculationData.companyClockInAndOutTime.clockInTime;
  const graceMinutes =
    calculationData.companyClockInAndOutTime.gracePeriodMinutes || 0;

  for (const attendance of calculationData.attendances || []) {
    if (!attendance.clockIn) continue;

    // Build the expected clock in date for the work date
    const expectedClockIn = new Date(
      `${attendance.workDate}T${companyClockInStr}`,
    );

    // Add grace period if applicable
    if (graceMinutes > 0) {
      expectedClockIn.setMinutes(expectedClockIn.getMinutes() + graceMinutes);
    }

    // Compare the actual clock in date against the expected
    const actualClockIn = new Date(attendance.clockIn);

    if (actualClockIn > expectedClockIn) {
      lateDays++;
    }
  }

  // Late deduction
  let lateDeduction = 0;
  if (lateDays > 0) {
    for (const rule of calculationData.deductionRules || []) {
      if (rule.type === "late") {
        const percentageFactor = Number(rule.percentage) / 100;

        if (rule.mode === "daily") {
          lateDeduction += percentageFactor * perDayRate * lateDays;
        } else if (rule.mode === "monthly") {
          lateDeduction += basicSalary * percentageFactor;
        }
      }
    }
  }

  // Get total paid leaves and present days count
  const presentDays = calculationData.attendances.length;

  let totalPaidLeaveDays = 0;
  for (const leave of calculationData.leaves) {
    if (leave.type === "paid" && leave.status === "approved") {
      const start = new Date(leave.fromDate);
      const end = new Date(leave.toDate);

      const diffInMs = end.getTime() - start.getTime();

      const daysInRecord = Math.round(diffInMs / (1000 * 60 * 60 * 24)) + 1;
      totalPaidLeaveDays += daysInRecord;
    }
  }

  // Get total holidays in selected period
  let totalHolidays = 0;
  for (const holiday of calculationData.holidays || []) {
    const start = new Date(holiday.fromDate);
    const end = new Date(holiday.toDate);
    const diffInMs = end.getTime() - start.getTime();
    const daysInRecord = Math.round(diffInMs / (1000 * 60 * 60 * 24)) + 1;
    totalHolidays += daysInRecord;
  }

  // Calculate weekends (FIXED: correct boundary logic for past vs ongoing periods)
  const today = new Date().toLocaleDateString("en-CA");
  let toDate = calculationData.periods.endDate;
  if (toDate > today) {
    toDate = today; // Only cap at today if the payroll period extends into the future/today
  }

  const weekends = getWeekendDaysCount(
    calculationData.periods.startDate,
    toDate,
  );

  // Total payable days
  const totalPayableDays =
    totalPaidLeaveDays + totalHolidays + presentDays + weekends;

  const unpaidDays = Math.max(0, workingDays - totalPayableDays);

  // Absent deduction logic (FIXED: referenced calculationData.deductionRules & basicSalary)
  let absentDeduction = 0;
  if (unpaidDays > 0) {
    const absentRules = (calculationData.deductionRules || []).filter(
      (r) => r.type === "absent",
    );

    if (absentRules.length > 0) {
      for (const rule of absentRules) {
        const percentageFactor = Number(rule.percentage) / 100;

        if (rule.mode === "daily") {
          absentDeduction += perDayRate * percentageFactor * unpaidDays;
        } else if (rule.mode === "monthly") {
          absentDeduction += basicSalary * percentageFactor;
        }
      }
    } else {
      absentDeduction += perDayRate * unpaidDays;
    }
  }

  // Calculate net salary
  const totalDeduction = Number(
    (totalAdvancePays + lateDeduction + absentDeduction).toFixed(2),
  );

  return {
    basicSalary: basicSalary,
    allowance: allowance,
    providentFund: calculationData.salaryDetails.providentFund,
    presentDays: presentDays,
    paidLeaveDays: totalPaidLeaveDays,
    weekends: weekends,
    holidays: totalHolidays,
    lateDays: lateDays,
    absentDays: unpaidDays,
    advanceDeduction: totalAdvancePays,
    lateDeduction: Number(lateDeduction.toFixed(2)),
    absentDeduction: Number(absentDeduction.toFixed(2)),
    totalDeduction: totalDeduction,
    netSalary: Number(
      Math.max(0, basicSalary + allowance - totalDeduction).toFixed(2),
    ),

    companyDetails: {
      companyName: calculationData.companyClockInAndOutTime?.companyName,
    },
  };
};

module.exports = { employeePayrollService };
