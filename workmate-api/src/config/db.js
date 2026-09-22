const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    timezone: "+05:30",
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  },
);

module.exports = sequelize;
