const cron = require("node-cron");
const { getCurrentPeriodContext } = require("../utils/salaryPeriodDate");
const {
  SalaryPeriodService,
} = require("../modules/salaryPeriodModule/salaryPeriodService");

const initSalaryPeriodCron = () => {
  cron.schedule(
    "0 0 * * *", //runs every midnight
    async () => {
      console.log("Running daily salary period generation cron job");
      try {
        const { currentYear, currentMonth } = getCurrentPeriodContext();

        // directly calling generateSalaryPeriods to avoid auth token
        const service = new SalaryPeriodService();
        const result = await service.generateSalaryPeriods(
          currentYear,
          currentMonth,
        );
        console.log(
          `Salary Period Cron Completed: Created ${result.created}, Skipped ${result.skipped}`,
        );
      } catch (error) {
        console.error("Error running Salary Period Cron Job:", error.message);
      }
    },

    {
      timezone: "Asia/Kolkata",
    },
  );
};

module.exports = { initSalaryPeriodCron };
