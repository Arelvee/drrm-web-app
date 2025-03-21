import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ adminName }) => {
  return (
    <div className="w-64 h-screen bg-red-900 text-white flex flex-col p-4">
      {/* Company Logo */}
      <div className="flex items-center justify-center mb-6">
        <img src="/logo.png" alt="Company Logo" className="w-20 h-20" />
      </div>

      {/* Admin Name */}
      <div className="text-center mb-6">
        <p className="text-lg font-bold">Admin Panel</p>
        <p className="text-sm text-gray-400">{adminName}</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <Link
          to="/admin/manual-post"
          className="block px-4 py-2 bg-red-800 rounded hover:bg-gray-700"
        >
          📖 Manuals
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
