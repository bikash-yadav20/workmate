const {
  applyLeave: applyLeaveService,
  changeLeavetype: updateLeaveType,
  withdrawLeaveService,
} = require("./leaveService");

const applyLeave = async (req, res) => {
  try {
    const employeeId = req.user.employeeId;
    const companyId = req.user.companyId;
    const leaveData = {
      ...req.body,
      employeeId,
      companyId,
    };

    const newLeave = await applyLeaveService(leaveData);
    res.status(201).json({
      success: true,
      message: "Leave applied",
      leave: newLeave,
    });
  } catch (error) {
    console.error("server error", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error, failed to create leave",
    });
  }
};

// change leave type(employee)
const changeLeavetype = async (req, res) => {
  try {
    const employeeId = req.user.employeeId;
    const companyId = req.user.companyId;

    const newTypeData = {
      ...req.body,
      employeeId,
      companyId,
    };
    console.log(newTypeData);

    const updatedLeave = await updateLeaveType(newTypeData);
    res.status(200).json({
      success: true,
      message: "Leave type updated successfully",
      updatedLeave,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update leave type, Internal server error",
      error: error.message,
    });
  }
};

//withdraw a leave request(employee)
const withdrawLeave = async (req, res) => {
  const leaveToWithdraw = {
    leaveId: req.params.leaveId,
    companyId: req.user.companyId,
    employeeId: req.user.employeeId,
  };
  try {
    await withdrawLeaveService(leaveToWithdraw);
    res.status(200).json({
      success: true,
      message: "Leave withdrawn successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to withdraw leave, due to internal server error",
      error: error.message,
    });
  }
};

module.exports = { applyLeave, changeLeavetype, withdrawLeave };
