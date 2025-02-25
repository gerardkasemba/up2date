"use client";
import Layout from '../../components/partner-comp/Layout';
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const paymentData = [
  { id: 1, customer: "John Doe", date: "2024-10-01", total: "$120", status: "Paid", company: "SnabbDeal" },
  { id: 2, customer: "Jane Smith", date: "2024-10-03", total: "$80", status: "Pending", company: "FastTrack" },
  { id: 3, customer: "David Brown", date: "2024-10-05", total: "$50", status: "Paid", company: "SnabbDeal" },
  // Add more data as needed
];

export default function PaymentReports() {
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    status: "",
    company: "",
  });

  const [filteredData, setFilteredData] = useState(paymentData);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = () => {
    const { startDate, endDate, status, company } = filter;
    let filtered = paymentData;

    if (startDate) {
      filtered = filtered.filter((data) => new Date(data.date) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter((data) => new Date(data.date) <= new Date(endDate));
    }

    if (status) {
      filtered = filtered.filter((data) => data.status === status);
    }

    if (company) {
      filtered = filtered.filter((data) => data.company === company);
    }

    setFilteredData(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("SnabbDeal Payment Reports", 14, 22);

    const headers = [["Customer", "Date", "Total", "Status", "Company"]];
    const data = filteredData.map((row) => [
      row.customer, row.date, row.total, row.status, row.company
    ]);

    doc.autoTable({
      startY: 30,
      head: headers,
      body: data,
    });

    doc.save("snabbdeal_payment_reports.pdf");
  };

  return (
    <Layout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">Payment Reports</h2>

        {/* Filter Options */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filter.startDate}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filter.endDate}
              onChange={handleFilterChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Payment Status</label>
            <select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              className="w-full p-3.5 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Delivery Company */}
          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <select
              name="company"
              value={filter.company}
              onChange={handleFilterChange}
              className="w-full p-3.5 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="SnabbDeal">SnabbDeal</option>
              <option value="FastTrack">FastTrack</option>
              {/* Add more company options as needed */}
            </select>
          </div>
        </div>

        {/* Filter & Download Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={applyFilter}
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Apply Filter
          </button>
          <button
            onClick={generatePDF}
            className=" text-orange-600 p-3 rounded-md hover:text-orange-700"
          >
            Download Report
          </button>
        </div>

        {/* Payment Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Company</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="py-2 px-4">{payment.customer}</td>
                  <td className="py-2 px-4">{payment.date}</td>
                  <td className="py-2 px-4">{payment.total}</td>
                  <td className="py-2 px-4">{payment.status}</td>
                  <td className="py-2 px-4">{payment.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
