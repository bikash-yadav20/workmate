const Attendance = require("./attendanceModel");
const { dailyAttendanceAndLeaveService } = require("./attendanceService");

//present employees count
const dailyPresentCount = async (req, res) => {
  try {
    const todayDate = new Date().toISOString().split("T")[0];

    const companyId = req.user.companyId;
    const attendanceCount = await Attendance.count({
      where: { companyId: companyId, workDate: todayDate },
    });

    res.status(201).json({
      success: true,
      message: "Present employees count fetched successgully",
      attendanceCount,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.mesage,
    });
  }
};

//get daily logs of attendance and leave for dashboard
const attendanceLeaveLogs = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    const dailyLogs = await dailyAttendanceAndLeaveService(companyId);

    res.status(200).json({
      success: true,
      messsage: "Success",
      dashboardData: dailyLogs,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance logs! Internal server error",
      error: error.message,
    });
  }
};

module.exports = { dailyPresentCount, attendanceLeaveLogs };
