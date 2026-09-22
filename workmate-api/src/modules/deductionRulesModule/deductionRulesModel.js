const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const DeductionRule = sequelize.define("DeductionRule", {
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
  type: {
    type: DataTypes.ENUM("late", "absent"),
  },

  percentage: {
    type: DataTypes.TINYINT,
    validate: {
      min: 1,
      max: 100,
    },
  },
  mode: {
    type: DataTypes.ENUM("daily", "monthly"),
  },
});

module.exports = DeductionRule;
