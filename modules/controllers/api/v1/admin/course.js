const Controller = require(`${config.path.controller.index}/controller.js`);

class AdminCourseController extends Controller {
  constructor() {
    super();
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  async findAll(_, res) {
    try {
      const courses = await this.models.Course.find();
      res.json({ data: courses });
    } catch (err) {
      res.status(500).json({ message: "Database error" });
    }
  }

  async findOne(req, res) {
    try {
      const paramId = req.params.id;

      if (!paramId) {
        return res.status(404).json({
          message: "Not found any course",
        });
      }

      const course = await this.models.Course.findById(req.params.id);

      res.json({
        message: "Success",
        data: course,
      });
    } catch (error) {
      throw error;
    }
  }

  async create(req, res) {
    try {
      //Validation

      const validationData = this.validations.courseSchema.parse(req.body);

      const newCourse = new this.models.Course(validationData);

      console.log("before store course", newCourse);

      const savedCourse = await newCourse.save();

      console.log("After store course", savedCourse);

      res.status(200).json({ message: "Course created", data: savedCourse });
    } catch (error) {
      console.error(error, "ERROR");
      this.errorHandler(error, res);
    }
  }

  async update(req, res) {
    try {
      //Validation

      const validationData = this.validations.courseSchema.parse(req.body);

      const updatedCourse = await this.models.Course.findByIdAndUpdate(
        req.params.id,
        validationData,
        {
          new: true,
          runValidators: false,
        }
      );

      res.json({ data: updatedCourse });
    } catch (error) {
      console.error(error, "ERROR");
      this.errorHandler(error, res);
    }
  }

  async destroy(req, res) {
    try {
      const paramId = req.params.id;

      if (!paramId) {
        return res.status(404).json({
          message: "Not found any course",
        });
      }

      const findedCourse = await this.models.Course.findByIdAndDelete(paramId);

      res.json({ message: "successfully deleted", data: findedCourse });
    } catch (error) {
      throw error;
    }
  }
}

const controller = new AdminCourseController();

module.exports = controller;
