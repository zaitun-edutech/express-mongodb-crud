// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
// var express = require("express");
// var crypto = require("crypto");

// var router = express.Router();
// var Pegawai = require("../models/Pegawai");
// var User = require("../models/User");
// var Auth_mdw = require("../middlewares/auth");

// var secret = "brotherhood2013";
// var session_store;

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   Pegawai.find({}, function (err, pegawai) {
//     console.log(pegawai);
//     res.render("index", { pegawai: pegawai, title: "CRUD Pegawai" });
//   })
//     .populate("id_kec")
//     .select("_id nama email umur");
// });
var express = require("express");
var crypto = require("crypto");

var router = express.Router();
var Pegawai = require("../models/Pegawai");
var User = require("../models/User");
var Auth_mdw = require("../middlewares/auth");

var secret = "brotherhood2013";
var session_store;

/* GET home page. */
router.get("/", Auth_mdw.check_login, function (req, res, next) {
  Pegawai.find({}, function (err, pegawai) {
    console.log(pegawai);
    res.render("index", {
      pegawai: pegawai,
      title: "CRUD Pegawai",
      session_store: session_store,
    });
  })
    .populate("id_kec")
    .select("_id nama email umur");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", function (req, res, next) {
  session_store = req.session;
  var password = crypto
    .createHmac("sha256", secret)
    .update(req.param("password"))
    .digest("hex");

  if (req.param("username") == "" || req.param("password") == "") {
    req.flash("info", "Isi dengan benar");
    res.redirect("/login");
  } else {
    User.find(
      { username: req.param("username"), password: password },
      function (err, user) {
        if (err) throw err;
        if (user.length > 0) {
          session_store.username = user[0].username;
          session_store.email = user[0].email;
          session_store.admin = user[0].admin;
          session_store.logged_in = true;
          res.redirect("/");
        } else {
          req.flash("info", "akun salah!!");
          res.redirect("/login");
        }
      }
    );
  }
});
router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
