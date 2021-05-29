var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var kecamatan = require('../controllers/KecamatanController.js');

router.get('/', function(req, res, next){
 res.render('kecamatan', { title: 'Kecamatan' });
});

router.post('/tambah', function(req, res){
 kecamatan.save(req, res);
});

module.exports = router;