import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard.jsx";
import ManualPost from "./ManualPost.jsx";
import Sidebar from "./AdminSidebar.jsx";
import AdminHeader from "./AdminHeader.jsx";
import Orders from "./Orders.jsx";
import NewsPost from "./NewsPost.jsx";
import ReviewsPost from './ReviewsPost.jsx';

function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AdminHeader onMenuToggle={() => setMenuOpen(true)} />

      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="flex-1 p-6 mt-16 md:mt-0"> {/* Push down for mobile header */}
        <Routes>
          <Route path="/" element={<Navigate to="manual-post" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="news-post" element={<NewsPost />} />
          <Route path="manual-post" element={<ManualPost />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reviews-post" element={<ReviewsPost />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminLayout;
