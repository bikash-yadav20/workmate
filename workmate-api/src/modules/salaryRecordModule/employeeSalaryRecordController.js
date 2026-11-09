const { employeePayrollService } = require("./employeePayrollService");

// get employee salary report individually --employee
const getIndividualPayroll = async (req, res, next) => {
  console.log("employee payroll route hit");

  try {
    const { companyId, employeeId } = req.user;
    const { salaryPeriodId } = req.query;

    const employeePayroll = await employeePayrollService({
      companyId,
      salaryPeriodId,
      employeeId,
    });

    res.status(200).json({
      success: true,
      message: "Payroll fetch successfully",
      employeePayroll,
    });
  } catch (error) {
    console.log("got a error");

    next(error);
  }
};

module.exports = [getIndividualPayroll];
