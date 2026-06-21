class WebController {
  index(req, res) {
    res.json({
      data: {
        message: "Welcome to the API",
      },
    });
  }

  about(req, res) {
    res.json({ message: "Welcome to About Us route" });
  }
}

module.exports = new WebController();
