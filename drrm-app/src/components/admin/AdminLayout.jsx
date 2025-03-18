import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard.jsx";
import ManualPost from "./ManualPost.jsx";
import Sidebar from "./AdminSidebar.jsx";

function AdminLayout() {
  return (
    <div>
      <main className="p-6">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Navigate to="manual-post" />} /> {/* Default Redirect */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manual-post" element={<ManualPost />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminLayout;

