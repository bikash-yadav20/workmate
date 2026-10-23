const SalaryPeriod = require("./salaryPeriodModel");

const fetchSalaryPeriods = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const salaryPeriods = await SalaryPeriod.findAll({
      where: { companyId },
      order: [["startDate", "DESC"]],
    });

    if (salaryPeriods.length === 0) {
      return res.status(200).json({
        success: true,
        salaryPeriods,
        message: "No periods found",
      });
    }

    res.status(200).json({
      success: true,
      salaryPeriods,
      message: "Salary periods fetched successfully",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { fetchSalaryPeriods };
