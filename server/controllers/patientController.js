const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');

const hashPhone = (phone) => {
  return bcrypt.hashSync(phone, 10);
};

exports.storePatient = async (req, res) => {
  const { phone, binLocation } = req.body;
  const hashedPhone = hashPhone(phone);

  try {
    const newPatient = new Patient({ hashedPhone, binLocation });
    await newPatient.save();
    res.status(201).json({ message: 'Patient stored successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error storing patient' });
  }
};

exports.lookupPatient = async (req, res) => {
  const { phone } = req.body;
  try {
    const patients = await Patient.find();
    const match = patients.find(p => bcrypt.compareSync(phone, p.hashedPhone));

    if (match) {
      res.status(200).json({ binLocation: match.binLocation });
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Lookup failed' });
  }
};
