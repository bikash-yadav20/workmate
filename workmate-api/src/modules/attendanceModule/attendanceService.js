const Attendance = require("./attendanceModel");

const attendanceService = {
  async clockIn(companyId, employeeId) {
    const now = new Date();
    const workDate = now.toLocaleDateString("en-CA");

    const activeAttendance = await Attendance.findOne({
      where: {
        companyId,
        employeeId,
        workDate,
      },
    });

    //case 1: clockIn done but clock out pending
    if (activeAttendance) {
      if (!activeAttendance.clockOut) {
        const error = new Error("Already cloked in");
        error.statusCode = 400;
        throw error;
      }
      //case 2: both clockIn and clockOut completed
      const error = new Error("Attendance already marked");
      error.statusCode = 400;
      throw error;
    }

    return await Attendance.create({
      companyId,
      employeeId,
      workDate,
      clockIn: now,
    });
  },

  //clock out
  async clockOut(companyId, employeeId) {
    const now = new Date();
    const activeAttendance = await Attendance.findOne({
      where: {
        companyId,
        employeeId,
        clockOut: null,
      },
      order: [["clockOut", "DESC"]],
    });

    if (!activeAttendance) {
      const error = new Error(
        "No active clock-in session found. You need to clock in first.",
      );
      error.statusCode = 400;
      throw error;
    }
    activeAttendance.clockOut = now;
    return await activeAttendance.save();
  },
};

module.exports = { attendanceService };
