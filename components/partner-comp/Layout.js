"use client";
import "../../styles/globals.css";
import { useState } from "react";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import { AiOutlineHome, AiOutlineSetting, AiOutlineDollarCircle } from "react-icons/ai";
import { RiOrderPlayLine, RiFileListLine, RiCustomerService2Line, RiTruckLine, RiTerminalBoxLine, RiSignpostFill  } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const pathname = usePathname();
  const toggleNavbar = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/partner", label: "Dashboard", icon: <AiOutlineHome /> },
    { href: "/partner-create-order", label: "Create New Order", icon: <RiOrderPlayLine /> },
    { href: "/partner-manage-order", label: "Manage Orders", icon: <RiFileListLine /> },
    { href: "/partner-payment-reports", label: "Payment Reports", icon: <AiOutlineDollarCircle /> },
    // { href: "/partner-delivery-settings", label: "Delivery Settings", icon: <RiTruckLine /> },
    { href: "/partner-settings", label: "Account Settings", icon: <AiOutlineSetting /> },
    { href: "/partner-api-settings", label: "API Settings", icon: <RiTerminalBoxLine /> },
    { href: "/partner-integration-help", label: "Integration Help", icon: <RiSignpostFill /> },
    { href: "/partner-support", label: "Support", icon: <RiCustomerService2Line /> },
  ];

  const notifications = [
    { id: 1, text: "New order received from XYZ" },
    { id: 2, text: "Delivery status updated to 'Delivered'" },
    { id: 3, text: "New message from SnabbDeal support" },
  ];

  const unreadCount = notifications.length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="flex items-center space-x-4">
          <button onClick={toggleNavbar} className="text-white focus:outline-none md:hidden">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <Link href="/partner">
            <h1 className="text-2xl font-bold">SnabbDeal</h1>
          </Link>
        </div>

        {/* Notification and Profile section */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          <div className="relative">
            <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative focus:outline-none">
              <FiBell size={24} />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10">
                <h4 className="text-lg font-bold mb-2">Notifications</h4>
                <ul className="space-y-2">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="text-sm text-gray-700">
                      {notification.text}
                    </li>
                  ))}
                </ul>

                {/* View More Link */}
                <div className="mt-4 text-right">
                  <Link href="/partner-notifications">
                    <span className="text-blue-600 hover:underline cursor-pointer">View More</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <Image src="/gerard-avatar.jpg" alt="Profile" width={40} height={40} className="rounded-full" />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isOpen && (
        <nav className="bg-blue-900 text-white space-y-4 p-6 md:hidden fixed top-16 left-0 w-3/4 h-full shadow-lg z-40 overflow-y-auto">
          {menuItems.map(({ href, label, icon }) => (
            <Link href={href} key={label}>
              <span
                className={`flex items-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-all ${
                  pathname === href ? "bg-blue-800 text-orange-400" : ""
                }`}
              >
                <span className="mr-4">{icon}</span>
                {label}
              </span>
            </Link>
          ))}
        </nav>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col bg-blue-800 text-white h-screen w-64 fixed top-16 shadow-lg overflow-y-auto">
        <nav className="flex flex-col space-y-4 p-6">
          {menuItems.map(({ href, label, icon }) => (
            <Link href={href} key={label}>
              <span
                className={`flex items-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-all ${
                  pathname === href ? "bg-blue-900 text-orange-400" : ""
                }`}
              >
                <span className="mr-4">{icon}</span>
                <span className="font-semibold">{label}</span>
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 mt-16 ml-0 md:ml-64">{children}</main>
    </div>
  );
}
