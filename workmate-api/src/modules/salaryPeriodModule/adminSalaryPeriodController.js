const { getCurrentPeriodContext } = require("../../utils/salaryPeriodDate");
const { SalaryPeriodService } = require("./salaryPeriodService");

const generateSalaryPeriod = async (req, res) => {
  try {
    const { currentYear, currentMonth } = getCurrentPeriodContext();

    //creatin instance of generateSalaryPeriods
    const service = new SalaryPeriodService();
    const newSalaryPeriods = await service.generateSalaryPeriods(
      currentYear,
      currentMonth,
    );

    res.status(200).json({
      success: true,
      message: "Salary period for companies created succesfully",
      salaryPeriods: newSalaryPeriods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { generateSalaryPeriod };
