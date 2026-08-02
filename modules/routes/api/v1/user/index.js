const express = require("express");

const router = express.Router();

const UserController = require(`${config.path.controller.api}/v1/user`);

//middlewares

const authMiddleware = require(`${global.config.path.middlewares}/authenticate`);

//routes
router.get("/", authMiddleware, UserController.profile);
router.patch("/update", authMiddleware, UserController.update);

module.exports = router;
