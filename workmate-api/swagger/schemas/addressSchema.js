const addressSchema = {
  type: "object",
  required: [
    "employeeId",
    "accountNumber",
    "ifscCode",
    "street",
    "city",
    "state",
    "country",
  ],

  properties: {
    employeeId: {
      type: "integer",
      description: "foreign key linking address to employee",
      example: 1,
    },
    accountNumber: {
      type: "string",
      description: "bank account number",
      example: "548754854784",
    },
    ifscCode: {
      type: "string",
      description: "IFSC code of employee bank",
      example: "FGSF548SS",
    },
    street: {
      type: "string",
      description: "street",
      example: "mall road, 123",
    },
    city: {
      type: "string",
      example: "pune",
    },
    state: {
      type: "string",
      example: "Maharastra",
    },
    country: {
      type: "string",
      example: "India",
    },
  },
};

module.exports = addressSchema;
