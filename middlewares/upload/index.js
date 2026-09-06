const multer = require("multer");
const path = require("path");

const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const { mkdirp } = require("mkdirp");

//allowed mimetypes grouped by category, each category has its own storage folder
const allowedMimeTypes = {
  image: ["image/jpeg", "image/png", "image/webp"],
  document: [
    "application/pdf",
    "application/zip",
    "application/x-zip-compressed",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  video: ["video/mp4", "video/webm", "video/x-matroska", "video/quicktime"],
};

const categoryFolders = {
  image: "images",
  document: "docs",
  video: "videos",
};

/**
 * @param {string} mimetype
 * @returns {string|null} category key (image | document | video) or null
 */
const getFileCategory = (mimetype) => {
  return (
    Object.keys(allowedMimeTypes).find((category) =>
      allowedMimeTypes[category].includes(mimetype),
    ) || null
  );
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const year = new Date().getFullYear();
    //getMonth started from 0 it should be plus 1
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    //to get current day of month
    const day = String(new Date().getDate()).padStart(2, "0");

    const folderDate = `${year}-${month}-${day}`;
    //pick folder based on file category (images | docs | videos)
    const category = getFileCategory(file.mimetype);

    const folder = categoryFolders[category] || "docs";
    const dir = `public/files/${folder}/${folderDate}`;

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
  if (!getFileCategory(file.mimetype)) {
    return cb(new Error("File type is not allowed"), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB (videos need more room than images/docs)
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
          err?.message,
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
