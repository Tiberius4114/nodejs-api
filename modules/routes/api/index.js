const express = require("express");
const routerv1 = require("./v1");
const routerv12 = require("./v1.2");
const routerv2 = require("./v2");
const adminRouter = require("./admin");

const apiRouter = express.Router();

//v1 routes
apiRouter.use("/", routerv1);

//v1.2 routes
apiRouter.use("/", routerv12);

//v2 routes
apiRouter.use("/", routerv2);

//admin routes
apiRouter.use("/", adminRouter);

module.exports = apiRouter;
