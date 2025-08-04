const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  hashedPhone: { type: String, required: true },
  binNumber: { type: String, required: true }
});

module.exports = mongoose.model('Patient', patientSchema);
