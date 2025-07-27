const express = require('express');
const router = express.Router();
const { storePatient, lookupPatient } = require('../controllers/patientController');

router.post('/store', storePatient);
router.post('/lookup', lookupPatient);

module.exports = router;
