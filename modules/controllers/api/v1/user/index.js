const Controller = require("../../../controller");

class UserController extends Controller {
  index = async (req, res) => {
    return res.json({ message: "user info" });
  };
}

module.exports = new UserController();
