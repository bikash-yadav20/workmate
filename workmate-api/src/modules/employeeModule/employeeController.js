const Employee = require("./employeeModel");
const Company = require("../companyModule/companyModel");

// get self data (fullname, username, profile picture)
const selfInfo = async (req, res) => {
  try {
    const { companyId, employeeId } = req.user;

    if (!companyId || !employeeId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access! Missing credentials",
      });
    }

    const selfData = await Employee.findOne({
      where: { companyId, id: employeeId },

      attributes: ["companyId", "fullName", "email", "phone", "profilePicture"],
      include: [
        {
          model: Company,
          as: "company",
        },
      ],
    });

    if (!selfData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: selfData,
    });
  } catch (error) {
    console.error("Error fetching self info:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { selfInfo };
