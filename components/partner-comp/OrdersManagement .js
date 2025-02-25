"use client";
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';

// bg-[#024BBE]

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold selected order
  const [isChatOpen, setIsChatOpen] = useState(false); // State to hold chatbox visibility

  const sampleOrders = [
    {
      id: '001',
      customer: 'John Doe',
      status: 'On route',
      deliveryTime: '2024-10-05 12:00 PM',
      orderTotal: '$150.00',
      paymentStatus: 'Paid',
      driver: {
        name: 'Alex Johnson',
        phone: '+1 234 567 8901',
        vehicle: 'Toyota Prius - Blue',
        licensePlate: 'XYZ-1234',
        photo: '/driver-avatar.jpg',
      }
    },
    // More sample orders...
  ];

  useEffect(() => {
    setOrders(sampleOrders);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredOrders = orders.filter(
    (order) =>
      (filterStatus ? order.status === filterStatus : true) &&
      (searchTerm
        ? order.id.includes(searchTerm) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
  );

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const toggleChatbox = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Orders Status</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-4 mb-4">
        <div className="flex items-center space-x-2 mb-2 md:mb-0 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by order ID or customer"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <FiSearch className="text-gray-500" />
        </div>

        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="w-full md:w-48 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Filter by status</option>
          <option value="On route">On route</option>
          <option value="Arrived">Arrived</option>
          <option value="Picked">Picked</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Delivery Time
              </th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Order Total
              </th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedOrder(order)} // Click event to show driver info
                >
                  <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'On route'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Arrived'
                          ? 'bg-purple-100 text-purple-800'
                          : order.status === 'Picked'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">{order.deliveryTime}</td>
                  <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">{order.orderTotal}</td>
                  <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Driver Information Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/3 relative">
            <h2 className="text-2xl font-bold mb-4">Driver Information</h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={selectedOrder.driver.photo}
                alt="Driver Photo"
                className="w-16 h-16 rounded-full shadow-md"
              />
              <div>
                <p className="font-semibold text-gray-800">{selectedOrder.driver.name}</p>
                <p className="text-gray-500">{selectedOrder.driver.phone}</p>
              </div>
              {/* Chat Icon */}
              <button onClick={toggleChatbox} className="ml-auto text-orange-600 hover:text-orange-800">
                <AiOutlineMessage size={24} />
              </button>
            </div>
            <p className="mb-2">
              <strong>Vehicle:</strong> {selectedOrder.driver.vehicle}
            </p>
            <p className="mb-2">
              <strong>License Plate:</strong> {selectedOrder.driver.licensePlate}
            </p>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-red-600 text-3xl bold text-white p-2 rounded-full hover:text-red-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Chatbox */}
      {isChatOpen && (
        <div className="fixed bottom-4 border right-20 w-72 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="bg-orange-500 text-white p-4 flex items-center justify-between">
            <h4 className="text-lg font-bold">Chat with Alexi</h4>
            <button onClick={toggleChatbox} className="focus:outline-none">
              &times;
            </button>
          </div>
          <div className="p-4 h-40 overflow-y-auto">
            {/* Placeholder chat messages */}
            <div className="mb-2">
              <p className="bg-gray-200 p-2 rounded-lg text-sm">Hello, I will arrive shortly.</p>
              <span className="text-xs text-gray-500">Driver - 10:30 AM</span>
            </div>
            <div className="mb-2 text-right">
              <p className="bg-orange-400 text-white p-2 rounded-lg text-sm">Great, thank you!</p>
              <span className="text-xs text-gray-500">You - 10:32 AM</span>
            </div>
          </div>
          <div className="p-2 border-t flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 text-sm border rounded-l-lg focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg text-sm">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
