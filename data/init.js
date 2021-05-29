var mongoose = require("mongoose");
var crypto = require("crypto");

var secret = "brotherhood2013";
var password = crypto
  .createHmac("sha256", secret)
  .update("admin")
  .digest("hex");

console.log("password: " + password);

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://aman:Buraneta1!@cluster0.5tnve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

var User = require("../models/user");

User.find({ username: "admin" }, function (err, user) {
  if (user.length == 0) {
    var admin = new User({
      username: "admin",
      email: "admin@gmail.com",
      password: password,
      name: "admin",
      admin: true,
    });
    admin.save(function (err) {
      if (err) throw err;
      console.log("admin dibuat");
    });
  }
});
