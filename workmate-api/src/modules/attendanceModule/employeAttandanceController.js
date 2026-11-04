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

// Fetch todays attendance status for self
const todayAttendanceStatus = async (req, res, next) => {
  try {
    //today date
    const today = new Date().toISOString().slice(0, 10);
    const { companyId, employeeId } = req.user;
    const attendance = await Attendance.findOne({
      where: {
        companyId,
        employeeId,
        workDate: today,
      },
    });

    if (!attendance) {
      return res.status(200).json({
        success: true,
        message: "No record found",
        attendance,
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance status fetched successfully",
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { clockInHandler, clockOutHandler, todayAttendanceStatus };
