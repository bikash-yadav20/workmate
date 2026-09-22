const salaryPeriod = {
  type: "object",
  required: ["year", "month", "startDate", "endtDate", "status"],
  properties: {
    companyId: {
      type: "integer",
      example: 1,
      description: "Foreign key linking salary perid to its company",
    },

    year: {
      type: "integer",
      example: 2026,
      description: "Year in which the period starts",
    },
    month: {
      type: "integer",
      example: 9,
      description: "month in which the period starts",
    },

    startDate: {
      type: "date",
      example: "2026-09-16",
      description: "Start date of a period",
    },
    endtDate: {
      type: "date",
      example: "2026-10-15",
      description: "End date of a period",
    },

    status: {
      type: "string",
      example: "draft",
      description: "Status if the salary paid or not",
    },
  },
};

module.exports = salaryPeriod;
