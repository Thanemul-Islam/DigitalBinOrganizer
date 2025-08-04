import React, { useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // npm install react-icons

const PatientForm = () => {
  const [phone, setPhone] = useState("");
  const [binNumber, setBinNumber] = useState("");
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");

  const API_BASE = "http://localhost:5000/api/patients";

  // ✅ Add new patient
  const handleAddPatient = async () => {
    try {
      await axios.post(API_BASE, { phone, binNumber });
      setMessage("✅ Patient added successfully");
      setPhone("");
      setBinNumber("");
    } catch (error) {
      console.error("Add Error:", error.response?.data || error.message);
      setMessage(`❌ ${error.response?.data?.message || "Error adding patient"}`);
    }
  };

  // ✅ Lookup patients by phone
  const handleLookup = async () => {
    try {
      const res = await axios.get(`${API_BASE}/${phone}`);
      setPatients(res.data);
      setMessage(`📋 Found ${res.data.length} patient(s)`);
    } catch (error) {
      setPatients([]);
      setMessage("❌ No patients found");
    }
  };

  // ✅ Update a patient's bin number
  const handleUpdate = async (id, newBin) => {
    try {
      await axios.put(`${API_BASE}/update/${id}`, { binNumber: newBin });
      setMessage("✅ Bin updated successfully");
      // Refresh list
      handleLookup();
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      setMessage(`❌ ${error.response?.data?.message || "Error updating bin"}`);
    }
  };

  // ✅ Delete a patient
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/delete/${id}`);
      setMessage("✅ Patient deleted");
      // Refresh list
      handleLookup();
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      setMessage(`❌ ${error.response?.data?.message || "Error deleting patient"}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        📋 Patient Bin Manager
      </h2>

      {/* Phone Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">📞 Phone Number</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Bin Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">📦 Bin Number</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={binNumber}
          onChange={(e) => setBinNumber(e.target.value)}
        />
      </div>

      {/* Action Buttons */}
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
      </div>

      {/* Message */}
      {message && <div className="text-sm text-center mt-2">{message}</div>}

      {/* Patient List */}
      {patients.length > 0 && (
        <table className="w-full mt-6 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Bin Number</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p._id}>
                <td className="border px-4 py-2 text-center">{p.binNumber}</td>
                <td className="border px-4 py-2 text-center flex justify-center gap-3">
                  {/* Edit Bin */}
                  <FaEdit
                    className="text-yellow-500 cursor-pointer"
                    onClick={() => {
                      const newBin = prompt("Enter new bin number:", p.binNumber);
                      if (newBin) handleUpdate(p._id, newBin);
                    }}
                  />
                  {/* Delete Patient */}
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this patient?")) {
                        handleDelete(p._id);
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientForm;
