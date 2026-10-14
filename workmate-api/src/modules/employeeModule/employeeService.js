const Employee = require("./employeeModel");
const EmployeeAddress = require("../addressModule/employeeAddressModel");
const Salary = require("../salaryModule/salaryModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../../config/db");

const createEmployee = async (employeeData, options = {}) => {
  const { transaction } = options;
  if (!employeeData) throw new Error("Please provide employee details");

  const executeCreate = async (t) => {
    const { password, companyId, address, ...restEmployeeData } = employeeData;

    if (!password) {
      const statusCode = 400;
      const error = new Error("Password is required");
      error.statusCode = 400;
      throw error;
    }

    //encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    const formattedAddress = address ? { ...address, companyId } : undefined;

    const employee = await Employee.create(
      {
        companyId,
        password: hashPassword,
        ...restEmployeeData,
        ...(formattedAddress && { address: formattedAddress }),
      },
      {
        include: [
          { model: EmployeeAddress, as: "address" },
          { model: Salary, as: "salary" },
        ],
        transaction: t,
      },
    );
    const response = employee.toJSON();
    delete response.password;
    return response;
  };
  //if service is called with a transaction while creating company use the option
  if (transaction) {
    return await executeCreate(transaction);
  } else {
    return await sequelize.transaction(async (t) => {
      return await executeCreate(t);
    });
  }
};

//fetch all employees with their address and salary
const fetchEmployees = async (companyId) => {
  const employees = await Employee.findAll({
    where: { companyId: companyId },
    attributes: { exclude: ["password"] },
    include: [
      { model: Salary, as: "salary" },
      { model: EmployeeAddress, as: "address" },
    ],
  });
  return employees;
};

// fetch employee by id
const fetchSingleEmployee = async (employeeId, companyId) => {
  if (!employeeId || companyId)
    throw new Error("Employee id and company id is required");
  const employee = await Employee.findOne({
    where: {
      id: employeeId,
      companyId: companyId,
    },
    attributes: { exclude: ["password"] },
    include: [
      { model: Salary, as: "salary" },
      { model: EmployeeAddress, as: "address" },
    ],
  });
  return employee;
};

module.exports = { createEmployee, fetchEmployees, fetchSingleEmployee };
