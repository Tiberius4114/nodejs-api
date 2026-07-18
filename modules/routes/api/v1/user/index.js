const express = require("express");

const router = express.Router();

const UserController = require(`${config.path.controller.api}/v1/user`);

//routes
router.get("/user", UserController.index);

module.exports = router;
