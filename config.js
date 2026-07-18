const path = require("path");

module.exports = {
  port: process.env.PORT || 8000,
  secret: "SEC!@RET*(KEY",
  path: {
    controller: {
      index: path.resolve("./modules/controllers"),
      api: path.resolve("./modules/controllers/api"),
      web: path.resolve("./modules/controllers/web.js"),
    },
    validations: path.resolve("./modules/validations"),
    models: path.resolve("./modules/models"),
  },
};
