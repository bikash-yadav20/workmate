const {
  advancePayService,
  advanceHistoryService,
} = require("./advancePaymentService");

const advancePay = async (req, res) => {
  const companyId = req.user.companyId;
  const { employeeId, amount, reason, paymentDate } = req.body;
  const paymentInfo = {
    employeeId,
    amount,
    reason,
    paymentDate,
  };

  const advancePaid = await advancePayService(companyId, paymentInfo);

  res.status(201).json({
    success: true,
    message: "Advance payment successfull",
    paymentData: advancePaid,
  });
};

// fetch advance history
const advanceHistory = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;
    const { salaryPeriod } = req.query;

    const [startDate, endDate] = salaryPeriod.split(" - ");

    const advanceHistory = await advanceHistoryService(
      { startDate, endDate },
      companyId,
    );

    if (advanceHistory.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No advance history found",
        advanceHistory,
      });
    }

    res.status(200).json({
      success: true,
      message: "fetched advance history successfully",
      advanceHistory,
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = { advancePay, advanceHistory };
