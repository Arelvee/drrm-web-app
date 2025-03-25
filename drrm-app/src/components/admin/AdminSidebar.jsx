import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase"; // Import Firestore
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore functions
import UPLogo from "../../assets/UP.png";
import UPDrrm from "../../assets/updrrm.png";
import UPNAME from "../../assets/dname-yw-v2.png";
import { BookOpenText, LogOutIcon, PackageOpenIcon } from "lucide-react";

const AdminSidebar = ({ adminName }) => {
  const navigate = useNavigate(); // Redirect hook
  const [manualCount, setManualCount] = useState(0); // State for manuals count
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0); // State for pending orders

  // Fetch the count of manuals
  useEffect(() => {
    const fetchManuals = async () => {
      try {
        const manualsRef = collection(db, "manuals"); // Reference to manuals collection
        const manualSnapshot = await getDocs(manualsRef);
        setManualCount(manualSnapshot.size); // Set the count of documents
      } catch (error) {
        console.error("Error fetching manuals:", error);
      }
    };

    // Fetch the count of pending orders
    const fetchPendingOrders = async () => {
      try {
        const ordersRef = collection(db, "orders"); // Reference to orders collection
        const q = query(ordersRef, where("status", "==", "pending")); // Filter only pending orders
        const orderSnapshot = await getDocs(q);
        setPendingOrdersCount(orderSnapshot.size); // Set the count of pending orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchManuals();
    fetchPendingOrders();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to homepage after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-1/5 fixed h-screen bg-red-900 text-white flex flex-col p-4 overflow-hidden">
      {/* Company Logo */}
      <div className="flex flex-wrap items-center justify-center mb-6 max-w-full">
        <div className="flex gap-4 mb-4">
          <img src={UPLogo} alt="UP Logo" className="h-12 max-w-full object-contain" />
          <img src={UPDrrm} alt="UP DRRM" className="h-12 max-w-full object-contain" />
        </div>
        <img src={UPNAME} alt="UP Name" className="h-12 max-w-full object-contain" />
      </div>

      {/* Admin Name */}
      <div className="text-center mb-6">
        <p className="text-lg font-bold">Admin Panel</p>
        <p className="text-sm text-gray-400">{adminName}</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {/* Manuals Link */}
        <Link
          to="/admin/manual-post"
          className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-700"
        >
          <div className="flex items-center gap-2">
            <BookOpenText size={25} /> Manuals
          </div>
          <span className="bg-white text-red-800 text-sm font-bold px-2 py-1 rounded">{manualCount}</span>
        </Link>
        {/* Orders Link */}
        <Link
          to="/admin/orders"
          className="flex items-center justify-between px-4 py-2 rounded hover:bg-gray-700"
        >
          <div className="flex items-center gap-2">
            <PackageOpenIcon size={25} /> Orders
          </div>
          <span className="bg-white text-red-800 text-sm font-bold px-2 py-1 rounded">{pendingOrdersCount}</span>
        </Link>
      </nav>

      {/* Logout Button at Bottom */}
      <button
        onClick={handleLogout}
        className="flex items-center text-white font-semibold text-sm px-4 py-2 bg-red-800 rounded hover:bg-gray-700 transition mt-auto gap-2 text-center"
      >
        <LogOutIcon size={25} /> Log Out
      </button>
    </div>
  );
};

export default AdminSidebar;
