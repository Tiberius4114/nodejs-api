const express = require("express");
const adminRouter = express.Router();

//endpoints

//courses routes

const coursesRouter = require("./courses");

adminRouter.use("/admin", coursesRouter);

module.exports = adminRouter;
