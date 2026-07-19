const Controller = require("../../../controller");
const UserTransform = require("./../../../../transforms/v1/user");

class AuthController extends Controller {
  register = async (req, res) => {
    try {
      //validation
      const result = this.validations.user.register().parse(req.body);

      //check user is exist or not
      const user = await this.models.User.findOne({
        $or: [{ name: result.name }, { email: result.email }],
      });

      if (user) {
        return res.status(422).json({
          success: false,
          message: "User already exists",
        });
      }

      const userData = await this.models.User.create({
        name: result.name,
        email: result.email,
        password: result.password,
      });

      //transform user data with user transform and force it by 'true' to create token
      const transformedUser = UserTransform.transform(userData, true);

      //store refresh token in db
      userData.refreshToken.push({
        token: transformedUser.token.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 6 * 6 * 1000),
      });

      await userData.save();

      res.json({
        success: true,
        message: "you registered successfully",
        data: transformedUser,
      });
    } catch (error) {
      this.errorHandler(error, res);
    }
  };
  login = async (req, res) => {
    try {
      //validation
      const result = this.validations.user.login().parse(req.body);

      //check user existence from database
      const user = await this.models.User.findOne({ email: result.email });
      if (user === null) {
        return res.status(422).json({
          success: false,
          message: "اطلاعات وارد شده صحیح نیست",
        });
      }

      //check that password entered correctly or not
      //comparePassword() method define on userSchema and we access on it
      //as instance of user model methods after we find it from db
      const isPasswordCorrect = await user.comparePassword(result.password);

      if (!isPasswordCorrect) {
        return res.status(422).json({
          success: false,
          message: "incorrect password",
        });
      }

      //true means we should create token
      const transformedUser = UserTransform.transform(user, true);

      //remove before expires tokens to not being crowded db
      user.refreshToken = user.refreshToken.filter(
        (t) => t.expiresAt > new Date()
      );

      user.refreshToken.push({
        token: transformedUser.token.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      await user.save();

      res.json({
        success: true,
        message: "ورود شما با موفقیت انجام شد",
        data: transformedUser,
      });
    } catch (error) {
      this.errorHandler(error, res);
    }
  };
}

module.exports = new AuthController();
