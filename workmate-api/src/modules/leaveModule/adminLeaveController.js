const { leaveAdminService, fetchLeavesService } = require("./leaveService");

//approve or reject a leave
const leaveStatusUpdate = async (req, res) => {
  try {
    const companyId = req.user?.companyId;
    const { employeeId, leaveId, status } = req.body;

    // 1. Check Authorization (with return!)
    if (!companyId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, Invalid Token!",
      });
    }

    // 2. Validate required body fields (with return!)
    if (!employeeId || !leaveId || !status) {
      return res.status(400).json({
        success: false,
        message: "employeeId, leaveId, and status are required fields.",
      });
    }

    const toApproveLeaveData = {
      companyId,
      employeeId,
      leaveId,
    };

    // 3. Call service
    const result = await leaveAdminService.leaveStatus(
      status,
      toApproveLeaveData,
    );

    // Safety check if service returns nothing
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found or could not be updated.",
      });
    }

    // 4. Send successful response
    return res.status(200).json({
      success: true,
      message: result.message || "Leave status updated successfully",
      newLeaveStatus: result.newLeaveStatus || status,
    });
  } catch (error) {
    console.error("Error in leaveStatusUpdate:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//fetch all leave from a salary period
const fetchAllLeaves = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const leaves = await fetchLeavesService(companyId);

    res.status(200).json({
      success: true,
      leaves,
      message: "Leaves fetched successfully",
    });
  } catch (error) {
    console.error(error.message);
    (res.status(500),
      json({
        success: false,
        error: error.message,
        message: "Internal server error",
      }));
  }
};

module.exports = { leaveStatusUpdate, fetchAllLeaves };
