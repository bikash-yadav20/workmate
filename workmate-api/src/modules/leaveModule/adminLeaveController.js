const { leaveAdminService } = require("./leaveService");

const leaveStatusUpdate = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { employeeId, leaveId, status } = req.body;
    const toApproveLeaveData = {
      companyId,
      employeeId,
      leaveId,
    };
    if (!companyId) {
      res.status(401).json({
        success: false,
        message: "Unathorized, Invalid Token!",
      });
    }

    if (!toApproveLeaveData) {
      res.status(400).json({
        success: false,
        message: "employee's leave data is required",
      });
    }

    const newStatus = await leaveAdminService.leaveStatus(
      status,
      toApproveLeaveData,
    );

    res.status(200).json({
      success: true,
      message: newStatus.message,
      newLeaveStatus: newStatus.newLeaveStatus,
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

module.exports = { leaveStatusUpdate };
