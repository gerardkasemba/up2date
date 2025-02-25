"use client"
import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';

const PartnerAnnouncements = () => {
  // Announcements data
  const [announcements] = useState([
    {
      id: 1,
      title: 'New Delivery Zones Added',
      content: 'We’ve expanded our service areas to cover new cities in the Northeast region.',
      date: 'October 5, 2024',
    },
    {
      id: 2,
      title: 'Holiday Delivery Schedule',
      content: 'Please note that during the holiday season, delivery times may vary. We advise customers to schedule deliveries 24 hours in advance.',
      date: 'September 29, 2024',
    },
    {
      id: 3,
      title: 'Driver Safety Protocols Updated',
      content: 'We’ve updated our safety protocols for drivers to ensure smooth deliveries during inclement weather conditions.',
      date: 'September 18, 2024',
    },
  ]);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Partner Announcements</h2>
        <FiBell className="text-[#FBB040] text-2xl" />
      </div>

      <ul className="space-y-4">
        {announcements.map((announcement) => (
          <li key={announcement.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
              <span className="text-sm text-gray-500">{announcement.date}</span>
            </div>
            <p className="text-gray-700 mt-2">{announcement.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartnerAnnouncements;
