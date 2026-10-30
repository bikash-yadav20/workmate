const { employeePayrollService } = require("./employeePayrollService");
const { generateMonthlySalaryService } = require("./salaryRecordService");

const generateMonthlySalaryReport = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { salaryPeriodId } = req.body;

    const generatedReport = await generateMonthlySalaryService(
      companyId,
      salaryPeriodId,
    );

    if (generatedReport.recordsGenerated === 0) {
      return res.status(404).json({
        success: generatedReport.success,
        message: generatedReport.message,
        recordsGenerated: generatedReport.recordsGenerated,
      });
    }
    res.status(201).json({
      success: true,
      message: "Salary report generated successfully",
      report: generatedReport,
    });
  } catch (error) {
    console.error(error.message);
    error.statusCode
      ? res.status(error.statusCode).json({
          success: false,
          message: error.message,
        })
      : res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
  }
};

// get employee salary report individually
const getIndividualPayroll = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const { salaryPeriodId, employeeId } = req.query;

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
    next(error);
  }
};

module.exports = { generateMonthlySalaryReport, getIndividualPayroll };
