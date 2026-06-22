const Transform = require("../../transform");

class CourseTransform extends Transform {
  transform(item) {
    return {
      title: item.title,
      body: item.body,
      price: item.price,
    };
  }
}

module.exports = new CourseTransform();
