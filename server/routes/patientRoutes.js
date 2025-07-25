const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.post('/assign-bin', async (req, res) => {
  const { name, phone, barcodeHash, bin } = req.body;
  const patient = new Patient({ name, phone, barcodeHash, bin });
  await patient.save();
  res.json({ success: true });
});

router.get('/lookup', async (req, res) => {
  const { phone } = req.query;
  const patient = await Patient.findOne({ phone });
  if (!patient) return res.status(404).json({ error: 'Not found' });
  res.json(patient);
});

module.exports = router;
