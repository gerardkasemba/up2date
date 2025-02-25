"use client"
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FiTruck, FiClock, FiCheckCircle, FiMapPin, FiAlertCircle } from 'react-icons/fi';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DeliveryPerformanceInsights = () => {
  const data = {
    labels: ['This Week', 'Last Week', '2 Weeks Ago', '3 Weeks Ago'],
    datasets: [
      {
        label: 'Delivery Times (in hours)',
        data: [1.5, 2.2, 2.0, 3.5],
        backgroundColor: '#024BBE',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Performance Insights</h2>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm">
          <FiTruck className="text-3xl text-[#FBB040] mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Deliveries</h3>
            <p className="text-xl font-bold">54</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm">
          <FiClock className="text-3xl text-[#FBB040] mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Avg Delivery Time</h3>
            <p className="text-xl font-bold">2.1 hrs</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm">
          <FiAlertCircle className="text-3xl text-[#FBB040] mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Late Deliveries</h3>
            <p className="text-xl font-bold">3</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm">
          <FiCheckCircle className="text-3xl text-[#FBB040] mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Successful Deliveries</h3>
            <p className="text-xl font-bold">94%</p>
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="relative h-64">
        <Bar data={data} options={options} />
      </div>

      {/* Most Frequent Delivery Locations */}
      <div className="mt-8">
        <div className="flex items-center">
          <FiMapPin className="text-3xl text-[#FBB040] mr-4" />
          <h3 className="text-xl font-semibold text-gray-800">Most Frequent Delivery Locations</h3>
        </div>
        <ul className="mt-4">
          <li className="text-lg text-gray-700">- Boston, MA</li>
          <li className="text-lg text-gray-700">- Cambridge, MA</li>
          <li className="text-lg text-gray-700">- Quincy, MA</li>
        </ul>
      </div>
    </div>
  );
};

export default DeliveryPerformanceInsights;
