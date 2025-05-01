import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, updateDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { ReceiptText, XIcon, Search, ArrowUp, ArrowDown } from "lucide-react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [courier, setCourier] = useState("");
  const [receiptImage, setReceiptImage] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc"); // Default to descending


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (!courier || !receiptImage) {
      console.error("❌ Courier and receipt image are required.");
      return;
    }
  
    console.log("✅ Processing Order...");
    console.log("📦 Selected Order ID:", orderId);
    console.log("🚚 Selected Courier:", courier);
    console.log("🖼 Receipt Image:", receiptImage);
  
    try {
      // Prepare the file for upload
      const formData = new FormData();
      formData.append("receipt", receiptImage);
  
      console.log("📤 Uploading receipt...");
  
      // Send image to Express server
      const response = await fetch("http://localhost:5000/upload-receipt", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("❌ Failed to upload receipt");
      }
  
      const data = await response.json();
      console.log("✅ Upload Success:", data);
  
      const fullReceiptUrl = `http://localhost:5000${data.receiptUrl}`;
  
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { 
        status: newStatus, 
        courier, 
        processedTime: serverTimestamp(), 
        receiptUrl: fullReceiptUrl 
      });
  
      console.log("✅ Order Updated in Firestore");
  
      // Fetch updated order to get Firestore timestamp
      const updatedDoc = await getDoc(orderRef);
      const updatedData = updatedDoc.data();
  
      // Update state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { 
            ...order, 
            status: newStatus, 
            courier, 
            processedTime: updatedData.processedTime, 
            receiptUrl: fullReceiptUrl // Update state with full URL
          } : order
        )
      );
  
      console.log("✅ State Updated");
      setSelectedOrder(null); // Close modal
    } catch (error) {
      console.error("❌ Error updating order:", error);
    }
  };
  
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setCourier(order.courier || "");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setReceiptImage(file);
  };
  
  const filteredOrders = orders.filter(
    (order) =>
      order.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };
  
  // Sorting function for orders by createdAt timestamp
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0; // Handle missing timestamps
    return sortOrder === "asc"
      ? a.createdAt.toDate() - b.createdAt.toDate()
      : b.createdAt.toDate() - a.createdAt.toDate();
  });

  return (
    <div className="lg:ml-68 py-6 px-auto">
    <div className="  mb-5">
        <h2 className="font-bold mb-4">Overview</h2>

        <div className="flex gap-6">
          <div className=" p-6 rounded-lg shadow-md w-1/3 flex justify-between">
            
              <h3 className="font-semibold">Total Orders</h3>
              <p className="text-gray-700 font-semibold">{orders.filter(order => order.status).length}</p>
          </div>

          {/* Pending Orders */}
          <div className=" p-6 rounded-lg shadow-md w-1/3 bg-red-100 gap">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-red-900">Pending</h3>
              <p className="text-gray-700 text-5xl font-semibold">{orders.filter(order => order.status === "pending").length}</p>
            </div>
            <p className="text-gray-700">
              Total Amount: ₱{" "}
              {orders
                .filter(order => order.status === "pending")
                .reduce((acc, order) => acc + order.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), 0)}.00
            </p>
          </div>

          {/* Processed Orders */}
          <div className="p-6 rounded-lg shadow-md w-1/3 bg-green-100">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-green-900">Processed</h3>
              <p className="text-gray-700 text-5xl font-semibold">{orders.filter(order => order.status === "processed").length}</p>
            </div>
            <p className="text-gray-700">
              Total Amount: ₱{" "}
              {orders
                .filter(order => order.status === "processed")
                .reduce((acc, order) => acc + order.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), 0)}.00
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold"> Orders</h2>
        <div className="flex items-center border border-zinc-300 px-3 py-2 rounded-lg gap-2">
          <Search  className="text-gray-500" size={20}/>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none"
          />
        </div>
        
      </div>

      {filteredOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="p-2">Items</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2 items-center text-center justify-center">
                  <button onClick={toggleSortOrder} className="flex gap-1 text-center items-center">
                    Order At
                    {sortOrder === "desc" ? (
                      <span className="text-gray-500"><ArrowDown size={25}/></span> // Down arrow for descending
                    ) : (
                      <span className="text-gray-500"><ArrowUp size={25}/></span> // Up arrow for ascending
                    )}
                  </button>
                </th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
  {sortedOrders.map((order) => (
    <tr
      key={order.id}
      className="cursor-pointer text-center border-b border-gray-300 text-sm hover:bg-gray-200"
      onClick={() => handleOrderClick(order)}
    >
      <td className="p-2 text-gray-600">{order.id}</td>
      <td className="px-4 py-2">{order.customerInfo?.name || "Unknown"}</td>
      <td className="px-4 py-2">
        {order?.cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0}
      </td>

      <td className="px-4 py-2 text-red-900 font-bold">
        ₱ {order.cartItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0)}.00
      </td>
      <td className="px-4 py-2">
          {order.createdAt?.toDate().toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // Use 12-hour format
          }) || "N/A"}
      </td>

      <td className="px-4 py-2">
        <p
          className={`rounded-lg px-4 py-1 font-bold
          ${order.status === "pending" ? "bg-red-200 text-red-900" : 
            order.status === "processed" ? "bg-orange-200 text-orange-900" : 
            "bg-green-200 text-green-900"}`}
        >
          {order.status}
        </p>
      </td>
      <td className="px-4 py-2">
        <button className=" text-gray-500 px-3 py-1">
          <ReceiptText size={30} />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 !bg-gray-800/50 flex items-center justify-center p-4 z-30">
          <div className=" text-sm bg-white p-6 rounded-lg w-full max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xl"> <strong>Order ID :</strong> {selectedOrder.id}</p>

              <button className="text-gray-600" onClick={() => setSelectedOrder(null)}><XIcon size={30}/></button>
            </div>
            
            <div className="flex items-center"> 
              <p className="py-1 font-bold w-1/7">Customer:</p>
              <p>{selectedOrder.customerInfo?.name}</p>
              
            </div>
            <div className="flex items-center">
            <p className="py-1 font-bold w-1/7">Contact:</p>
            <p>{selectedOrder.customerInfo?.contact}</p>
            </div>
            <div className="flex items-center">
              <p className="py-1 font-bold w-1/7 ">Address:</p>
              <p>{selectedOrder.customerInfo?.address}</p>
            </div>
            <div className="flex items-center">
              <p className="py-2 font-bold w-1/7 ">Order Time:</p>
              <p>{selectedOrder.createdAt?.toDate().toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true, 
                      }) || "N/A"}</p>
            </div>
            
            {selectedOrder.processedTime && (
              <p className="text-green-700 font-semibold">
                Processed Time: {selectedOrder.processedTime.toDate().toLocaleString()}
              </p>
            )}

            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-300 text-left">Item</th>
                  <th className="px-4 py-2 border border-gray-300 text-left">Category</th>
                  <th className="px-4 py-2 border border-gray-300 text-left">Price</th>
                  <th className="px-4 py-2 border border-gray-300 text-left">Qnty.</th>
                  <th className="px-4 py-2 border border-gray-300 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 border border-gray-300">{item.title}</td>
                    <td className="px-4 py-2 border border-gray-300">{item.category}</td>
                    <td className="px-4 py-2 border border-gray-300">₱{item.price}.00</td>
                    <td className="px-4 py-2 border border-gray-300 text-center">{item.quantity}</td>
                    <td className="px-4 py-2 border border-gray-300 font-bold">₱{item.price * item.quantity}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center gap-4">
              <h3 className="font-semibold py-1">Courier Service:</h3>
              {selectedOrder.courier ? (
                <p className="py-2">{selectedOrder.courier}</p>
              ) : (
                <div className="flex gap-4">
                  {["LALAMOVE", "DHL Express", "LBC Express"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={option}
                        checked={courier === option}
                        onChange={(e) => setCourier(e.target.value)}
                        className="cursor-pointer accent-red-900"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            

            <h3 className="font-semibold py-1">Delivery Receipt:</h3>
            {selectedOrder.receiptUrl ? (
              <div className="mt-4">
              
              <img
                src={selectedOrder.receiptUrl.startsWith("http") ? selectedOrder.receiptUrl : `http://localhost:5000${selectedOrder.receiptUrl}`}
                alt="Receipt"
                className="mt-2 w-30 h-30 object-cover border rounded cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => setZoomedImage(selectedOrder.receiptUrl)} // Open zoom modal
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
            
            ):(
              
            <input type="file" accept="image/*" onChange={handleFileUpload} className="mt-2" />)
            }

            {/* Zoom Modal */}
            {zoomedImage && (
              <div className="fixed inset-0 !bg-black/70 flex justify-center items-center z-50">
                <div className="relative">
                  <button
                    className="absolute top-2 right-2 !bg-black/50 text-white p-2"
                    onClick={() => setZoomedImage(null)}
                  >
                    ✖
                  </button>
                  <img src={zoomedImage} alt="Zoomed Receipt" className="max-w-full max-h-[90vh] rounded-lg" />
                </div>
              </div>
            )}


            <div className="flex justify-end gap-4 mt-6">
              {selectedOrder.status !== "processed" && (
              <button
                className={`px-4 py-2 rounded ${courier && receiptImage ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={!courier || !receiptImage}
                onClick={() => updateOrderStatus(selectedOrder.id, "processed")}
              >
                Process Order
              </button>
            )}


            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
