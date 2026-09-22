const { DataTypes, ENUM } = require("sequelize");
const sequelize = require("../../config/db");

const Employee = sequelize.define(
  "Employee",
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
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    profilePicture: {
      type: DataTypes.STRING(255),
    },

    email: {
      type: DataTypes.STRING(255),
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("admin", "employee"),
      allowNull: false,
    },

    department: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    status: {
      type: ENUM("active", "exited"),
      defaultValue: "active",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["companyId", "employeeId"],
      },

      {
        unique: true,
        fields: ["companyId", "phone"],
      },
      {
        unique: true,
        fields: ["companyId", "email"],
      },
    ],
  },
);

module.exports = Employee;
