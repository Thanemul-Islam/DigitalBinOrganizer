import React, { useState } from "react";
import axios from "axios";
import { hashPhone } from "../utils/hash";

const PatientForm = () => {
  const [phone, setPhone] = useState("");
  const [binNumber, setBinNumber] = useState("");
  const [lookupBin, setLookupBin] = useState("");
  const [message, setMessage] = useState("");

  const API_BASE = "http://localhost:5000/api/patients";

  const handleAddPatient = async () => {
    const hashedPhone = hashPhone(phone);
    try {
      await axios.post(API_BASE, { hashedPhone, binNumber });
      setMessage("✅ Patient added successfully");
      setPhone("");
      setBinNumber("");
    } catch (error) {
      console.error("Add Error:", error.response?.data || error.message);
      setMessage("❌ Error adding patient");
    }
  };

  const handleLookup = async () => {
    const hashedPhone = hashPhone(phone);
    try {
      const res = await axios.get(`${API_BASE}/${hashedPhone}`);
      setLookupBin(res.data.binNumber);
      setMessage(`📦 Bin: ${res.data.binNumber}`);
    } catch (error) {
      console.error("Lookup Error:", error.response?.data || error.message);
      setLookupBin("");
      setMessage("❌ Patient not found");
    }
  };

  const handleUpdate = async () => {
    const hashedPhone = hashPhone(phone);
    try {
      await axios.put(`${API_BASE}/${hashedPhone}`, { binNumber });
      setMessage("✅ Bin updated successfully");
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      setMessage("❌ Error updating bin");
    }
  };

  const handleDelete = async () => {
    const hashedPhone = hashPhone(phone);
    try {
      await axios.delete(`${API_BASE}/${hashedPhone}`);
      setMessage("✅ Patient deleted");
      setLookupBin("");
      setPhone("");
      setBinNumber("");
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      setMessage("❌ Error deleting patient");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">📋 Patient Bin Manager</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">📞 Phone Number</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">📦 Bin Number</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={binNumber}
          onChange={(e) => setBinNumber(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleAddPatient}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Patient
        </button>

        <button
          onClick={handleLookup}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Lookup
        </button>

        <button
          onClick={handleUpdate}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Update Bin
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Remove Patient
        </button>
      </div>

      {message && <div className="text-sm text-center mt-2">{message}</div>}
    </div>
  );
};

export default PatientForm;
