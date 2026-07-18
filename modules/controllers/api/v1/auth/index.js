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

      res.json({ success: true, data: userData });
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

      res.json({
        success: true,
        message: "ورود شما با موفقیت انجام شد",
        data: UserTransform.transform(user, true),
      });
    } catch (error) {
      this.errorHandler(error, res);
    }
  };
}

module.exports = new AuthController();
