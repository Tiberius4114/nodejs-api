const jwt = require("jsonwebtoken");

const User = require(`${config.path.models}/User`);

module.exports = async (req, res, next) => {
  // const authorization = req.headers?.["authorization"];
  //or
  const authorization = req.get("authorization");

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is required",
    });
  }

  const [scheme, token, extra] = authorization.trim().split(/\s+/);

  if (scheme?.toLowerCase() !== "bearer" || !token || extra) {
    return res.status(401).json({
      success: false,
      message: "Use Authorization: Bearer <token>",
    });
  }

  try {
    const decoded = jwt.verify(token, global.config.secret.accessToken);

    // if (!decoded) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Failed to authenticate token.",
    //   });
    // }

    let user = await User.findById(decoded.user_id)
      .populate("avatar")
      .populate("roles")
      .lean();

    console.log(user, "USER");

    if (user) {
      req.user = { ...user };
      next();
      return;
    } else {
      return res.status(422).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
