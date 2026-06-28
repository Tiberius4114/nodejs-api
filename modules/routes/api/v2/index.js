const express = require("express");

const router = express.Router();

const courseRoutes = require("./courses");

router.use("/v2", courseRoutes);

module.exports = router;
