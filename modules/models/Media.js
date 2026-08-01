const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema(
  {
    fieldname: { type: String, required: true },
    encoding: { type: String, required: true },
    filename: { type: String, required: true, trim: true },
    originalname: { type: String, required: true, trim: true },
    mimetype: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    fileType: {
      type: String,
      required: true,
      enum: ["image", "document"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
