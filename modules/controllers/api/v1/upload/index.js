const Controller = require("../../../controller");

const {
  deletedUselessFiles,
} = require(`${global.config.path.middlewares}/upload`);

const {
  validateFilesPayloadFormat,
  sortFilesByIndex,
  errorCreator,
  normalizeToRelativePath,
  getFileType,
} = require(`${global.config.path.utils}`);
class UploadController extends Controller {
  multiple = async (req, res) => {
    const files = req.files || [];

    let createdMedia = [];

    const baseUrl = process.env.APP_BASE_URL || "http://localhost:8000";

    try {
      //check formdata key field that be on "files[index]" format
      //and nothing to be duplicate
      const formatValidation = validateFilesPayloadFormat(files);
      if (!formatValidation.isValid) {
        throw errorCreator(formatValidation.error, 400);
      }

      //sort files that
      const sortedFiles = sortFilesByIndex(files);

      req.files = sortedFiles;

      const mediaPayload = sortedFiles.map((file) => {
        return {
          fieldname: file.fieldname,
          originalname: file.originalname,
          encoding: file.encoding,
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path,
          fileType: getFileType(file.mimetype),
        };
      });

      //const file metadata to be saved in database
      createdMedia = await this.models.Media.insertMany(mediaPayload);

      //add finall transformed files in request for next usage
      res.json({
        message: "The file has been uploaded successfully",
        success: true,
        data: createdMedia.map((media) => {
          const normalizedPath = normalizeToRelativePath(media.path);

          return {
            id: media._id,
            originalName: media.originalName,
            filename: media.filename,
            mimetype: media.mimetype,
            size: media.size,
            url: `${baseUrl}/uploads/${normalizedPath}`,
          };
        }),
      });
    } catch (error) {
      if (createdMedia.length > 0) {
        const createdIds = createdMedia.map((media) => media._id);

        await Media.deleteMany({
          _id: { $in: createdIds },
        }).catch((databaseError) => {
          console.error(
            "Failed to remove created media documents:",
            databaseError
          );
        });
      }
      //remove temporary files
      deletedUselessFiles(files);
      this.errorHandler(error, res);
    }
  };
}

module.exports = new UploadController();
