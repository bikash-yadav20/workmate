const { Op } = require("sequelize");
const EmployeeLeave = require("./employeeLeaveModel");

// apply for leave(Employee)
const applyLeave = async (leaveData) => {
  const { companyId, employeeId, reason, type, fromDate, toDate } = leaveData;
  if ((!companyId, !employeeId, !type, !fromDate, !toDate)) {
    throw new Error("Leave fields can't be empty");
  }

  //   check if there is allready a leave in process
  const overlappingLeave = await EmployeeLeave.findOne({
    where: {
      companyId,
      employeeId,
      status: { [Op.ne]: "rejected" },
      [Op.or]: [
        {
          fromDate: { [Op.between]: [fromDate, toDate] },
        },
        {
          toDate: { [Op.between]: [fromDate, toDate] },
        },
        {
          [Op.and]: [
            { fromDate: { [Op.lte]: fromDate } },
            { toDate: { [Op.gte]: toDate } },
          ],
        },
      ],
    },
  });

  if (overlappingLeave)
    throw new Error(
      "You already have an active or pending leave request in this date range.",
    );

  const newLeave = await EmployeeLeave.create({
    companyId,
    employeeId,
    reason,
    type,
    fromDate,
    toDate,
    status: "pending",
  });
  console.log("leave", newLeave);

  if (!newLeave) throw new Error("Failed to apply for leave");

  return newLeave;
};

//change leave type(Employee)
const changeLeavetype = async (incomingTypeData) => {
  const { companyId, employeeId, leaveId, type } = incomingTypeData;

  const updatedLeave = await EmployeeLeave.findOne({
    where: {
      companyId: companyId,
      employeeId: employeeId,
      id: leaveId,
    },
  });

  if (!updatedLeave) throw new Error("Leave not found");

  updatedLeave.type = type;
  await updatedLeave.save();

  return updatedLeave;
};

//withdraw a leave request(employee)
const withdrawLeaveService = async (incomingLeaveData) => {
  const { companyId, employeeId, leaveId } = incomingLeaveData;

  const deletedLeave = await EmployeeLeave.destroy({
    where: {
      companyId: companyId,
      employeeId: employeeId,
      id: leaveId,
    },
  });

  if (!deletedLeave) throw new Error("Failed to withdraw leave");

  return deletedLeave;
};

const leaveAdminService = {
  //Approve or reject a employee leave
  async leaveStatus(status, toApproveLeaveData) {
    const { companyId, employeeId, leaveId } = toApproveLeaveData;
    if (!companyId || !employeeId || !leaveId) {
      const error = new Error("Employees leave data required");
      error.statusCode = 400;
      throw error;
    }

    const activeLeave = await EmployeeLeave.findOne({
      where: {
        companyId,
        id: leaveId,
        employeeId,
      },
    });

    if (!activeLeave) {
      const error = new Error("No active leave found");
      error.statusCode = 400;
      throw error;
    }

    if (status === "approve") {
      activeLeave.status = "approved";
      return {
        newLeaveStatus: await activeLeave.save(),
        message: "Leave accepted successfully",
      };
    }
    if (status === "reject") {
      activeLeave.status = "rejected";
      return {
        newLeaveStatus: await activeLeave.save(),
        message: "Leave rejected successfully",
      };
    }
  },
};

module.exports = {
  applyLeave,
  changeLeavetype,
  withdrawLeaveService,
  leaveAdminService,
};
