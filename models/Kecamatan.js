var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var kecamatanSchema = new Schema(
 {
  nama: {type: String, require: true}
 }
);

module.exports = mongoose.model('kecamatan', kecamatanSchema);