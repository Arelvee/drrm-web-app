import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Package, Truck } from "lucide-react";

const OrderDetail = () => {
    const location = useLocation();
    const { orderId } = useParams();
    const [order, setOrder] = useState(location.state?.order || null);
    const [loading, setLoading] = useState(!order);
    const [error, setError] = useState(null);
    
    // Calculate totals
    const totalItems = order?.cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    const totalPrice = order?.cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

    useEffect(() => {
        if (order) return; // Avoid re-fetching if order is already available

        const fetchOrder = async () => {
            setLoading(true);
            setError(null);
            try {
                const orderRef = doc(db, "orders", orderId);
                const orderSnap = await getDoc(orderRef);

                if (orderSnap.exists()) {
                    setOrder(orderSnap.data());
                } else {
                    setError("Order not found");
                }
            } catch (err) {
                setError("Failed to load order details.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, order]);

    if (loading) return <p className="text-center mt-20">Loading order details...</p>;
    if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
    if (!order) return <p className="text-center mt-20 text-red-600">No order found.</p>;

    return (
        <div className="p-6 mt-20">
            <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>

            <p><strong>Order ID:</strong> {orderId}</p>

            </div>
            <div className="border border-gray-300 rounded-lg">
                <p className={`rounded-t-lg text-white px-4 py-2  ${order.status === "pending" ? "bg-red-900" : "bg-green-900"}`} >{order.status}</p>
                <div className="px-4 py-2">
                    <h3 className="text-lg">Items:</h3>
                    {order.cartItems && order.cartItems.length > 0 ? (
                        <ul>
                            {order.cartItems.map((item, index) => (
                                <li key={index} className="flex w-full items-center gap-4 border-b py-4">
                                    <img
                                        src={`http://localhost:5000${item.imageUrl}`}
                                        alt={item.title}
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                    <div className="flex flex-col flex-1 gap-2">
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium"><span className="text-gray-500">{item.category}</span><br />{item.title}</p>
                                            <p className="text-gray-600">x{item.quantity}</p>
                                        </div>
                                        <p className="text-red-900 font-semibold text-right">₱{item.price * item.quantity}.00</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No items in this order.</p>
                    )}

                    <h2 className="mt-4 text-lg">Delivery Information</h2>
                    <div className="block lg:flex w-full px-8">
                        <div className="w-full">
                            <p className="text-lg font-bold flex items-center gap-2 my-3 text-red-900">
                            <Package
                                size={20}
                            /> Pick-up Address</p>
                        
                            <div className="border-l-2 border-gray-300 p-2 ml-2">
                                <p className="text-lg font-bold">UPMNL-DDRM-H • 09208014528</p>
                                <p className="text-gray-500">
                                670 Padre Faura St, Ermita, Manila, 1000 Metro Manila
                                </p>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-lg font-bold flex items-center gap-2 my-3 text-red-900">
                            <Truck 
                                size={20} 
                            />
                            Drop-Off Address
                            </p>
                            <div className="border-l-2 border-gray-300 p-2 ml-2">
                                <p className="text-lg font-bold">{order.customerInfo.name} • {order.customerInfo.contact}</p>
                                <p className="text-gray-500">
                                {order.customerInfo.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    <h2 className="mt-4 text-lg">Purchase Summary</h2>

                    <div className="flex justify-between text-gray-500 my-3">
                        <p>Payment Methods: </p>
                        <p className="text-red-900 font-bold">Cash on Delivery</p>
                    </div>
                    <div className="flex justify-between  text-gray-500 my-3">
                        <p>Total Items: </p>
                        <p className="text-red-900 font-bold">{totalItems}</p>
                    </div>
                    <div className="flex justify-between   text-gray-500 my-3">
                        <p>Subtotal: </p>
                        <p className="text-red-900 font-bold">₱{totalPrice}.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
