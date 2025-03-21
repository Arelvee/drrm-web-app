import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Info, ChevronsRight, ChevronRight, CircleUser } from "lucide-react";
import { useState, useEffect } from "react";

const ManualDetail = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const manual = location.state?.manual;

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState(0);

  if (!manual) {
    return <p className="p-6 text-center">Manual not found.</p>;
  }

  // Listen for cart updates
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const cartUnsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const cart = docSnap.data().cart || [];
          const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
          setTotalCartItems(totalItems);
        }
      });

      return () => cartUnsubscribe();
    });

    return () => unsubscribe();
  }, []);

  // Function to add to cart
  const addToCart = async () => {
    if (!auth.currentUser) {
      alert("⚠️ Please log in to add items to your cart!");
      return;
    }

    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);

    try {
      const userSnap = await getDoc(userRef);
      let cartItems = userSnap.exists() ? userSnap.data().cart || [] : [];

      // Check if the item already exists in the cart
      const itemIndex = cartItems.findIndex((item) => item.manualId === manual.id);

      if (itemIndex !== -1) {
        // If the item exists, update the quantity
        cartItems[itemIndex].quantity += selectedQuantity;
      } else {
        // Add a new item
        cartItems.push({
          manualId: manual.id,
          title: manual.title,
          category: manual.category,
          price: manual.price,
          imageUrl: manual.imageUrls[0],
          quantity: selectedQuantity,
        });
      }

      // Update Firestore
      await updateDoc(userRef, { cart: cartItems });

      // No need to manually update `totalCartItems`, Firestore `onSnapshot` will handle it
      showPopup("✅ Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showPopup("❌ Failed to add item to cart!");
    }
  };

  return (
    <div className="p-4 mt-20">
      {/* Header with Cart and Profile Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button className="flex items-center text-black px-4" onClick={() => navigate(-1)}>
          Manual Shop <ChevronsRight size={20} className="mx-3" /> {manual.title}
        </button>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/cart")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2"
          >
            Cart ({totalCartItems})
          </button>
          <button onClick={() => navigate("/profile")} className="text-black px-2 flex items-center gap-2">
            <CircleUser size={40} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Swiper for Images */}
        <div className="md:w-1/3 flex justify-center">
          <Swiper modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} className="h-64 w-full">
            {manual.imageUrls.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={`http://localhost:5000${img}`} alt={manual.title} className="h-64 object-cover mx-auto cursor-pointer" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Manual Details */}
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-4">{manual.title}{manual.category}</h2>
          <p className="text-2xl font-bold text-red-900">₱ {manual.price}.00</p>
          <p><strong>Stock:</strong> {manual.stock}</p>

          {/* Quantity Selector */}
          <div className="flex justify-between items-center my-4">
            <p><strong>Quantity:</strong></p>
            <div className="flex items-center gap-2">
              <button onClick={() => setSelectedQuantity(prev => Math.max(1, prev - 1))} className="px-3 py-1 bg-gray-300 rounded w-8">
                -
              </button>
              <span className="mx-4">{selectedQuantity}</span>
              <button onClick={() => setSelectedQuantity(prev => prev + 1)} className="px-3 py-1 bg-gray-300 rounded">
                +
              </button>
            </div>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="flex gap-4 mt-4">
            <button onClick={addToCart} className="bg-yellow-600 text-white text-sm p-2 rounded w-full">
              Add To Cart
            </button>
            <button
                onClick={() => {
                    navigate("/checkout", {
                    state: {
                        cartItems: [
                        {
                            manualId: manual.id,
                            title: manual.title,
                            category: manual.category,
                            price: manual.price,
                            imageUrl: manual.imageUrls[0],
                            quantity: selectedQuantity,
                        },
                        ],
                    },
                    });
                }}
                className="bg-red-900 text-white text-sm p-2 rounded w-full"
                >
                Buy Now
                </button>

          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="my-8 border border-gray-300 p-4 rounded-lg">
      <button
        onClick={() => setShowShippingInfo(!showShippingInfo)}
        className="text-xl font-bold flex justify-between items-center w-full text-left"
        >
        <div className="flex items-center gap-2">
            <Info size={25} />
            Shipping Fee Information
        </div>
        <ChevronRight
            size={25}
            className={`transition-transform duration-300 ${showShippingInfo ? "rotate-90" : ""}`}
        />
        </button>

        {showShippingInfo && (
          <div className="mt-4 text-gray-700">
            <p>
              <strong>Note:</strong> The shipping fee will <span className="text-red-600 font-bold">not</span> be shouldered by the company. The delivery cost depends on the recipient’s location and chosen courier.
            </p>
            <h3 className="mt-4 font-semibold">Shipping Couriers:</h3>
            <ul className="list-disc list-inside mt-2">
              <li><strong>Metro Manila:</strong> Lalamove</li>
              <li><strong>Outside Metro Manila:</strong> DHL & LBC</li>
            </ul>
            <p className="mt-4">
              Once your order is placed, we will coordinate the best available shipping option and provide you with the estimated delivery cost.
            </p>
          </div>
        )}
      </div>

      {/* Manual Overview */}
      <div className="my-4 px-4">
        <h2 className="text-xl font-bold my-2">Manual Overview</h2>
        <p className="text-justify">{manual.content}</p>
      </div>
      {/* Pop-up Message */}
      {message && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-black/60 text-white text-2xl font-bold px-6 py-4 rounded-lg shadow-lg">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualDetail;
