class HomeCourseController {
  findAll(req, res) {
    res.json({
      data: [
        {
          title: "course item from v1",
        },
      ],
    });
  }
}

module.exports = new HomeCourseController();
