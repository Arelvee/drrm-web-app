import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, collection, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/firebase";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [] } = location.state || {}; // Ensure cartItems is an array

  // State for customer details
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    contact: "",
    notes: "",
  });

  // Redirect user if no cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Redirecting to shop...");
      navigate("/shop");
    }
  }, [cartItems, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  // Handle Checkout
  const handleCheckout = async () => {
    if (!auth.currentUser) {
      alert("Please log in to checkout.");
      return;
    }

    if (!customerInfo.name || !customerInfo.address || !customerInfo.contact) {
      alert("Please fill in all required fields.");
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);

    try {
      // Save the order
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        cartItems,
        customerInfo,
        status: "pending",
        createdAt: new Date(),
      });

      // Clear cart in Firestore after checkout
      await updateDoc(userRef, { cart: [] });

      alert("Order placed successfully!");
      navigate("/shop"); // Redirect after checkout
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="p-6 mt-20 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Checkout</h1>

      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.manualId}>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">₱ {item.price}.00</td>
              <td className="border px-4 py-2">{item.quantity || 1}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Customer Details Form */}
      <div className="mb-4">
        <label className="block font-semibold">Name:</label>
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Address:</label>
        <input
          type="text"
          name="address"
          value={customerInfo.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Contact Number:</label>
        <input
          type="text"
          name="contact"
          value={customerInfo.contact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Message Notes:</label>
        <textarea
          name="notes"
          value={customerInfo.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-green-600 text-white py-2 rounded shadow hover:bg-green-700"
      >
        ✅ Confirm Order
      </button>
    </div>
  );
};

export default Checkout;