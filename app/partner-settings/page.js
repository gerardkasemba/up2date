"use client";
import { useState } from "react";
import Layout from '../../components/partner-comp/Layout';

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    password: "",
    confirmPassword: "",
    paymentMethod: "PayPal",
    paypalEmail: "john.doe@paypal.com",
    bankAccount: "",
    bankName: "",
    businessName: "SnabbShop",
    businessEmail: "support@snabbshop.com",
    businessPhone: "123-456-7890",
    businessAddress: "123 Business St, Boston, MA",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};

    // Basic form validation
    if (!formData.fullName) formErrors.fullName = "Full name is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    if (!formData.phoneNumber) formErrors.phoneNumber = "Phone number is required.";
    if (formData.password && formData.password !== formData.confirmPassword) {
      formErrors.password = "Passwords do not match.";
    }
    if (formData.paymentMethod === "PayPal" && !formData.paypalEmail) {
      formErrors.paypalEmail = "PayPal email is required.";
    }
    if (formData.paymentMethod === "Bank Transfer" && (!formData.bankAccount || !formData.bankName)) {
      formErrors.bankAccount = "Bank account details are required.";
    }

    return formErrors;
  };

  const handleSave = (section) => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setSuccessMessage(`${section} saved successfully!`);
      setErrors({});
    } else {
      setErrors(formErrors);
      setSuccessMessage("");
    }
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-4">Account Settings</h2>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        {/* User Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>
          </div>

          <button
            onClick={() => handleSave('User Information')}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none mt-4"
          >
            Save User Information
          </button>
        </div>

        {/* Security Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Security</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            onClick={() => handleSave('Security')}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none mt-4"
          >
            Save Security Settings
          </button>
        </div>

        {/* Business Information Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Business Information</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Business Email</label>
              <input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Business Phone</label>
              <input
                type="tel"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Business Address</label>
            <input
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => handleSave('Business Information')}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none mt-4"
          >
            Save Business Information
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-6 p-4 text-white bg-green-600 rounded-md">
            {successMessage}
          </div>
        )}
      </div>
    </Layout>
  );
}
