const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    title: { type: String, required: true },
    body: { type: String, required: true },
    videoUrl: { type: String, required: true },
    number: { type: String, required: true },
    videoCount: { type: Number, required: true },
    commentCount: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Episode", EpisodeSchema);
