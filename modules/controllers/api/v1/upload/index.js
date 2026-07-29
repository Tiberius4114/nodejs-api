const Controller = require("../../../controller");

const {
  deletedUselessFiles,
} = require(`${global.config.path.middlewares}/upload`);

const {
  validateFilesPayloadFormat,
  sortFilesByIndex,
  errorCreator,
  normalizeToRelativePath,
} = require(`${global.config.path.utils}`);
class UploadController extends Controller {
  multiple = (req, res) => {
    const files = req.files || [];
    try {
      //check formdata key field that be on "files[index]" format
      //and nothing to be duplicate
      const formatValidation = validateFilesPayloadFormat(files);
      if (!formatValidation.isValid) {
        throw errorCreator(formatValidation.error, 400);
      }

      //sort files that
      const sortedValues = sortFilesByIndex(files);

      //add finall transformed files in request for next usage
      req.files = sortedValues;
      res.json({
        message: "The file has been uploaded successfully",
        success: true,
        data: [...sortedValues].map((file) => {
          const normalizedPath = normalizeToRelativePath(file.path);
          return {
            ...file,
            path: `http://localhost:8000/uploads${normalizedPath}`,
          };
        }),
      });
    } catch (error) {
      //remove temporary files
      deletedUselessFiles(files);
      this.errorHandler(error, res);
    }
  };
}

module.exports = new UploadController();
