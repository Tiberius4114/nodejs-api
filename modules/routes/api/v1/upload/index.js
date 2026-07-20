const express = require("express");
const router = express.Router();

//middlewares

const authMiddleware = require("./../middlewares/authenticate");

router.post("/", authMiddleware, (req, res) => {
  res.json({ message: "upload image" });
});

module.exports = router;
