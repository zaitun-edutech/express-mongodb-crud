var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pegawaiSchema = new Schema(
 {
  nama: { type: String, required: true },
  email: { type: String, required: true },
  umur: { type: String, required: true },
  id_kec: { type: Schema.Types.ObjectId, ref: 'kecamatan', required: true }
 }
);

module.exports = mongoose.model('pegawai', pegawaiSchema);