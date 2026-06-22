class Transform {
  transform() {
    throw new Error(
      "Abstract class 'Transform' cannot be instantiated directly."
    );
  }

  transformCollection = (items) => {
    return items.map((item) => this.transform(item));
  };
}

module.exports = Transform;
