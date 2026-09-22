const authorize = (...userRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.rol) {
      return res.status(401).json({
        status: false,
        message: "No role or user found",
      });
    }
    const hasPermissiom = userRole.includes(req.user.role);
    if (!hasPermissiom) {
      return res.status(401).json({
        success: false,
        message: "unathorized access",
      });
    }

    next();
  };
};

module.exports = { authorize };
