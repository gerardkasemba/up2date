"use client";
import { useRouter } from 'next/navigation'; // For navigation
import { useState } from "react";
import Layout from '../../components/partner-comp/Layout';

export default function CreateOrderForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    email: "",
    deliveryAddress: "",
    orderDetails: "",
    quantity: 1,
    weightPerQuantity: 1,
    dropoffDate: "",
    dropoffTime: "",
    coverReturnExpense: false,
    agreementAccepted: false,
    repeatedPickup: false,
    selectedDays: [], // To store selected days of the week
    customDates: [], // To store selected custom dates
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const [priceDetails, setPriceDetails] = useState({});
  const [showAgreementModal, setShowAgreementModal] = useState(false); // State for modal visibility

  const router = useRouter(); // Next.js router for redirection

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const validateForm = () => {
    let formErrors = {};
    if (!formData.customerName) formErrors.customerName = "Customer name is required.";
    if (!formData.phoneNumber) formErrors.phoneNumber = "Phone number is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    if (!formData.deliveryAddress) formErrors.deliveryAddress = "Delivery address is required.";
    if (!formData.agreementAccepted) formErrors.agreementAccepted = "You must accept the agreement.";
    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle selecting days of the week for repeated pickup
  const handleDayChange = (day) => {
    setFormData((prevState) => {
      const isSelected = prevState.selectedDays.includes(day);
      const updatedDays = isSelected
        ? prevState.selectedDays.filter((d) => d !== day)
        : [...prevState.selectedDays, day];
      return { ...prevState, selectedDays: updatedDays };
    });
  };

  // Handle adding custom dates for repeated pickup
  const handleAddDate = (e) => {
    const newDate = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      customDates: [...prevState.customDates, newDate],
    }));
  };

  // Calculate the delivery price based on the form data
  const calculateDeliveryPrice = () => {
    const basePricePerMile = 1.50; // $1.50 per mile
    const initialPricePerPackage = 5.00; // Initial $5.00 per package
    const weightSurcharge = 0.10; // $0.10 per pound
    const discountPerAdditionalPackage = 0.50; // $0.50 discount for each additional package

    const distance = 10; // Distance should be calculated based on pickup and delivery locations
    const distanceCost = basePricePerMile * distance;
    let packageCost = 0;
    for (let i = 0; i < formData.quantity; i++) {
      packageCost += initialPricePerPackage - (discountPerAdditionalPackage * i);
    }

    const totalWeight = formData.quantity * formData.weightPerQuantity;
    const weightCost = weightSurcharge * totalWeight;

    const totalCost = distanceCost + packageCost + weightCost;

    setTotalPrice(totalCost.toFixed(2));
    setPriceDetails({
      distanceCost: distanceCost.toFixed(2),
      packageCost: packageCost.toFixed(2),
      weightCost: weightCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      localStorage.setItem('orderData', JSON.stringify(formData));
      router.push('/pdf');
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Layout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">Create New Order</h2>
        <form onSubmit={handleSubmit}>
          {/* Customer Information */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
          </div>

          {/* Email and Phone Number on the same line */}
          <div className="flex gap-4 mb-4">
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
          </div>

          {/* Delivery Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Delivery Address</label>
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.deliveryAddress && <p className="text-red-500 text-sm">{errors.deliveryAddress}</p>}
          </div>

          {/* Order Details */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Order Details</label>
            <textarea
              name="orderDetails"
              value={formData.orderDetails}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              rows="3"
            />
          </div>

          {/* Quantity and Weight per Quantity */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Weight per Quantity</label>
              <input
                type="number"
                name="weightPerQuantity"
                value={formData.weightPerQuantity}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Dropoff Date and Time */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Dropoff Date</label>
              <input
                type="date"
                name="dropoffDate"
                value={formData.dropoffDate}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Dropoff Time</label>
              <input
                type="time"
                name="dropoffTime"
                value={formData.dropoffTime}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Schedule Repeated Pickup */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Schedule Repeated Pickup</label>
            <input
              type="checkbox"
              name="repeatedPickup"
              checked={formData.repeatedPickup}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Yes</span>

            {formData.repeatedPickup && (
              <div className="mt-2">
                <label className="block text-sm font-medium mb-2">Select Days of the Week</label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={day}
                        onChange={() => handleDayChange(day)}
                        checked={formData.selectedDays.includes(day)}
                        className="mr-2"
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Or Select Custom Dates</label>
                  <input
                    type="date"
                    onChange={handleAddDate}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <div className="mt-2">
                    {formData.customDates.map((date, index) => (
                      <span key={index} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2">
                        {date}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cover Return Expense */}
          <div className="mb-4 bg-gray-100 p-4 rounded">
            <label className="block text-sm font-medium mb-2">Cover Return Expense</label>
            <input
              type="checkbox"
              name="coverReturnExpense"
              checked={formData.coverReturnExpense}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Yes</span>
            <p className="mt-2 text-sm text-gray-600">
              By checking this option, you agree to cover the return expense of the package in case the delivery cannot be completed. 
              If the recipient refuses the package or cannot be reached, the package will be returned at the additional expense of the sender.
            </p>
          </div>

          {/* Pricing Calculation */}
          <div className="mt-6">
            <button
              type="button"
              onClick={calculateDeliveryPrice}
              className="w-full bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 focus:outline-none"
            >
              Calculate Delivery Price
            </button>
            {totalPrice > 0 && (
              <div className="mt-2 text-lg font-semibold">
                <p>Total Delivery Price: ${totalPrice}</p>
                <ul className="mt-2 text-sm text-gray-700">
                  <li>Distance Cost: ${priceDetails.distanceCost}</li>
                  <li>Package Cost: ${priceDetails.packageCost}</li>
                  <li>Weight Cost: ${priceDetails.weightCost}</li>
                </ul>
              </div>
            )}
          </div>

          {/* Agreement Checkbox */}
          <div className="mt-4">
            <input
              type="checkbox"
              name="agreementAccepted"
              checked={formData.agreementAccepted}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>I accept the <button type="button" className="text-blue-500" onClick={() => setShowAgreementModal(true)}>agreement</button>.</span>
            {errors.agreementAccepted && <p className="text-red-500 text-sm">{errors.agreementAccepted}</p>}
          </div>

          {/* Agreement Modal */}
          {showAgreementModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-md">
                <h3 className="text-xl font-bold mb-4">Order Agreement</h3>
                <p className="text-sm text-gray-600 mb-4">
                  By creating an order with SnabbDeal, you agree to our terms of service and privacy policy. 
                  This includes covering the return expenses if the delivery cannot be completed due to the recipient's unavailability. 
                  Please make sure the delivery address and all provided details are accurate.
                </p>
                <button
                  onClick={() => setShowAgreementModal(false)}
                  className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
