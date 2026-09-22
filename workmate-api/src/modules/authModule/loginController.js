const loginService = require("./loginService");

const login = async (req, res) => {
  try {
    const { password, email, employeeId } = req.body;

    // Validate presence of required fields
    if (!password || (!email && !employeeId)) {
      return res.status(400).json({
        success: false,
        message: "Password and either email or employeeId are required.",
      });
    }
    const loginUser = await loginService.login({
      password: password,
      identifier: email || employeeId,
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

module.exports = { login };
