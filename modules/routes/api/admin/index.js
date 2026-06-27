const express = require("express");
const adminRouter = express.Router();

//courses routes

const coursesRouter = require("./courses");
const episodesRouter = require("./episodes");

adminRouter.use("/admin", coursesRouter);
adminRouter.use("/admin", episodesRouter);

module.exports = adminRouter;
