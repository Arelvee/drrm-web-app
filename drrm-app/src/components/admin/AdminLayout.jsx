import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard.jsx";
import ManualPost from "./ManualPost.jsx";
import Sidebar from "./AdminSidebar.jsx";
import Orders from "./Orders.jsx";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Stays Fixed on the Side */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="manual-post" />} /> {/* Default Redirect */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manual-post" element={<ManualPost />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
  
}

export default AdminLayout;
