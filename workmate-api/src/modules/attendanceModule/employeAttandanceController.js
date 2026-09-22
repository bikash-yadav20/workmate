const Attendance = require("./attendanceModel");
const { attendanceService } = require("./attendanceService");

const clockInHandler = async (req, res) => {
  try {
    const { companyId, employeeId } = req.user;
    const clockIn = await attendanceService.clockIn(companyId, employeeId);
    res.status(201).json({
      success: true,
      message: "Attendance marked",
      attendance: clockIn,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to mark attendance, internal server error",
      error: error.message,
    });
  }
};

const clockOutHandler = async (req, res) => {
  try {
    const { companyId, employeeId } = req.user;
    const clockOut = await attendanceService.clockOut(companyId, employeeId);
    res.status(201).json({
      success: true,
      message: "clock out success",
      attendance: clockOut,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to clock out, internal server error",
      error: error.message,
    });
  }
};

module.exports = { clockInHandler, clockOutHandler };
