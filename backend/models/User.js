// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // Only required for local authentication
      required: function () {
        return this.authType === "local";
      },
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    photo: {
      type: String,
      default: null,
    },
    authType: {
      type: String,
      enum: ["local", "google"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
