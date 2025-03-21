import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, collection, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/firebase";
import { Pencil, Truck, Package } from "lucide-react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const { cartItems = [] } = location.state || {}; // Ensure cartItems is an array

  // State for customer details
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    contact: "",
    notes: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      if (!auth.currentUser) return;
  
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists() && userSnap.data().addressInfo) {
        setCustomerInfo(userSnap.data().addressInfo);
      }
    };
  
    fetchAddress();
  }, [auth.currentUser]); // 👈 Trigger when the user logs in or changes

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
      // Begin Firestore batch operation (optional for efficiency)
      const batchUpdates = [];
  
      // Loop through each cart item to update stock
      for (const item of cartItems) {
        const manualRef = doc(db, "manuals", item.manualId);
        const manualSnap = await getDoc(manualRef);
  
        if (manualSnap.exists()) {
          const currentStock = manualSnap.data().stock || 0;
          const newStock = currentStock - (item.quantity || 1);
  
          if (newStock < 0) {
            alert(`Not enough stock for ${item.title}`);
            return;
          }
  
          batchUpdates.push(updateDoc(manualRef, { stock: newStock }));
        }
      }
  
      // Execute all stock updates
      await Promise.all(batchUpdates);
  
      // Save the order
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        cartItems,
        customerInfo,
        status: "pending",
        createdAt: new Date(),
      });
  
      // Save/update the address in the user document and clear the cart
      await updateDoc(userRef, { addressInfo: customerInfo, cart: [] });
  
      alert("Order placed successfully!");
      navigate("/shop");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };  
  
  return (
    <div className="p-6 mt-20 w-full">
  <h1 className="text-2xl font-bold mb-4">🛒 Checkout</h1>
  
  <div className="block lg:flex">
    {/* Cart Table */}
    <div className="lg:w-2/3">
      <table className="border-collapse  mb-4 w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.manualId} className="border-b border-gray-300">
              <td className="flex p-4 gap-4 items-center">
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.title}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <p ><span className="text-sm text-gray-500">{item.category} </span><br />{item.title}</p>
                    </td>
              <td className=" text-center p-4">₱ {item.price}.00</td>
              <td className=" text-center p-4">{item.quantity || 1}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Customer Details Form */}
      {showCustomerDetails && (
        <div className="fixed inset-0 !bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-3">Edit Drop-Off Address</h2>
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
            <div className="flex justify-end">
              <button 
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded" 
                onClick={() => setShowCustomerDetails(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded" 
                onClick={async () => {
                  if (!auth.currentUser) return;
                  const userRef = doc(db, "users", auth.currentUser.uid);

                  try {
                    // Update Firestore with the new address
                    await updateDoc(userRef, { addressInfo: customerInfo });

                    // Fetch updated address info to reflect changes immediately
                    const updatedUserSnap = await getDoc(userRef);
                    if (updatedUserSnap.exists() && updatedUserSnap.data().addressInfo) {
                      setCustomerInfo(updatedUserSnap.data().addressInfo);
                    }

                    alert("Address updated successfully!");
                    setShowCustomerDetails(false);
                  } catch (error) {
                    console.error("Error updating address:", error);
                  }
                }}
              >
                Save
              </button>

            </div>
          </div>
        </div>
      )}
    </div>

    {/* Order Summary Section */}
    <div className="lg:w-1/3 lg:ml-6">
      <div>
        <h2 className="text-base font-semibold bg-red-900 text-white p-2">Delivery Information</h2>
        <p className="text-lg font-bold flex items-center gap-2 my-3 text-red-900">
              <Package
                size={20} 
                onClick={() => setShowCustomerDetails(true)}
              /> Pick-up Address</p>
        
        <div className="border-l-2 border-gray-300 p-2 ml-2">
            <p className="text-lg font-bold">UPMNL-DDRM-H • 09208014528</p>
            <p className="text-gray-500">
              670 Padre Faura St, Ermita, Manila, 1000 Metro Manila
            </p>
        </div>

        {/* Drop-Off Address with Edit Icon */}
        <p className="text-lg font-bold flex items-center gap-2 my-3 text-red-900">
              <Truck 
                size={20} 
                onClick={() => setShowCustomerDetails(true)}
              />
              Drop-Off Address
              <Pencil 
                size={20} 
                className="text-gray-500 cursor-pointer hover:text-black ml-2" 
                onClick={() => setShowCustomerDetails(true)}
              />
            </p>

        <div className="border-l-2 border-gray-300 p-2 ml-2">
            <p className="text-lg font-bold">{customerInfo.name} • {customerInfo.contact}</p>
            <p className="text-gray-500">
            {customerInfo.address}
            </p>
        </div>

        <h2 className="text-base font-semibold bg-red-900 text-white p-2 mt-4">Order Summary</h2>
        <div className="flex justify-between text-lg text-gray-500 my-3">
          <p>Payment Methods: </p>
          <p className="text-red-900 font-bold">Cash on Delivery</p>
        </div>
        <div className="flex justify-between text-lg text-gray-500 my-3">
          <p>Total Items: </p>
          <p className="text-red-900 font-bold">{cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}</p>
        </div>
        <div className="flex justify-between text-lg text-gray-500 my-3">
          <p>Subtotal: </p>
          <p className="text-red-900 font-bold">₱ {cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)}.00</p>
        </div>

        {!customerInfo.address && (
          <button 
            className="mt-4 p-2 bg-green-600 text-white rounded-lg w-full" 
            onClick={() => setShowAddressForm(true)}
          >
              Add Drop-off Address
          </button>
        )}
      </div>

      {/* Confirm Order Button */}
      <button
        onClick={handleCheckout}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded shadow hover:bg-green-700"
      >
        Confirm Order
      </button>
    </div>
  </div>
</div>
  );
};

export default Checkout;