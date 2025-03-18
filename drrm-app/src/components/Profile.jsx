import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const MyPurchase = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;
      
      const userId = auth.currentUser.uid;
      const orderRef = collection(db, "orders");
      const q = query(orderRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      
      const orderList = [];
      querySnapshot.forEach((doc) => orderList.push({ id: doc.id, ...doc.data() }));
      setOrders(orderList);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4">My Purchases</h2>
      {orders.length === 0 ? (
        <p>No purchases made yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border p-4 mb-2 rounded">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.title} - ₱{item.price}.00</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPurchase;
