const authService = require("./authService");

const login = async (req, res, next) => {
  try {
    const { password, identifier } = req.body;

    // Validate presence of required fields
    if (!password || !identifier) {
      return res.status(400).json({
        success: false,
        message: "Password and either email or employeeId are required.",
      });
    }
    const loginUser = await authService.login({
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
    next(error);
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

// logout employee
const logout = async (req, res, next) => {
  try {
    res.clearCookie("workmate", {
      secure: false,
      sameSite: "lax",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = { login, logout, authMe };
