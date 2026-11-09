const { Op } = require("sequelize");
const Employee = require("../employeeModule/employeeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (credentials) => {
  if (!credentials || !credentials.password || !credentials.identifier) {
    throw new Error("Please provide login credentials");
  }

  const { password, identifier } = credentials;

  const user = await Employee.findOne({
    where: {
      [Op.or]: [{ email: identifier }, { employeeId: identifier }],
    },
  });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  //jwt authentication
  const token = jwt.sign(
    {
      companyId: user.companyId,
      employeeId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "24h",
    },
  );

  return {
    user: user,
    token: token,
  };
};

module.exports = { login };
