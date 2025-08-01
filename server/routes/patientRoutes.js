const express = require("express");
const Patient = require("../models/Patient");
const hashPhoneNumber = require("../utils/hash");

const router = express.Router();

router.post("/", async (req, res) => {
  const { phone, binNumber } = req.body;
  const phoneHash = hashPhoneNumber(phone);

  try {
    const patient = new Patient({ phoneHash, binNumber });
    await patient.save();
    res.status(201).json({ message: "Patient added" });
  } catch (err) {
    res.status(400).json({ error: "Error saving patient" });
  }
});

router.get("/:phone", async (req, res) => {
  const phoneHash = hashPhoneNumber(req.params.phone);

  try {
    const patient = await Patient.findOne({ phoneHash });
    if (!patient) return res.status(404).json({ error: "Not found" });
    res.json({ binNumber: patient.binNumber });
  } catch (err) {
    res.status(500).json({ error: "Error finding patient" });
  }
});

router.put("/:phone", async (req, res) => {
  const phoneHash = hashPhoneNumber(req.params.phone);
  const { binNumber } = req.body;

  try {
    const patient = await Patient.findOneAndUpdate(
      { phoneHash },
      { binNumber },
      { new: true }
    );
    if (!patient) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Bin updated", binNumber: patient.binNumber });
  } catch (err) {
    res.status(500).json({ error: "Error updating patient" });
  }
});

router.delete("/:phone", async (req, res) => {
  const phoneHash = hashPhoneNumber(req.params.phone);

  try {
    const result = await Patient.findOneAndDelete({ phoneHash });
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Patient removed" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting patient" });
  }
});

module.exports = router;
