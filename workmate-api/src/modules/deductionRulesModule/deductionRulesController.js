const { createDeductionRuleService } = require("./deductionService");

const createDeductionRule = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { type, percentage, mode } = req.body;
    const ruleData = {
      type,
      percentage,
      mode,
    };

    const newRule = await createDeductionRuleService(companyId, ruleData);

    res.status(201).json({
      success: true,
      message: "deduction rule created successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createDeductionRule };
