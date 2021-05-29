var mongoose = require("mongoose");
var Pegawai = require("../models/Pegawai");
var Kecamatan = require("../models/Kecamatan");

var pegawaiController = {};

pegawaiController.save = function (req, res) {
  var pegawai = new Pegawai(req.body);

  pegawai.save(function (err) {
    if (err) {
      console.log(err);
      res.render("index");
    } else {
      console.log("save sukses");
      res.redirect("../");
    }
  });
};
//hapus data
pegawaiController.delete = function (req, res) {
  Pegawai.findOne({ _id: req.params._id }, function (err, row) {
    if (row) {
      console.log(row);
      Pegawai.remove({ _id: req.params._id }, function (err) {
        if (err) {
          console.log("delete error", err);
        } else {
          console.log("delete sukses");
          res.redirect("http://localhost:3000");
        }
      });
    } else {
      res.redirect("http://localhost:3000");
    }
  });
};
pegawaiController.edit = function (req, res) {
  var id = req.params._id;
  Pegawai.findOne({ _id: id }, function (err, pegawai) {
    if (pegawai) {
      console.log(pegawai);
      Kecamatan.find({}, function (err, kec) {
        Kecamatan.findOne({ _id: pegawai.id_kec }, function (err, x) {
          console.log(x);
          res.render("editpegawai", {
            pegawai: pegawai,
            title: "CRUD",
            kecamatan: kec,
            x: x,
          });
        });
      });
    } else {
      res.redirect("../");
    }
  });
};

pegawaiController.update = function (req, res) {
  Pegawai.findByIdAndUpdate(
    req.params._id,
    {
      $set: {
        nama: req.body.nama,
        email: req.body.email,
        umur: req.body.umur,
        id_kec: req.body.id_kec,
      },
    },
    { new: true },
    function (err, pegawai) {
      if (err) {
        console.log(err);
        res.render("editpegawai", { pegawai: req.body });
      }
      res.redirect("http://localhost:3000");
    }
  );
};

module.exports = pegawaiController;
