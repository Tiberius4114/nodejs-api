const express = require("express");
const adminRouter = express.Router();

//routes
const coursesRouter = require("./courses");
const episodesRouter = require("./episodes");
const rolesRouter = require("./roles");

//middlewares
const authMiddleware = require(`${global.config.path.middlewares}/authenticate`);

adminRouter.use("/admin", authMiddleware, rolesRouter);
adminRouter.use("/admin", authMiddleware, coursesRouter);
adminRouter.use("/admin", authMiddleware, episodesRouter);

module.exports = adminRouter;
