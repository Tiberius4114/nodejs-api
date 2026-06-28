const Controller = require("../../../controller");

class AuthController extends Controller {
  register = async (req, res) => {
    try {
      //validation
      const result = this.validations.user.create().parse(req.body);

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
  login = async (req, res) => {};
}

module.exports = new AuthController();
