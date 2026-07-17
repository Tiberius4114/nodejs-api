const Transform = require("../../transform");

class UserTransform extends Transform {
  transform(item) {
    return {
      name: item.name,
      email: item.email,
    };
  }
}

module.exports = new UserTransform();
