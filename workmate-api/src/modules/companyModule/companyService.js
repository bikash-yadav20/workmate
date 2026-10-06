const Company = require("./companyModel");
const { createEmployee } = require("../employeeModule/employeeService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../../config/db");

const createCompany = async (companyData, adminData) => {
  if (!companyData) throw new Error("Company data is required");
  if (!adminData) throw new Error("Admin details is required");

  const requiredField = [
    "companyName",
    "companyEmail",
    "companyAddress",
    "salaryPeriodStartDate",
  ];

  for (const field of requiredField) {
    if (!companyData[field]) {
      throw new Error(`${field} is required in company step`);
    }
  }

  return await sequelize.transaction(async (t) => {
    const existingCompany = await Company.findOne({
      where: { companyEmail: companyData.companyEmail },
      transaction: t,
    });
    if (existingCompany)
      throw new Error("A Company already exists with this email address");

    //hashing company password
    const companyHashPassword = await bcrypt.hash(companyData.password, 10);

    const newCompany = await Company.create(
      {
        ...companyData,
        password: companyHashPassword,
      },
      {
        transaction: t,
      },
    );

    //create a admin employee
    const adminEmployee = await createEmployee(
      {
        ...adminData,
        companyId: newCompany.id,
        role: adminData.role || "admin",
      },
      {
        transaction: t,
      },
    );

    let companyResponse = newCompany.toJSON();
    delete companyResponse.password;
    return {
      company: companyResponse,
      adminEmployee: adminEmployee,
    };
  });
};

module.exports = { createCompany };
