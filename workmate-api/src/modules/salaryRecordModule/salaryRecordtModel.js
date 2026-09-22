const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const SalaryRecord = sequelize.define("SalaryRecord", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    type: DataTypes.INTEGER,
    allowNull: false,
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
});

module.exports = SalaryRecord;
