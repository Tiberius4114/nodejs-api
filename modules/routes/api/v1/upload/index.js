const express = require("express");
const router = express.Router();

//middlewares
const authMiddleware = require("./../middlewares/authenticate");
const uploadMiddleware = require("./../middlewares/upload");

//Controllers
const UploadController = require("./../../../../controllers/api/v1/upload");

router.post("/", authMiddleware, uploadMiddleware, UploadController.single);

module.exports = router;
