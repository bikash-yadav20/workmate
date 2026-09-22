const companySchema = {
  type: "object",
  required: ["companyName", "companyEmail", "password", "companyAddress"],
  properties: {
    companyName: {
      type: "string",
      maxLength: 255,
      example: "Acme Corporation",
      description: "Official registered name of the company",
    },
    companyLogo: {
      type: "string",
      maxLength: 255,
      nullable: true,
      example: "https://example.com/logos/acme.png",
      description: "URL or image path to the company logo",
    },
    companyEmail: {
      type: "string",
      format: "email",
      maxLength: 100,
      example: "contact@acme.com",
      description: "Unique contact email address for the company",
    },
    password: {
      type: "string",
      format: "password",
      maxLength: 255,
      writeOnly: true, // Prevents password from showing up in response examples
      example: "StrongPassword123!",
      description: "Company account password",
    },
    companyAddress: {
      type: "string",
      maxLength: 255,
      example: "123 Tech Boulevard, Silicon Valley, CA 94025",
      description: "Physical address of the company",
    },
    salaryPeriodStartDate: {
      type: "integer",
      minLength: 1,
      maxLength: 28,
      example: 20,
      description: "Holds the salary cycle starting date of the company",
    },
  },
};

module.exports = companySchema;
