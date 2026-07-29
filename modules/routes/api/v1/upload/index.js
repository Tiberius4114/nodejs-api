const express = require("express");
const router = express.Router();

//middlewares
const authMiddleware = require(`${global.config.path.middlewares}/authenticate`);
const uploadMiddleware = require(`${global.config.path.middlewares}/upload`);

//Controllers
const UploadController = require("./../../../../controllers/api/v1/upload");

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.any(),
  UploadController.multiple
);

module.exports = router;
