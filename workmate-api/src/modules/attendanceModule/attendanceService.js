const Attendance = require("./attendanceModel");
const Employee = require("../employeeModule/employeeModel");
const EmployeeLeave = require("../leaveModule/employeeLeaveModel");
const Company = require("../companyModule/companyModel");
const { Op } = require("sequelize");

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

  //case 2: clock out
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

const dailyAttendanceAndLeaveService = async (companyId) => {
  //today date
  const today = new Date().toISOString().slice(0, 10);

  //clockin grace period
  const company = await Company.findOne({
    where: {
      id: companyId,
    },
    attributes: ["gracePeriodMinutes"],
  });

  const graceMinue = company?.gracePeriodMinutes || 0;

  const SHIFT_START_TOTAL_MINUTES = 9 * 60 + graceMinue;

  const employees = await Employee.findAll({
    where: {
      companyId,
      status: "active",
    },
  });

  const attendanceLogs = await Attendance.findAll({
    where: {
      companyId,
      workDate: today,
    },
  });

  const leaves = await EmployeeLeave.findAll({
    where: {
      companyId,
      fromDate: { [Op.lte]: today },
      toDate: { [Op.gte]: today },
      status: "approved",
    },
  });

  //creating a attendance and leave lookup lookup map
  const attendanceMap = new Map(attendanceLogs.map((a) => [a.employeeId, a]));
  const leaveMap = new Map(leaves.map((l) => [l.employeeId, l]));

  //merge and calculate status dynamically
  const dashboardData = employees.map((emp) => {
    const attendance = attendanceMap.get(emp.id);
    const leave = leaveMap.get(emp.id);

    if (attendance && attendance.clockIn) {
      // Parse clockIn time to check if they are late
      const clockInDate = new Date(attendance.clockIn);
      const clockInTotalMinutes =
        clockInDate.getHours() * 60 + clockInDate.getMinutes();

      //check if passed the threshold
      const isLate = clockInTotalMinutes > SHIFT_START_TOTAL_MINUTES;

      // Format check-in time for UI display (e.g., "8:41 AM")
      const formattedCheckIn = clockInDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        employeeId: emp.employeeId,
        fullName: emp.fullName,
        role: emp.role,
        department: emp.department,
        status: isLate ? "Late" : "Present",
        checkIn: formattedCheckIn,
        avatar: emp.profilePicture,
      };
    } else if (leave) {
      return {
        employeeId: emp.employeeId,
        fullName: emp.fullName,
        role: emp.role,
        department: emp.department,
        status: "Leave",
        checkIn: "_",
        avatar: emp.profilePicture,
      };
    } else {
      return {
        employeeId: emp.employeeId,
        fullName: emp.fullName,
        role: emp.role,
        department: emp.department,
        status: "Absent",
        checkIn: "_",
        avatar: emp.profilePicture,
      };
    }
  });

  return dashboardData;
};

module.exports = { attendanceService, dailyAttendanceAndLeaveService };
