const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    title: { type: String, required: true },
    body: { type: String, required: true },
    video_url: { type: String, required: true },
    number: { type: String, required: true },
    video_count: { type: Number, required: true },
    comment_count: { type: Number, required: true },
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

module.exports = mongoose.model("Episode", EpisodeSchema);
