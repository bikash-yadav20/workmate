const employeeSchema = {
  type: "object",
  required: [
    "employeeId",
    "firstName",
    "lastName",
    "email",
    "password",
    "companyId",
  ],
  properties: {
    companyId: {
      type: "integer",
      example: 1,
      description: "Foreign key linking employee to their company",
    },
    employeeId: {
      type: "string",
      example: "nishant1",
      description: "Employee unique id",
    },
    fullName: {
      type: "string",
      maxLength: 100,
      example: "John",
      description: "First name of the employee",
    },

    profilePicture: {
      type: "string",
      maxLength: 300,
      example: "www.profilepic.com",
      description: "profile picture of the employee",
    },

    email: {
      type: "string",
      format: "email",
      maxLength: 100,
      example: "john.doe@acme.com",
      description: "Unique corporate email address of the employee",
    },

    phone: {
      type: "string",
      maxLength: 25,
      example: "9487516487",
      description: "phone number of the employee",
    },
    password: {
      type: "string",
      format: "password",
      maxLength: 255,
      example: "123456",
      description: "Employee login password",
    },
    role: {
      type: "string",
      enum: ["Admin", "Manager", "Employee"],
      default: "Employee",
      example: "Admin",
      description: "Access control role assigned to the employee",
    },
    department: {
      type: "string",
      maxLength: 100,
      nullable: true,
      example: "Engineering",
      description: "Department the employee belongs to",
    },

    status: {
      type: "string",
      enum: ["active", "exited"],
      example: "active",
      description: "stores employees status",
    },
  },
};

module.exports = employeeSchema;
