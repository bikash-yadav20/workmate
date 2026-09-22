const Holiday = require("./holidayModel");

//create a holiday for particular dates
const createHolidayService = async (companyId, holidayData) => {
  const { reason, fromDate, toDate } = holidayData;
  if (!reason || !fromDate || !toDate || !companyId) {
    const error = new Error("Complete holiday data or company id is requires");
    throw error;
  }

  const newHoliday = await Holiday.create({
    companyId,
    reason,
    fromDate,
    toDate,
  });

  return newHoliday;
};

module.exports = { createHolidayService };
