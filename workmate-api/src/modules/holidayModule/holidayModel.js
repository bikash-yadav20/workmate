const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Holiday = sequelize.define("Holiday", {
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

  reason: {
    type: DataTypes.STRING(100),
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
});

module.exports = Holiday;
