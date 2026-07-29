const multer = require("multer");
const path = require("path");

const fs = require("fs/promises");
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

const upload = multer({
  storage: imageStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB,
  },
});

//helper function for deleting files
const deletedUselessFiles = (files) => {
  if (!files) return;
  const filesArray = Array.isArray(files) ? files : [files];
  filesArray.forEach((file) => {
    if (file && file.path) {
      fs.unlink(file.path).catch((err) => {
        console.error(
          `Error in delete temporary file on ${file.path}`,
          err?.message
        );
      });
    }
  });
};

const handleUpload = (multerMiddleware) => {
  return (req, res, next) => {
    multerMiddleware(req, res, (error) => {
      if (error) {
        //we clean temporary files that store on server storage
        const filesToCleanup = req?.files || (req?.file ? [req.file] : null);
        deletedUselessFiles(filesToCleanup);
        return res.status(400).json({ message: error.message });
      }
      next();
    });
  };
};

module.exports = {
  single: (fieldname = "file") => handleUpload(upload.single(fieldname)),
  multiple: (fieldname = "files", maxCount = 10) =>
    handleUpload(upload.array(fieldname, maxCount)),
  any: () => handleUpload(upload.any()),
  deletedUselessFiles, // for more usage
};
