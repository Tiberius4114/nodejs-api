const { z } = require("zod");
const mongoose = require("mongoose");

module.exports = z.object({
  course_id: z
    .string()
    .refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: "course id is invalid" }
    )
    .min(1, "course id is required"),
  title: z.string().min(3, "Title must be at least three characters"),
  body: z.string().min(10, "Body must be at least 10 characters"),
  video_url: z.url("Invalid video URL"),
  number: z.coerce.number().min(1, "Number is required"),
  video_count: z.coerce
    .number()
    .min(0, "Video count must be a non-negative integer"),
  comment_count: z.coerce
    .number()
    .min(0, "Comment count must be a non-negative integer"),
});
