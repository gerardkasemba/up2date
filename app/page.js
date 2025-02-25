// pages/dashboard.js
"use client"
import OrdersManagement from '@/components/partner-comp/OrdersManagement ';
// pages/index.js
import Layout from '../components/partner-comp/Layout';
import { RiTruckFill, RiFileListLine, RiCheckFill } from 'react-icons/ri';
import DeliveryPerformanceInsights from '@/components/partner-comp/DeliveryPerformanceInsights';
import PartnerAnnouncements from '@/components/partner-comp/PartnerAnnouncements';

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-600 mb-8 mt-4">Welcome, Baraka Juice</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* New Orders */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-500">New Orders</h2>
            <RiFileListLine className="text-2xl text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-500 mt-4">5</p>
        </div>

        {/* Ongoing Deliveries */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-orange-500">Ongoing Deliveries</h2>
            <RiTruckFill className="text-2xl text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-500 mt-4">3</p>
        </div>

        {/* Completed Deliveries */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-green-500">Completed Deliveries</h2>
            <RiCheckFill className="text-2xl text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-500 mt-4">20</p>
        </div>
      </div>
      {/* Driver Availability */}
      <div className="mt-8">
        <OrdersManagement />
      </div>
      <div className="mt-8">
        <PartnerAnnouncements />
      </div>
      <div className="mt-8">
        <DeliveryPerformanceInsights />
      </div>

    </Layout>
  );
}
