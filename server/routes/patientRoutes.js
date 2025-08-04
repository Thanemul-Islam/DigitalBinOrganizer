const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { hashPhone } = require('../utils/hash');

// ✅ Add a new patient
router.post('/', async (req, res) => {
  try {
    const { phone, binNumber } = req.body;
    if (!phone || !binNumber) {
      return res.status(400).json({ message: 'phone and binNumber are required' });
    }

    const hashedPhone = hashPhone(phone);

    const newPatient = new Patient({ hashedPhone, binNumber });
    await newPatient.save();

    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
  } catch (err) {
    console.error('POST /api/patients error:', err);
    res.status(500).json({ message: 'Server error adding patient' });
  }
});

// ✅ Get ALL patients for a phone number
router.get('/:phone', async (req, res) => {
  try {
    const hashedPhone = hashPhone(req.params.phone);
    const patients = await Patient.find({ hashedPhone });

    if (!patients.length) {
      return res.status(404).json({ message: 'No patients found' });
    }

    res.json(patients);
  } catch (err) {
    console.error('GET /api/patients/:phone error:', err);
    res.status(500).json({ message: 'Server error fetching patients' });
  }
});

// ✅ Update a patient's bin number by ID
router.put('/:id', async (req, res) => {
  try {
    const { binNumber } = req.body;
    if (!binNumber) {
      return res.status(400).json({ message: 'binNumber is required to update' });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { binNumber },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient updated', patient: updatedPatient });
  } catch (err) {
    console.error('PUT /api/patients/:id error:', err);
    res.status(500).json({ message: 'Server error updating patient' });
  }
});

// ✅ Delete a patient by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted' });
  } catch (err) {
    console.error('DELETE /api/patients/:id error:', err);
    res.status(500).json({ message: 'Server error deleting patient' });
  }
});

module.exports = router;
