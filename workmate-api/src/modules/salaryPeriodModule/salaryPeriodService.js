const Company = require("../companyModule/companyModel");
const SalaryPeriod = require("./salaryPeriodModel");

class SalaryPeriodService {
  // calculate the start and end date for the period
  #calculatePeriodDates(year, month, payCycleStartDate) {
    const monthIndex = month - 1;

    const startDate = new Date(year, monthIndex, payCycleStartDate);
    const endDate = new Date(year, monthIndex + 1, payCycleStartDate - 1);

    return { startDate, endDate };
  }

  async generateSalaryPeriods(year, month) {
    if (!year || !month) throw new Error("Year and month is required");
    const todayDate = new Date().getDate();
    const companies = await Company.findAll({
      where: { salaryPeriodStartDate: todayDate },
    });
    const result = { created: 0, skipped: 0 };

    for (const company of companies) {
      const { startDate, endDate } = this.#calculatePeriodDates(
        year,
        month,
        company.salaryPeriodStartDate,
      );
      const [period, created] = await SalaryPeriod.findOrCreate({
        //looking if the row already exists
        where: {
          companyId: company.id,
          month: month,
          year: year,
        },

        //create a new row if there isn't any
        defaults: {
          companyId: company.id,
          year: year,
          month: month, // human month 1-12
          startDate: startDate,
          endDate: endDate,
          status: "draft",
        },
      });
      // update result count
      if (created) result.created++;
      else result.skipped++;
    }
    return result;
  }
}

module.exports = { SalaryPeriodService };
