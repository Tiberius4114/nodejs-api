const express = require("express");
const router = express.Router();

const courseRoutes = require("./courses");
const authRoutes = require("./auth");

router.use("/v1/courses", courseRoutes);
router.use("/v1/auth", authRoutes);

module.exports = router;
