const Controller = require("../../../controller");

const MediaTransform = require("../../../../transforms/v1/media");

const { deletedUselessFiles } = require(
  `${global.config.path.middlewares}/upload`,
);

const {
  validateFilesPayloadFormat,
  sortFilesByIndex,
  errorCreator,
  getFileType,
} = require(`${global.config.path.utils}`);
class UploadController extends Controller {
  multiple = async (req, res) => {
    const files = req.files || [];

    console.log(files, "FILES");
    let createdMedia = [];

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

      console.log(createdMedia, "CREATED MEDIA");

      //add finall transformed files in request for next usage
      res.json({
        message: "The file has been uploaded successfully",
        success: true,
        data: MediaTransform.transformCollection(createdMedia),
      });
    } catch (error) {
      if (createdMedia.length > 0) {
        const createdIds = createdMedia.map((media) => media._id);

        await this.models.Media.deleteMany({
          _id: { $in: createdIds },
        }).catch((databaseError) => {
          console.error(
            "Failed to remove created media documents:",
            databaseError,
          );
        });
      }
      //remove temporary files
      deletedUselessFiles(files);
      this.errorHandler(error, res);
    }
  };
  singleDestroy = async (req, res) => {
    try {
      const { id } = this.validations.media.single.parse(req.params);

      const media = await this.models.Media.findById(id);

      if (!media) {
        return res.status(404).json({
          success: false,
          message: "not found any file",
        });
      }

      await this.models.Media.findByIdAndDelete(id);

      deletedUselessFiles([media]);

      return res.status(200).json({
        success: true,
        message: "فایل با موفقیت حذف شد.",
      });
    } catch (error) {
      this.errorHandler(error, res);
    }
  };
  bulkDestroy = async (req, res) => {
    try {
      const { ids } = this.validations.media.bulk.parse(req.body);

      const mediaFiles = await this.models.Media.find({
        _id: { $in: ids },
      });

      if (!mediaFiles.length) {
        return res.status(404).json({
          success: false,
          message: "not found any entered media items",
        });
      }

      //collect mediaIds from db
      const mediaIds = mediaFiles.map((m) => m._id);

      await this.models.Media.deleteMany({ _id: { $in: mediaIds } });
      deletedUselessFiles(mediaFiles);

      return res.status(200).json({
        success: true,
        message: `${mediaFiles.length} فایل با موفقیت حذف شدند.`,
      });
    } catch (error) {
      this.errorHandler(error, res);
    }
  };
}

module.exports = new UploadController();
