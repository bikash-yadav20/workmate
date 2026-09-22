const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const AdvancePayment = sequelize.define("AdvancePayment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Employees",
      key: "id",
    },
  },
  advanceAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING(200),
  },
  paymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = AdvancePayment;
