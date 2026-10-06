const authorize = (...userRole) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        status: false,
        message: "Authentication required: No user or role found",
      });
    }
    const hasPermission = userRole.includes(req.user.role);
    if (!hasPermission) {
      return res.status(401).json({
        success: false,
        message: "Forbidden: You do not have permission to perform this action",
      });
    }

    next();
  };
};

module.exports = { authorize };
