var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: String,
    admin: Boolean,
  },
  {
    timestamps: true,
  }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
