const advancePayment = {
  type: "object",
  required: ["amount", "paymentDate", "employeeId"],
  properties: {
    employeeId: {
      type: "integer",
      example: 1,
    },
    reason: {
      type: "string",
      example: "some reason",
    },

    amount: {
      type: "integer",
      example: 1000,
    },

    paymentDate: {
      type: "string",
      format: "date",
      example: "2026-09-21",
    },
  },
};

module.exports = advancePayment;
