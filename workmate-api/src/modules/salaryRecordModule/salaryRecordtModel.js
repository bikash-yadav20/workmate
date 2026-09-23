const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const SalaryRecord = sequelize.define(
  "SalaryRecord",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Companies",
        key: "id",
      },
    },
    salaryPeriodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "SalaryPeriods",
        key: "id",
      },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id",
      },
    },

    basicSalary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    allowance: {
      type: DataTypes.DECIMAL(10, 2),
    },
    paidLeaveDays: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    unpaidLeaveDays: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lateDays: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 31,
      },
    },
    lateDeduction: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    advanceDeduction: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    absentDeduction: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    providendFund: {
      type: DataTypes.DECIMAL(10, 2),
    },
    totalDeductions: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    netSalary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    indexes: [
      {
        name: "idx_tenant_salary_record",
        fields: ["companyId", "employeeId"],
      },
      {
        name: "unique_period_employee",
        unique: true,
        fields: ["salaryPeriodId", "employeeId"],
      },
    ],
  },
);

module.exports = SalaryRecord;
