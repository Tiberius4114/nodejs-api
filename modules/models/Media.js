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
    toJSON: {
      virtuals: true, // add virtual fields like id
      transform: function (doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true, //it means anytime executed toObject() method on this document
      //put virtual fields like id in final object
    },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
