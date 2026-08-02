//controllers
const Controller = require("../../../controller");

//transformers
const UserTransform = require("./../../../../transforms/v1/user");

const {
  deletedUselessFiles,
} = require(`${global.config.path.middlewares}/upload`);

class UserController extends Controller {
  profile = async (req, res) => {
    return res.json({
      success: true,
      data: UserTransform.transform(req.user),
    });
  };

  update = async (req, res) => {
    const userId = req.user._id;

    //TODO: check if avatar id that send in payload is exist in media collection or not
    //if not exist return 404 error
    try {
      const validationResult = this.validations.user.update().parse(req.body);
      const userData = await this.models.User.findById(req.user._id);

      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      //if we had avatar in request body
      const newAvatarId = validationResult?.avatar;
      let oldMediaIdToDelete = null;

      //check we uploaded avatar before
      if (
        newAvatarId &&
        userData?.avatar &&
        newAvatarId !== userData.avatar.toString()
      ) {
        oldMediaIdToDelete = userData.avatar;
      }

      //update user data
      const updatedUser = await this.models.User.findByIdAndUpdate(
        userId,
        {
          $set: validationResult,
        },
        {
          new: true,
        }
      ).populate("avatar");

      //delete old avatar if we had one
      if (oldMediaIdToDelete) {
        const mediaFile = await this.models.Media.findByIdAndDelete(
          oldMediaIdToDelete
        );

        //remove media file from storage and db
        if (mediaFile) {
          await this.models.Media.findByIdAndDelete(oldMediaIdToDelete);
          deletedUselessFiles(mediaFile);
        }
      }

      res.json({
        success: true,
        message: "User updated successfully",
        data: UserTransform.transform(updatedUser),
      });
    } catch (error) {
      this.errorHandler(error, res);
    }
  };
}

module.exports = new UserController();
