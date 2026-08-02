const { z } = require("zod");
const mongoose = require("mongoose");

class UserValidation {
  register = () => {
    return z.object({
      name: z.string().min(3, "Name must be at least 3 characters"),
      email: z.email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });
  };
  login = () => {
    return z.object({
      email: z.email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });
  };
  update = () => {
    return z
      .object({
        avatar: z.string().refine(
          (val) => {
            return mongoose.Types.ObjectId.isValid(val);
          },
          { message: "avatar id is invalid" }
        ),
        name: z
          .string()
          .min(3, "Name must be at least 3 characters")
          .optional(),
        email: z.email("Invalid email format").optional(),
      })
      .partial();
  };
}

module.exports = new UserValidation();
