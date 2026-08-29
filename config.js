const path = require("path");

module.exports = {
  port: process.env.PORT || 8000,
  secret: {
    accessToken: "NMNCPAP)@@!#U*&",
    refreshToken: "#JKNFK@!@!#@#!",
  },
  path: {
    controller: {
      index: path.resolve("./modules/controllers"),
      api: path.resolve("./modules/controllers/api"),
      web: path.resolve("./modules/controllers/web.js"),
    },
    transforms: path.resolve("./modules/transforms"),

    validations: path.resolve("./modules/validations"),
    models: path.resolve("./modules/models"),
    middlewares: path.resolve("./middlewares"),
    utils: path.resolve("./utils"),
  },
};
