const mongoose = require("mongoose");
const { PERMISSIONS } = require(`${config.path.constants}`);

const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // like: 'admin', 'teacher', 'author'
    },
    label: {
      type: String,
      required: true, //role label
    },
    permissions: [
      {
        type: String,
        enum: Object.values(PERMISSIONS),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", RoleSchema);
