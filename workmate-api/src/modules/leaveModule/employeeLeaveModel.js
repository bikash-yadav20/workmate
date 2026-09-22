const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");

const EmployeeLeave = sequelize.define(
  "EmployeeLeave",
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
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id",
      },
    },

    reason: {
      type: DataTypes.TEXT,
    },

    type: {
      type: DataTypes.ENUM("paid", "unpaid"),
      allowNull: false,
    },

    fromDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    toDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
  },
  {
    indexes: [
      {
        name: "idx_tenant_employee_leave",
        fields: ["companyId", "employeeId"],
      },
      {
        name: "idx_tenant_leave_dates",
        fields: ["companyId", "fromDate", "toDate"],
      },
    ],
  },
);

module.exports = EmployeeLeave;
