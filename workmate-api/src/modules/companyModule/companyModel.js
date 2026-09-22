const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  companyLogo: {
    type: DataTypes.STRING(255),
  },

  companyEmail: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  companyAddress: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  salaryPeriodStartDate: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 28,
    },
  },
});

module.exports = Company;
