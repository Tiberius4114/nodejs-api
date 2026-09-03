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
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", RoleSchema);
