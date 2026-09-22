const { createHolidayService } = require("./holidayService");

const createHoliday = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    console.log(req.user);

    console.log("COmp id", companyId);

    const { reason, fromDate, toDate } = req.body;

    const holidayData = {
      reason,
      fromDate,
      toDate,
    };

    const newHoliday = await createHolidayService(companyId, holidayData);
    res.status(201).json({
      success: true,
      message: "Holiday created successfully",
      holiday: newHoliday,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { createHoliday };
