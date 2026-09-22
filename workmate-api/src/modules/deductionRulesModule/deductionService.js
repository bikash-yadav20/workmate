const DeductionRule = require("./deductionRulesModel");

const createDeductionRuleService = async (companyId, ruleData) => {
  const { type, percentage, mode } = ruleData;
  if (!companyId || !type || !percentage || !mode) {
    const error = new Error("Rule data or company id cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  const existingRule = await DeductionRule.findOne({
    where: { companyId: companyId, type: type, mode: mode },
  });

  if (existingRule) {
    const error = new Error(
      "You already have an deduction rule with this mode and type.",
    );
    error.statusCode = 409;
    throw error;
  }
  const rule = await DeductionRule.create({
    companyId,
    type,
    percentage,
    mode,
  });

  return rule;
};

module.exports = { createDeductionRuleService };
