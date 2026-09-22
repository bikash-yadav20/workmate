const holidaySchema = {
  type: "object",
  required: [""],

  properties: {
    reason: {
      type: "string",
      example: "casual holiday",
      description: "Reason for the holiday",
    },

    fromDate: {
      type: "string",
      format: "date",
      example: "2026-09-25",
      description: "Start date of a holiday",
    },
    toDate: {
      type: "string",
      format: "date",
      example: "2026-09-28",
      description: "End date of a holiday",
    },
  },
};

module.exports = holidaySchema;
