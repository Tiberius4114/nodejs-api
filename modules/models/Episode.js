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
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Episode", EpisodeSchema);
