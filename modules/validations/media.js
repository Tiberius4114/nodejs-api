const mongoose = require("mongoose");

const { z } = require("zod");

const objectIdSchema = z.string("mediaId should be string").refine((val) => {
  return (
    mongoose.Types.ObjectId.isValid(val) &&
    new mongoose.Types.ObjectId(val).toString() === val
  );
});

const singleDeleteSchema = z.object({
  id: objectIdSchema,
});

const bulkDeleteSchema = z.object({
  ids: z
    .array(objectIdSchema, {
      error: "فیلد ids باید یک آرایه از شناسه‌ها باشد.",
    })
    .min(1, {
      error: "حداقل باید یک شناسه برای حذف ارسال کنید.",
    })
    .max(50, {
      error: "حداکثر ۵۰ فایل را می‌توانید هم‌زمان حذف کنید.",
    }),
});

module.exports = {
  singleDeleteSchema,
  bulkDeleteSchema,
};
