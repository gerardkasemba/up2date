"use client";
import Layout from '../../components/partner-comp/Layout';
import { useState } from "react";

export default function DeliverySettings() {
  const [settings, setSettings] = useState({
    defaultDeliveryMethod: "Same Day",
    timeSlots: {
      morning: false,
      afternoon: true,
      evening: false,
    },
    specialInstructions: "",
    enableNotifications: true,
    enableReturnService: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setSettings((prevState) => ({
        ...prevState,
        timeSlots: {
          ...prevState.timeSlots,
          [name]: checked,
        },
      }));
    } else if (name === "enableNotifications" || name === "enableReturnService") {
      setSettings((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setSettings((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can submit the settings to the backend
    console.log("Delivery settings saved:", settings);
  };

  return (
    <Layout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">Delivery Settings</h2>
        <form onSubmit={handleSubmit}>
          {/* Default Delivery Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Default Delivery Method</label>
            <select
              name="defaultDeliveryMethod"
              value={settings.defaultDeliveryMethod}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="Same Day">Same Day</option>
              <option value="Next Day">Next Day</option>
              <option value="Two Days">Two Days</option>
            </select>
          </div>

          {/* Delivery Time Slots */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Preferred Delivery Time Slots</label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="morning"
                  checked={settings.timeSlots.morning}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Morning (8 AM - 12 PM)
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="afternoon"
                  checked={settings.timeSlots.afternoon}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Afternoon (12 PM - 4 PM)
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="evening"
                  checked={settings.timeSlots.evening}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Evening (4 PM - 8 PM)
              </label>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Special Instructions for the Driver</label>
            <textarea
              name="specialInstructions"
              value={settings.specialInstructions}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              rows="4"
              placeholder="E.g., Leave at front door if not available"
            />
          </div>

          {/* Enable Notifications */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Enable Delivery Notifications</label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="enableNotifications"
                checked={settings.enableNotifications}
                onChange={handleInputChange}
                className="mr-2"
              />
              Yes, send notifications to my customers.
            </label>
          </div>

          {/* Enable Return Service */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Enable Return Service</label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="enableReturnService"
                checked={settings.enableReturnService}
                onChange={handleInputChange}
                className="mr-2"
              />
              Yes, allow customers to request returns.
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
