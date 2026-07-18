//controllers
const Controller = require("../../../controller");

//transformers
const UserTransform = require("./../../../../transforms/v1/user");

class UserController extends Controller {
  profile = async (req, res) => {
    return res.json({
      success: true,
      data: UserTransform.transform(req.user),
    });
  };
}

module.exports = new UserController();
