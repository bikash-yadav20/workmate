const { advancePayService } = require("./advancePaymentService");

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

module.exports = { advancePay };
