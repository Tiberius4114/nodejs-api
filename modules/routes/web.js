const express = require("express");
const webRouter = express.Router();

webRouter.get("/", (_, res) => {
  res.json({ message: "Welcome to Home route" });
});

webRouter.get("/about", (_, res) => {
  res.json({ message: "Welcome to About Us route" });
});

module.exports = webRouter;
