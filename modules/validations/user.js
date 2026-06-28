const { z } = require("zod");

class UserValidation {
  create = () => {
    return z.object({
      name: z.string().min(3, "Name must be at least 3 characters"),
      email: z.email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });
  };
}

module.exports = new UserValidation();
