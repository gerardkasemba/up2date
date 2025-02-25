"use client";
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../Modal";

const samplePickups = [
  {
    id: "SP001",
    scheduleDays: ["Monday", "Wednesday", "Friday"],
    customDates: ["2024-10-10", "2024-10-15"],
    address: "123 Business St, Boston, MA",
    customer: "John Doe",
    quantity: 5,
    weight: 10,
    coverReturnExpense: true,
    price: 100,
  },
  {
    id: "SP002",
    scheduleDays: ["Tuesday", "Thursday"],
    customDates: ["2024-10-11"],
    address: "456 Business Ave, Boston, MA",
    customer: "Jane Smith",
    quantity: 3,
    weight: 6,
    coverReturnExpense: false,
    price: 75,
  },
];

const SchedulePickUp = () => {
  const [pickups, setPickups] = useState([]);
  const [editPickup, setEditPickup] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Simulate fetching pickups from an API
    setPickups(samplePickups);
  }, []);

  const handleEditPickup = (pickup) => {
    setEditPickup({ ...pickup });
    setShowEditModal(true);
  };

  const handleCancelPickup = (pickupId) => {
    const updatedPickups = pickups.filter((pickup) => pickup.id !== pickupId);
    setPickups(updatedPickups);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditPickup((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDayChange = (day) => {
    setEditPickup((prev) => ({
      ...prev,
      scheduleDays: prev.scheduleDays.includes(day)
        ? prev.scheduleDays.filter((d) => d !== day)
        : [...prev.scheduleDays, day],
    }));
  };

  const calculatePrice = () => {
    // Simulated price calculation based on weight and quantity
    const baseRate = 10;
    const weightRate = 2;
    const returnExpenseFee = editPickup.coverReturnExpense ? 15 : 0;
    const calculatedPrice =
      baseRate * editPickup.quantity + weightRate * editPickup.weight + returnExpenseFee;
    return calculatedPrice.toFixed(2);
  };

  const handleSave = () => {
    const updatedPickups = pickups.map((pickup) =>
      pickup.id === editPickup.id ? { ...editPickup, price: calculatePrice() } : pickup
    );
    setPickups(updatedPickups);
    setShowEditModal(false);
  };

  return (
    <div className="p-6 bg-white mt-4 shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Scheduled Pick-ups</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Schedule ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Days</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Custom Dates</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Address</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {pickups.length > 0 ? (
              pickups.map((pickup) => (
                <tr key={pickup.id} className="border-b">
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pickup.scheduleDays.join(", ")}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pickup.customDates.join(", ")}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pickup.address}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pickup.customer}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${pickup.price}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <button
                      className="text-blue-500 hover:underline mr-4"
                      onClick={() => handleEditPickup(pickup)}
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleCancelPickup(pickup.id)}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No scheduled pick-ups found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && editPickup && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Scheduled Pick-up"
        >
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={editPickup.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Days of the Week</label>
              <div className="grid grid-cols-3 gap-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                  (day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        name="scheduleDays"
                        checked={editPickup.scheduleDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                        className="mr-2"
                      />
                      {day}
                    </label>
                  )
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Custom Dates</label>
              <input
                type="text"
                name="customDates"
                value={editPickup.customDates.join(", ")}
                onChange={(e) =>
                  setEditPickup({
                    ...editPickup,
                    customDates: e.target.value.split(",").map((date) => date.trim()),
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter dates separated by commas"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={editPickup.quantity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={editPickup.weight}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cover Return Expense</label>
              <input
                type="checkbox"
                name="coverReturnExpense"
                checked={editPickup.coverReturnExpense}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span>Yes</span>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700">
                Price Per Pick-Up: ${calculatePrice()}
              </p>
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SchedulePickUp;
