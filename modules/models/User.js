const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { stringFormat } = require("zod");

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    refreshToken: [
      {
        token: String,
        expiresAt: Date,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = function (currentPassword) {
  console.log(currentPassword, this.password, "PASS");
  return bcrypt.compare(currentPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
