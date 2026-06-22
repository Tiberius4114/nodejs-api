const CourseTransform = require("../../../../transforms/v1/course");
const Controller = require("../../../controller");

class HomeCourseController extends Controller {
  findAll = async (req, res) => {
    try {
      const courses = await this.models.Course.find();

      res.json({
        data: CourseTransform.transformCollection(courses),
        success: true,
      });
    } catch (error) {
      throw error;
      this.errorHandler(error, res);
    }
  };
  findOne = async (req, res) => {
    try {
      const paramId = req.params.id;

      if (!paramId) {
        return res.status(404).json({
          message: "Not found any course",
        });
      }

      const course = await this.models.Course.findById(req.params.id);

      res.json({
        data: CourseTransform.transform(course),
        success: true,
      });
    } catch (error) {
      this.errorHandler(error);
    }
  };
}

module.exports = new HomeCourseController();
