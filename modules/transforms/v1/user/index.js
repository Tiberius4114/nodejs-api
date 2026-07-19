const Transform = require("../../transform");

const jwt = require("jsonwebtoken");

class UserTransform extends Transform {
  transform = (item, createToken = false) => {
    this.createToken = createToken;

    return {
      name: item.name,
      email: item.email,
      ...this.withToken(item),
    };
  };

  withToken = (item) => {
    if (item?.token?.accessToken && item?.token?.refreshToken) {
      return {
        token: {
          accessToken: item.token.accessToken,
          refreshToken: item.token.refreshToken,
        },
      };
    }

    if (this.createToken) {
      //we have two scret key for more security for accessToken and refreshToken
      const accessSecretKey = global.config.secret.accessToken;
      const refreshSecretKey = global.config.secret.refreshToken;

      const payload = { user_id: item._id };

      //create accessToken for short term token (e.g 15 minutes)
      const accessToken = jwt.sign(payload, accessSecretKey, {
        expiresIn: "15m",
      });

      //create refreshToken for long term token (e.g 7 days)
      const refreshToken = jwt.sign(payload, refreshSecretKey, {
        expiresIn: "7d",
      });

      return {
        token: {
          accessToken,
          refreshToken,
        },
      };
    }

    return {};
  };
}

module.exports = new UserTransform();
