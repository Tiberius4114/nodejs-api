const { z } = require("zod");

//Models
const Course = require(`${config.path.models}/Course`);
const Episode = require(`${config.path.models}/Episode`);

//Validations
const courseValidation = require(`${config.path.validations}/course`);
const episodeValidation = require(`${config.path.validations}/episode`);

class Controller {
  constructor() {
    this.models = { Course, Episode };
    this.validations = { courseValidation, episode: episodeValidation };
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
