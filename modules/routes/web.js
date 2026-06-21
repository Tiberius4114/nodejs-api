const express = require("express");
const config = require("../config");
const webRouter = express.Router();

//Controller
const WebController = require(`${config.path.controller.web}`);

webRouter.get("/", WebController.index);

webRouter.get("/about", WebController.about);

module.exports = webRouter;
