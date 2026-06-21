const express = require("express");
const routerv1 = require("./v1/courses");
const routerv12 = require("./v1.2/courses");
const routerv2 = require("./v2/courses");
const adminRouter = require("./admin");

const apiRouter = express.Router();

apiRouter.use("/v1", routerv1);
apiRouter.use("/v1.2", routerv12);
apiRouter.use("/v2", routerv2);
apiRouter.use("/", adminRouter);
module.exports = apiRouter;
