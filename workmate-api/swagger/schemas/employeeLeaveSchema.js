const employeeLeaveSchema = {
  type: "object",
  required: [""],
  properties: {
    leaveId: {
      type: "integer",
      example: 1,
      description: "Primary key",
    },
    companyId: {
      type: "integer",
      example: 1,
      description: "Foreign key linking a leave to its company",
    },
    employeeId: {
      type: "integer",
      example: 1,
      description: "Foreign key linking a leave to its employee",
    },

    reason: {
      type: "string",
      example: "Family function",
    },

    type: {
      type: "string",
      example: "paid",
    },

    fromDate: {
      type: "date",
      example: "2026-09-20",
    },

    toDate: {
      type: "date",
      example: "2026-09-26",
    },

    status: {
      type: "string",
      example: "pending",
    },
  },
};

module.exports = employeeLeaveSchema;
