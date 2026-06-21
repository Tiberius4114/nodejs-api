const path = require("path");

module.exports = {
  port: process.env.PORT || 8000,
  path: {
    controller: {
      index: path.resolve("./modules/controllers"),
      api: path.resolve("./modules/controllers/api"),
      web: path.resolve("./modules/controllers/web.js"),
    },
    models: path.resolve("./modules/models"),
  },
};
