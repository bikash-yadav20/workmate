const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const EmployeeAddress = sequelize.define(
  "EmployeeAddress",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Companies",
        key: "id",
      },
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Employees",
        key: "id",
      },
    },

    accountNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    ifscCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    street: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["companyId", "accountNumber"],
      },
      {
        unique: true,
        fields: ["companyId", "employeeId"],
      },
    ],
  },
);

module.exports = EmployeeAddress;
