const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  hashedPhoneNumber: { type: String, required: true, unique: true },
  name: String, // optional, not required for lookup
  binNumber: String, // the bin where the bag is stored
  scannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);

