// server/routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // adjust path if needed

// Add a new patient
router.post('/', async (req, res) => {
  try {
    const { hashedPhone, binNumber } = req.body;
    if (!hashedPhone || !binNumber) {
      return res.status(400).json({ message: 'hashedPhone and binNumber are required' });
    }
    const existing = await Patient.findOne({ hashedPhone });
    if (existing) {
      return res.status(409).json({ message: 'Patient with this phone already exists' });
    }
    const newPatient = new Patient({ hashedPhone, binNumber });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    console.error('POST /api/patients error:', err);
    res.status(500).json({ message: 'Server error adding patient' });
  }
});

// Get patient by hashed phone number
router.get('/:hashedPhone', async (req, res) => {
  try {
    const patient = await Patient.findOne({ hashedPhone: req.params.hashedPhone });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    console.error('GET /api/patients/:hashedPhone error:', err);
    res.status(500).json({ message: 'Server error fetching patient' });
  }
});

// Update bin number for a patient
router.put('/:hashedPhone', async (req, res) => {
  try {
    const { binNumber } = req.body;
    if (!binNumber) {
      return res.status(400).json({ message: 'binNumber is required to update' });
    }
    const updatedPatient = await Patient.findOneAndUpdate(
      { hashedPhone: req.params.hashedPhone },
      { binNumber },
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(updatedPatient);
  } catch (err) {
    console.error('PUT /api/patients/:hashedPhone error:', err);
    res.status(500).json({ message: 'Server error updating patient' });
  }
});

// Delete a patient by hashed phone number
router.delete('/:hashedPhone', async (req, res) => {
  try {
    const deletedPatient = await Patient.findOneAndDelete({ hashedPhone: req.params.hashedPhone });
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    console.error('DELETE /api/patients/:hashedPhone error:', err);
    res.status(500).json({ message: 'Server error deleting patient' });
  }
});

module.exports = router;
