"use client";
import { useState } from "react";
import Layout from '../../components/partner-comp/Layout';
import SchedulePickUp from "@/components/partner-comp/SchedulePickUp";

const ordersData = [
  {
    id: 1,
    customerName: "John Doe",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    orderTotal: "$120",
    paymentStatus: "Paid",
    deliveryAddress: "123 Main St, City, State",
    orderDetails: "2x Product A, 1x Product B",
    quantity: 3,
    weightPerQuantity: 5,
    deliveryDate: "2024-10-10",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    phoneNumber: "987-654-3210",
    email: "jane@example.com",
    orderTotal: "$80",
    paymentStatus: "Pending",
    deliveryAddress: "456 Oak St, City, State",
    orderDetails: "1x Product C",
    quantity: 1,
    weightPerQuantity: 2,
    deliveryDate: "2024-10-11",
  },
  // Add more orders as needed
];

export default function ManageOrders() {
  const [orders, setOrders] = useState(ordersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Function to filter orders based on search input
  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.phoneNumber.includes(searchTerm) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder({ ...editingOrder, [name]: value });
  };

  const handleUpdateOrder = () => {
    const updatedOrders = orders.map(order =>
      order.id === editingOrder.id ? editingOrder : order
    );
    setOrders(updatedOrders);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>

        {/* Search Filter */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Customer Name, Email, or Phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Weight</th>
                <th className="py-2 px-4 text-left">Date to be Delivered</th>
                <th className="py-2 px-4 text-left">Order Total</th>
                <th className="py-2 px-4 text-left">Payment Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-2 px-4">{order.customerName}</td>
                  <td className="py-2 px-4">{order.quantity}</td>
                  <td className="py-2 px-4">{order.weightPerQuantity} kg</td>
                  <td className="py-2 px-4">{order.deliveryDate}</td>
                  <td className="py-2 px-4">{order.orderTotal}</td>
                  <td className="py-2 px-4">{order.paymentStatus}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEditOrder(order)}
                      className=" text-blue-500 px-3 py-1 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className=" text-red-500 px-3 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">Edit Order</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={editingOrder.customerName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            {/* Email and Phone Number on the same line */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={editingOrder.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingOrder.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Quantity and Weight */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={editingOrder.quantity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Weight per Quantity</label>
                <input
                  type="number"
                  name="weightPerQuantity"
                  value={editingOrder.weightPerQuantity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Date to be Delivered */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date to be Delivered</label>
              <input
                type="date"
                name="deliveryDate"
                value={editingOrder.deliveryDate}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end">
              <button
                onClick={handleUpdateOrder}
                className="bg-orange-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <SchedulePickUp />
    </Layout>
  );
}
