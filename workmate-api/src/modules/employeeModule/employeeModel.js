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
      allowNull: false, // Added to prevent null company references
      references: {
        model: "Companies",
        key: "id",
      },
      validate: {
        notNull: { msg: "Company ID is required." },
      },
    },

    employeeId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      set(value) {
        // Turns empty strings "" or spaces into null so allowNull catches it
        this.setDataValue(
          "employeeId",
          value && value.trim() !== "" ? value.trim() : null,
        );
      },
      validate: {
        notNull: { msg: "Employee ID is required." },
        notEmpty: { msg: "Employee ID cannot be empty." },
      },
    },

    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(value) {
        this.setDataValue("fullName", value ? value.trim() : null);
      },
      validate: {
        notNull: { msg: "Full name is required." },
        notEmpty: { msg: "Full name cannot be empty." },
      },
    },

    profilePicture: {
      type: DataTypes.STRING(255),
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set(value) {
        this.setDataValue("email", value ? value.trim().toLowerCase() : null);
      },
      validate: {
        notNull: { msg: "Email is required." },
        notEmpty: { msg: "Email cannot be empty." },
        isEmail: { msg: "Please provide a valid email address." },
      },
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
      set(value) {
        this.setDataValue("phone", value ? value.trim() : null);
      },
      validate: {
        notNull: { msg: "Phone number is required." },
        notEmpty: { msg: "Phone number cannot be empty." },
      },
    },

    password: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required." },
        notEmpty: { msg: "Password cannot be empty." },
      },
    },

    role: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notNull: { msg: "Role is required." },
      },
    },

    department: {
      type: DataTypes.STRING(30),
      allowNull: false,
      set(value) {
        this.setDataValue("department", value ? value.trim() : null);
      },
      validate: {
        notNull: { msg: "Department is required." },
        notEmpty: { msg: "Department cannot be empty." },
      },
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
        name: "idx_company_employee_id",
        fields: ["companyId", "employeeId"],
      },
      {
        unique: true,
        name: "idx_company_phone",
        fields: ["companyId", "phone"],
      },
      {
        unique: true,
        name: "idx_company_email",
        fields: ["companyId", "email"],
      },
    ],
  },
);

module.exports = Employee;
