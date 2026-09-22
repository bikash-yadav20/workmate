const companyService = require("./companyService");

const createCompany = async (req, res) => {
  try {
    const { companyData, adminData } = req.body;

    if (!companyData || !adminData) {
      return res.status(400).json({
        success: false,
        message: "Both companyData and adminEmployeeData are required.",
      });
    }
    const company = await companyService.createCompany(companyData, adminData);

    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (error) {
    const statusCode = error.message.includes("already exist") ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createCompany };
