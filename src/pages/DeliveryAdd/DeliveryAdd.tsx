import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import useDeliveryCharges from "../../hooks/useDeliveryCharges";

const DeliveryAdd = () => {
  const { charges, addCharge, updateCharge, deleteCharge } =
    useDeliveryCharges();
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    priceFirstKg: "",
    priceExtraKg: "",
    status: "Active" as "Active" | "Inactive",
  });

  const handleSave = async () => {
    const dataToSend = {
      serviceCompany: formData.company,
      firstKGCost: parseFloat(formData.priceFirstKg),
      extraKGCost: parseFloat(formData.priceExtraKg),
      status: formData.status,
    };
    try {
      if (isEditMode && editId) {
        await updateCharge(editId, dataToSend);
        alert("Delivery charge updated successfully");
      } else {
        await addCharge(dataToSend);
        alert("Delivery charge added successfully");
      }
      setShowForm(false);
    } catch (err) {
      alert("Failed to save delivery charge");
      console.error("Error saving delivery charge", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Delivery Charges</h2>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center"
          onClick={() => {
            setFormData({
              company: "",
              priceFirstKg: "",
              priceExtraKg: "",
              status: "Active",
            });
            setIsEditMode(false);
            setEditId(null);
            setShowForm(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Delivery Charge
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-gray-300">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider border-b border-gray-300">
                Shipping Company
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider border-b border-gray-300">
                1st 1Kg Price
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider border-b border-gray-300">
                Extra 1Kg Price
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider border-b border-gray-300">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {charges.map((entry) => (
              <tr
                key={entry._id}
                className="transition duration-200 hover:bg-gray-100 hover:shadow-sm"
              >
                <td className="px-6 py-4 border-b border-gray-200">
                  {entry.serviceCompany}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  Rs. {entry.firstKGCost}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  Rs. {entry.extraKGCost}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      entry.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {entry.status}
                  </span>
                </td>
                <td className="px-6 py-5 border-b border-gray-200 flex gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => {
                      setFormData({
                        company: entry.serviceCompany,
                        priceFirstKg: entry.firstKGCost.toString(),
                        priceExtraKg: entry.extraKGCost.toString(),
                        status: entry.status,
                      });
                      setEditId(entry._id ?? null);
                      setIsEditMode(true);
                      setShowForm(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => setConfirmDeleteId(entry._id ?? null)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
              {isEditMode ? "Edit Delivery Charge" : "Add Delivery Charge"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Company
                </label>
                <input
                  type="text"
                  placeholder="Eg: DHL Express"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price for 1st 1Kg
                </label>
                <input
                  type="number"
                  placeholder="Eg: 500"
                  value={formData.priceFirstKg}
                  onChange={(e) =>
                    setFormData({ ...formData, priceFirstKg: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price for Extra 1Kg
                </label>
                <input
                  type="number"
                  placeholder="Eg: 150"
                  value={formData.priceExtraKg}
                  onChange={(e) =>
                    setFormData({ ...formData, priceExtraKg: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "Active" | "Inactive",
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-1/2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center">
            <p className="text-lg font-medium text-gray-800 mb-4">
              Are you sure you want to delete this delivery charge?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={async () => {
                  if (confirmDeleteId) {
                    await deleteCharge(confirmDeleteId);
                    setConfirmDeleteId(null);
                  }
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAdd;
