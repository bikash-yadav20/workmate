process.env.TZ = "Asia/Kolkata";
const app = require("./app");
const { initSalaryPeriodCron } = require("./cronJobs/salaryPeriodCron");
const { sequelize } = require("./modules/index");

//server connection
PORT = process.env.PORT;

//database connestion
const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");

    await sequelize.sync({ force: true });
    console.log("Database synced successfully");

    //calling cron job for creating salary period
    initSalaryPeriodCron();
    console.log("cron background task initialized");

    app.listen(PORT, () => {
      console.log("Server is running on port: ", PORT);
    });
  } catch (error) {
    console.log("connection failed", error);
    process.exit(1);
  }
};

connectDb();
