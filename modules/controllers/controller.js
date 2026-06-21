//Models
const Course = require(`${config.path.models}/Course`);

class Controller {
  constructor() {
    this.models = { Course };
  }
}

module.exports = Controller;
