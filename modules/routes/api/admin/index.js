const express = require("express");
const adminRouter = express.Router();

//routes
const coursesRouter = require("./courses");
const episodesRouter = require("./episodes");
const rolesRouter = require("./roles");

//middlewares
const authMiddleware = require(`${config.path.middlewares}/authenticate`);
const permissionMiddleware = require(`${config.path.middlewares}/permissions`);

//constant
const { PERMISSIONS } = require(`${config.path.constants}`);

adminRouter.use(
  "/admin",
  authMiddleware,
  // permissionMiddleware(PERMISSIONS.SUPER_ADMIN),
  rolesRouter
);
adminRouter.use("/admin", authMiddleware, coursesRouter);
adminRouter.use("/admin", authMiddleware, episodesRouter);

module.exports = adminRouter;
