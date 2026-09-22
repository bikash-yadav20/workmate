const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require("path");

const companySchema = require("./schemas/companySchema");
const employeeSchema = require("./schemas/employeeSchema");
const addressSchema = require("./schemas/addressSchema");
const loginSchema = require("./schemas/loginSchema");
const salarySchema = require("./schemas/salarySchema");
const salaryPeriod = require("./schemas/salaryPeriodSchema");
const employeeLeaveSchema = require("./schemas/employeeLeaveSchema");
const holidaySchema = require("./schemas/holidaySchema");
const advancePaymentSchema = require("./schemas/advancePaymentSchema");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Workmate API",
      version: "1.0.0",
      description: "API documentation for Employee & Company services",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "workmate",
        },
      },
      schemas: {
        Company: companySchema,
        Employee: employeeSchema,
        Salary: salarySchema,
        Address: addressSchema,
        LoginCreds: loginSchema,
        salaryPeriod: salaryPeriod,
        employeeLeave: employeeLeaveSchema,
        Holiday: holidaySchema,
        advancePayment: advancePaymentSchema,
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "paths/*yaml").replace(/\\/g, "/")],
};

const specs = swaggerJsDoc(options);
// console.log("Loaded swagger paths", Object.keys(specs.paths || {}));

module.exports = { swaggerUI, specs };
