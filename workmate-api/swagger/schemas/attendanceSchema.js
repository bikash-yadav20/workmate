const attendanceSchema = {
  type: "object",
  required: [],

  properties: {
    companyId: {
      type: "integer",
      example: 1,
      description: "Foreign key linking attendance to company",
    },
    employeeId: {
      type: "integer",
      example: 1,
      description: "Foreign key linking attendance to its employee",
    },
    workDate: {
      type: "string",
      format: "date",
      example: "2026-09-19",
      description: "The date of marked attendance",
    },
    clockIn: {
      type: "string",
      format: "date-time",
      example: "2026-09-19T09:00:00Z",
      description: "The timestamp when attendance was marked",
    },
    clockOut: {
      type: "string",
      format: "date-time",
      example: "2026-09-19T09:00:00Z",
      description: "The timestamp when attendance was marked",
    },
  },
};
