class Transform {
  //It is a formal method. This method declares:
  // "Any class that inherits from me must implement
  //  the method in its own way (Method Overriding)."
  // If a child does not do this, an error is thrown.
  transform = () => {
    throw new Error(
      "Abstract class 'Transform' cannot be instantiated directly.",
    );
  };

  transformCollection = (items) => {
    return items.map((item) => this.transform(item));
  };
}

module.exports = Transform;
