const employeeService = require("./employeeService");
const jwt = require("jsonwebtoken");

const createEmployee = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is missing from user authentication context",
      });
    }
    const employee = await employeeService.createEmployee({
      ...req.body,
      companyId,
    });

    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//fetch all employees
const fetchEmployees = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is missing from user authentication context",
      });
    }
    const employees = await employeeService.fetchEmployees(companyId);

    if (employees.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No employees found",
        employees: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      employees: employees,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//fetch single employee by id;
const fetchSingleEmployee = async (req, res) => {
  try {
    console.log("params data", req.params);
    const companyId = req.user.companyId;
    const { id } = req.params;

    const employee = await employeeService.fetchSingleEmployee(id, companyId);
    console.log("I am employee", employee);

    if (!employee) {
      return res.status(200).json({
        success: true,
        message: "Employee not found",
        employee: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      employee: employee,
    });
  } catch (error) {
    console.error(error?.message || "Invalid request employee not found");
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
module.exports = { createEmployee, fetchEmployees, fetchSingleEmployee };
