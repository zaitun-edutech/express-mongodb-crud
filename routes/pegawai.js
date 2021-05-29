var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var pegawai = require("../controllers/PegawaiController.js");
var kecamatan = require("../models/Kecamatan.js");

router.get("/", function (req, res) {
  kecamatan
    .find({}, function (err, kec) {
      console.log(kec);
      res.render("pegawai", { kecamatan: kec, title: "CRUD Pegawai" });
    })
    .select("_id nama");
});

router.post("/tambah", function (req, res) {
  pegawai.save(req, res);
});
//delete
router.get("/delete/:_id", function (req, res) {
  pegawai.delete(req, res);
});
router.get("/edit/:_id", function (req, res) {
  pegawai.edit(req, res);
});
//update
router.post("/update/:_id", function (req, res) {
  pegawai.update(req, res);
});

module.exports = router;
