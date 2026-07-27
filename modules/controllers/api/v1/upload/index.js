const Controller = require("../../../controller");
const path = require("path");
class UploadController extends Controller {
  single = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "File not sent" });
    }

    try {
      res.json({
        message: "The file has been uploaded successfully",
        success: true,
        data: {
          ...req.file,
          path: `http://localhost:8000/uploads/${req.file.path.replaceAll(
            "\\",
            "/"
          )}`,
        },
      });
    } catch (error) {
      this.errorHandler(error, res);
    }
  };
}

module.exports = new UploadController();
