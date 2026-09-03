module.exports = async (...requiredPermissions) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "احراز هویت انجام نشده است.",
      });
    }

    if (!Array.isArray(user.roles)) {
      return res.status(403).json({
        success: false,
        message: "هیچ نقشی برای کاربر تعریف نشده است.",
      });
    }

    if (requiredPermissions.length === 0) {
      return res.status(500).json({
        success: false,
        message: "هیچ پرمیشنی برای این مسیر تعریف نشده است.",
      });
    }

    //collect all user permissions
    const userPermissions = user.roles.flatMap(
      (role) => role.permissions || []
    );

    //to check user is superadmin
    const hasFullAccess = userPermissions.includes("*");

    const isAllowed =
      hasFullAccess ||
      requiredPermissions.every((perm) => {
        return userPermissions.includes(perm);
      });

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "you dont have permission to do this action",
      });
    }

    next();
  };
};
