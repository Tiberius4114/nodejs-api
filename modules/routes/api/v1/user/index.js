const express = require("express");

const router = express.Router();

const UserController = require(`${config.path.controller.api}/v1/user`);

//middlewares

const authMiddleware = require("../middlewares/authenticate");

//routes
router.get("/user", authMiddleware, UserController.profile);

module.exports = router;
