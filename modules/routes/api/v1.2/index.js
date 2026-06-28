const express = require("express");
const router = express.Router();

const courseRoutes = require("./courses");

router.use("/v1.2", courseRoutes);

module.exports = router;
