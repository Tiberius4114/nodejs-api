const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { mkdirp } = require("mkdirp");

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const year = new Date().getFullYear();

    //getMonth started from 0 it should be plus 1
    const month = String(new Date().getMonth() + 1).padStart(2, "0");

    //to get current day of month
    const day = String(new Date().getDate()).padStart(2, "0");

    const isImage = file.mimetype.startsWith("image/");

    const folderDate = `${year}-${month}-${day}`;

    let dir = `public/files/images/${folderDate}`;

    if (!isImage) {
      dir = `public/files/docs/${folderDate}`;
    }

    mkdirp(dir)
      .then(() => {
        cb(null, dir);
      })
      .catch(() => {
        cb(new Error("no such file or directory"));
      });
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${uuidv4()}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("File type is not allowed"), false);
  }

  cb(null, true);
};

module.exports = (req, res, next) => {
  multer({
    storage: imageStorage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1025, //5MB
    },
  }).single("file")(req, res, (error) => {
    if (error) {
      return res.status(400).json({ message: error?.message });
    }
    next();
  });
};
