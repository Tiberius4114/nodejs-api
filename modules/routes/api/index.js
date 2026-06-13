const express = require("express");

const apiRouter = express.Router();

apiRouter.get("/", (_, res) => {
  res.json({ message: "Welcome to API route" });
});

module.exports = apiRouter;
