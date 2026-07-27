const Controller = require("../../../controller");

class UploadController extends Controller {
  single = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "File not sent" });
    }

    try {
      res.json({ message: req.file });
    } catch (error) {
      this.errorHandler(error, res);
    }
  };
}

module.exports = new UploadController();
