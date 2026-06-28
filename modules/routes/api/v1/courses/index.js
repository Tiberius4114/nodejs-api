const express = require("express");

const router = express.Router();

//Controllers

const HomeCourseController = require(`${config.path.controller.api}/v1/home/course`);

//courses
router.get("/", HomeCourseController.findAll);
router.get("/:id", HomeCourseController.findOne);

module.exports = router;
