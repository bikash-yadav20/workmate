const salarySchema = {
  type: "object",
  required: ["employeeId", "basicSalary", "providentFund", "allowance"],

  properties: {
    employeeId: {
      type: "integer",
      description: "Fooreign key linking salary to its employee",
      example: 1,
    },
    basicSalary: {
      type: "integer",
      description: "Salary of the employee",
      example: 25000,
    },
    providendFund: {
      type: "integer",
      example: 1000,
    },
    allowance: {
      type: "integer",
      example: 3000,
    },
  },
};

module.exports = salarySchema;
