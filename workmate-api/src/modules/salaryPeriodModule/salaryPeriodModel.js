const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../../config/db");

const SalaryPeriod = sequelize.define("SalaryPeriod", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  companyId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: "Companies",
      key: "id",
    },
  },
  year: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  month: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("draft", "processing", "paid"),
    allowNull: "false",
  },
});

module.exports = SalaryPeriod;
