const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Salary = sequelize.define("Salary", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Employees",
      key: "id",
    },
  },
  basicSalary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  providendFund: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  allowance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Salary;
