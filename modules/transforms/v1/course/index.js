const Transform = require("../../transform");

class CourseTransform extends Transform {
  transform(item) {
    console.log(this, "THIS");
    return {
      title: item.title,
      body: item.body,
      price: item.price,
      ...this.showEpisodes(item),
    };
  }

  showEpisodes(item) {
    if (this.withEpisodesStatus) {
      return {
        episodes: item.episodes,
      };
    }
    return {};
  }
  withEpisodes() {
    this.withEpisodesStatus = true;
    // console.log(this, "THIS");
    return this;
  }
}

module.exports = new CourseTransform();
