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
    if (item.token) {
      return { token: item.token };
    }

    if (this.createToken) {
      const secretKey = global.config.secret;

      const payload = { user_id: item._id };

      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

      return { token };
    }

    return {};
  };
}

module.exports = new UserTransform();
