var mongoose = require('mongoose');
var Kecamatan = require('../models/Kecamatan');

var kecController = {};

kecController.find = function(err, res){
 var kecamatan = new Kecamatan(req.body);

 kecamatan.find({}, function(err, kec){
  console.log(kec);
  res.render('pegawai', {kecamatan: kec, title: 'crud kecamatan'});
 }).select('_id');
}

kecController.save = function(req, res){
 var kecamatan = new Kecamatan(req.body);
 
 kecamatan.save(function(err){
  if(err){
   console.log(err);
   res.render('kecamatan');
  }else{
   console.log('save sukses');
   res.redirect('../');
  }
 })
}

module.exports = kecController;