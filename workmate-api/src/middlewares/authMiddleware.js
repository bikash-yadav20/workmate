const jwt = require("jsonwebtoken");

const protectAuth = (req, res, next) => {
  const token = req.cookies.workmate;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Access denined, token not provide",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = { protectAuth };
