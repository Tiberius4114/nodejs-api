const { z } = require("zod");

//Models
const Course = require(`${config.path.models}/Course`);

//Validations
const courseSchema = require(`${config.path.validations}/course`);

class Controller {
  constructor() {
    this.models = { Course };
    this.validations = { courseSchema };
  }

  errorHandler(error, res) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: "Validation error",
        issues: error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      });
    }

    res.status(500).json({ message: "Server error" });
  }
}

module.exports = Controller;
