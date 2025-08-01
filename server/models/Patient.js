const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  phoneHash: { type: String, required: true, unique: true },
  binNumber: { type: String, required: true }
});

module.exports = mongoose.model("Patient", patientSchema);


