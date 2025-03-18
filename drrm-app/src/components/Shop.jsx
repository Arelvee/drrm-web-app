import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, updateDoc, arrayUnion, getDoc, collection, onSnapshot } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [manuals, setManuals] = useState([]);
  const [selectedManual, setSelectedManual] = useState(null);
  const [filteredManuals, setFilteredManuals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const addToCart = async (manual) => {
    if (!auth.currentUser) {
      showPopup("⚠️ Please log in to add items to your cart!");
      return;
    }
  
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
  
    try {
      const userSnap = await getDoc(userRef);
      let cartItems = userSnap.exists() ? userSnap.data().cart || [] : [];
  
      // Check if the item is already in the cart
      const itemIndex = cartItems.findIndex(item => item.manualId === manual.id);
  
      if (itemIndex !== -1) {
        // If the item exists, update the quantity
        cartItems[itemIndex].quantity += selectedQuantity;
      } else {
        // Add a new item
        cartItems.push({
          manualId: manual.id,
          title: manual.title,
          price: manual.price,
          imageUrl: manual.imageUrls[0],
          quantity: selectedQuantity
        });
      }
  
      // Update Firestore with the modified cart array
      await updateDoc(userRef, { cart: cartItems });
  
      // No need to manually update `totalCartItems`, Firestore `onSnapshot` will handle it
      showPopup("✅ Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showPopup("❌ Failed to add item to cart!");
    }
  };
  
  const navigate = useNavigate();
  const [totalCartItems, setTotalCartItems] = useState(0);
  
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

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "manuals"), (querySnapshot) => {
      const fetchedManuals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setManuals(fetchedManuals);
      filterManuals(fetchedManuals, selectedCategory, searchQuery);
    });

    return () => unsubscribe();
  }, []);

  const showPopup = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const filterManuals = (manualsList, category, search) => {
    let filtered = manualsList;

    if (category !== "All") {
      filtered = filtered.filter((manual) => manual.category === category);
    }

    if (search) {
      filtered = filtered.filter((manual) =>
        manual.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredManuals(filtered);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    filterManuals(manuals, newCategory, searchQuery);
  };

  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    filterManuals(manuals, selectedCategory, newSearchQuery);
  };

  if (selectedManual) {
    return (
      <div className="p-4 mt-20">
        {/* Cart Button */}
      {/* View Cart Button with Total Items */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/cart")} // Navigate to Cart Page
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2"
        >
          🛒 View Cart ({totalCartItems})
        </button>
      </div>
        <button className="flex items-center text-black mb-4 px-4" onClick={() => setSelectedManual(null)}>Manual Shop<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right mx-2"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg> {selectedManual.title} </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex justify-center">
            <Swiper modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} className="h-64 w-full">
              {selectedManual.imageUrls.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`http://localhost:5000${img}`}
                    alt={selectedManual.title}
                    className="h-64 object-cover mx-auto cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">{selectedManual.title}</h2>
            <p className="text-2xl font-bold text-red-900">₱ {selectedManual.price}.00</p>
            <p><strong>Stock:</strong> {selectedManual.stock}</p>
            {/* Quantity Selector */}
            <div className="flex justify-between items-center my-4">
              <p><strong>Quantity:</strong></p>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-300 rounded w-8"
                >
                  -
                </button>
                <span className="mx-4">{selectedQuantity}</span>
                <button
                  onClick={() => setSelectedQuantity(prev => prev + 1)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => addToCart(selectedManual)}
                className="bg-yellow-600 text-white text-sm p-2 rounded w-full"
              >
                Add To Cart
              </button>

              <button
                onClick={() => {
                  showPopup(`Proceeding to checkout with ${selectedQuantity} item(s)...`);
                  setTimeout(() => {
                    navigate("/checkout", {
                      state: {
                        cartItems: [{ ...selectedManual, quantity: selectedQuantity }], // Pass selected item
                      },
                    });
                  }, 1500); // Delay for popup effect
                }}
                className="bg-red-900 text-white text-sm p-2 rounded w-full"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Shipping Info Toggle */}
        <div className="my-8 border border-gray-300 p-4 rounded-lg">
          <button onClick={() => setShowShippingInfo(!showShippingInfo)} className="text-xl font-bold flex items-center gap-2 w-full text-left" > <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-info"
                      >
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                      </svg>
                    </span>
            Shipping Fee Information 
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
        
        
        <div className="my-4 px-4">
          <h2 className="text-xl font-bold my-2">Manual Overview</h2>
          <p className="text-justify">{selectedManual.content}</p>
        </div>

        {/* Suggested Manuals */}
        <h2 className="text-xl font-bold mt-8">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {manuals.filter(manual => manual.id !== selectedManual.id)
            // .filter(manual => manual.id !== selectedManual.id)
            .map((manual) => (
              <div key={manual.id} className="cursor-pointer border p-4 rounded-lg shadow-lg"
                onClick={() => setSelectedManual(manual)}>
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} className="h-48 w-full">
                  {manual.imageUrls.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={`http://localhost:5000${img}`} alt={manual.title} className="h-48 w-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <h2 className="text-lg font-semibold mt-4">{manual.title}</h2>
                <p className="text-2xl font-bold text-red-900">₱ {manual.price}.00</p>
              </div>
            ))
          }
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
  }

  return (
    <div className="shop-container p-6 mt-20">
      {/* Render All Manuals */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold">Manuals</h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2"
          >
            🛒 View Cart ({totalCartItems})
          </button>
        </div>
      </div>
  
      {/* Filters: Category Dropdown + Search Bar */}
      <div className="flex gap-4 my-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded-md"
        >
          <option value="All">All</option>
          <option value="Non-Virtual Module">Non-Virtual Manual</option>
          <option value="VR Module (Facilitator)">Virtual Manual (Facilitator)</option>
          <option value="VR Module (Participant)">Virtual Manual (Participant)</option>
        </select>
  
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search manuals..."
          className="p-2 border rounded-md flex-grow"
        />
      </div>
  
      {/* Manuals Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredManuals.length > 0 ? (
          filteredManuals.map((manual) => (
            <div
              key={manual.id}
              className="cursor-pointer p-4 rounded-lg shadow-lg"
              onClick={() => setSelectedManual(manual)}
            >
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="h-48 w-full"
              >
                {manual.imageUrls.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`http://localhost:5000${img}`}
                      alt={manual.title}
                      className="h-48 w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="my-4">
                <p className="text-sm text-gray-500">{manual.category}</p>
                <h2 className="text-lg font-semibold">{manual.title}</h2>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-red-900">₱ {manual.price}.00</p>
                <p className="text-sm text-gray-500">Stock: {manual.stock}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No manuals available.</p>
        )}
      </div>
    </div>
  );
}  

export default Shop;