const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  barcodeHash: String,
  bin: String,
});

module.exports = mongoose.model('Patient', PatientSchema);
