const loginSchema = {
  type: "object",
  required: ["password", "email" || "employeeId"],
  properties: {
    email: {
      type: "string",
      format: "email",
      example: "john.doe@acme.com",
      description:
        "Employee corporate email address (required if employeeId is not provided)",
    },
    employeeId: {
      type: "string",
      example: "EMP-1002", // or 1042
      description: "Employee unique ID (required if email is not provided)",
    },
    password: {
      type: "string",
      format: "password",
      example: "EmployeePassword123!",
      description: "User account password",
    },
  },
  example: {
    email: "john.doe@acme.com",
    password: "EmployeePassword123!",
  },
};

module.exports = loginSchema;
