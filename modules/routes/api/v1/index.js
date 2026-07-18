const express = require("express");
const router = express.Router();

//routes
const courseRoutes = require("./courses");
const authRoutes = require("./auth");
const userRoutes = require("./user");

router.use("/v1/courses", courseRoutes);
router.use("/v1/auth", authRoutes);
router.use("/v1", userRoutes);

module.exports = router;
