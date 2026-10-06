const loginService = require("./loginService");

const login = async (req, res) => {
  try {
    const { password, identifier } = req.body;

    // Validate presence of required fields
    if (!password || !identifier) {
      return res.status(400).json({
        success: false,
        message: "Password and either email or employeeId are required.",
      });
    }
    const loginUser = await loginService.login({
      password: password,
      identifier: identifier,
    });

    res.cookie("workmate", loginUser.token, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      data: loginUser.user,
      message: "login successful",
      success: true,
    });
  } catch (error) {
    console.error("login failed", error);
    res.status(500).json({
      success: false,
      message: "login failed",
      error: error.message,
    });
  }
};

//get self data for frontend route validation
const authMe = async (req, res) => {
  try {
    const { companyId, employeeId, role, email } = req.user;

    return res.status(200).json({
      success: true,
      user: { companyId, employeeId, role, email },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { login, authMe };
