const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Attendance = sequelize.define(
  "Attendance",
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
    workDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    clockIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clockOut: {
      type: DataTypes.DATE,
    },
  },
  {
    indexes: [
      {
        name: "idx_tenant_employee_attendance",
        fields: ["companyId", "employeeId"],
      },
      {
        name: "idx_tenant_attendance_date",
        fields: ["companyId", "workDate"],
      },
    ],
  },
);

module.exports = Attendance;
