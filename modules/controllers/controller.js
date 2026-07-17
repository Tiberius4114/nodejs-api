const { z } = require("zod");

//Models
const Course = require(`${config.path.models}/Course`);
const Episode = require(`${config.path.models}/Episode`);
const User = require(`${config.path.models}/User`);

//Validations
const courseValidation = require(`${config.path.validations}/course`);
const episodeValidation = require(`${config.path.validations}/episode`);
const userValidation = require(`${config.path.validations}/user`);

class Controller {
  constructor() {
    this.models = { Course, Episode, User };
    this.validations = {
      courseValidation,
      episode: episodeValidation,
      user: {
        register: userValidation.register,
        login: userValidation.login,
      },
    };
  }

  errorHandler(error, res) {
    // console.log, "ERROR");
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
    } else if (error.code === 11000) {
      const errorKey = Object.keys(error?.errorResponse?.keyValue)?.[0];

      res.status(422).json({
        message: errorKey
          ? `${errorKey} is used before`
          : `information used before`,
      });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = Controller;
